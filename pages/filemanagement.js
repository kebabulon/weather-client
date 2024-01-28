const fileElement = ' \
<div class="row bg-body-secondary py-3 ps-2 mx-1"> \
<div class="container-fluid"> \
    <span class="ms-0 me-3 h5"><strong class="file-name">Файл 1</strong></span> \
    <button class="file-use d-inline btn btn-sm btn-primary">Использовать</button> \
    <button class="file-delete float-end d-inline btn btn-sm btn-danger">Удалить</button> \
</div> \
</div> \
'

function fromHTML(html, trim = true) {
  // Process the HTML string.
  html = trim ? html : html.trim();
  if (!html) return null;

  // Then set up a new template element.
  const template = document.createElement('template');
  template.innerHTML = html;
  const result = template.content.children;

  // Then return either an HTMLElement or HTMLCollection,
  // based on whether the input HTML had one or more roots.
  if (result.length === 1) return result[0];
  return result;
}


window.addEventListener('DOMContentLoaded', () => {
    let uploadButton = document.getElementById("upload");
    let fileContainer = document.getElementById("file-container");
    let currentFile = document.getElementById("current-file");


    function addFile(fileName) {
        let newFileElement = fromHTML(fileElement);
        fileContainer.appendChild(newFileElement);

        newFileElement.getElementsByClassName("file-name")[0].innerHTML = fileName;
        newFileElement.getElementsByClassName("file-use")[0].addEventListener("click", (event) => {
            window.electronAPI.sendToHost("filemanagement", "use", fileName);
            currentFile.innerHTML = fileName;
        })
        newFileElement.getElementsByClassName("file-delete")[0].addEventListener("click", (event) => {
            newFileElement.remove();
            currentFile.innerHTML = "Файл не выбран";
            window.electronAPI.sendToHost("filemanagement", "delete", fileName);
        })
    }


    let uploads = window.electronAPI.uploads();
    uploads.then((uploads) => {
        uploads.forEach(element => {
           addFile(element);
        });
    })

    let fileInput = document.getElementById("file-input");

    uploadButton.addEventListener("click", (event) => {
        fileInput.value = null;
        fileInput.click();
    });

    fileInput.addEventListener("change", () => {
        if (fileInput.files.length == 1) {
            let file = fileInput.files[0];

            let res = window.electronAPI.uploadFile(file.path, file.name);

            res.then((res) => {
                if (res) {
                    let oldNameElements = document.getElementsByTagName("span");
                    for(let i = 0; i < oldNameElements.length; i++) {
                        let el = oldNameElements[i];
                        if (el.innerHTML == `<strong class="file-name">${file.name}</strong>`) {
                            el.parentNode.parentNode.remove();
                            break;
                        }
                    }

                    addFile(file.name);
                }
            });
        }
    });

    window.electronAPI.on('filemanagement', (e, fileName) => {
        currentFile.innerHTML = fileName;
    })

});
