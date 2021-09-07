import axios from "axios";

const INSTRUCTOR_API_URL = `http://localhost:8080/member`;
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiNjEzMmVkNzU0M2NlZTkyOTdhNjBlMWRiIiwicm9sZSI6InN0dWRlbnQiLCJjcmVhdGVfZGF0ZSI6MTYzMDk5Nzk4ODYwNywiZXhwaXJhdGlvbl9kYXRlIjoxNjMwOTk5Nzg4NjA3fQ.Oemc8y43IbUo6DEZI0eWY5a-WMQaJt_DLRrog0Lk8MWBVmGxJc9ohY3c5DZE7F33MWdGbpCX2ZI8FsFy9yYmbg';
class MemberService {
  getMembers() {
    return axios.get(`${INSTRUCTOR_API_URL}/get_all`, {headers: {
      'Authorization': `Bearer ${token}`
    }});
  }

  addMember() {
    return axios.get(`${INSTRUCTOR_API_URL}/add`);
  }
}

export default new MemberService();
