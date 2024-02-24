import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true
    },
    // Add other person-related fields as needed
    unpaidProducts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: []
    }],
    unpaidFlexy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flexy',
      default: []
    }]
  });

  const Person =  mongoose.models.Person || mongoose.model('Person', personSchema);
  export default Person;