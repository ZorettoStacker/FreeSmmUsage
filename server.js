import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = "https://heysmmreseller.com/api/v2";
const API_KEY = "281ef587db3c1be6d8c8d443c3496c36"; // keep SECRET

// Check order status
app.post("/api/order-status", async (req, res) => {
    const { orderId } = req.body;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            key: API_KEY,
            action: "status",
            order: orderId
        })
    });

    const data = await response.json();
    res.json(data);
});

// Place new order
app.post("/api/place-order", async (req, res) => {
    const { service, link, quantity } = req.body;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            key: API_KEY,
            action: "add",
            service,
            link,
            quantity
        })
    });

    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
