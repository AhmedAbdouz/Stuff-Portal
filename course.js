const mongoose = require("mongoose");

const schema = mongoose.Schema( {

  department:{
    type: String ,
    required: true
  },
  name:{
    type: String ,
    unique: true,
    required: true
  },
  instructor:{
    type:Array
  },
  coordinator:{
    type: String ,
  },
  ta:{
    type:Array
  },
  covarge:{
    type:Number
  },
  total:{
    type:Number
  },
  slots:{
    type: Array ,
  }
})

const course = new mongoose.model("course", schema);

module.exports=course;
