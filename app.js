const express = require('express');
const path = require("path");
const publicPath = path.resolve(__dirname, "./public");
const app = express();


app.use(express.static(publicPath));

app.listen(process.env.PORT || 3030, () => {
    console.log("Server corriendo en el puerto 3030");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"));
});

app.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/registro.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/login.html"));
});