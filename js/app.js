// Funktion för att boka en tvättid
function bookTime() {

    const messageDiv = document.getElementById("message");
    const date = document.getElementById("date").value;

    if(date === ""){
        messageDiv.textContent = "Välj datum";
        return;
    }

    const apartment = document.getElementById("apartment").value;
    const selectedTime = document.querySelector('input[name="time"]:checked');


    // Rensa tidigare meddelanden
    messageDiv.textContent = "";
    messageDiv.style.color = "red";

    // Kontrollera att en tid är vald
    if (!selectedTime) {
        messageDiv.textContent = "Välj en tvättid";
        return;
    }

    // Kontrollera att lägenhetsnummer är ifyllt
    if (apartment === "") {
        messageDiv.textContent = "Du måste ange lägenhetsnummer.";
        return;
    }

    const time = selectedTime.value;

    // Hämta bokningar från sessionStorage
    let bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];

    // Kontrollera om tiden redan är bokad
    const alreadyBooked = bookings.some(function(b){
        return b.time === time && b.date === date;
    });

    if (alreadyBooked) {
        messageDiv.textContent = "Den här tiden är redan bokad";
        return;
    }

    // Lägg till bokningen
    bookings.push({
        date: date,
        time: time,
        apartment: apartment
    });

    // Spara tillbaka till sessionStorage
    sessionStorage.setItem("bookings", JSON.stringify(bookings));

    // Visa bekräftelse
    messageDiv.textContent = `Bokningen för ${date} ${time} är sparad!`;
    messageDiv.style.color = "green";

    // Rensa formuläret
    document.getElementById("apartment").value = "";
    selectedTime.checked = false;

    //Uppdatera bokade tider direkt
    disableBookedTimes();

}

// Funktion för att visa alla bokningar på overview-sidan
function showBookings() {

    const list = document.getElementById("bookingList");

    // Om elementet inte finns avbryt funktionen
    if (!list) return;

    // Rensa listan innan vi skriver ut bokningar
    list.innerHTML = "";

    // Hämta bokningar från sessionStorage
    let bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];

    // Sorterar bokningar efter datum och tid
    bookings.sort(function(a, b){

        if(a.date === b.date){
            return a.time.localeCompare(b.time);
        }

        return a.date.localeCompare(b.date);
    });

    // Om inga bokningar finns
    if(bookings.length === 0){
        list.innerHTML = "Inga bokningar ännu";
        return;
    }

    // Loopa igenom alla bokningar
    bookings.forEach(function(b, index) {

        const li = document.createElement("li");

        li.textContent = "Lägenhet " + b.apartment + " / " + b.date + " " + b.time + " ";

        // Skapa avbokningsknapp
        const button = document.createElement("button");
        button.textContent = "Avboka";

        button.onclick = function() {
            cancelBooking(index);
        };

        li.appendChild(button);
        list.appendChild(li);
    });
}

// Funktion för att avboka bokning
function cancelBooking(index) {

    let bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];

    // Ta bort bokningen från arrayen
    bookings.splice(index, 1);

    // Uppdatera sessionStorage
    sessionStorage.setItem("bookings", JSON.stringify(bookings));

    // Ladda om listan
    showBookings();
}

// Gör redan bokade tider inaktiva på bokningssidan
function disableBookedTimes(){

    // Hämta alla radio-knappar för tider
    const radios = document.querySelectorAll('input[name="time"]');

    // Om sidan inte innehåller tider - avbryt
    if (radios.length === 0) return;

    // Återställ alla tider först
    radios.forEach(function(radio){
        radio.disabled = false;
        radio.parentElement.style.color = "black";
    });

    // Hämta valt datum
    const selectedDate = document.getElementById("date").value;

    // Hämta bokningar
    const bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];

    // Loopa igenom bokningar
    bookings.forEach(function(b){

        // Bara om datum matchar
        if(b.date === selectedDate){

            // Hitta radio-knappen med samma tid
            const radio = document.querySelector(`input[value="${b.time}"]`);

            // Om den finns - gör den inaktiv
            if (radio){
                radio.disabled = true;
                radio.parentElement.style.color = "gray";
            }
        }
    });
}

// Sätt dagens datum som minsta valbara datum
const dateInput = document.getElementById("date");

if(dateInput){
    dateInput.min = new Date().toISOString().split("T")[0];
}

// Körs när sidan laddas
showBookings();
disableBookedTimes();