const dayElement = '\
<tr> \
<th scope="row">1</th> \
<td>-2</td> \
<td>Ветер</td> \
</tr> \
'


window.addEventListener('DOMContentLoaded', () => {
    let predictButton = document.getElementById("upload");

    let options = document.getElementById("file-input");

    let tempText = document.getElementById("temp");
    let weatherText = document.getElementById("weather");


    predictButton.addEventListener("click", (event) => {
        fileInput.value = null;
        fileInput.click();
    });

    window.electronAPI.on('filemanagement', (e, fileName) => {
        currentFile.innerHTML = fileName;
    })

});

