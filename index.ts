import WebSocket, { WebSocketServer } from "ws";

const port_num:number = Number(process.env.PORT || 3000);
const wss = new WebSocketServer({ port: port_num });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(message:string) {
    const data = JSON.parse(message);
    console.log(data); 
    if (data.type === "message") {
      console.log(wss.clients);
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "message", data: data.data }));
        }
      });
    }
  });
});