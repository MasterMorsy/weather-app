// Get location when page loaded
window.addEventListener('load', () => {
    // latitude, langitute
    let lat, lang;
    // check browser enabled geoLocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // set coordinate value
            lat = position.coords.latitude;
            lang = position.coords.longitude;
            // fetch data
            const cors = "https://cors-anywhere.herokuapp.com/"
            const api = `${cors}https://api.darksky.net/forecast/e6865cd739675a33bc68ede541b3a465/${lat},${lang}`
            getData(api);
        })
    }
})

// fetch data
getData = url => {
    fetch(url).then(res => res.json()).then(data => {
        // defune needs data
        const { timezone } = data
        const { icon, summary, temperature, visibility, pressure, windSpeed } = data.currently
        // icon configuration
        let skycons = new Skycons({ "color": "white" });
        skycons.add("icon", Skycons[icon.replace(/-/g, "_").toUpperCase()]);
        skycons.play();
        // bind data at dom
        document.querySelector("#timeZone").textContent = timezone;
        document.querySelector("#summary").textContent = summary;
        document.querySelector("#temperature").textContent = temperature;
        document.querySelector("#pressure").textContent = pressure;
        document.querySelector("#visibility").textContent = visibility;
        document.querySelector("#windSpeed").textContent = windSpeed;
    })
}
