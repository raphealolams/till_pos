import express from 'express';
import { EventEmitter } from 'events';
import dotenv from 'dotenv';
dotenv.config();
import { server } from './config';
import { startServer } from './server';
import { logger } from './providers/logger';
const mediator = new EventEmitter();

const app = express();

/**
 * @author
 */
 startServer(app, express).then((app: any) => {
    logger.info({
      message: `🚀 Server started successfully, running on port: ${server.port}.`
    });
    app.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        logger.info({
          message: 'Address in use, retrying...'
        });
        setTimeout(() => {
          app.close();
          app.listen(server.port);
        }, 1000);
      }
    });
  });
