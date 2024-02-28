const express= require("express");
const app=express();
const port=8080;
const path=require("path");// for views

var methodOverride = require('method-override');
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// generatiing uinque id
const { v4: uuidv4 } = require('uuid');
app.use(express.urlencoded({extended:true}));

app.set("view engine");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts =[
    {
        id:uuidv4(),
        username:"apnacollege",
        content:" i love coding",
    },
    {
        id:uuidv4(),
        username:"shradhakhapra",
        content:"hard work is important to achieve success",
    },
    {
        id:uuidv4(),
        username:"rahulkumar",
        content:" i got selected for my first internship",
    }
];

app.get("/posts", (req,res) => {
    res.render("index.ejs", { posts })
})
app.get("/posts/new" , (req,res) => {
    res.render("new.ejs");
})

app.post("/posts" , (req,res) => {
    let {username, content } = req.body;
    let id=uuidv4();
    posts.push({ id, username, content});
    res.redirect("/posts");
    // console.log(req.body);
    // res.send("post request workign");
})

app.get("/posts/:id" , (req,res) => {
    let {id}= req.params;
    let post=posts.find( (p) => id === p.id);
    // console.log(post);
    // console.log(id);
    res.render("show.ejs", { post });
})

app.patch("/posts/:id", (req,res) => {
    let {id }= req.params;
    let newContent=req.body.content;//patch request ma body ko through sende gareko content
    console.log(id);
    console.log(newContent);

     // Find the index of the post in the array
    let post=posts.find( (p) => id === p.id);
    post.content=newContent;
    // console.log(post);
    
    // res.send("Patch request working");
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req,res) => {

    //taking id
    let {id}= req.params;
    let post=posts.find((p) => id ===p.id);
    res.render("edit.ejs",{post});


})

app.delete("/posts/:id",(req,res) => {
    let {id}=req.params;
    posts=posts.filter((p) => id !== p.id);
    res.redirect("/posts");
    // res.send("delete successfully");

})
app.listen(port, () => {
    console.log(`listening on port ${port}`);

})