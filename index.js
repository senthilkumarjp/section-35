const express=require('express');
const app=express();
const path=require('path');
const methodOverride =require('method-override');
const { v4: uuid } = require('uuid');


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname,'views'))
app.set('view engine','ejs')

let comments=[
    {
        id:uuid(),
        username:'john',
        comment:'i like tea!'
    },
    {
        id:uuid(),
        username:'skyler',
        comment:'i like to go!'
    },
    {
        id:uuid(),
        username:'bennny',
        comment:'plz delete your account!'
    },
    {
            id:uuid(),
        username:'woof',
        comment:'woof woof woof !'
    }
]

app.get('/',(req,res)=>{
    res.send('<h1>welcome to the CRUD App using Node!</h1>')
})

app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})
})

app.get('/comments/new',(req,res)=>{
    res.render('comments/new');
})

app.post('/comments',(req,res)=>{
    const {username,comment}=req.body;
    comments.push({username,comment,id:uuid() })
    res.redirect('/comments');
})

app.get('/comments/:id',(req,res) =>{
    const{id}=req.params;
    const comment=comments.find(c => c.id ===id);
    res.render('comments/show',{comment})
})

app.get('/comments/:id/edit',(req,res) =>{
    const{id}=req.params; 
    const comment=comments.find(c => c.id ===id);
    res.render('comments/edit',{comment})
})

app.patch('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const newcommenttext=req.body.comment;
    const foundcomment=comments.find(c=>c.id ===id);
    foundcomment.comment=newcommenttext;
    res.redirect('/comments') 
})

app.delete('/comments/:id',(req,res)=>{
    const {id}=req.params;
    comments=comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

// app.get('/senthil',(req,res)=>{
//     res.send("GET /senthil response")
// })

app.post('/senthil',(req,res)=>{
        const {meat,qty}=req.body;
    res.send(`OK,here are your ${qty} ${meat} senthil`)
}) 

app.listen(5000,()=>{
    console.log("ON PORT 3000!")
})

// // function alert(){
// //     var a=5;
// //     var 
// // }

// // console.log(ale

// for(i=a.length;i>0;i--)


// var a=10;
// var b=5;
//  a=a+b;
//  b=a-b;
//  a=a-b;
//  console.log(a);
//  console.log(b);