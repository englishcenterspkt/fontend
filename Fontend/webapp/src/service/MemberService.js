import axios from "axios";

const INSTRUCTOR_API_URL = `http://localhost:8080/member`;
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiNjEzMmVkNzU0M2NlZTkyOTdhNjBlMWRiIiwicm9sZSI6InN0dWRlbnQiLCJjcmVhdGVfZGF0ZSI6MTYzMTIwMzgyMjI1MCwiZXhwaXJhdGlvbl9kYXRlIjoxNjMxMjA1NjIyMjUwfQ.DWEYXEmi_hWDSphRtUS_sdx-vyH-9hPxvynvxCorUwLX5NL7O2N2dt9D3ZyuoY0Ud1PcZZ5e9Ee9kShL641lWw';
class MemberService {
  getMembers() {
    return axios.get(`${INSTRUCTOR_API_URL}/get_all`);
  }

  addMember() {
    return axios.get(`${INSTRUCTOR_API_URL}/add`);
  }
}

export default new MemberService();
