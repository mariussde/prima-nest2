import express from 'express';
import { DatabaseService } from './config/database';

export const createRouter = () => {
  const router = express.Router();

  router.get('/ims-process', async (req, res) => {
    try {
      // Fetch new records
      const newRecords = await DatabaseService.getNewIMSRecords();
      
      // Process each record
      const processedResults = await Promise.all(
        newRecords.map(async (record) => {
          const transactionResult = await DatabaseService.processIMSTransaction(record.id);
          return {
            originalRecord: record,
            processedResults: transactionResult
          };
        })
      );

      res.json({
        status: 'success',
        data: processedResults
      });
    } catch (error) {
      console.error('IMS Processing Error:', error);
      res.status(500).json({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  return router;
};