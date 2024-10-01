const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // 日期
  time: { type: String, required: true }, // 時間
  course: { type: String, required: true }, // 球場
  prices: { type: String, required: true }, // 球資
  remarks: { type: String }, // 備註
});

module.exports = mongoose.model('Game', GameSchema);
