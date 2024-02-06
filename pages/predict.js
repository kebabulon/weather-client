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


const dayElement = '\
<tr> \
<th scope="row">1</th> \
<td>-2</td> \
<td>Ветер</td> \
</tr> \
'


window.addEventListener('DOMContentLoaded', () => {
    let flag = document.getElementsByClassName("leaflet-attribution-flag"); // no politics
    flag[0].remove();

    let predictButton = document.getElementById("predict");

    let options = document.getElementById("file-input");

    let tempText = document.getElementById("temp");
    let weatherText = document.getElementById("weather");


    predictButton.addEventListener("click", (event) => {

    });

});

