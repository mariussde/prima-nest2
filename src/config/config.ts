import dotenv from 'dotenv';
import { config as MSSQLConfig } from 'mssql';

dotenv.config();

export const config = {
  database: {
    user: process.env.DB_USER || 'mlefter_dbeaver',
    password: process.env.DB_PASSWORD || 'lefter01',
    server: process.env.DB_SERVER || 'sqlexpressva.c2xw7rscu4uh.us-east-1.rds.amazonaws.com',
    database: process.env.DB_NAME || 'Prima',
    port: parseInt(process.env.DB_PORT || '1433'),
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  } as MSSQLConfig,
  port: process.env.PORT || 3000
};