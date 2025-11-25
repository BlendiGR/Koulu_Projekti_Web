export const getNavLinks = (user) => [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Visit", to: "/visit" },
  ...(user
    ? [
        { label: "Profile", to: "/profile" },
        { label: "Orders", to: "/orders" },
      ]
    : []),
];
