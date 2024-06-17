# Az alkalmazás dokumentációja

## Express szerver
A szerver egy iagzán egyszerű express alkalmazás, a .backend/server.js fájlban található. Az alkalmazás a 3000-es porton fut.

3 **Get** porttal rendelkezik:
* /movies : A filemeket listázza, itt lehet alkalmazni keresést cím vagy id alapján
* /comments : Egy adott filmhez való kommenteke adja vissza
* /user : Ez validálja a belépést, és ad vissza egy user objektumot

2 **Post** porttal rendelkezik:
* /comment : Egy kommentet hozzáad egy filmhez
* /deleteComment : Egy kommentet töröl

## Angular alkalmazás
Egy Single Page SSR alkalmazás, ami a 4200-es porton fut.
A weboldal keretét a main-page komponens adja, melyben található a router-outlet, ahol a többi komponens jelenik meg.

Oldal komponensek:
* **home** : A főoldal, egy sima üdvözlő oldal
* **movie** : A filmek listája, ahol lehet keresni a filmek között
* **single-movie** : Egy film részletes oldala, ahol a kommentek is megjelennek
* **login** : A belépés oldala

Egyéb komponensek:
* **comment-tile** : Egy komment megjelenítése
* **movie-tile** : Egy film megjelenítése lista részeként

Amennyire lehet a komponensek el vannak különítve és az inputokon keresztül kapják meg az adatokat.

A belépést validálás után egy cookiban tárolja, és minden funkcióhoz ezt használja ahol szükséges.
