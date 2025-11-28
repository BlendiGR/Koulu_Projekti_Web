export const getNavLinks = (user, t) => {
  // Jos käyttäjä on admin, näytä vain admin-linkit
  if (user?.role === "ADMIN") {
    return [
      // Admin navigaatiolinkit
      // { label: t("nav.dashboard"), to: "/admin" },
      // { label: t("nav.products"), to: "/admin/products" },
      // { label: t("nav.orders"), to: "/admin/orders" },
    ];
  }

  // Normi käyttäjän navigaatio
  return [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.menu"), to: "/menu" },
    { label: t("nav.visit"), to: "/visit" },
    ...(user
      ? [
          { label: t("nav.profile"), to: "/profile" },
          { label: t("nav.orders"), to: "/orders" },
        ]
      : []),
  ];
};
