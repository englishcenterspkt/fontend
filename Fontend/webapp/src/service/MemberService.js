import axios from "axios";

const INSTRUCTOR_API_URL = `http://localhost:8080/member`;
class MemberService {
  getMembers() {
    return axios.get(`${INSTRUCTOR_API_URL}/get_all`, {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiNjEzMmVkNzU0M2NlZTkyOTdhNjBlMWRiIiwicm9sZSI6InN0dWRlbnQiLCJjcmVhdGVfZGF0ZSI6MTYzMDg1MTMyOTg5NywiZXhwaXJhdGlvbl9kYXRlIjoxNjMwODUzMTI5ODk3fQ.SB6y9xMFLsFBWE_w1ZxMkQeqnvVEoh4DQA979N5w9QxTES5xsu58txP8tht_OnBfzHnrgw0rJGMHgfB2wuKONw'
    });
  }

  addMember() {
    return axios.get(`${INSTRUCTOR_API_URL}/add`);
  }
}

export default new MemberService();
