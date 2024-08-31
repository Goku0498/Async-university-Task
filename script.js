document.addEventListener("DOMContentLoaded", function() {
    let cont1 = document.createElement("div");
    cont1.id = "cont1";
    cont1.className = "cont1";

    let cont2 = document.createElement("div");
    cont2.id = "cont2";
    cont2.className = "cont2";

    let title = document.createElement("div");
    title.className = "title";
    title.innerHTML = "<h1>University Search</h1>";
    cont1.appendChild(title);

    let labelInputContainer = document.createElement("div");
    labelInputContainer.className = "label-input";
    labelInputContainer.innerHTML = `
        <label for="country">Country Name</label>
        <input type="text" id="country" name="country" placeholder="Enter Country Name">
    `;
    cont1.appendChild(labelInputContainer);

    let buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    buttonContainer.innerHTML = `<br><button id="searchButton" type="button">Get University Details</button>`;
    cont1.appendChild(buttonContainer);

    document.body.appendChild(cont1);
    document.body.appendChild(cont2);

    document.getElementById('searchButton').addEventListener('click', async function() {
        let inputCountry = document.getElementById("country").value;
        let api_url = `http://universities.hipolabs.com/search?country=${inputCountry}`;

        try {
            let info = await get_info(api_url);
            displayResults(info);
        } catch (error) {
            console.error(`Failed to fetch university details: ${error}`);
        }
    });

    async function get_info(link) {
        let response = await fetch(link);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        return data;
    }

    function displayResults(data) {
        let cont2 = document.getElementById('cont2');
        cont2.innerHTML = "";
        cont2.scrollTop = 0;

        let table = document.createElement('table');

        let headerRow = table.insertRow(-1);
        let keys = Object.keys(data[0]);
        keys.forEach(key => {
            let th = document.createElement('th');
            th.innerHTML = key;
            headerRow.appendChild(th);
        });

        data.forEach(item => {
            let row = table.insertRow(-1);
            keys.forEach(key => {
                let cell = row.insertCell(-1);
                cell.innerHTML = item[key] || "-";
            });
        });

        cont2.appendChild(table);
        cont2.style.maxHeight = "100%";
    }
});
