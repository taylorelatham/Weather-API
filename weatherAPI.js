let weather = {
    "apiKey": "a57b0d9beb494393c117ad8f9370fc10",
    fetchWeather: function (zip) {
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?zip="
            + zip 
            + "&units=imperial&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data.city;

        for (let i = 0; i < 5; i++) {
            const { icon, description } = data.list[i].weather[0];
            const { temp, humidity } = data.list[i].main;
            console.log(name, icon, description, temp, humidity);
            document.querySelector(".city").innerText = "Weather in " + name;
            document.querySelector(".icon"+i).src = 
                "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            document.querySelector(".description"+i).innerText = description;
            document.querySelector(".temp"+i).innerText = temp + "°F";
            document.querySelector(".humidity"+i).innerText = humidity + "% humidity";
        }
    },
    search: function() {
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
};

document.querySelector(".search button")
.addEventListener("click", function() {
    weather.search();
});
document.querySelector(".searchbar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
})