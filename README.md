# Fooder - Ravintolasovellus
 

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

![Hero Section](https://raw.githubusercontent.com/BlendiGR/Restaurant-App/refs/heads/main/client/src/assets/Fooder-Hero.png "Hero Section Screenshot")

Tämä on moderni ravintolasovellus, joka tarjoaa saumattoman tilauskokemuksen asiakkaille ja tehokkaat hallintatyökalut ravintoloitsijoille.

## 1. Sovelluksen Idea ja Kohderyhmä

**Idea:**
Fooder tuo ravintolan palvelut tarjoamalla visuaalisesti miellyttävän ja helppokäyttöisen alustan ruoan tilaamiseen ja asiakaskokemuksen hallintaan. Sovellus keskittyy korkealaatuiseen käyttäjäkokemukseen (UX) ja responsiivisuuteen.

**Kohderyhmä:**
*   **Asiakkaat:** Henkilöt, jotka haluavat tilata laadukasta ravintolaruokaa helposti kotiin tai noutona, sekä seurata tilauksensa etenemistä reaaliajassa.
*   **Ravintoloitsijat:** Yritykset, jotka tarvitsevat modernin järjestelmän tilausten, tuotteiden, asiakkaiden ja markkinoinnin (kupongit, ilmoitukset) hallintaan.

---

## 2. Teknologiat (Tech Stack)

Projekti hyödyntää modernia Javascript-ekosysteemiä sekä asiakas- että palvelinpuolella.

**Backend (Server):**
*   **Runtime:** Node.js
*   **Framework:** Express.js (v5)
*   **Tietokanta:** MariaDB
*   **ORM:** Prisma
*   **Autentikaatio:** JWT & BCrypt
*   **Maksut:** Stripe API
*   **Sähköposti:** Nodemailer

**Frontend (Client):**
*   **Framework:** React (v19)
*   **Build Tool:** Vite
*   **Tyylit:** Tailwind CSS (v4)
*   **Reititys:** React Router Dom (v7)
*   **Ilmoitukset:** Sonner
*   **Validointi:** Zod & React Hook Form

---

## 3. Sovelluksen Toiminnallisuudet

Sovellus on jaettu kahteen pääosaan: Asiakaspuoleen ja Hallintapaneeliin (Admin).

### Asiakaspuoli (Client)

*   **Etusivu & Hero:**
    *   Visuaalisesti näyttävä aloitussivu, jossa on dynaaminen Hero-osio.
    *   "Most Buyed" -osio suosituimmille tuotteille.
    *   Ajankohtaiset ilmoitukset (Announcements) sivun ylälaidassa.

*   **Menu & Tuotteet:**
    *   Kattava ruokalista kategorioittain (esim. Ruoat, juomat).
    *   Tuotekortit kuvilla, hinnoilla ja "Lisää ostoskoriin" -toiminnolla.
    *   **Tuotemodaali:** Klikkaamalla tuotetta aukeaa tarkempi näkymä, jossa on kuvaus, ainesosat ja ruokavaliot.

*   **Ostoskori (Cart):**
    *   Sivusta aukeava ostoskori, joka on aina helposti saatavilla.
    *   Tuotteiden määrän muokkaaminen ja poistaminen.
    *   Reaaliaikainen hinnan ja verojen (ALV) laskenta.
    *   **Kupongit:** Mahdollisuus syöttää alennuskoodeja, jotka laskevat alennuksen loppusummasta.

*   **Kassa (Checkout) & Maksaminen:**
    *   Selkeä kassasivu, jossa syötetään toimitustiedot (automaattinen validointi).
    *   **Stripe-integraatio:** Maksaminen kortilla. Testitilassa käytetään Stripen testikortteja.
    *   Tilausvahvistus sähköpostiin onnistuneen maksun jälkeen.

*   **Tilaukset & Seuranta:**
    *   **Tilaushistoria:** "Orders"-sivulla käyttäjä näkee omat menneet tilauksensa.
    *   **Reaaliaikainen seuranta (Order Track):** Visuaalinen seurantasivu yksittäiselle tilaukselle. Näyttää tilan (PREPARING, DELIVERING, DELIVERED) ja arvioidun toimitusajan.

*   **Käyttäjäprofiili:**
    *   Omien tietojen hallinta.
    *   Salasanan vaihto.
    *   Tilaushistorian tarkastelu.

*   **Arvostelut:**
    *   Mahdollisuus jättää arvostelun. Yhden käyttäjän on mahdollista jättää vain yhden arvostelun.

*   **Autentikaatio:**
    *   Rekisteröityminen ja kirjautuminen (JWT-pohjainen).
    *   Suojatut reitit (vain kirjautuneille).
 
### Hallintapaneeli (Admin)

Vain Admin-oikeuksilla varustetut käyttäjät pääsevät `/admin` -näkymään.

*   **Dashboard (Yleisnäkymä):** Yhteenveto tilastoista.
*   **Tilauksien Hallinta (Orders):**
    *   Listaus kaikista tilauksista.
    *   **Tilan päivitys:** Admin voi muuttaa tilauksen tilaa (esim. "PREPARING" -> "DELIVERING"). Tämä päivittyy asiakkaan seurantanäkymään.
*   **Tuotteiden Hallinta (Products):**
    *   Uusien tuotteiden lisääminen (kuvat, hinnat, kuvaukset).
    *   Olemassa olevien tuotteiden muokkaus ja poisto.
*   **Käyttäjien Hallinta (Users):**
    *   Käyttäjälistaus ja roolien hallinta (esim. Admin-oikeuksien antaminen).
*   **Kuponkien Hallinta (Coupons):**
    *   Luo uusia alennuskoodeja (esim. "SALE20", -20%).
    *   Määritä voimassaoloajat ja alennusprosentit.
*   **Ilmoitukset (Announcements):**
    *   Luo ja hallitse yläpalkin ilmoituksia (esim. "Ilmainen kuljetus tänään!").

### Server & Tekninen Tausta
**Katso kohta 2. Teknologiat**

---

## 4. Demo

Sovelluksen pystyttäminen omalle koneelle testausta varten.

### 1. Asenna Riippuvuudet

```bash
# 1. Mene server-kansioon ja asenna riippuvuudet
cd server
npm install

# 2. Mene client-kansioon ja asenna riippuvuudet
cd ../client
npm install
```

### 2. Ympäristömuuttujat (.env Setup)

Luo **server** -kansioon tiedosto `.env` ja lisää seuraavat (muokkaa arvoja tarvittaessa):

```env
NODE_ENV=kehitys
HOST=localhost
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=salasana
DB_NAME=ravintola_tietokanta
DATABASE_URL="mysql://root:salasana@localhost:3306/ravintola_tietokanta"

JWT_SECRET=oma_jwt_salainen_avain
JWT_EXPIRES_IN="24h"
BCRYPT_SALT=10

ADMIN_PW=yllapitajan_salasana

STRIPE_SECRET_KEY=oma_stripe_salainen_avain

# Sähköpostiasetukset
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=oma-sahkoposti@gmail.com
EMAIL_PASS=oma-sovellussalasana
EMAIL_FROM_NAME=Ravintolasovellus

# Käyttöliittymän URL (sähköpostilinkkejä varten)
FRONTEND_URL=http://localhost:5173

# Logon URL (sähköposteja varten - täytyy olla julkisesti saatavilla)
LOGO_URL=https://oma-verkkotunnus.com/logo-black.png
```

Luo **client** -kansioon tiedosto `.env` ja lisää seuraavat:

```env
# client/.env

# Backend API URL
VITE_API_URL="http://localhost:5000/api"

# Stripe Publishable Key (sama tili kuin serverillä)
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### 3. Tietokanta ja Käynnistys

Varmista että MariaDB on käynnissä.

```bash
# 1. Aja tietokantamigraatiot (Server-kansiossa)
cd server
#alusta prisma
npx prisma generate

#alusta db
npx prisma migrate reset

# 3. Käynnistä Backend
npm run dev
```

Avaa uusi terminaali:

```bash
# 4. Käynnistä Frontend (Client-kansiossa)
cd client
npm run dev
```

Sovellus aukeaa osoitteeseen: `http://localhost:5173`

---

## 5. Ohjeistus: Näin testaat sovelluksen

Tämä polku varmistaa, että käyt läpi kaikki sovelluksen keskeiset ominaisuudet.

### Vaihe 1: Rekisteröityminen ja Tutustuminen
1.  Avaa sovellus.
2.  Navigoi "Menu" -sivulle ja selaa tuotteita. Klikkaa tuotetta nähdäksesi lisätiedot (modaalissa).
3.  Lisää tuotteita ostoskoriin.
4.  Mene ostoskoriin ja yritä painaa "Siirry kassaan" nappia -> sovellus ohjaa kirjautumaan.
5.  Valitse "Sign Up" ja luo uusi käyttäjä. Laita oikea sähköposti, jotta Nodemailer pystyy lähettämään sähköposteja.

### Vaihe 2: Tilausprosessi (Asiakas)
1.  Kirjaudu sisään juuri luomallasi tunnuksella.
2.  Mene takaisin Menuun ja lisää muutama tuote lisää (esim. Pizza ja Juoma) ostoskoriin.
3.  Avaa ostoskori (Drawer) oikeasta reunasta. Testaa määrien muuttamista.
4.  **Kuponki:** Jos tiedät toimivan koodin (esim. "ALE10"), syötä se ja katso hinnan muuttuvan. *(Pitäisi olla valmiina WELCOME10 databasessa jos prisma seed mennyt läpi.)*
5.  Paina "Siirry kassaan".
6.  Täytä toimitustiedot (Katuosoite, Postinumero, Kaupunki). Lomake validoi puuttuvat tiedot.
7.  **Maksaminen:** Syötä Stripen testikortin tiedot:
    *   Kortin numero: `4242 4242 4242 4242`
    *   Pvm: Mikä tahansa tulevaisuuden pvm (esim. 12/28)
    *   CVC: `123`
8.  Paina "Pay" ja odota hetki.
9.  Sinut ohjataan onnistumissivulle (`/success/:id`). Tarkista sähköpostisi, sinne pitäisi tulla tilausvahvistus.

### Vaihe 3: Seuranta (Asiakas)
1.  Onnistumissivulta klikkaa "Track Order" tai mene Profiili -> Orders -> Valitse uusin tilaus.
2.  Näet visuaalisen janan (Order Status). Aluksi tila on "PREPARING".
3.  Jätä tämä sivu auki yhteen välilehteen/ikkunaan.

### Vaihe 4: Hallinta (Admin) - Huom: Vaatii Admin-tunnukset
*PRISMA SEED skripti on luonut valmiiksi admin käyttäjän. Tarkista ne seed.js tiedostosta tai .env*

1.  Avaa uusi **incognito-ikkuna** tai **kirjaudu ulos**, ja kirjaudu sitten takaisin sisään **ylläpitäjän tunnuksilla**.
2.  Valitse navigointivalikosta **Hallinta**.
3.  **Kojelauta (Dashboard):** Tarkastele kaikkia näkymiä ja kokeile eri **toiminnallisuuksia**.
4.  Muuta tilauksen tilaa: Vaihda tila esimerkiksi tilaan "**TOIMITUKSESSA**" (`DELIVERING`).
5.  Palaa Asiakas-ikkunaan (Vaihe 3). Päivitä sivu ja huomaa, että tilauksen seuranta on päivittynyt.
6.  Palaa takaisin ylläpitäjän paneeliin ja vaihda tilauksen tila tilaan "**TOIMITETTU**" (`DELIVERED`).
7.  Tarkista sähköpostisi – sinne pitäisi tulla **arviointipyyntö**.
8.  Napsauta **Jätä arvio** -painiketta.
    > *Huom: Jos olet määrittänyt `.env`-tiedoston sähköpostiasetukset oikein, linkin pitäisi ohjata suoraan arviointi-osioon.*
9.  Jätä arvostelu ja siirry takaisin ylläpitäjän paneelin **Arvostelut**-osioon.
10. **Hyväksy** jättämäsi arvostelu (aktivoi se).
11. Mene etusivulle, selaa alas ja tarkastele tekemääsi arvostelua.

### Vaihe 5: Muut ominaisuudet
1.  **Admin - Products:** Kokeile lisätä uusi tuote "Test Burger" kuvalla ja hinnalla. Mene Menu-sivulle ja etsi se.
2.  **Admin - Coupons:** Luo uusi kuponki, esim. "TEST50", alennus 50%. Mene kassalle ja testaa toimiiko se.

### ℹ️ Lisätietoa arvosteluista
* **Sovellus ei lähetä** arvostelupyyntöä sähköpostitse, jos kyseinen käyttäjä on jo jättänyt arvostelun kyseisestä tilauksesta.
* **Sovellus ei anna** käyttäjän jättää uutta arvostelua tilauksesta, jos hän on jo jättänyt arvostelun.
