import { redirect } from "react-router-dom";

// Käytä middlewarena suojaamaan reittejä, jotka vaativat
// käyttäjän olevan kirjautuneena sisään.

export async function requireAuth() {
  // TODO: laita tähän backend kutsu tokenin validointiin.

  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  return null;
}
