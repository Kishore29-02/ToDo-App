const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

let items = ["Task1","Task2"];

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));
app.get("/",(req,res)=>{
    let tdy = new Date();
    let option = {
        weekday:'long',
        day:"numeric",
        month:"long"
    };
    res.render("first",{newItems:items,today:tdy.toLocaleDateString("en-US",option)});
});

app.post("/add",(req,res)=>{
    items.push(req.body.newItem);
    res.redirect("/");
})

app.post("/del",(req,res)=>{
    let deleteIndex = req.body.deleteItem;
    if (deleteIndex !== undefined && deleteIndex < items.length) {
        items.splice(deleteIndex, 1);
    }
    res.redirect("/");
});

app.listen(port,()=>{
    console.log("The server is running");
});