import { app } from "./app";
import { _config } from "./config/config";
import { connectDB } from "./config/db";

connectDB()
  .then(() => {
    app.listen(_config.port, () => {
      console.log(`Server is running at port: ${_config.port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed !!! ", err);
  });
