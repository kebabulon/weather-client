var map = L.map('map').setView([55.751202487522074, 37.61667817685094], 13);

L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let currentFile = "Файл не выбран";

window.addEventListener('DOMContentLoaded', () => {
    let flag = document.getElementsByClassName("leaflet-attribution-flag"); // no politics
    flag[0].remove();

    let mainFrame = document.getElementById("mainframe");

    let bound = false;

    mainFrame.addEventListener("dom-ready", (event) => {
        let pageName = mainFrame.src.split('/').pop().split('.')[0];
        if(pageName === "filemanagement") {
            mainFrame.send("filemanagement", currentFile);
        }
        if(bound) return;
        bound = true;

        mainFrame.openDevTools();

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
                mainFrame.src = e.target.href;
            });
        } 
    })
});

