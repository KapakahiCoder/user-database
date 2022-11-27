const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// http callable function to add a user
exports.addUser = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be authenticated to add a user"
    );
  }
  return admin.firestore().collection("users").add({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    age: data.age,
    address: {street: data.street,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode},
  });
});
