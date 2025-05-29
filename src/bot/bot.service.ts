import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class BotService implements OnModuleInit {
  private bot: TelegramBot;
  private readonly logger = new Logger(BotService.name);
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private readonly reconnectDelay = 5000; // 5 seconds

  constructor(private readonly authService: AuthService) {}

  private async initializeBot() {
    try {
      const token = '7871489602:AAE0GTO-FaJlKDIZ_J7BzcDUTiD0UozviNc';
      this.bot = new TelegramBot(token, {
        polling: true,
        request: {
          timeout: 30000, // 30 seconds timeout
          proxy: process.env.HTTPS_PROXY, // если используете прокси
        },
      });

      this.setupEventHandlers();
      this.logger.log('Bot successfully initialized');
      this.reconnectAttempts = 0;
    } catch (error) {
      this.logger.error(`Failed to initialize bot: ${error.message}`);
      this.handleReconnection();
    }
  }

  private setupEventHandlers() {
    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text;

      if (text === '/start') {
        await this.bot.sendMessage(chatId, 'Привет! Я бот от кафе "Pronto"', {
          reply_markup: {
            keyboard: [
              [
                {
                  text: 'Открыть приложение',
                  web_app: {
                    url: `https://telegram-pronto-bot.vercel.app?telegramId=${msg.from.id}`,
                  },
                },
              ],
              [
                {
                  text: '👤 Мой профиль',
                },
              ],
            ],
            resize_keyboard: true,
          },
        });
        await this.bot.sendMessage(
          chatId,
          'Я предназначен для обработки ваших заказов и отправки вам данных,вы можете открыть приложение нажав на кнопку снизу.',
        );
      } else if (text === '/profile' || text === '👤 Мой профиль') {
        try {
          this.logger.log(`Checking profile for user ${msg.from.id}`);
          const user = await this.authService.findUserByTelegramId(msg.from.id);
          this.logger.log(`Found user: ${JSON.stringify(user)}`);

          if (user) {
            const profileMessage = `
👤 *Ваш профиль:*
ID: \`${user.telegramId}\`
Имя: ${user.firstName}
Фамилия: ${user.lastName || 'Не указана'}
Username: @${user.username || 'Не указан'}
            `;
            await this.bot.sendMessage(chatId, profileMessage, {
              parse_mode: 'Markdown',
            });
          }
        } catch (error) {
          this.logger.error(`Error getting profile: ${error.message}`);
          if (error.status === 404) {
            await this.bot.sendMessage(
              chatId,
              'Вы еще не зарегистрированы. Пожалуйста, откройте приложение для регистрации.',
            );
          } else {
            await this.bot.sendMessage(
              chatId,
              'Произошла ошибка при получении профиля. Пожалуйста, попробуйте позже.',
            );
          }
        }
      }
    });

    this.bot.on('web_app_data', async (msg) => {
      const chatId = msg.chat.id;

      try {
        const userData = {
          id: msg.from.id,
          username: msg.from.username,
          first_name: msg.from.first_name,
          last_name: msg.from.last_name,
          photo_url: msg.from.photo_url,
        };

        const user = await this.authService.validateTelegramUser(userData);
        const isNewUser = !(await this.authService.findUserByTelegramId(
          userData.id,
        ));

        const message = isNewUser
          ? `Добро пожаловать, ${user.firstName}! Ваш аккаунт успешно создан.`
          : `С возвращением, ${user.firstName}! Вы успешно вошли в систему.`;

        await this.bot.sendMessage(chatId, message);
      } catch (error) {
        this.logger.error(`Authentication error: ${error.message}`);
        await this.bot.sendMessage(
          chatId,
          'Произошла ошибка при аутентификации. Пожалуйста, попробуйте позже.',
        );
      }
    });

    // Обработка ошибок подключения
    this.bot.on('polling_error', (error) => {
      this.logger.error(`Polling error: ${error.message}`);
      this.handleReconnection();
    });

    this.bot.on('error', (error) => {
      this.logger.error(`Bot error: ${error.message}`);
      this.handleReconnection();
    });
  }

  private handleReconnection() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.logger.log(
        `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`,
      );
      setTimeout(() => this.initializeBot(), this.reconnectDelay);
    } else {
      this.logger.error(
        'Max reconnection attempts reached. Please check your internet connection and Telegram API availability.',
      );
    }
  }

  async onModuleInit() {
    await this.initializeBot();
  }
}
