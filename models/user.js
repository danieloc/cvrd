var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	teamId: String,
	firstName: String,
	lastName: String,
	username: String,
	email: String,
	userType: String,
	picture: String,
	addressOne: String,
	addressTwo: String,
	city: String,
	country: String,
	zip: String,
	phone: String,
	phoneType: String,
	active: {
        type: Number,
        default: 1
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);