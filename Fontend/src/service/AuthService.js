import axios from "axios";

const INSTRUCTOR_API_URL = `http://localhost:8080/auth`;

class AuthService {
  login(username, password) {
    return axios.post(`${INSTRUCTOR_API_URL}/login`, {
      username: username,
      password: password,
    });
  }
}

export default new AuthService();
