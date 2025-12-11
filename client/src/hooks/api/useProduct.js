import { fetchData } from "../../utils/fetchData";

const API = "/api/v1";

export const useProduct = () => {
  const getProducts = async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const url = qs ? `${API}/products?${qs}` : `${API}/products`;
    const res = await fetchData(url);

    if (!res.success) return res;

    // console.log({ success: true, res.data });

    return { success: true, data: res.data };
  };

  const createProduct = async (productData, token) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetchData(`${API}/products`, {
      method: "POST",
      headers,
      body: JSON.stringify(productData),
    });

    if (!res.success) return res;

    return { success: true, data: res.data };
  };

  const updateProduct = async (productId, productData, token) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetchData(`${API}/products/${productId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(productData),
    });

    if (!res.success) return res;

    return { success: true, data: res.data };
  };

  const deleteProduct = async (productId, token) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetchData(`${API}/products/${productId}`, {
      method: "DELETE",
      headers,
    });

    if (!res.success) return res;

    return { success: true, data: res.data };
  };

  return { getProducts, createProduct, updateProduct, deleteProduct };
};