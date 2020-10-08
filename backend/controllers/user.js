const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");

const User = require("../models/User");
const Course = require("../models/Transaction");
const auth = require("../auth");
const sms = require("../sms");

const clientId =
  "134832901843-u2qca0mvpa3npov3bsdn3s4vnu949amq.apps.googleusercontent.com";

module.exports.emailExists = (params) => {
  return User.find({ email: params.email }).then((result) => {
    return result.length > 0 ? true : false;
  });
};

module.exports.register = (params) => {
  let user = new User({
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    mobileNo: params.mobileNo,
    password: bcrypt.hashSync(params.password, 10),
    loginType: "email",
  });

  return user.save().then((user, err) => {
    return err ? false : true;
  });
};

module.exports.login = (params) => {
  return User.findOne({ email: params.email }).then((user) => {
    if (user === null) {
      return { error: "does-not-exist" };
    }
    if (user.loginType !== "email") {
      return { error: "login-type-error" };
    }

    const isPasswordMatched = bcrypt.compareSync(
      params.password,
      user.password
    );

    if (isPasswordMatched) {
      return { accessToken: auth.createAccessToken(user.toObject()) };
    } else {
      return { error: "incorrect-password" };
    }
  });
};

module.exports.get = (params) => {
  return User.findById(params.userId).then((user) => {
    user.password = undefined;
    return user;
  });
};

module.exports.updateDetails = (params) => {};

module.exports.changePassword = async (params) => {
  const id = params.id;

  if (params.newPassword !== params.confirmPassword) return false;

  const user = await User.updateOne(
    { _id: id },
    { password: await bcrypt.hash(params.newPassword, 10) }
  );

  return true;
};

module.exports.verifyGoogleTokenId = async (params) => {
  const client = new OAuth2Client(clientId);
  const data = await client.verifyIdToken({
    idToken: params,
    audience: clientId,
  });

  if (data.payload.email_verified === true) {
    const user = await User.findOne({ email: data.payload.email }).exec();

    if (user !== null) {
      if (user.loginType === "google") {
        return {
          accessToken: auth.createAccessToken(user.toObject()),
        };
      } else {
        return { error: "login-type-error" };
      }
    } else {
      const newUser = new User({
        firstName: data.payload.given_name,
        lastName: data.payload.family_name,
        email: data.payload.email,
        loginType: "google",
      });

      return newUser.save().then((user, err) => {
        return {
          accessToken: auth.createAccessToken(user.toObject()),
        };
      });
    }
  } else {
    return { error: "google-auth-error" };
  }
};
