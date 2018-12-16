const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    minlength: [4, 'Username Invalid. Username must be 4 or more characters.'],
    maxlength: [16, 'Username Invalid. Username must be 16 or less characters.'],
    required: [true, 'Username is required.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
    required: [true, 'Email is required.']
  },
  userImageURL: {
    type: String,
    validate: {
      validator: function(v) {
        return /[jpg|png|jpeg|JPG|PNG|JPEG]$/.test(v);
      },
      message: props => `Image file must be .jpg, .jpeg or .png`
    }
  },
  userCoordinates: {
    lat: {
      type: Number,
      min: [-90, 'Latitude must be greater than -90.'],
      max: [90, 'Latitude must be less than 90.']
    },
    lng: {
      type: Number,
      min: [-180, 'Longitude must be greater than -180.'],
      max: [180, 'Longitude must be less than 180.']
    }
  },
  userZoom: {
    type: Number,
    min: [3, 'Zoom must be greater than 3.'],
    max: [16, 'Zoom must be less than 16.']
  }
});

UserSchema.methods.verifyPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.hashPassword = function(password) {
	return bcrypt.hashSync(password, 10);
}

UserSchema.pre('save', function(next) {
	if (!this.password) {
		next();
	} else {
		this.password = this.hashPassword(this.password);
		next();
	}
});

const User = mongoose.model('User', UserSchema);

module.exports.User = User;
