import dotenv from 'dotenv';
import { config as MSSQLConfig } from 'mssql';

dotenv.config();

export const config = {
  database: {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_SERVER || '',
    database: process.env.DB_NAME || '',
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  } as MSSQLConfig,
  port: process.env.PORT || 3000
};