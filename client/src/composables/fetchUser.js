import axios from "axios";

export default async function fetch(accessToken) {
  if (accessToken) {
    const res = await axios.post("http://localhost:8080/api/jwt", {
      accessToken: accessToken,
    });
    return res.data;
  }
  return;
}