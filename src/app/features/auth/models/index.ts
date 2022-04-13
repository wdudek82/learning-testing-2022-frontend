export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignupResponse {}

export interface SigninCredentials {
  email: string;
  password: string;
}

export interface SigninResponse {}
