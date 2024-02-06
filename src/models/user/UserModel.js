import UserSchema from "./UserSchema.js";

//insert new user
export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};
export const updateUser = (filter, update) => {
  return UserSchema.findOneAndUpdate(filter, update, { new: true });
};

export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};
//get user by filter
export const getAUser = (filter) => {
  return UserSchema.findOne(filter);
};

export const getAdminPasswordById = (_id) => {
  return UserSchema.findById(_id, { password: 1 });
};

// add refreshJWT
export const updateRefreshJWT = async (email, refreshJWT) => {
  return await UserSchema.findOneAndUpdate({ email }, { refreshJWT });
};
