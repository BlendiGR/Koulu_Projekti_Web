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

  const createUser = async (userData, token) => {
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

  const updateUser = async (userId, userData, token) => {
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

  return { postLogin, postUser, getUserByToken, softDeleteUser, getUsers, createUser, updateUser, deleteUser };
};