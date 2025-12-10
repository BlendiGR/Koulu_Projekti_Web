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

  const softDeleteUser = async (userId) => {
    const token = localStorage.getItem("token");

    const res = await fetchData(`${API}/users/${userId}/soft-delete`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.success) return res;

    localStorage.removeItem("token");
    navigate("/login");

    return res;
  }

  // Admin crud
  const getUsers = async (params) => {
    const qs = new URLSearchParams(params).toString();
    const url = qs ? `${API}/users?${qs}` : `${API}/users`;
    const token = localStorage.getItem("token");
    const res = await fetchData(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.success) return res;

    return {success: true, data: res.data};
  };

  const createUserAdmin = async (userData, token) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetchData(`${API}/users`, {
        method: "POST",
        headers,
        body: JSON.stringify(userData),
    });

    if (!res.success) return res;

    return {success: true, data: res.data};
  };

  const updateUserAdmin = async (userId, userData, token) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetchData(`${API}/users/${userId}/admin`, {
      method: "PUT",
      headers,
      body: JSON.stringify(userData),
    });

    if (!res.success) return res;

    return { success: true, data: res.data };
  };

  const deleteUser = async (userId) => {
    const headers = {};
    const token = localStorage.getItem("token");
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetchData(`${API}/users/${userId}`, {
      method: "DELETE",
      headers,
    });

    if (!res.success) return res;

    return { success: true, data: res.data };
  }

  return { postLogin, postUser, getUserByToken, updateUser, softDeleteUser, getUserHasReviewed, getUsers, createUserAdmin, updateUserAdmin, deleteUser };
};