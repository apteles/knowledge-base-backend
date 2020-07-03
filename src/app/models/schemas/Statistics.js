import { Schema, model } from 'mongoose';

const StatisticsSchema = Schema({
  users: Number,
  categories: Number,
  articles: Number,
  createdAt: Date,
});

export default model('Statistics', StatisticsSchema);
