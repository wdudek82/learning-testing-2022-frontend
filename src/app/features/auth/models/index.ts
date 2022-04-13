import { User, UserRoles } from '@core/models';

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// TODO: Finish interface
export interface SignUpRes {}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignInRes {
  id: number;
  name: string;
  email: string;
  role: UserRoles;
  isActive: true;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CheckAuthRes {
  authenticated: boolean;
  signedInUser: Partial<User>;
}
