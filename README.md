# Laundry Room Booking System

## Grupp 8
- Elin Diamanti – eldi2501
- Racha Almawaldi – raal2505

Datum: 2026-03-19

---

## Utvecklingsmiljö & Verktyg

Projektet utvecklades med hjälp av olika utvecklingsmiljöer, främst Visual Studio Code och PyCharm.
Applikationen är byggd med HTML, CSS och JavaScript.

För versionshantering användes Git och GitHub, där arbetet organiserades med branches som sedan slogs ihop med main.

---

## Syfte

Syftet med projektet var att utveckla en enkel webbapplikation för bokning av tvättstuga.
Målet var att skapa ett system där användaren kan:
- Boka en tvättid
- Se aktuella bokningar
- Avboka en bokning

---
 
## Genomförande

Projektet inleddes med planering genom att skapa en projektplan och ett SRS-dokument. Wireframes togs fram för att visualisera gränssnittet innan implementationen påbörjades.

Därefter utvecklades applikationen stegvis där HTML användes för struktur, CSS för design och JavaScript för funktionalitet.

Bokningar lagras i sessionStorage, vilket innebär att data sparas tillfälligt under sessionen.

Applikationen kan köras genom att öppna `index.html` i en webbläsare.

Under utvecklingen uppstod vissa problem, bland annat med datumhantering och synkronisering mellan sidor. Dessa löstes genom att använda ett enhetligt datumformat och justera funktionerna som hanterar bokningar.

---

## Diskussion

Projektets syfte uppnåddes och applikationen uppfyller de krav som definierades i SRS.
Användaren kan boka, se och avboka tider samt får tydliga felmeddelanden vid felaktig input.

En utmaning var att få datumhanteringen att fungera korrekt mellan olika sidor. Detta löstes genom att använda samma format i hela applikationen.

En annan utmaning var att förhindra dubbelbokning, vilket löstes genom att göra redan bokade tider inaktiva.

Arbetet följde sprintplanen relativt bra, även om vissa delar tog längre tid än planerat.

Projektet gav en bättre förståelse för hur en mjukvaruutvecklingsprocess fungerar i praktiken samt vikten av tydlig struktur och samarbete i grupp.

---

## Referenser

- Software Engineering: A practitioner's Approach (9:e upplagan), Roger Pressman and Bruce Maxim, McGraw-Hill Education
- https://developer.mozilla.org
- https://www.w3schools.com