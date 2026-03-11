import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { JWTPayload, AuthResponse, UserDTO } from '../models/user.model';
import { LoginInput, RegisterInput } from '../validators/auth.validator';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(input: RegisterInput): Promise<UserDTO> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Create new user
    const user = await this.userRepository.create({
      email: input.email,
      name: input.name,
      surname: input.surname || ' ',
      password: input.password,
    });

    return user;
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    // Find user by email
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await this.userRepository.verifyPassword(
      user,
      input.password
    );
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate tokens
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    // Save refresh token to database
    const refreshExpiresAt = new Date();
    refreshExpiresAt.setDate(
      refreshExpiresAt.getDate() +
        parseInt(process.env.JWT_REFRESH_EXPIRES_IN?.replace('d', '') || '7')
    );
    await this.userRepository.saveRefreshToken(
      user.id,
      refreshToken,
      refreshExpiresAt
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET || 'refresh-secret'
      ) as JWTPayload;

      // Check if refresh token exists in database
      const tokenRecord = await this.userRepository.findRefreshToken(
        refreshToken
      );
      if (!tokenRecord) {
        throw new Error('Invalid refresh token');
      }

      // Generate new access token
      const payload: JWTPayload = {
        userId: decoded.userId,
        email: decoded.email,
        name: decoded.name,
        surname: decoded.surname,
      };

      const accessToken = this.generateAccessToken(payload);

      return { accessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async logout(refreshToken: string): Promise<void> {
    await this.userRepository.deleteRefreshToken(refreshToken);
  }

  private generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET || 'access-secret',
      { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
    );
  }

  private generateRefreshToken(payload: JWTPayload): string {
    return jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || 'refresh-secret',
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );
  }

  async verifyAccessToken(token: string): Promise<JWTPayload> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET || 'access-secret'
      ) as JWTPayload;
      return decoded;
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }
}