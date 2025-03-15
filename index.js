import 'dotenv/config'
//console.log(process.env)

import express from 'express'
const app = express()
const port= process.env.PORT||3000
// app.get("/",(req,res)=>{
//     res.send("Hello from hitesh and his tea")
// })
// app.get("/ice-tea",(req,res)=>{
//     res.send("what ice tea would you prefer")
// })


app.use(express.json())
// This is middleware that parses incoming JSON request bodies.
// It enables the server to accept and understand JSON data in the req.body.
// Without this middleware, req.body would be undefined in JSON requests.
//req.body contains the data sent from the client.

let teaData = []
let nextId=1

//add a new tea
app.post('/teas',(req,res)=>{
    const {name,price} = req.body
    const newTea = {id:nextId++,name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all the tea
app.get("/teas",(req,res)=>{
    res.status(200).send(teaData)
})

//get a tea with id
app.get("/teas/:id",(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))  //everything comes from the url  or params is String
    if (!tea) {
         return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})

//update tea
app.put('teas/:id',(req,res)=>{
   const tea = teaData.find(t => t.id === parseInt(req.params.id))  //everything comes from the url  or params is String
   if (!tea) {
        return res.status(404).send('Tea not found')
   }
   const {name,price}=req.body
   tea.name = name
   tea.price = price
   res.status(200).send(tea)

})
//delete tea
app.delete('/teas/:id',(req,res)=>{
    const index = teaData.findIndex(t=>t.id === parseInt(req.params.id))
    if(index===-1)
    {
        return res.status(404).send('tea not found')
    }
    teaData.splice(index,1)
    return res.status(204).send('deleted')
})
app.listen(port,()=>{
    console.log(`server is running at port:${port}`)
})

