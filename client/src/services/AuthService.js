import Api from "@/services/Api";

export default {
  register(credentials) {
    return Api().post("api/auth/register", credentials);
  },
  login(credentials) {
    return Api().post("api/auth/login", credentials);
  },
};
