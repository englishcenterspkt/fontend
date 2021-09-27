import axios from "axios";
import Cookies from "universal-cookie";

const INSTRUCTOR_API_URL = `http://localhost:8080/member`;
const cookies = new Cookies();
class MemberService {
  getMembers(page, size) {
    return axios({
      method: "POST",
      url: `${INSTRUCTOR_API_URL}/get_list?page=` + page + `&size=` + size,
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });
  }

  addMember(name, email, password, avatar) {
    return axios.post(`${INSTRUCTOR_API_URL}/add`, {
      name: name,
      email: email,
      password: password,
      avatar: avatar,
    });
  }

  updateMember(id, name) {
    return axios({
      method: "PUT",
      url: `${INSTRUCTOR_API_URL}/update/`,
      data: {
        id: id,
        name: name,
      },
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });
  }
}

export default new MemberService();
