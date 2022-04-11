export enum UserRoles {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

export interface User {
  name: string;
  email: string;
  role: UserRoles;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
