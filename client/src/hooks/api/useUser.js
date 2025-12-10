import { fetchData } from "../../utils/fetchData";
import { useNavigate } from "react-router";

const API = "/api/v1";

export const useUser = () => {
  const navigate = useNavigate();

  const postLogin = async (inputs) => {
    return await fetchData(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });
  };

  const postUser = async (inputs) => {
    return await fetchData(`${API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });
  };

  const getUserHasReviewed = async (userId) => {
    const token = localStorage.getItem("token");
    return await fetchData(`${API}/users/reviews/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const getUserByToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        success: false,
        error: { message: "Unauthorized", code: "NO_TOKEN" },
      };
    }

    const res = await fetchData(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.success) {
      localStorage.removeItem("token");
      navigate("/login");
    }

    return res;
  };

  // 🔹 UUSI: käyttäjän päivitys (username / password / email ...)
  const updateUser = async (userId, inputs) => {
    const token = localStorage.getItem("token");

    return await fetchData(`${API}/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });
  };

  return { postLogin, postUser, getUserByToken, updateUser };
};
