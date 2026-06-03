import { Client } from "ssh2";
import { exec } from "child_process";

const host = "96.44.175.39";
const username = "root";
const password = "58FjVb6uI2PiL9c0Cp";

async function run(cmd) {
  return new Promise((resolve, reject) => {
    const client = new Client();
    client.on("ready", () => {
      client.exec(cmd, (err, stream) => {
        if (err) { client.end(); reject(err); return; }
        let out = "";
        stream.on("data", (d) => { out += d.toString(); });
        stream.stderr.on("data", (d) => { out += d.toString(); });
        stream.on("close", () => { client.end(); resolve(out.trim()); });
      });
    }).on("error", reject).connect({ host, username, password, readyTimeout: 10000 });
  });
}

const cmd = process.argv.slice(2).join(" ");
if (!cmd) { console.log("Usage: node ssh-exec.mjs <command>"); process.exit(1); }

try {
  const result = await run(cmd);
  console.log(result);
} catch (e) {
  console.error("Error:", e.message);
  process.exit(1);
}
