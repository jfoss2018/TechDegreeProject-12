const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SearchSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'User required to perform a search.']
  },
  postedOn: {
    type: Date,
    default: function() {
      let newDate = new Date();
      let offSet = newDate.getTimezoneOffset() * 60000;
      let localDate = newDate - offSet;
      return localDate;
    },
    required: [true, 'Date required for search.']
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
