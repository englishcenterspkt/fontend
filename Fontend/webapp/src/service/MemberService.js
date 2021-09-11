import axios from "axios";
import Cookies from 'universal-cookie';

const INSTRUCTOR_API_URL = `http://localhost:8080/member`;
const cookies = new Cookies();
class MemberService {

  getMembers() {
    return axios.get(`${INSTRUCTOR_API_URL}/get_all`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });
  }

  addMember() {
    return axios.get(`${INSTRUCTOR_API_URL}/add`);
  }
}

export default new MemberService();
