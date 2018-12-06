const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SearchSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  city: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  weather:{
    main: String,
    description: String,
    icon: String
  },
  temperature: {
    current: Number,
    min: Number,
    max: Number
  },
  wind: {
    speed: Number,
    dir: String
  },
  gifURL: String
});


const Search = mongoose.model('Search', SearchSchema);

module.exports.Search = Search;
