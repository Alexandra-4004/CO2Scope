var currentEntries = []; // Array to hold the current entries on the table
var allEntries = []; // Array to hold all entries from the JSON file

//load initial data, only read JSON file once
function loadInitialData() {
    fetch('Unternehmen.json')
        .then((response) => response.json())
        .then((data) => {
            allEntries = data.companies; // JSON-Daten in das Array 
            currentEntries = allEntries; // Set current entries to all entries initially
            initializeData();
        })
};

function initializeData() {
    document.getElementById("filterByLand").value = ""; // Reset the filter dropdown to its default value
    document.getElementById("filterByCompanies").value = ""; // Reset the filter dropdown to its default value
    currentEntries = allEntries; // Reset current entries to all entries
    sortRang(); // Sort entries by rank & afterwards render table
}

//Tabelle rendern
function renderTable(companies) {
    currentEntries = companies;
    const tableBody = document.querySelector("#companyTable tbody");
    deleteTable()
    companies.forEach(company => {
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
    currentEntries.sort((a, b) => {
        return a.Rang - b.Rang; // sort by rank in ascending order
    });
    renderTable(currentEntries); // render table after sorting
}

function sortUnternehmen() {
    currentEntries.sort((a, b) => {
        if (a.Unternehmen < b.Unternehmen) return -1;
        if (a.Unternehmen > b.Unternehmen) return 1;
        return 0;
    });
    renderTable(currentEntries); // render table after sorting
}

function sortLand() {
    currentEntries.sort((a, b) => {
        if (a.Land < b.Land) return -1;
        if (a.Land > b.Land) return 1;
        return 0;
    });
    renderTable(currentEntries); // render table after sorting
}

function filter() {
    currentEntries = allEntries; // get all companies to filter correclty
    let filterCompany = document.getElementById("filterByCompanies").value;
    let filterLand = document.getElementById("filterByLand").value;

    if (filterCompany === "" && filterLand === "") {
        initializeData(); // Load all data if no filter is applied
        return;
    } else if (filterCompany !== "" && filterLand === "") {
        filteredCompanies = currentEntries.filter(company => company.Unternehmen === filterCompany);
        renderTable(filteredCompanies);
        return;
    } else if (filterCompany === "" && filterLand !== "") {
        filteredCompanies = currentEntries.filter(company => company.Land === filterLand);
        renderTable(filteredCompanies);
        return;
    } else if (filterCompany !== "" && filterLand !== "") {
        filteredCompanies = currentEntries.filter(company => company.Unternehmen === filterCompany && company.Land === filterLand);
        renderTable(filteredCompanies);
        return;
    }
}

function submit() {
    alert("Ihre Nachricht wurde erfolgreich gesendet!");
}

// Set the direction of the page based on the user's language
function switchLanguage() {
    let languageSelect = document.getElementById("language-select");
    let selectedLang = languageSelect.value;

    let navElement = document.querySelector("nav");

    if (selectedLang === "ar") {
        navElement.classList.add("rtl-nav");
        navElement.classList.remove("ltr-nav");
    } else {
        navElement.classList.add("ltr-nav");
        navElement.classList.remove("rtl-nav");
    }
}