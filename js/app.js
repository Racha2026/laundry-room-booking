// Funktion för att boka en tvättid
function bookTime() {

    const messageDiv = document.getElementById("message");
    // Hämtar datumet från texten som visas på sidan
    const fullDate = document.getElementById("date-text").textContent;
    // Tar bara själva datumet utan veckodag
    const date = fullDate.split(" / ")[0];

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
    // Sparar bokningsmeddelandet så det kan visas på nästa sida
    sessionStorage.setItem("bookingMessage", "Din bokning har sparats ✓.");
    // Skickar användaren till sidan med alla bokningar
    window.location.href = "overview.html";

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
    const bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];

    // Hämta datumet som visas på overview-sidan
    const fullDate = document.getElementById("overview-date").textContent;
    const selectedDate = fullDate.split(" / ")[0];

    // Filtrera bokningar för valt datum
    const todaysBookings = bookings.filter(function(b){
    return b.date === selectedDate;
    });


    // Om inga bokningar finns
    if(todaysBookings.length === 0){
        list.innerHTML = "<li>Inga bokningar denna dag</li>";
        return;
    }

    // Visar bara bokningar för det valda datumet
    todaysBookings.forEach(function(b,index){
        const li = document.createElement("li");
        li.textContent = "Lägenhet " + b.apartment + " / " + b.time + " ";
        const button = document.createElement("button");
        button.textContent = "Avboka";

        button.onclick = function(){
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

    // Hämtar valt datum från bokningssidan
    const fullDate = document.getElementById("date-text").textContent;
    const selectedDate = fullDate.split(" / ")[0];
    
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


// Körs när sidan laddas
showBookings();
disableBookedTimes();

const prevBtn = document.getElementById("prev-day");
const nextBtn = document.getElementById("next-day");
const dateText = document.getElementById("date-text");

let currentDate = new Date();

function updateDateDisplay(){
    const options = { weekday: 'long' };
    const dayName = currentDate.toLocaleDateString("sv-SE", options);
    const dateString = currentDate.toLocaleDateString("sv-SE");

    dateText.textContent = dateString + " / " + dayName;
}

if(prevBtn && nextBtn && dateText){

    updateDateDisplay();

prevBtn.onclick = function(){
    currentDate.setDate(currentDate.getDate() - 1);
    updateDateDisplay();
    disableBookedTimes(); // Uppdaterar vilka tider som är bokade
}

nextBtn.onclick = function(){
    currentDate.setDate(currentDate.getDate() + 1);
    updateDateDisplay();
    disableBookedTimes(); // Uppdaterar vilka tider som är bokade
}
}

const status = document.querySelector(".booking-status");
const msg = sessionStorage.getItem("bookingMessage");

// Visa bokningsmeddelande på overview-sidan
if(status && msg){
    status.textContent = msg;
    sessionStorage.removeItem("bookingMessage");
}

const prevOverview = document.getElementById("prev-day-overview");
const nextOverview = document.getElementById("next-day-overview");
const overviewDate = document.getElementById("overview-date");

let overviewCurrentDate = new Date();

// Gör det möjligt att bläddra mellan olika datum i overview-sidan
function updateOverviewDate(){
    const options = { weekday: 'long' };
    const dayName = overviewCurrentDate.toLocaleDateString("sv-SE", options);
    const dateString = overviewCurrentDate.toLocaleDateString("sv-SE");
    overviewDate.textContent = dateString + " / " + dayName;
}

if(prevOverview && nextOverview){
    updateOverviewDate();
    prevOverview.onclick = function(){
        overviewCurrentDate.setDate(overviewCurrentDate.getDate() - 1);
        updateOverviewDate();
        showBookings();
    };

    nextOverview.onclick = function(){
        overviewCurrentDate.setDate(overviewCurrentDate.getDate() + 1);
        updateOverviewDate();
        showBookings();
    };

}