import express from 'express';
import sql from 'mssql';
import { config } from './config/config';

export const createRouter = () => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      // Establish database connection
      const pool = await sql.connect(config.database);

      // Execute stored procedure
      const result = await pool.request()
        .input('Param1', 'PLL')
        .input('Param2', 'GREER')
        .execute('dbo.sp_Debulk_Today');

      // Get column names
      const columns = result.recordset.length > 0 
        ? Object.keys(result.recordset[0]) 
        : [];

      // Send response
      res.json({
        data: result.recordset,
        columns: columns,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Database Processing Error:', error);
      res.status(500).json({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  return router;
};