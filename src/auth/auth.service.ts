import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private validateAndConvertTelegramId(id: any): bigint {
    if (id === undefined || id === null) {
      throw new BadRequestException('Telegram ID is required');
    }

    try {
      // Сначала преобразуем в строку, чтобы избежать проблем с числами
      const idStr = String(id).trim();
      if (!idStr) {
        throw new BadRequestException('Telegram ID cannot be empty');
      }
      return BigInt(idStr);
    } catch (error) {
      throw new BadRequestException('Invalid telegramId format');
    }
  }

  private convertUserToResponse(user: any) {
    return {
      ...user,
      telegramId: user.telegramId.toString(),
    };
  }

  async validateTelegramUser(telegramData: any) {
    if (!telegramData?.id) {
      throw new BadRequestException('Telegram ID is required');
    }

    const { id, username, first_name, last_name, photo_url } = telegramData;
    const telegramId = this.validateAndConvertTelegramId(id);

    // Check if user exists
    let user = await this.prisma.user.findUnique({
      where: { telegramId },
    });

    if (!user) {
      console.log('Создание аккаунта');
      // Create new user
      user = await this.prisma.user.create({
        data: {
          telegramId,
          username,
          firstName: first_name,
          lastName: last_name,
          photoUrl: photo_url,
        },
      });
    } else {
      // Update existing user
      user = await this.prisma.user.update({
        where: { telegramId },
        data: {
          username,
          firstName: first_name,
          lastName: last_name,
          photoUrl: photo_url,
        },
      });
    }

    return this.convertUserToResponse(user);
  }

  async findUserByTelegramId(telegramId: string | number | bigint) {
    const numericId = this.validateAndConvertTelegramId(telegramId);

    const user = await this.prisma.user.findUnique({
      where: {
        telegramId: numericId,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with telegramId ${telegramId} not found`,
      );
    }

    return this.convertUserToResponse(user);
  }
}
