var app = new Vue({
  el: "#app",
  data: {
    users: []
  },
  mounted() {
    const ref = firebase.firestore().collection("users");
    ref.onSnapshot((snapshot) => {
      let users = [];
      snapshot.forEach(doc => {
        users.push({...doc.data(), id: doc.id})
      });
      this.users = users;
    })
  }
});
