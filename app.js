const express = require("express")
app = express()

app.get("/",function(req, res){
    res.end("<h1> Hello World 3 </h1>")
})

app.listen(8000)