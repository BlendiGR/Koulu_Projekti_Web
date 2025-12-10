import { fetchData } from "../../utils/fetchData";

const API = "/api/v1";

export const useProduct = () => {
  const getProducts = async (params = {}) => {
    // build query string
    const qs = new URLSearchParams(params).toString();
    const url = qs ? `${API}/products?${qs}` : `${API}/products`;
    const res = await fetchData(url);
    if (!res.success) return res;
    // unwrap server envelope: server returns { success: true, data: <payload> }
    const payload = res.data && res.data !== undefined ? res.data : res.data;
    return { success: true, data: payload };
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
    const payload = res.data && res.data !== undefined ? res.data : res.data;
    return { success: true, data: payload };
  };
  return { getProducts, createProduct };
};
