export enum UserRoles {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRoles;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
