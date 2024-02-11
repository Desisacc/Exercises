const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
    console.log('index.html request');
    res.sendFile(process.cwd() + '/Client/index.html');
})

app.get('/script.js', (req, res) => {
    console.log('script.js request');
    res.sendFile(process.cwd() + '/Client/script.js');
})
  
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
})