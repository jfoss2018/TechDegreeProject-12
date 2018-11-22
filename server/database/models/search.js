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
  city: {
    type: String,
    required: true,
  },
  coordinates: {
    {
      lat: Number
    },
    {
      lng: Number
    }
  }
});


const Search = mongoose.model('Search', SearchSchema);

module.exports.Search = Search;
