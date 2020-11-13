//Creation of a server
const express = require("express")
app = express()

const addProduct = require("./addProduct.js")
const addReciepe = require("./addReciepe")

app.get("/",function(req, res){
    res.end("<h1> Hello World </h1>")
})

app.post("/addProduct",function(req,res){
    res.end("<h1> Document inserted </h1>");
    addProduct(req.query)
})

app.post("/addReciepe", (req,res)=>{
    res.end("<h1> Document inserted </h1>");
    addReciepe(req.query)
})

app.listen(8000)