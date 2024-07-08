import app from "./src/index";
import { appConfig } from "./src/config/app.config";

const startServer = () => {
  const PORT = appConfig.port;
  app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
  });
};

// starting the server
startServer();
