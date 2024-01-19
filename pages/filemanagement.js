const fileElement = ```
<div class="row bg-body-secondary py-3 ps-2 mx-1">
<div class="container-fluid">
    <span class="ms-0 me-3 h5"><strong>Файл 1</strong></span>
    <button id="use" class="d-inline btn btn-sm btn-primary">Использовать</button>
    <button id="delete" class="float-end d-inline btn btn-sm btn-danger">Удалить</button>
</div>
</div>
```


window.addEventListener('DOMContentLoaded', () => {
    let uploadButton = document.getElementById("upload");

    uploadButton.addEventListener("click", (event) => {
        let res = window.electronAPI.fileUpload();
        res.then((res) => {
            switch(res) {
                case "ok":
                    break;
                case "name or password":
                    loginForm['submit'].setCustomValidity("Имя или пароль не правильны");
                    loginForm.reportValidity();
                    break;
            }
        });
    });

});
