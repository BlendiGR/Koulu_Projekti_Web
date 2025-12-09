import { fetchData } from "../../utils/fetchData";

const API = "/api/v1";

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
