var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  name: String,
  price:{type:Number,default:0},
  URL: String,
  //URL: {typeLstring,default:"https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"},
  orders:{type:Number,default:0},
  selected: {type: Boolean, default: false}
});
ProductSchema.methods.order = function(cb) {
  this.orders += 1;
  this.save(cb);
};
mongoose.model('Product', ProductSchema);
