import express from 'express';
import payload from 'payload';
import next from 'next';
import nextBuild from 'next/dist/build';
import path from 'path';
import { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const DEV = process.env.NODE_ENV !== 'production';
const PORT = parseInt(process.env.PORT || '3000', 10);

const app = express();

const boilerplate = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET_KEY || '',
    mongoURL: process.env.MONGODB_URI || '',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}.`);
      payload.logger.info(`Payload API URL: ${payload.getAPIURL()}.`);
    }
  });

  app.use(cors());

  if (!process.env.NEXT_BUILD) {
    const nextApp = next({ dev: DEV });
    const nextHandler = nextApp.getRequestHandler();

    app.get(
      '*',
      (request: IncomingMessage, response: ServerResponse<IncomingMessage>) =>
        nextHandler(request, response)
    );

    nextApp.prepare().then(() => {
      payload.logger.info(`Client is ready!`);

      app.listen(PORT, async () => {
        payload.logger.info(`Server is listening on port ${PORT}.`);
      });
    });
  } else {
    app.listen(PORT, async () => {
      payload.logger.info('Client is building now...');

      await nextBuild(path.join(__dirname, '../'));

      process.exit();
    });
  }
};

boilerplate();
