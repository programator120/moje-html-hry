# Emoji písmenká – glass klávesnicová hra

Jednoduchá HTML hra na precvičovanie písmeniek s virtuálnou klávesnicou, zvukmi a veselými emodži. Funguje offline priamo z prehliadača.

## Ako spustiť
### Najrýchlejšie
1. Stiahni/rozbaľ repozitár.
2. Otvor dvojklikom súbor `index.html` v modernom prehliadači (Chrome, Edge, Firefox, Safari).
3. Stláčaj fyzické klávesy alebo klikaj na virtuálne – zobrazí sa efekt, zvuk a bodíky.
4. Tlačidlom „🎲 Nová výzva“ miešaj písmenká a skúšaj, čo sa deje.

### Malý lokálny server (spoľahlivejšie pre zvuky a cache)
1. Otvor terminál v priečinku projektu.
2. Spusť jednoduchý server, napríklad:
   ```bash
   python -m http.server 8000
   ```
3. V prehliadači otvor adresu [http://localhost:8000](http://localhost:8000) a klikni na `index.html`.

## Čo je zábavné
- Glassmorphism štýl, jemné animácie a farebné iskry pri správnom ťuku.
- Virtuálna klávesnica s kombináciou písmen a emodži, ktorá sa hýbe spolu s fyzickou.
- Zvukové tóny generované Web Audio API podľa toho, či trafíš cieľ.
- Panel s tipmi na ďalšie vylepšenia (karaoke mód, denné misie a ďalšie).

## Tipy na úpravu
- V zozname `letterSet` v `index.html` môžeš pridať vlastné písmenká a emodži.
- Farby a sklo efekt nájdeš v CSS na začiatku súboru.
- Animácie bubliniek a iskier sú v spodnej časti CSS a v skripte pre funkciu `randomSparkle()`.
