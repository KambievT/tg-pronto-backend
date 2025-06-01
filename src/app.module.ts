import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './bot/bot.module';
import { PrismaModule } from './prisma/prisma.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [AuthModule, BotModule, PrismaModule, MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
