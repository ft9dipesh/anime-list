const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const animeListSchema = new Schema(
  {
    kitsuId: { type: String, trim: true, required: true, unique: true },
    title: { type: String, trim: true, required: true, unique: true },
    imgUrl: { type: String, trim: true },
    totalEpisodes: { type: Number },
    watchedEpisodes: { type: Number, default: 0 },
    rating: { type: Number, min: 1, max: 10 },
    userStatus: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

const AnimeList = mongoose.model('AnimeList', animeListSchema);

module.exports = AnimeList;
