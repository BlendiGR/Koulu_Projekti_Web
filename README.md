# Fooder - Ravintolasovellus
 
Tämä on moderni ravintolasovellus, joka tarjoaa saumattoman tilauskokemuksen asiakkaille ja tehokkaat hallintatyökalut ravintoloitsijoille. 
Projektissa on käytetty MariaDB, Express, Prisma ORM, React ja Node.js.



## 1. Sovelluksen Idea ja Kohderyhmä

**Idea:**
Fooder tuo ravintolan palvelut tarjoamalla visuaalisesti miellyttävän ja helppokäyttöisen alustan ruoan tilaamiseen ja asiakaskokemuksen hallintaan. Sovellus keskittyy korkealaatuiseen käyttäjäkokemukseen (UX) ja responsiivisuuteen.

**Kohderyhmä:**
*   **Asiakkaat:** Henkilöt, jotka haluavat tilata ravintolaruokaa helposti kotiin, sekä seurata tilauksensa etenemistä.
*   **Ravintoloitsijat:** Yritykset, jotka tarvitsevat modernin järjestelmän tilausten, tuotteiden, asiakkaiden ja markkinoinnin (kupongit, ilmoitukset) hallintaan.

---

## 2. Sovelluksen Toiminnallisuudet

Sovellus on jaettu kahteen pääosaan: Asiakaspuoleen ja Hallintapaneeliin (Admin).

### Asiakaspuoli (Client)

*   **Etusivu & Hero:**
    *   Visuaalisesti näyttävä aloitussivu, jossa on dynaaminen Hero-osio.
    *   "Most Buyed" -osio suosituimmille tuotteille.
    *   Ajankohtaiset ilmoitukset (Announcements) sivun ylälaidassa.

*   **Menu & Tuotteet:**
    *   Kattava ruokalista kategorioittain (esim. Ruoat, Juomat).
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
    *   Suojatut reitit (vain kirjautuneille).

### Hallintapaneeli (Admin)

Vain Admin-oikeuksilla varustetut käyttäjät pääsevät `/admin` -näkymään.

*   **Dashboard (Yleisnäkymä):** Yhteenveto tilastoista.
*   **Tilauksien Hallinta (Orders):**
    *   Listaus kaikista tilauksista.
    *   **Tilan päivitys:** Admin voi muuttaa tilauksen tilaa (esim. "PREPARING" -> "DELIVERING"). Tämä päivittyy asiakkaan seurantanäkymään.
*   **Tuotteiden Hallinta (Products):**
    *   Uusien tuotteiden lisääminen (kuvat, hinnat).
    *   Olemassa olevien tuotteiden muokkaus ja poisto.
*   **Käyttäjien Hallinta (Users):**
    *   Käyttäjälistaus.
*   **Kuponkien Hallinta (Coupons):**
    *   Luo uusia alennuskoodeja (esim. "SALE20", -20%).
    *   Määritä voimassaoloajat ja alennusprosentit.
*   **Ilmoitukset (Announcements):**
    *   Luo ja hallitse yläpalkin ilmoituksia (esim. "Ilmainen kuljetus tänään!").

### Server & Tekninen Tausta

*   **Sähköpostipalvelu:** Automaattiset sähköpostit (vahvistus, kuitti) käyttäen Nodemailer-kirjastoa ja HTML-pohjia.
*   **Tietokanta:** MariaDB tietojen (käyttäjät, tuotteet, tilaukset) tallennukseen.
*   **API:** RESTful API `express`-palvelimella.

---

## 3. Demo

Sovelluksen testaamiseksi omalla koneellasi:

**Vaatimukset:**
*   Node.js asennettuna.
*   MariaDB tietokanta.
*   `.env` tiedostot kunnossa sekä `client` että `server` kansioissa (sisältäen mm. Stripe avaimet, MariaDB URL, JWT Secret).

**Käynnistys:**
1.  Avaa terminaali ja mene palvelimen kansioon: `cd server`
2.  Asenna riippuvuudet: `npm install`
3.  Käynnistä palvelin: `npm run dev` (Käynnistyy määritettyyn porttiin).
4.  Avaa toinen terminaali ja mene client-kansioon: `cd client`
5.  Asenna riippuvuudet: `npm install`
6.  Käynnistä sovellus: `npm run dev`
7.  Avaa selain osoitteessa `http://localhost:5173` (tai mitä terminaali näyttää).

---

## 4. Ohjeistus: Näin testaat sovelluksen

Tämä polku varmistaa, että käyt läpi kaikki sovelluksen keskeiset ominaisuudet.

### Vaihe 1: Rekisteröityminen ja Tutustuminen
1.  Avaa sovellus etusivulle.
2.  Navigoi "Menu" -sivulle ja selaa tuotteita. Klikkaa tuotetta nähdäksesi lisätiedot (modaalissa).
3.  Yritä lisätä tuote ostoskoriin -> Sovellus ohjaa kirjautumaan.
4.  Valitse "Sign Up" ja luo uusi käyttäjä. Käytä oikeeta sähköpostia, jotta Nodemailer saa lähetettyä sähköpostit.

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
8.  Paina "Order" nappia ja odota.
9.  Sinut ohjataan onnistumissivulle (`/success/:id`). Tarkista sähköpostisi, sinne pitäisi tulla tilausvahvistus.

### Vaihe 3: Seuranta (Asiakas)
1.  Onnistumissivulta klikkaa "Track Order" tai mene Profiili -> Orders -> Valitse uusin tilaus.
2.  Näet visuaalisen janan (Order Status). Aluksi tila on todennäköisesti "Pending" tai "Received".
3.  Jätä tämä sivu auki yhteen välilehteen/ikkunaan.

### Vaihe 4: Hallinta (Admin) - Huom: Vaatii Admin-tunnukset
*Jos sinulla ei ole admin-tunnusta, muokkaa tietokannasta user-objektin rooliksi "admin" tai luo se seed-scriptillä.*

1.  Kirjaudu ulos ja sisään Admin-tunnuksilla.
2.  Paina "Admin" linkistä navigoinnissa.
3.  **Dashbord:** Katso tilastot.
4.  **Orders-välilehti:** Etsi äsken tekemäsi tilaus listasta.
5.  Muuta tilauksen status: Vaihda se esim. "Cooking" tai "On the way".
6.  Palaa Asiakas-ikkunaan (Vaihe 3).
7.  Etsi aikasemmin tehty tilaus, ja muuta sen statusta "DELIVERED"
8.  Katso sähköpostiasi, sinne pitäisi tulla arvostelupyyntö.
9.  **Arvostelut:** Linkki ohjaa arvostellu sivulle johon voit jättää arvostelun.


### Vaihe 5: Muut ominaisuudet
1.  **Admin - Products:** Kokeile lisätä uusi tuote "Test Burger" kuvalla ja hinnalla. Mene Menu-sivulle ja etsi se.
2.  **Admin - Coupons:** Luo uusi kuponki, esim. "TEST50", alennus 50%. Mene kassalle ja testaa toimiiko se.
