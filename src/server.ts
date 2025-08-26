import express from "express";

export const startServer = () => {
  const app = express();
  app.use(express.json());

  // Add your routes here
  // Example:
  // app.use('/install-app', installAppRouter);

  app.listen(3000, () => {
    console.log(`✅ Server running at http://localhost:3000`);
  });
};
