import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  async telegramAuth(
    @Body() telegramData: any,
  ): Promise<{ user: User; isNewUser: boolean }> {
    if (!telegramData?.id) {
      throw new BadRequestException('Telegram ID is required');
    }
    const user = await this.authService.validateTelegramUser(telegramData);
    const isNewUser = !(await this.authService.findUserByTelegramId(
      telegramData.id,
    ));

    return {
      user,
      isNewUser,
    };
  }

  @Post('get-profile')
  async getUser(@Body('telegramId') telegramId: string | number | bigint) {
    if (!telegramId) {
      throw new BadRequestException('Telegram ID is required');
    }
    return this.authService.findUserByTelegramId(telegramId);
  }
}
