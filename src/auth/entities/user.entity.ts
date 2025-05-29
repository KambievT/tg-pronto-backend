export class User {
  id: number;
  telegramId: bigint;
  username: string;
  firstName: string;
  lastName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
