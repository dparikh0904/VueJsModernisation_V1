import pool from '../config/database';
import { User, UserDTO, RefreshToken } from '../models/user.model';
import bcrypt from 'bcryptjs';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query<User>(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  async findById(id: string): Promise<User | null> {
    const result = await pool.query<User>(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async create(data: {
    email: string;
    name: string;
    surname: string;
    password: string;
  }): Promise<UserDTO> {
    const passwordHash = await bcrypt.hash(
      data.password,
      parseInt(process.env.BCRYPT_ROUNDS || '10')
    );

    const result = await pool.query<User>(
      `INSERT INTO users (email, name, surname, password_hash) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, name, surname, created_at, updated_at`,
      [data.email, data.name, data.surname, passwordHash]
    );

    const user = result.rows[0];
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    };
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password_hash);
  }

  async saveRefreshToken(
    userId: string,
    token: string,
    expiresAt: Date
  ): Promise<void> {
    await pool.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [userId, token, expiresAt]
    );
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    const result = await pool.query<RefreshToken>(
      'SELECT * FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()',
      [token]
    );
    return result.rows[0] || null;
  }

  async deleteRefreshToken(token: string): Promise<void> {
    await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [token]);
  }

  async deleteUserRefreshTokens(userId: string): Promise<void> {
    await pool.query('DELETE FROM refresh_tokens WHERE user_id = $1', [userId]);
  }
}