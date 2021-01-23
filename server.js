const express = require('express');
const app = express();

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

app.listen(8088,()=>{
    console.log("Server is running at http://localhost:" + String(8088));
});
