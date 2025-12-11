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
Fooder tuo ravintolan palvelut digitaaliseen aikaan tarjoamalla visuaalisesti miellyttävän ja helppokäyttöisen alustan ruoan tilaamiseen, pöytävarauksiin ja asiakaskokemuksen hallintaan. Sovellus keskittyy korkealaatuiseen käyttäjäkokemukseen (UX) ja responsiivisuuteen.

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
    *   Kattava ruokalista kategorioittain (esim. Burgerit, Pizzat, Juomat).
    *   Tuotekortit kuvilla, hinnoilla ja "Lisää ostoskoriin" -toiminnolla.
    *   **Tuotemodaali:** Klikkaamalla tuotetta aukeaa tarkempi näkymä, jossa on kuvaus, ainesosat ja allergiatiedot.

*   **Ostoskori (Cart):**
    *   Sivusta aukeava ostoskori, joka on aina helposti saatavilla.
    *   Tuotteiden määrän muokkaaminen ja poistaminen.
    *   Reaaliaikainen hinnan ja verojen (ALV) laskenta.
    *   **Kupongit:** Mahdollisuus syöttää alennuskoodeja, jotka laskevat alennuksen loppusummasta.

*   **Kassa (Checkout) & Maksaminen:**
    *   Selkeä kassasivu, jossa syötetään toimitustiedot (automaattinen validointi).
    *   **Stripe-integraatio:** Maksaminen kortilla. Testitilassa käytetään Stripen testikortteja.
    *   Kuitti ja tilausvahvistus sähköpostiin onnistuneen maksun jälkeen.

*   **Tilaukset & Seuranta:**
    *   **Tilaushistoria:** "Orders"-sivulla käyttäjä näkee omat menneet tilauksensa.
    *   **Reaaliaikainen seuranta (Order Track):** Visuaalinen seurantasivu yksittäiselle tilaukselle. Näyttää tilan (Vastaanotettu -> Valmistuksessa -> Kuljetuksessa -> Toimitettu) ja arvioidun toimitusajan.

*   **Käyttäjäprofiili:**
    *   Omien tietojen hallinta.
    *   Salasanan vaihto.
    *   Tilaushistorian tarkastelu.

*   **Arvostelut:**
    *   Mahdollisuus jättää arvosteluja ravintolasta ja tuotteista.

*   **Autentikaatio:**
    *   Rekisteröityminen ja kirjautuminen (JWT-pohjainen).
    *   Sähköpostivahvistus rekisteröitymisen yhteydessä.
    *   Suojatut reitit (vain kirjautuneille).

### Hallintapaneeli (Admin)

Vain Admin-oikeuksilla varustetut käyttäjät pääsevät `/admin` -näkymään.

*   **Dashboard (Yleisnäkymä):** Yhteenveto tilastoista.
*   **Tilauksien Hallinta (Orders):**
    *   Listaus kaikista tilauksista.
    *   **Tilan päivitys:** Admin voi muuttaa tilauksen tilaa (esim. "Pending" -> "Cooking"). Tämä päivittyy reaaliajassa asiakkaan seurantanäkymään.
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

Sovelluksen testaamiseksi omalla koneellasi (koska live-demoa ei ole tässä linkitetty), toimi seuraavasti:

**Vaatimukset:**
*   Node.js asennettuna.
*   MariaDB tietokanta.
*   `.env` tiedostot kunnossa sekä `client` että `server` kansioissa (sisältäen mm. Stripe avaimet, MariaDB URL, JWT Secret).

**Käynnistys:**
1.  Avaa terminaali ja mene palvelimen kansioon: `cd server`
2.  Asenna riippuvuudet: `npm install`
3.  Käynnistä palvelin: `npm run dev` (Käynnistyy porttiin 5000 tai määritettyyn porttiin).
4.  Avaa toinen terminaali ja mene client-kansioon: `cd client`
5.  Asenna riippuvuudet: `npm install`
6.  Käynnistä sovellus: `npm run dev`
7.  Avaa selain osoitteessa `http://localhost:5173` (tai mitä terminaali näyttää).

---

## 5. Ohjeistus: Näin testaat sovelluksen

Tämä polku varmistaa, että käyt läpi kaikki sovelluksen keskeiset ominaisuudet.

### Vaihe 1: Rekisteröityminen ja Tutustuminen
1.  Avaa sovellus etusivulle.
2.  Navigoi "Menu" -sivulle ja selaa tuotteita. Klikkaa tuotetta nähdäksesi lisätiedot (modaalissa).
3.  Yritä lisätä tuote ostoskoriin -> Sovellus ohjaa kirjautumaan.
4.  Valitse "Sign Up" ja luo uusi käyttäjä. (Varmista sähköposti, jos testikonfiguraatio vaatii sen, tai käytä suoraan jos dev-tilassa).

### Vaihe 2: Tilausprosessi (Asiakas)
1.  Kirjaudu sisään juuri luomallasi tunnuksella.
2.  Mene takaisin Menuun ja lisää muutama tuote (esim. Pizza ja Juoma) ostoskoriin.
3.  Avaa ostoskori (Drawer) oikeasta reunasta. Testaa määrien muuttamista.
4.  **Kuponki:** Jos tiedät toimivan koodin (esim. "ALE10"), syötä se ja katso hinnan muuttuvan.
5.  Paina "Proceed to Checkout".
6.  Täytä toimitustiedot (Katuosoite, Postinumero, Kaupunki). Lomake validoi puuttuvat tiedot.
7.  **Maksaminen:** Syötä Stripen testikortin tiedot:
    *   Kortin numero: `4242 4242 4242 4242`
    *   Pvm: Mikä tahansa tulevaisuuden pvm (esim. 12/28)
    *   CVC: `123`
8.  Paina "Pay". Odota hetki ("Processing...").
9.  Sinut ohjataan onnistumissivulle (`/success/:id`). Tarkista sähköpostisi (virtuaalinen tai oikea), sinne pitäisi tulla tilausvahvistus.

### Vaihe 3: Seuranta (Asiakas)
1.  Onnistumissivulta klikkaa "Track Order" tai mene Profiili -> Orders -> Valitse uusin tilaus.
2.  Näet visuaalisen janan (Order Status). Aluksi tila on todennäköisesti "Pending" tai "Received".
3.  Jätä tämä sivu auki yhteen välilehteen/ikkunaan.

### Vaihe 4: Hallinta (Admin) - Huom: Vaatii Admin-tunnukset
*Jos sinulla ei ole admin-tunnusta, muokkaa tietokannasta user-objektin rooliksi "admin" tai luo se seed-scriptillä.*

1.  Avaa uusi incognito-ikkuna tai kirjaudu ulos ja sisään Admin-tunnuksilla.
2.  Mene osoitteeseen `/admin`.
3.  **Dashbord:** Katso tilastot.
4.  **Orders-välilehti:** Etsi äsken tekemäsi tilaus listasta.
5.  Muuta tilauksen status: Vaihda se esim. "Cooking" tai "On the way".
6.  Palaa Asiakas-ikkunaan (Vaihe 3). Huomaa, että seurantasivun palkki on päivittynyt automaattisesti!

### Vaihe 5: Muut ominaisuudet
1.  **Admin - Products:** Kokeile lisätä uusi tuote "Test Burger" kuvalla ja hinnalla. Mene Menu-sivulle ja etsi se.
2.  **Admin - Coupons:** Luo uusi kuponki, esim. "TEST50", alennus 50%. Mene kassalle ja testaa toimiiko se.
3.  **Arvostelut:** Mene "Reviews" sivulle (jos käytössä) ja jätä arvostelu.
