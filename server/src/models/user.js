const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const generatePassword = require("../helpers/generatePassword");
const bcrypt = require("bcryptjs");


var userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is requires"]
    },
    picture: {
      type: String
    },
    email: {
      type: String,
      // unique: true,
      lowercase: true,
      validate: {
        validator(val) {
          var emailRegex = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
          if(!emailRegex.test(val)){
            throw new Error('your email is not valid');
          }
        }
      },
      required: [true, "email is required"]
    },
    password: {
      type: String,
      required: [true, "password is requires"],
      minlength: [6, "password min 6 character"]
    },
  },
  {
    timestamps: true
  }
);

// userSchema.post("validate", doc => {
//   doc.password = bcrypt.hashSync(
//     doc.password,
//     Number(process.env.SALT_PASSWORD)
//   );
// });

// userSchema.post("save", function(user) {
//   generatePassword(this.email, this.password).then(function(newPassword) {
//     User.update({ _id: user._id }, { password: newPassword })
//       .then(function() {})
//       .catch(function() {});
//   });
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
