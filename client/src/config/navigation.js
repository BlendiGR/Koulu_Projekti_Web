export const getNavLinks = (user, t) => {
  // Normi käyttäjän navigaatio
  return [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.menu"), to: "/menu" },
    { label: t("nav.visit"), to: "/visit" },
    ...(user
      ? [
          { label: t("nav.profile"), to: "/profile" },
        ]
      : []),
    ...(user && user.role === "ADMIN" ? [
      { label: t("nav.admin"), to: "/admin" },
    ] : []),
  ];
};