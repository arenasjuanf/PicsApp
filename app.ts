
import Server from "./classes/server";

// server start
const server: Server = new Server();
server.start(() => console.log(`...running on port: ${server.port} ....`));