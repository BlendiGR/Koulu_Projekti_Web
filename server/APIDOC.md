# 📚 API Dokumentaatio

Tämä tiedosto sisältää yksityiskohtaisen kuvauksen palvelimen API-rajapinnoista.
Kaikki reitit alkavat etuliitteellä `/api/v1`.

## 🔐 Tunnistautuminen (Auth)

### Kirjaudu sisään
`POST /auth/login`

Kirjaa käyttäjän sisään ja palauttaa JWT-tokenin.

**Pyyntö (Body):**
```json
{
  "email": "user@example.com", // Pakollinen, validi sähköposti
  "password": "password123"    // Pakollinen, min 8 merkkiä
}
```

**Vastaus (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR...",
    "userWithoutPassword": {
      "userId": 1,
      "username": "kayttaja",
      "email": "user@example.com",
      "role": "USER",
      "isActive": true
    }
  }
}
```

### Hae omat tiedot
`GET /auth/me`

Hakee kirjautuneen käyttäjän tiedot.

**Headers:**
- `Authorization`: `Bearer <token>`

**Vastaus (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "username": "kayttaja",
    "email": "user@example.com",
    "role": "USER",
    "isActive": true
  }
}
```

---

## 👥 Käyttäjät (Users)

### Hae kaikki käyttäjät
`GET /users`

Hakee listan käyttäjistä suodatuksilla ja sivutuksella.

**Headers:**
- `Authorization`: `Bearer <token>`

**Vaadittu Rooli:**
- `ADMIN`

**Query Parametrit:**
- `skip`: (valinnainen) Ohitettavien tietueiden määrä (oletus: 0).
- `take`: (valinnainen) Haettavien tietueiden määrä (oletus: 100, max: 100).
- `userId`: (valinnainen) Suodata ID:n mukaan.
- Muut kentät toimivat myös suodattimina.

**Vastaus (200 OK):**
```json
{
  "success": true,
  "data": [
    { "userId": 1, "username": "admin", ... },
    { "userId": 2, "username": "user", ... }
  ]
}
```

### Luo käyttäjä
`POST /users`

Luo uuden käyttäjän. Ei vaadi kirjautumista.

**Headers:**
- Ei vaadita

**Pyyntö (Body):**
```json
{
  "email": "new@example.com",   // Pakollinen, validi sähköposti
  "username": "newuser",        // Pakollinen, ei tyhjä
  "password": "password123",    // Pakollinen, min 8 merkkiä
  "role": "USER",               // Valinnainen (USER/ADMIN)
  "isActive": true              // Valinnainen (boolean)
}
```

**Vastaus (201 Created):**
```json
{
  "success": true,
  "data": { "userId": 3, "email": "new@example.com", ... }
}
```

### Hae käyttäjä ID:llä
`GET /users/:userId`

**Headers:**
- `Authorization`: `Bearer <token>`

**Vaadittu Rooli:**
- `USER` (vain omat tiedot) tai `ADMIN` (kaikki tiedot)

**Vastaus (200 OK):**
```json
{
  "success": true,
  "data": { "userId": 1, ... }
}
```

### Päivitä käyttäjä
`PUT /users/:userId`

Päivittää käyttäjän tietoja.

**Headers:**
- `Authorization`: `Bearer <token>`

**Vaadittu Rooli:**
- `USER` (vain omat tiedot) tai `ADMIN` (kaikki tiedot)

**Pyyntö (Body):**
Kaikki kentät ovat valinnaisia.
```json
{
  "email": "updated@example.com",
  "username": "updatedname",
  "password": "newpassword123",
  "isActive": true
}
```

**Vastaus (200 OK):**
```json
{
  "success": true,
  "data": { "userId": 1, "username": "updatedname", ... }
}
```

### Poista käyttäjä (Pehmeä)
`PUT /users/:userId/soft-delete`

Asettaa käyttäjän epäaktiiviseksi (`isActive: false`).

**Headers:**
- `Authorization`: `Bearer <token>`

**Vaadittu Rooli:**
- `USER` (vain omat tiedot) tai `ADMIN` (kaikki tiedot)

**Vastaus (200 OK):**
```json
{
  "success": true,
  "data": { "userId": 1, "isActive": false, ... }
}
```

### Poista käyttäjä (Pysyvä)
`DELETE /users/:userId`

Poistaa käyttäjän tietokannasta pysyvästi.

**Headers:**
- `Authorization`: `Bearer <token>`

**Vaadittu Rooli:**
- `ADMIN`

**Vastaus (204 No Content):**
Tyhjä vastaus.

---

## 🍔 Tuotteet (Products)

### Hae kaikki tuotteet
`GET /products`

Hakee listan tuotteista.

**Headers:**
- Ei vaadita

**Query Parametrit:**
- `skip`: (valinnainen) Ohitus (oletus: 0).
- `take`: (valinnainen) Määrä (oletus: 100).
- `productId`: (valinnainen) Suodatus ID:llä.

**Vastaus (200 OK):**
```json
{
  "success": true,
  "data": [
    { "productId": 1, "name": "Burger", "cost": 10.5, ... }
  ]
}
```

### Hae tuote ID:llä
`GET /products/:productId`

**Headers:**
- Ei vaadita

**Vastaus (200 OK):**
```json
{
  "success": true,
  "data": { "productId": 1, "name": "Burger", ... }
}
```

### Luo tuote
`POST /products`

**Headers:**
- `Authorization`: `Bearer <token>`

**Vaadittu Rooli:**
- `ADMIN`

**Pyyntö (Body):**
```json
{
  "name": "Juustohampurilainen", // Pakollinen (string)
  "type": "Main Course",         // Pakollinen (string)
  "cost": 12.50,                 // Pakollinen (number > 0)
  "diets": ["Lactose Free"],     // Valinnainen (array)
  "imageUrl": "http://...",      // Valinnainen (URL)
  "ingredients": ["Beef", "Cheese"], // Valinnainen (array)
  "isActive": true               // Valinnainen (boolean)
}
```

**Vastaus (201 Created):**
```json
{
  "success": true,
  "data": { "productId": 2, "name": "Juustohampurilainen", ... }
}
```

### Päivitä tuote
`PUT /products/:productId`

**Headers:**
- `Authorization`: `Bearer <token>`

**Vaadittu Rooli:**
- `ADMIN`

**Pyyntö (Body):**
Kaikki kentät valinnaisia.
```json
{
  "name": "Uusi Nimi",
  "cost": 15.00
}
```

**Vastaus (200 OK):**
```json
{
  "success": true,
  "data": { "productId": 1, "name": "Uusi Nimi", "cost": 15.00, ... }
}
```

### Poista tuote
`DELETE /products/:productId`

**Headers:**
- `Authorization`: `Bearer <token>`

**Vaadittu Rooli:**
- `ADMIN`

**Vastaus (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Product with ID 1 has been deleted."
  }
}
```
