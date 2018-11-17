const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.checkPassword = function(password) {
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
