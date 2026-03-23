# laborator3HTTP...
1.1 Întrebări Teoretice:

Care sunt cele 4 metode HTTP principale și când se folosește fiecare?


GET — citire/obținere de date de la server (ex: deschizi o pagină web). Nu modifică nimic pe server.
POST — trimitere de date către server pentru a crea o resursă nouă (ex: formular de înregistrare, login).
PUT — actualizarea completă a unei resurse existente (ex: modifici întregul profil al unui utilizator).
DELETE — ștergerea unei resurse de pe server (ex: ștergi un cont sau un produs).


Ce semnifică codurile de status HTTP?


200 OK — cererea a reușit, serverul a returnat datele cerute.
301 Moved Permanently — resursa s-a mutat definitiv la o altă adresă (redirect permanent).
400 Bad Request — cererea e malformată, serverul nu o înțelege (ex: date invalide trimise).
401 Unauthorized — nu ești autentificat, trebuie să te loghezi mai întâi.
403 Forbidden — ești autentificat, dar nu ai permisiunea să accesezi resursa.
404 Not Found — resursa nu există la adresa cerută.
500 Internal Server Error — eroare pe server, nu e vina clientului.


Care este diferența între HTTP și HTTPS?

HTTP (HyperText Transfer Protocol) trimite datele în text clar — oricine interceptează traficul de rețea poate citi conținutul. HTTPS adaugă un strat de criptare prin TLS/SSL, astfel datele sunt criptate între browser și server. HTTPS garantează și autenticitatea serverului (prin certificate digitale) și integritatea datelor (nu pot fi modificate în tranzit). În ziua de azi, orice site care primește date sensibile (parole, carduri) trebuie să folosească HTTPS obligatoriu.
