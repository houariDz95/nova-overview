import mongoose from "mongoose";

const flexySchema = new mongoose.Schema({
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


const Flexy =  mongoose.models.Flexy || mongoose.model('Flexy', flexySchema);
export default Flexy;
