var express = require("express");
var app = express();
var bodyParser= require("body-parser");
var mongoose = require("mongoose");

//mongoose connection
mongoose.connect("mongodb://localhost/todo");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//mongoose schema
var todoSchema = new mongoose.Schema({
    name: String
})
var Todo = mongoose.model("Todo", todoSchema);

//var todoList= [
  //  "Wash the car and change oil",
 //"Buy groceries and make dinner"
//]


//========Express Routes Here =========//
app.get("/",function(req, res) {
    Todo.find({}, function(err, todoList){
        if(err) console.log(err);
        else {
            res.render("index.ejs", {todoList: todoList});
        }
    })
});


//catch all other routes
//default route
app.get("*", function(req, res) {
    res.send("<hl>Invalid Page</h1>");
});

//submit button route
app.post("/newtodo", function(req, res){
    console.log("item submitted!");
    var newItem = new Todo({
        name: req.body.item
    });
    Todo.create(newItem, function(err, Todo){
        if(err) console.log(err);
        else{
            console.log("inserted Item: " *newItem);
        }
    })
    res.redirect("/");
});

//server listening on port 3000
app.listen(3000, function(){
    console.log("server started on port 3000");
});