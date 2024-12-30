const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type : String,
  },
  category: {
    type : String,
  },
  subcategory:{
    type : String,
  },
  material : {
    type : String,
  },
  color : {
    type : String,
  },
  size: {
    type : [String],
  },
  price: { 
    type : Number,
  },
  description : {
    type : String,
  },
  image_url : {
    type : String,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
