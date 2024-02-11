const express=require("express");
const app=express();
const path=require("path");
const port=3000;
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))


app.use(express.urlencoded({extended:true}));
app.set("views ",path.join(__dirname,"views"));
app.set("view engine","ejs");
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname,'public')));


let posts=[
    {
        id:uuidv4(),
        username:"Deepak Pal",
        content:"I love Coding"
    },
    {
        id:uuidv4(),
        username:"apnacollage",
        content:"Work hard until you success"
    },
    {
        id:uuidv4(),
        username:"priya",
        content:"I am the pretty girl"
    }
]

app.get("/",(req,res)=>{
    res.send("Hello, I get a get request");
})
app.get("/posts",(req,res)=>{
    // res.send("Hello, Welcome to Quora posts");
    res.render("index.ejs",{posts});
})
app.post("/posts",(req,res)=>{
   let{username,content}=req.body;
   let id=uuidv4();
   posts.push({id,username,content});
   res.redirect("/posts");
})
app.post("/posts/update",(req,res)=>{
    console.log(req.body);
})
app.get("/posts/new",(req,res)=>{
    
    res.render("form.ejs");
})

app.get("/posts/show/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((post)=>{
        return id===post.id;
    })
   res.render("show.ejs",{post});
})

app.patch("/posts/update/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((post)=>{
        return id===post.id;
    })
   post.content=newcontent;
    // res.send("post request working");
    res.redirect("/posts");
})
app.get("/posts/edit/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((post)=>{
        return id===post.id;
    })
    res.render("update.ejs",{post});
})
app.delete("/posts/delete/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((post)=>{
        return id!=post.id;
    })
  res.redirect("/posts");

})

app.listen(port,()=>{
    console.log("server working well");
})