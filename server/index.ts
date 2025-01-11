import express from 'express';

const app=express();

app.listen(3001, ()=>{
    console.log("Rodando na porta 3001");
})

app.get('/',(req,res)=>{
    res.send("hello word")
});