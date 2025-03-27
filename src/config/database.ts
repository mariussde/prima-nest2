import sql from 'mssql';
import { config } from './config';

export class DatabaseService {
  private static connection: sql.ConnectionPool | null = null;

  static async connect(): Promise<sql.ConnectionPool> {
    // If connection exists and is healthy, return existing connection
    if (this.connection && this.connection.connected) {
      return this.connection;
    }

    // Ensure all required database config values are present
    const { user, password, server, database, options } = config.database;

    if (!user || !password || !server || !database) {
      throw new Error('Incomplete database configuration');
    }

    // Create new connection
    this.connection = await sql.connect({
      user,
      password,
      server,
      database,
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    });

    return this.connection;
  }

  static async getNewIMSRecords() {
    const pool = await this.connect();
    const result = await pool.query`
      SELECT * FROM IMS_Yard_T WHERE pr_Status = 'New'
    `;
    return result.recordset;
  }

  static async processIMSTransaction(recordId: number) {
    const pool = await this.connect();
    const result = await pool.query`
      EXEC dbo.ProcessIMSTransaction @RecordId = ${recordId}
    `;
    return result.recordset;
  }

  // Optional: Add a method to close the connection
  static async closeConnection() {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }
}