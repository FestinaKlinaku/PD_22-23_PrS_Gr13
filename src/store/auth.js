import axios from "axios";
const authModule = {
  namespaced: true,
  state: {
    loggedInUser: null,
  },
  getters: {
    isLoggedIn: (state) => {
      return state.loggedInUser !== null;
    },
  },
  mutations: {
    SET_LOGGED_IN_USER(state, user) {
      state.loggedInUser = user;
    },
  },
  actions: {
    authenticateUser({ commit }, credentials) {
      // Read the users.json file
      axios
        .get("http://localhost:3000/users.json")
        .then((response) => {
          const users = response.data.userList;

          // Find the user with matching email and password
          const user = users.find(
            (user) =>
              user.email === credentials.email &&
              user.password === credentials.password
          );

          if (user) {
            // User is found, update the loggedInUser in Vuex store
            commit("SET_LOGGED_IN_USER", user);
          } else {
            // Invalid email or password, handle authentication error
            console.error("Invalid email or password");
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle error while reading users.json
        });
    },
  },
};

export default authModule;
