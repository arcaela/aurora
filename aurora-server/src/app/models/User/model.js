const { Schema } = require("mongoose");
/*
    Schemas Definition
    @ https://mongoosejs.com/docs/guide.html#definition
*/

module.exports = {
    role:{type:String,default:'user'},
    uid:{type:Schema.Types.Mixed,unique:true},


}