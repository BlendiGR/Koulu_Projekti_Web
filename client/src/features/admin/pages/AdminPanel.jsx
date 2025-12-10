import Products from "../components/Products.jsx";
import Reviews from "../components/Reviews.jsx";
import Orders from "../components/Orders.jsx";
import Users from "../components/Users.jsx";
import {useLang} from "../../../hooks/useLang.js";
import {useState} from "react";


const AdminPanel = () => {
    const {t} = useLang();
    const [selected, setSelected] = useState("products");

    const adminNav = [
        {id: "products", label: t("admin.products.title")},
        {id: "orders", label: t("admin.orders.title")},
        {id: "users", label: t("admin.users.title")},
        {id: "reviews", label: t("admin.reviews.title")},
    ]

    const renderSelected = () => {
        switch (selected) {
            case "orders":
                return <Orders />;
            case "users":
                return <Users />;
            case "reviews":
                return <Reviews />;
            case "products":
            default:
                return <Products />;
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold p-6 text-center">{t("admin.heading")}</h1>

            <div className="flex flex-col gap-4">
                <nav>
                    <ul className="flex flex-col md:flex-row gap-2 space-y-1">
                        {adminNav.map((link) => (
                            <li key={link.id} className="flex-1">
                                <button
                                    onClick={() => setSelected(link.id)}
                                    className={`cursor-pointer w-full text-left uppercase font-semibold md:text-center px-3 py-2 rounded text-md transition-colors ${
                                        selected === link.id
                                            ? "bg-blue-600 text-white"
                                            : "hover:bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {link.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <main>{renderSelected()}</main>
            </div>
        </div>
    );
};

export default AdminPanel;