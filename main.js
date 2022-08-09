const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json())

app.post('/api/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password; 
    
    const user = {
        id:Date.now(),
        username:username,
        password: password
    }

        jwt.sign({user},'secretkey',(err,token)=>{
            res.json({
                token
        })
    })
})

app.get('/api/profile',verifyToken,(req,res)=>{

    jwt.verify(req.body.token,'secretkey',(err,authData)=>{
        if(err)
            res.sendStatus(403);
        else{
            res.json({
                message:"Welcome User!",
                userData:authData
            })
           
        }
    })
  
});


function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){

        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();

    }else{
        // Response will be fobidden
        res.sendStatus(403);
    }

}

app.listen(5000,err=>{
    if(err) {
        console.log(err);
    }
    console.log('Server Started on PORT 5000')
})
