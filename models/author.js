const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  name: {
    type: String,
    max: 255,
    default: null,
  },
  age: {
    type: Number,
  },
});

module.exports = model("Author", authorSchema);
