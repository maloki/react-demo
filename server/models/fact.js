import mongoose from 'mongoose';

const { Schema } = mongoose;

const schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    }
  };

const schema = new Schema({
  text: String,
  category: String,
  tags: [String],
  dateCreated: { type: Date, default: Date.now() },
  img: String
}, schemaOptions);


const model = mongoose.model('Fact', schema);

export default model;
