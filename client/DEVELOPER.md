
## 1. Projektin Rakenne (Feature-Based)

Projekti noudattaa "feature-based" -rakennetta, jossa koodi on organisoitu ominaisuuksien (features) mukaan sen sijaan, että se olisi jaettu teknisiin kerroksiin (kuten pelkät komponentit tai sivut).

### Hakemistorakenne (`client/src/`)

- **`features/`**: Sisältää sovelluksen päätoiminnallisuudet. Jokaisella featurella on oma kansionsa (esim. `auth`, `cart`, `menu`), joka sisältää kaiken kyseiseen ominaisuuteen liittyvän:
    - `components/`: Feature-spesifiset komponentit.
    - `hooks/`: Feature-spesifiset hookit (esim. `useAuth`, `useCart`).
    - `context/`: Feature-spesifiset kontekstit.
    - `pages/`: Featureen liittyvät sivut.
- **`components/`**: Jaetut komponentit, jotka eivät liity tiettyyn featureen.
    - `common/ui/`: Yleiskäyttöiset UI-komponentit (painikkeet, kortit, lomakkeet).
    - `layout/`: Sivuston asetteluun liittyvät komponentit (Navbar, Footer).
- **`hooks/`**: Yleiskäyttöiset hookit (esim. `useLang`, `apiHooks`).
- **`context/`**: Globaalit kontekstit (esim. `LanguageContext`).
- **`schemas/`**: Zod-validointischemat.
- **`translations/`**: Käännöstiedostot (`fi.json`, `en.json`).
- **`utils/`**: Aputoiminnot (esim. `fetchData.js`).

---

## 2. Tietojen Haku (Data Fetching)

Käytämme keskitettyä `fetchData`-apufunktiota ja `apiHooks`-tiedostoa API-kutsujen tekemiseen.

### `fetchData.js`
Tämä funktio (`src/utils/fetchData.js`) hoitaa varsinaiset HTTP-pyynnöt. Se palauttaa aina standardoidun vastauksen:

```javascript
// Onnistunut haku
{
  success: true,
  data: { ... } // Backendin palauttama data
}

// Epäonnistunut haku
{
  success: false,
  error: {
    message: "Virheviesti",
    code: "ERROR_CODE"
  }
}
```

### `apiHooks.js`
Tämä tiedosto (`src/hooks/apiHooks.js`) sisältää custom hookeja, jotka käyttävät `fetchData`:a. Esimerkiksi `useUser` sisältää funktiot kirjautumiseen ja rekisteröitymiseen.

**Käyttöesimerkki:**

```javascript
import { useUser } from "/src/hooks/apiHooks";

const MyComponent = () => {
  const { postLogin } = useUser();

  const handleLogin = async (credentials) => {
    const res = await postLogin(credentials);

    if (res.success) {
      console.log("Kirjautuminen onnistui:", res.data);
    } else {
      console.error("Virhe:", res.error.message);
    }
  };
};
```

---

## 3. Lomakkeet ja Validointi (Forms & Validation)

Käytämme lomakkeiden hallintaan **React Hook Form** -kirjastoa ja validointiin **Zod**-kirjastoa.

### Miten luoda uusi lomake:

1.  **Luo Zod-schema**: Määrittele validointisäännöt `src/schemas/` -kansioon.

    ```javascript
    // src/schemas/exampleSchema.js
    import { z } from "zod";

    export const exampleSchema = (t) => z.object({
      email: z.string().email(t("validation.email_invalid")),
      age: z.number().min(18, t("validation.age_min")),
    });
    ```

2.  **Käytä React Hook Formia komponentissa**:

    ```javascript
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import { exampleSchema } from "/src/schemas/exampleSchema";
    import { useLang } from "/src/hooks/useLang";

    const ExampleForm = () => {
      const { t } = useLang();
      const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(exampleSchema(t))
      });

      const onSubmit = (data) => {
        console.log(data);
      };

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
          
          <button type="submit">Lähetä</button>
        </form>
      );
    };
    ```

