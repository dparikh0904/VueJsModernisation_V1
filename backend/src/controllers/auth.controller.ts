import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { ZodError } from 'zod';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      const user = await this.authService.register(validatedData);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        return res.status(400).json({ success: false, errors });
      }

      if (error instanceof Error && error.message === 'Email already exists') {
        return res.status(400).json({
          success: false,
          errors: { email: 'Email already exists' },
        });
      }

      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Legacy API expects { user: { email, password } } format
      const body = req.body.user || req.body;
      const validatedData = loginSchema.parse(body);

      const authResponse = await this.authService.login(validatedData);

      // Set refresh token in httpOnly cookie
      res.cookie('refreshToken', authResponse.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Return access token and user data (legacy format)
      res.json({
        success: true,
        user: {
          ...authResponse.user,
          token: authResponse.accessToken,
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        return res.status(400).json({ success: false, errors });
      }

      if (
        error instanceof Error &&
        error.message === 'Invalid email or password'
      ) {
        return res.status(401).json({
          success: false,
          errors: { email: 'Invalid email or password' },
        });
      }

      next(error);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'Refresh token not found',
        });
      }

      const result = await this.authService.refresh(refreshToken);

      res.json({
        success: true,
        accessToken: result.accessToken,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Invalid refresh token'
      ) {
        return res.status(401).json({
          success: false,
          message: 'Invalid refresh token',
        });
      }

      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (refreshToken) {
        await this.authService.logout(refreshToken);
      }

      res.clearCookie('refreshToken');
      res.json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}