const http = require("http");
const url = require("url");
const fs = require("fs");

const PORT = 2000;
let products = [];
let orders = [];

if (fs.existsSync("products.json")) {
  const data = fs.readFileSync("products.json");
  products = JSON.parse(data);
}

if (fs.existsSync("orders.json")) {
  const data = fs.readFileSync("orders.json");
  orders = JSON.parse(data);
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (pathname === "/products") {
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(products));
    }
  } else if (pathname.startsWith("/products/")) {
    const id = parseInt(pathname.split("/")[2]);
    const product = products.find((p) => p.id === id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
      return;
    }

    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } else if (pathname === "/orders" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      let ordersToAdd;
      try {
        ordersToAdd = JSON.parse(body);
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON" }));
        return;
      }

      if (Array.isArray(ordersToAdd)) {
        ordersToAdd.forEach((order) => {
          order.id = Date.now(); // 고유 ID 생성
          order.createdAt = new Date();
          orders.push(order);
        });
      } else {
        ordersToAdd.id = Date.now();
        ordersToAdd.createdAt = new Date();
        orders.push(ordersToAdd);
      }

      fs.writeFileSync("orders.json", JSON.stringify(orders));
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(ordersToAdd));
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(PORT, () => {
  console.log(`전자상거래 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
