import axios from "axios";

const INSTRUCTOR_API_URL = `http://localhost:8080/member`;

class MemberService {
  getMembers() {
    return axios.get(`${INSTRUCTOR_API_URL}/get_all`);
  }

  addMember(id) {
    return axios.get(`${INSTRUCTOR_API_URL}/add`);
  }
}

export default new MemberService();
