import axios from "axios";

const INSTRUCTOR_API_URL = `http://localhost:8080/auth`;

class AuthService {
  getMembers(username, password) {
    return axios.get(`${INSTRUCTOR_API_URL}/login`, {
      Headers: {
        username: username,
        password: password,
      },
    });
  }
}

export default new AuthService();
