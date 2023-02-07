const express  =require('express');
const cors =require('cors');
const userRoute =require('./routes/user');
const mongoose =require('mongoose');
const fiddleRoute = require('./routes/fiddle');
const app =express();
const axios  =require('axios').default;
app.use(cors());
app.use(express.json());





app.get('/' ,(req ,res) =>{
    res.end('hello from server');
});

app.use('/users' ,userRoute);
app.use('/fiddle' ,fiddleRoute);


app.post('/execute', (req ,res)=>{
   let reqObj =req.body;
   reqObj['clientId']= "3de2548748f9783fce0b162c7bcaf079";
   reqObj['clientSecret'] ="db3bdd919a039c4433dba92122e0b272c466440dd7f4577f705388389449aafc";
   axios.post('https://api/jdoodle.com/v1/execute' ,reqObj).then((resp)=>{
    res.josn({error:false ,response: resp});
   }).catch((err)=>{console.log(err)})
})


mongoose.connect('mongodb+srv://CodeFiddle:Bhupendra9001@cluster0.ct0ioyp.mongodb.net/codeFiddle?retryWrites=true&w=majority', {useNewUrlParser:true ,useUnifiedTopology:true}).then(()=>{
    console.log("connected to db")
}).catch((err)=>{
   // console,log(err);
});


app.listen(5500 ,()=>{
    console.log("server is running in port 5500");
})