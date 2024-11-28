import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';
import config from './config/index';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

let server: Server;

//database connection
async function Database() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(` Database connection successful`);

    app.listen(config.port, () => {
      console.log(`Server is  listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(`Failed to connect database`, err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

Database();
process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
