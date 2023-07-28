import axios from "axios";

export async function fetch() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const res = await axios.post("http://localhost:8080/api/jwt", {
      accessToken: accessToken,
    });
    return 'res.data';
  }
  return;
}
