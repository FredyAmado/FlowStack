import { Client } from "ssh2";
import net from "net";

const host = "96.44.175.39";
const localPort = 19001;
const remoteHost = "127.0.0.1";
const remotePort = 19001;

const client = new Client();
client.on("ready", () => {
  console.log("SSH tunnel ready → http://127.0.0.1:" + localPort);
  server.listen(localPort, "127.0.0.1");
});
client.on("error", (e) => {
  console.error("SSH error:", e.message);
  process.exit(1);
});
client.on("close", () => {
  console.log("SSH connection closed");
  process.exit(1);
});
const server = net.createServer((socket) => {
  client.forwardOut(
    socket.remoteAddress || "127.0.0.1",
    socket.remotePort || 0,
    remoteHost,
    remotePort,
    (err, stream) => {
      if (err) { socket.end(); return; }
      socket.pipe(stream).pipe(socket);
    }
  );
});
client.connect({
  host,
  username: "root",
  password: "58FjVb6uI2PiL9c0Cp",
  readyTimeout: 10000,
});
process.on("SIGINT", () => { client.end(); server.close(); process.exit(0); });
process.on("SIGTERM", () => { client.end(); server.close(); process.exit(0); });
