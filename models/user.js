const mongoose  =require('mongoose');
const Schema =mongoose.Schema;

//generally schema refers toa collection/table and has fields
const userSchema =new Schema({
    email:{type:String, required:true},
    password:{type:String ,required:true},
    userid:{type:String ,required :true}

});

module.exports =mongoose.model('user' ,userSchema);