const app = require('./app');
const connectToDB = require("./config/db.config");
const { PORT } = require("./config/server.config");

const startServer = async () => {
  try {
    await connectToDB();
    
    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };