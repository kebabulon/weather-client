var map = L.map('map').setView([55.751202487522074, 37.61667817685094], 4);

L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let d = new Date();
d.setMinutes(0, 0, 0);
d.setHours(d.getHours()-1);
const layerUrl = 'https://{s}.sat.owm.io/maps/2.0/radar/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2&day=' + d.toISOString().slice(0, 16);

L.tileLayer(layerUrl, {
    maxZoom: 19,
    opacity: 0.5,
}).addTo(map);




window.addEventListener('DOMContentLoaded', () => {
    let flag = document.getElementsByClassName("leaflet-attribution-flag"); // no politics
    flag[0].remove();

    let predictButton = document.getElementById("predict");

    let tableFrame = document.getElementById("table-frame");

    predictButton.addEventListener("click", (event) => {
        let radio = document.querySelector('input[name="time"]:checked').value;

        let res = window.electronAPI.predict(parseInt(radio));

        res.then((res) => {
            tableFrame.innerHTML = '';

            for(let i = 0; i < res.length; i++) {
                let el = res[i];

                let d = new Date(Date.now() + i * 24 * 60 * 60 * 1000);

                let dayElement = `\
                <tr> \
                <th scope="row">${d.toISOString().slice(0, 10)}</th> \
                <td>${el["temp"].toFixed(0)}</td> \
                <td>${(el["wetness"].toFixed(2))}%</td> \
                <td>${el["wind_speed"].toFixed(2)}</td> \
                <td>${el["volume"].toFixed(2)}</td> \
                </tr> \
                `

                let dayEl = fromHTML(dayElement);
                tableFrame.appendChild(dayEl);
            }
        })




    });

});

