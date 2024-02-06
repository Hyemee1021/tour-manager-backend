import SessionSchema from "./SessionSchema.js";

//Create
export const createSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};

//read @filter must be an object
export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};

//delete
export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};
