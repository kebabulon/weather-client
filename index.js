// var map = L.map('map').setView([55.751202487522074, 37.61667817685094], 4);

// L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// let d = new Date();
// d.setMinutes(0, 0, 0);
// d.setHours(d.getHours()-1);
// const layerUrl = 'https://{s}.sat.owm.io/maps/2.0/radar/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2&day=' + d.toISOString().slice(0, 16);

// L.tileLayer(layerUrl, {
//     maxZoom: 19,
//     opacity: 0.5,
// }).addTo(map);

let currentFile = "Файл не выбран";

window.addEventListener('DOMContentLoaded', () => {
    // let flag = document.getElementsByClassName("leaflet-attribution-flag"); // no politics
    // flag[0].remove();

    let mainFrame = document.getElementById("mainframe");

    let bound = false;


    let logoutButton = document.getElementById("logout");

    mainFrame.addEventListener("dom-ready", (event) => {
        let pageName = mainFrame.src.split('/').pop().split('.')[0];
        if(pageName === "filemanagement") {
            mainFrame.send("filemanagement", currentFile);
        }
        if(bound) return;
        bound = true;

        // mainFrame.openDevTools();

        mainFrame.addEventListener('ipc-message', event => {
            switch(event.channel) {
                case "filemanagement":
                    if(event.args[0] == "use") {
                        currentFile = event.args[1];
                    }
                    if(event.args[0] == "delete") {
                        currentFile = "Файл не выбран";
                        window.electronAPI.deleteFile(event.args[1]);
                    }
                    break;
            }
        })

        var anchors = document.getElementsByClassName("nav-link");
        for (var a = 0; a < anchors.length; a++) {
            var anchor = anchors[a];
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                if (e.target.id == "monitor") {
                    window.electronAPI.monitor();
                }
                else {
                    mainFrame.src = e.target.href;
                }
            });
        } 

        logoutButton.addEventListener('click', function (e) {
            window.electronAPI.logout();
        });
        
    })
});

