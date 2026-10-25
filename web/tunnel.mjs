import { Client } from "ssh2";
import net from "net";

const host = process.env.VPS_HOST;
const password = process.env.VPS_PASSWORD;

if (!host || !password) {
  console.error("Definir VPS_HOST y VPS_PASSWORD en el entorno (ver .env.example).");
  process.exit(1);
}
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
  password,
  readyTimeout: 10000,
});
process.on("SIGINT", () => { client.end(); server.close(); process.exit(0); });
process.on("SIGTERM", () => { client.end(); server.close(); process.exit(0); });
