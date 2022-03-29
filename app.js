const express = require('express');

const app = express();
const PORT = 4000

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => {
    console.log("Server corriendo en el puerto:", PORT);
});

app.get("/", (req, res) => {
    res.send('');
});