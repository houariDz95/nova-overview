import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  buyPrice: {
    type: Number,
    required: true
  },
  sellPrice: {
    type: Number,
    required: true
  },
  profit: {
    type: Number,
    default: function() {
      return this.sellPrice - this.buyPrice;
    }
  },
  isNotPayed: {
    type: Boolean,
    default: false
  },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
  }
}, { timestamps: true });


const Product =  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
