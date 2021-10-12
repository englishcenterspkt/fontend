import axios from "axios";
import Cookies from "universal-cookie";

const INSTRUCTOR_API_URL = `http://localhost:8080/member`;
const cookies = new Cookies();
class MemberService {
    getMembers(page, size, field, is_asc, types, keyword, from_date, to_date) {
        return axios({
            method: "POST",
            url: `${INSTRUCTOR_API_URL}/get_list?page=` + page + `&size=` + size,
            data: {
                field_sort: field,
                is_acs: is_asc,
                types: types,
                keyword: keyword,
                form_date: from_date,
                to_date: to_date
            },
            headers: {
                Authorization: `Bearer ${cookies.get("token")}`,
            },
        });
    }

    addMember(name, email, password) {
        return axios.post(`${INSTRUCTOR_API_URL}/add`, {
            name: name,
            email: email,
            password: password,
        });
    }

    updateMember(id, name, avatar) {
        return axios({
            method: "PUT",
            url: `${INSTRUCTOR_API_URL}/update/`,
            data: {
                id: id,
                name: name,
                avatar: avatar,
            },
            headers: {
                Authorization: `Bearer ${cookies.get("token")}`,
            },
        });
    }
}

export default new MemberService();
