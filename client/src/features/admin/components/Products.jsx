import {useState} from "react";
import { useProduct, useFile } from "../../../hooks/apiHooks.js";
import productSchema from "../../../schemas/productSchema";
import RecordContainer from "./RecordContainer.jsx";
import RecordTable from "./RecordTable.jsx";
import { useLang } from "../../../hooks/useLang.js";
import TextArea from "./formFields/TextArea.jsx";
import InputField from "./formFields/InputField.jsx";
import SelectField from "./formFields/SelectField.jsx";
import Checkbox from "./formFields/Checkbox.jsx";
import ImageField from "./formFields/ImageField.jsx";
import Submit from "./formFields/Submit.jsx";
import SortBar from "./SortBar.jsx";

const Products = () => {
    const { getProducts, createProduct, updateProduct, deleteProduct } = useProduct();
    const { postFile } = useFile();
    const { t } = useLang();

    const [sortBy, setSortBy] = useState("");
    const [sortDir, setSortDir] = useState("asc");

    const productTypes = [
        { value: "FOOD", label: t("admin.products.typeFood") },
        { value: "DRINK", label: t("admin.products.typeDrink") },
        { value: "SIDE", label: t("admin.products.typeSide") },
    ];

    const fields = [
        { name: "name", label: t("admin.products.name"), type: "input" },
        { name: "type", label: t("admin.products.type"), type: "select", options: productTypes },
        { name: "cost", label: t("admin.products.cost"), type: "input", placeholder: t("admin.products.costGuide") },
        { name: "imageUrl", label: t("admin.products.image"), type: "image" },
        { name: "diets", label: t("admin.products.diets"), type: "textarea", placeholder: t("admin.products.dietsGuide") },
        { name: "ingredients", label: t("admin.products.ingredients"), type: "textarea", placeholder: t("admin.products.ingredientsGuide") },
        { name: "isActive", label: t("admin.products.active"), type: "checkbox" },
    ];

    const createDefaults = {
        name: "",
        type: "FOOD",
        cost: "",
        imageUrl: "",
        diets: "",
        ingredients: "",
        isActive: true,
    };

  return (
      <RecordContainer
          title={t("admin.products.title")}
          getItems={getProducts}
          createItem={(values, token) => createProduct(values, token)}
          updateItem={(id, values, token) => updateProduct(id, values, token)}
          deleteItem={(id, token) => deleteProduct(id, token)}
          postFile={postFile}
          createSchema={productSchema}
          createDefaultValues={createDefaults}
          renderCreate={({ register, handleCreate, handleFileChange, uploading, previewUrl, errors, submitting, success, error, reset }) => (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">{t("admin.products.addProduct")}</h3>
                <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InputField name="name" register={register} error={errors.name} label={t("admin.products.name")} />
                  <SelectField name="type" register={register} options={productTypes} error={errors.type} label={t("admin.products.type")} />
                  <InputField name="cost" register={register} error={errors.cost} label={t("admin.products.cost")} placeholder={t("admin.products.costGuide")} />
                  <ImageField name="imageUrl" register={register} label={t("admin.products.image")} error={errors.imageUrl} onFileChange={handleFileChange} uploading={uploading} previewUrl={previewUrl} />
                  <TextArea name="diets" register={register} error={errors.diets} label={t("admin.products.diets")} placeholder={t("admin.products.dietsGuide")} />
                  <TextArea name="ingredients" register={register} error={errors.ingredients} label={t("admin.products.ingredients")} placeholder={t("admin.products.ingredientsGuide")} />
                  <Checkbox name="isActive" register={register} label={t("admin.products.active")} />
                  <Submit disabled={uploading || submitting} text={uploading ? t("admin.common.loading") : submitting ? t("admin.common.creating") : t("admin.common.create")} />
                </form>
                {error && <p className="text-red-600 mt-2">{error}</p>}
                {success && <p className="text-green-600 mt-2">{success}</p>}
              </div>
          )}
          renderList={({ items, loading, onUpdate, onDelete, fetchPage, pageSize, setPage }) => (
              <>
                <h3 className="font-semibold mb-2">{t("admin.common.list")}</h3>

                  <SortBar
                      options={[
                          { value: "name", label: t("admin.products.name") },
                          { value: "cost", label: t("admin.products.cost") },
                          { value: "type", label: t("admin.products.type") },
                          // add other sortable fields as desired
                      ]}
                      value={{ sortBy, sortDir }}
                      onChange={({ sortBy: newSortBy, sortDir: newSortDir }) => {
                          setSortBy(newSortBy || "");
                          setSortDir(newSortDir || "asc");
                          // trigger a fresh fetch for page 1 with sort params
                          setPage(1);
                          fetchPage(1, pageSize, { sortBy: newSortBy, sortDir: newSortDir });
                      }}
                  />

                {loading ? (
                    <p>{t("admin.common.loading")}</p>
                ) : (
                    <RecordTable
                        items={items}
                        fields={fields}
                        idKey="productId"
                        resolver={productSchema}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        postFile={postFile}
                    />
                )}
                {/* Pagination component stays in Products or can be passed here as needed */}
              </>
          )}
      />
  );
};

export default Products;