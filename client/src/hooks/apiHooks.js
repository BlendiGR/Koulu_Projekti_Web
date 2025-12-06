import { fetchData } from "/src/utils/fetchData";
import { useNavigate } from "react-router";

const API = "/api/v1";

// --------------------------
// USER HOOK
// --------------------------
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
    return await fetchData(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
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

  return { postLogin, postUser, getUserByToken };
};
// --------------------------
// FILE HOOK
// --------------------------
export const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetchData(`${API}/media/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return res;
  };

  return { postFile };
};
// --------------------------
// ORDER HOOK
// --------------------------
export const useOrder = () => {
  const token = localStorage.getItem("token");
  const postOrder = async (orderData) => {
    const res = await fetchData(`${API}/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    return res;
  };

  return { postOrder };
};