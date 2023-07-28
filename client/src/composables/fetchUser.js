import axios from "axios";

export default fetch = async (token) => {
  if (token) {
    const res = await axios.post("http://localhost:8080/api/jwt", {
      accessToken: token,
    });
    return res.data;
  }
  return;
};
