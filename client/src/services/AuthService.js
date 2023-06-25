import Api from "@/services/Api";

export default {
  register(credentials) {
    return Api().get("api/user", credentials);
  },
};

// AuthServece.register({
//   email: "jdncjdscn@sjkdcb.com",
//   password: "123",
// });
