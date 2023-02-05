const express =require('express');
const router =express.Router();
const userModel =require('../models/user');
const CryptoJS =require('crypto-js');
const {v4:uuidv4} =require('uuid');

//1/Login -Post
//2.Creating Account for new user-- Post
router.get('/' ,(req ,res) =>{
    res.end("user router is there");
})

// create new user
//for encription and ecription we use crypto-js ,uuid is use to generate random string which will we used as user id 
// router.post('/' ,(req, res)=>{
//    let userObj =req.body;
//     userObj.password =CryptoJS.AES.encrypt(userObj.password ,'1234567').toString();
//     userObj['userid'] = uuidv4(); 
//     let newuser =new userModel(userObj);
//     newuser.save().then((doc)=>{
//         res.json({error :false ,response : doc})
//     }).catch((err)=>{
//         console.log(err);
//         res.json({error:true ,message :"Error in craeting doc"});
//     })

// });
router.post('/', (req,res)=>{
    let userObj = req.body;
    userObj.password = CryptoJS.AES.encrypt(userObj.password, '1234567').toString();
    userObj['userid'] = uuidv4();
    let newUser = new userModel(userObj);
    newUser.save().then((doc)=>{
        res.json({error:false, response: doc});
    }).catch((err)=>{
        console.log(err);
        res.json({error: true, message:'Error in creating doc'});
    });
});

//localhost:3000/users/login
router.post('/login' ,(req, res)=>{
    let data =req.body;
    userModel.findOne({email :data.email}).then((userDoc)=>{
        if(userDoc == null){
            res.json({error :true ,message :"Account does not exist"});
        }
        else{

            let decryptedPassword = CryptoJS.AES.decrypt(userDoc.password ,'1234567').toString(CryptoJS.enc.Utf8);
            if( decryptedPassword == data.password){
                res.json({error :false  ,response :userDoc});
            }
            else{
                res.json({error: true ,message :"Incorrect pssword"});
            }
        }
    }).catch();

})

module.exports =router;