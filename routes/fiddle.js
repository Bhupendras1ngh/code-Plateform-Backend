const express =require('express');
const router =express.Router();
const fiddleModel =require('../models/fiddle');
//const CryptoJS =require('crypto-js');
const {v4:uuidv4} =require('uuid');


router.get('/:fiddleid' ,(req ,res)=>{
    fiddleModel.findOne({fiddleid: req.params.fiddleid}).then((doc)=>{
        res.json({error :false ,response :doc});
    }).catch((err)=>console.log(err));
});
// router.get('/' ,(req ,res)=>{
//     fiddleModel.findOne({fiddleid: req.params.fiddleid}).then((doc)=>{
//         res.json({error :false ,response :doc});
//     }).catch((err)=>console.log(err));
// });

router.get('/user/:userid' ,(req ,res)=>{
    fiddleModel.find({userid:req.params.userid}).then((doc)=>{
        res.json({error :false ,response :doc});
    }).catch((err)=>{
        console.log(err);
    });
});

router.post('/' ,(req ,res)=>{
    let fiddleObj =req.body;
    fiddleObj['fiddleid'] =uuidv4();
    let newFiddle =new fiddleModel(fiddleObj);
    newFiddle.save().then((doc)=>{
        res.json({error :false ,response :doc});
    }).catch((err)=>console.log(err))

})



router.put('/' ,(req ,res)=>{
    fiddleModel.updateOne({fiddleid:req.body.fiddleid} ,req.body).then((_)=>{
        res.json({error :false})
    }).catch((err)=>console.log(err));
});

 router.delete(':/fiddleid' ,(req ,res)=>{
    fiddleModel.deleteOne({fiddleid :req.params.fiddleid}).then((_)=>{
        res.json({error :false})
    }).catch((err)=>console.log(err));
 })


 module.exports  =router;