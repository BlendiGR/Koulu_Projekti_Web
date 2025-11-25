export const getNavLinks = (user, t) => [
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
