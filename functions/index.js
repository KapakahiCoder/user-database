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

// Send email to registered users
exports.sendMail = functions.firestore
    .document("users/{userId}")
    .onCreate((snapshot, context) => {
      const user = snapshot.data();
      const firstName = user.firstName;
      const lastName = user.lastName;
      const email = user.email;
      const age = user.age;
      const address = user.address;

      admin.firestore().collection("mail").add({
        to: email,
        message: {
          subject: "Welcome new user!",
          text: `Hello ${firstName}, \n  
          You have just been added to our user database. Here is the 
          information that has been recorded:  

          Name:      ${firstName} ${lastName} \n
          Age:       ${age} \n
          Email:     ${email} \n
          Address:   ${address.street} \n
                         ${address.city} \n
                         ${address.state} \n
                         ${address.zipCode}`,
        },
      }).then(() => console.log("Queued email for delivery"));
    });
