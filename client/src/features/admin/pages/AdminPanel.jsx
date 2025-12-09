import { useEffect, useState } from "react";
import { useProduct } from "/src/hooks/apiHooks.js";

const AdminPanel = () => {
  const { getProducts, createProduct } = useProduct();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "FOOD",
    cost: "",
    imageUrl: "",
    diets: "[]",
    ingredients: "[]",
    isActive: true,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const res = await getProducts({ take: 100 });
      setLoading(false);
      if (!mounted) return;
      if (res.success) {
        let payload = res.data;
        if (!Array.isArray(payload)) {
          if (payload && Array.isArray(payload.data)) payload = payload.data;
          else payload = [];
        }
        setProducts(payload);
      } else {
        setError(res.error?.message || "Failed to fetch products");
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type: t, checked } = e.target;
    setForm((s) => ({ ...s, [name]: t === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic client-side parsing and validation
    const payload = {
      name: form.name,
      type: form.type,
      cost: form.cost ? Number(form.cost) : undefined,
      imageUrl: form.imageUrl || undefined,
      diets: form.diets ? JSON.parse(form.diets) : undefined,
      ingredients: form.ingredients ? JSON.parse(form.ingredients) : undefined,
      isActive: form.isActive,
    };

    // remove undefined
    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    const token = localStorage.getItem("token");
    const res = await createProduct(payload, token);
    if (res.success) {
      setSuccess("Product created");
      setForm({ name: "", type: "FOOD", cost: "", imageUrl: "", diets: "[]", ingredients: "[]", isActive: true });
      // refresh list
      const refresh = await getProducts({ take: 100 });
      if (refresh.success) {
        let payload = refresh.data;
        if (!Array.isArray(payload)) {
          if (payload && Array.isArray(payload.data)) payload = payload.data;
          else payload = [];
        }
        setProducts(payload);
      }
    } else {
      setError(res.error?.message || "Failed to create product");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Admin — Products</h1>

      <section className="mb-6">
        <h2 className="text-xl mb-2">Create product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded" />

          <select name="type" value={form.type} onChange={handleChange} className="p-2 border rounded">
            <option value="FOOD">FOOD</option>
            <option value="DRINK">DRINK</option>
            <option value="SIDE">SIDE</option>
          </select>

          <input name="cost" value={form.cost} onChange={handleChange} placeholder="Cost (e.g. 4.50)" className="p-2 border rounded" />

          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="p-2 border rounded" />

          <textarea name="diets" value={form.diets} onChange={handleChange} placeholder='Diets (JSON array, e.g. ["vegan"])' className="p-2 border rounded col-span-1 md:col-span-2" />

          <textarea name="ingredients" value={form.ingredients} onChange={handleChange} placeholder='Ingredients (JSON array)' className="p-2 border rounded col-span-1 md:col-span-2" />

          <label className="flex items-center gap-2">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} /> Active
          </label>

          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
          </div>
        </form>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}
      </section>

      <section>
        <h2 className="text-xl mb-2">Products ({products.length})</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.isArray(products) ? (
              products.map((p) => (
                <div key={p.productId} className="border rounded p-3">
                  <h3 className="font-bold">{p.name}</h3>
                  <p>Type: {p.type}</p>
                  <p>Cost: {p.cost}</p>
                  <p>Active: {p.isActive ? "Yes" : "No"}</p>
                  {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-32 object-cover mt-2" />}
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;