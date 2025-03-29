var loadedCompanies = []; // Array für die Unternehmensdaten

//asynchrone Funktion in JS
function loadData() {
    fetch('Unternehmen.json')
        .then((response) => response.json())
        .then((data) => {
            loadedCompanies = data.companies; // JSON-Daten in das Array einfügen
            renderTable(); // Tabelle rendern, nachdem die Daten geladen wurden
        })
};

//Tabelle rendern
function renderTable() {
    const tableBody = document.querySelector("#companyTable tbody");
    // tableBody.remove(); // Vorhandene Tabelle entfernen
    loadedCompanies.forEach(company => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${company.Rang}</td>
        <td>${company.Unternehmen}</td>
        <td>${company.Branche}</td>
        <td>${company.Land}</td>
        <td>${company.Kontinent}</td>
        <td>${Number(company["CO2-Ausstoß gesamt"]).toLocaleString()}</td>
        <td>${company["CO2-Ausstoß pro Mitarbeiter"]}</td>
        <td>${company["CO2-Ausstoß pro Umsatz"]}</td>
    `;
        tableBody.appendChild(row);
    })
};

// Tabelle leeren
function deleteTable() {
    const tableBody = document.querySelector("#companyTable tbody");
    tableBody.innerHTML = "";
}

function sortRang() {
    deleteTable(); // Tabelle leeren, bevor die neuen Daten hinzugefügt werden
    loadedCompanies.sort((a, b) => {
        return a.Rang - b.Rang; // Rang sortieren
    });
    renderTable(); // Tabelle neu rendern nach dem Sortieren
}

function sortUnternehmen() {
    deleteTable(); // Tabelle leeren, bevor die neuen Daten hinzugefügt werden
    loadedCompanies.sort((a, b) => {
        if (a.Unternehmen < b.Unternehmen) return -1;
        if (a.Unternehmen > b.Unternehmen) return 1;
        return 0;
    });
    renderTable(); // Tabelle neu rendern nach dem Sortieren
}

function sortBranche() {
    deleteTable(); // Tabelle leeren, bevor die neuen Daten hinzugefügt werden
    loadedCompanies.sort((a, b) => {
        if (a.Branche < b.Branche) return -1;
        if (a.Branche > b.Branche) return 1;
        return 0;
    });
    renderTable(); // Tabelle neu rendern nach dem Sortieren
}

function sortLand() {
    deleteTable(); // Tabelle leeren, bevor die neuen Daten hinzugefügt werden
    loadedCompanies.sort((a, b) => {
        if (a.Land < b.Land) return -1;
        if (a.Land > b.Land) return 1;
        return 0;
    });
    renderTable(); // Tabelle neu rendern nach dem Sortieren
}

function sortCO2() {
    deleteTable(); // Tabelle leeren, bevor die neuen Daten hinzugefügt werden
    loadedCompanies.sort((a, b) => {
        return a["CO2-Ausstoß gesamt"] - b["CO2-Ausstoß gesamt"];
    });
    renderTable(); // Tabelle neu rendern nach dem Sortieren
}

// Set the direction of the page based on the user's language
document.documentElement.dir = navigator.language.startsWith('ar') || navigator.language.startsWith('he') ? 'rtl' : 'ltr'; 