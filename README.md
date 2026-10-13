# HOTelDog

Responzivna početna stranica pansiona za pse, napravljena u React-u, Vite-u i CSS-u.

## Lokalno pokretanje

Potreban je Node.js 22.12+ ili 24.

```sh
cd /workspace/HOTelDog
npm ci --cache /tmp/hoteldog-npm-cache
npm run dev -- --port 5173
```

Otvorite lokalni port 5173 u pregledu razvojnog okruženja.

```sh
npm run build
npm run preview -- --port 4173
```

## Grafički materijali i stanje pregleda

Koristi se dostavljena čista pozadina, bez generisanja novih fotografija. Referentne slike služe samo kao smernice; stranica se sastoji od zasebnih HTML i React elemenata.

**Nedostaje izdvojena slika originalnog psa sa providnom pozadinom.** Trenutni pregled zato nema psa i nije konačan vizuelni rezultat. Originalna JPG fotografija i reference ostaju neizmenjene.

Kada vlasnik dostavi odobreni PNG originalnog psa, staviti ga na `public/assets/dog.png` i ponovo pokrenuti Vite odnosno build. Stranica će automatski uključiti tu sliku, bez zamene i bez deformisanja proporcija. Tada treba proveriti i precizno podesiti njegovu veličinu i poziciju na desktopu i telefonu prema referencama. Konačno vizuelno usklađivanje zavisi od dimenzija i providnih margina dostavljene slike.

Meni se otvara klikom i zatvara klikom van njega ili tasterom Escape. Opcije otvaraju pristupačne dijaloge, bez dodavanja novih sekcija. Kontakt i galerija su privremena mesta dok vlasnik ne dostavi sadržaj. Dugme za rezervaciju otvara privremeni dijalog; ne šalje rezervaciju niti prikuplja podatke. Slogan je prikazan na desktopu, kao u referenci; mobilna referenca ga ne prikazuje.

## Provere

Uspešan produkcioni build. U Chromium-u provereni prikazi širine 1536, 1024, 390 i 320 piksela: naslov, četiri prednosti, meni, sve opcije menija, rezervacioni dijalog, zatvaranje tasterom Escape, bez horizontalnog skrolovanja i grešaka pri učitavanju.

Sajt nije objavljen, a udaljena grana `main` nije menjana.
