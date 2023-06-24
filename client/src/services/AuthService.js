import Api from "@/services/Api";

export default {
  register(credentials) {
    return Api().post("register", credentials);
  },
};

// AuthServece.register({
//   email: "jdncjdscn@sjkdcb.com",
//   password: "123",
// });
