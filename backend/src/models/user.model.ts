export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  surname: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  surname: string;
}

export interface AuthResponse {
  user: UserDTO;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshToken {
  id: string;
  user_id: string;
  token: string;
  expires_at: Date;
  created_at: Date;
}