---

## 4. Käännökset (Internationalization)

Sovellus tukee monikielisyyttä `LanguageContext`:n avulla.

- **Käännöstiedostot**: Sijaitsevat `src/translations/` (esim. `fi.json`, `en.json`).
- **Käyttö**: Käytä `useLang`-hookia saadaksesi `t`-funktion.

**Esimerkki:**

```javascript
import { useLang } from "/src/hooks/useLang";

const Welcome = () => {
  const { t } = useLang();
  return <h1>{t("home.welcome_message")}</h1>;
};
```

**Uuden käännöksen lisääminen:**
1. Avaa `src/translations/fi.json` ja lisää uusi avain-arvo -pari.
2. Tee sama `src/translations/en.json` -tiedostolle.

---

## 5. Backend Integraatio

Backend palauttaa vastaukset JSON-muodossa. `fetchData` käsittelee virheet automaattisesti, mutta on tärkeää tarkistaa `res.success` frontendin puolella.

- **Onnistunut vastaus**: Backend palauttaa HTTP 200-299 koodin.
- **Virhe**: Backend palauttaa virhekoodin (esim. 400, 401, 500) ja JSON-objektin, jossa on `message`.

---




## 6. Reititys (Routing)

Sovellus käyttää **React Router** -kirjastoa reititykseen. Reitit on määritelty `src/App.jsx` -tiedostossa.

- **`BrowserRouter`**: Käärii koko sovelluksen.
- **`Routes` & `Route`**: Määrittelevät yksittäiset reitit ja niiden komponentit.
- **Layoutit**: Käytämme sisäkkäisiä reittejä (nested routes) layoutien hallintaan.
    - `MainLayout`: Pääasiallinen ulkoasu (Navbar + Footer).
    - `AdminLayout`: Ylläpitäjän ulkoasu.

**Esimerkki reitityksestä (`App.jsx`):**

```javascript
<Routes>
  {/* Julkiset reitit MainLayoutin sisällä */}
  <Route element={<MainLayout />}>
    <Route index element={<Home />} />
    <Route path="login" element={<Login />} />
    
    {/* Suojatut reitit */}
    <Route path="profile" element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    } />
  </Route>

  {/* Admin reitit */}
  <Route path="admin" element={
    <ProtectedRouteAdmin>
      <AdminLayout />
    </ProtectedRouteAdmin>
  }>
    {/* Admin alasivut */}
  </Route>
</Routes>
```

---

## 7. Autentikaatio ja Suojatut Reitit

Autentikaatio on toteutettu `AuthContext`:n avulla, joka on hyvin samankaltainen kuin koulun React-tehtävissä (WSK).

### `AuthContext.jsx`
- Hallinnoi käyttäjän tilaa (`user`) ja tokenia.
- Tarjoaa funktiot: `handleLogin`, `handleLogout`, `handleAutoLogin`.
- Tallentaa tokenin `localStorage`:en.

### Suojatut Komponentit
Käytämme wrapper-komponentteja suojaamaan reittejä, jotka vaativat kirjautumisen tai admin-oikeudet.

1.  **`ProtectedRoute`**:
    - Tarkistaa, onko käyttäjä kirjautunut (`user` on olemassa).
    - Jos ei, ohjaa käyttäjän `/login` -sivulle.
    
2.  **`ProtectedRouteAdmin`**:
    - Tarkistaa, onko käyttäjä kirjautunut **JA** onko käyttäjän rooli `ADMIN`.
    - Jos käyttäjä ei ole admin, ohjaa etusivulle (`/`).

---

## 8. Muuta Huomioitavaa

- **Absoluuttiset Importit**: Käytä aina `/src` -alkuisia polkuja (esim. `import ... from "/src/..."`). Tämä selkeyttää koodia ja estää `../../..` -helvetin.
- **Tiedostojen Sijainti**: Mieti aina, kuuluuko komponentti tiettyyn featureen (esim. `features/cart/`) vai onko se yleiskäyttöinen (`components/common/`).

---

