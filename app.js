const input = document.querySelector('#input');
const searchButton = document.querySelector('#searchButton');
const container = document.querySelector('.container');


// Add click keypress to search button
searchButton.addEventListener('click', fetchSearch);
// Add enter keypress to search field
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchSearch();
        input.value = '';
    }
});

// Function to fetch the API call for each search and generate it to DOM
function fetchSearch() {
    const inputVal = input.value;
    const apiKey = "424a675d3ece0df82b77605364dbeff9";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    weatherAPI(url).then((data) => {

        // Create divs for the weatherCards
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weatherCard');
        const deleteDivButton = document.createElement('button');

        deleteDivButton.innerText = 'Close';
        deleteDivButton.classList.add('deleteDivButton');

        // Weather icons URL
        const icon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

        // Add all weather info to weatherCard div
        weatherCard.innerHTML = `<ul class="list"><li><h2>${data.name}, ${data.sys.country}</h2>
                        Temp: ${Math.round(data.main.temp)}°C
                        <img class="city-icon" src=${icon} alt=${data.weather[0].description}></lu></ul>`;

        // Append everything
        weatherCard.appendChild(deleteDivButton);
        container.appendChild(weatherCard);

        // Add event click to remove the weatherCard if so wish
        deleteDivButton.addEventListener('click', () => {
            container.removeChild(weatherCard);

        });

    });
}

// Filter out and display the searched weatherCard
const filterSearch = document.querySelector('#filterSearch');
filterSearch.addEventListener('input', () => {

    const weatherDivs = document.querySelectorAll('.list li');
    weatherDivs.forEach(li => {

        if (li.innerText.includes(filterSearch.value)) {

            return li.hidden = false;
        }
        return li.hidden = true;
    })

});




async function weatherAPI(url) {
    let response = await fetch(url);
    if (response.ok) {
        let data = await response.json();
        return data;

    } else {
        console.log("HTTP-Error: " + response.status);
        alert('Type in correct City or Country'); Capitalization
    }

}

// Delete all weatherCard divs
const deleteAll = document.querySelector('.Delete');
deleteAll.addEventListener('click', () => {
    container.innerHTML = '';
});

