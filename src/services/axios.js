import axios from "axios";
import config from "../config";
import useUser from "../hooks/useUser";

const { user } = useUser();

let headers = {};

if (user != null) {
  headers = {
    Authorization: `Bearer ${user.token}`,
  };
}

export default axios.create({
  baseURL: config.BACKEND_URL,
  headers,
});
