import axios from "axios";

const INSTRUCTOR_API_URL = `http://localhost:8080/auth`;
export function login(username, password) {
    return axios.post(`${INSTRUCTOR_API_URL}/login`, {
        username: username,
        password: password,
    });
}
