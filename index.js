const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");

const app = new express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", (req, res) => {
    const requestBody = req.body;

    const login = requestBody.login;
    const password = requestBody.password;

    if (login === undefined) {
        res.status(401).json({
            message: "Login is required"
        });
    }

    if (password === undefined) {
        res.status(401).json({
            message: "Password is required"
        });
    }

    if (login === "admin" && password === "admin") {
        res.status(200).json({
            message: "Login successful"
        });
    }

    res.status(401).json({
        message: "Login or password is incorrect"
    });
});

app.get("/products", async (req, res) => {
    const products = JSON.parse(await fs.readFile("./products.json", "utf-8"));

    res.status(200).json(products);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});