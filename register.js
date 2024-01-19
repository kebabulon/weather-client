window.addEventListener('DOMContentLoaded', () => {

    let loginContainer = document.getElementById("logincontainer");
    let registerContainer = document.getElementById("registercontainer");

    document.getElementById('noaccount').onclick = function() {
        registerContainer.classList.remove("displaynone");
        loginContainer.classList.add("displaynone");
    };

    document.getElementById('accountexists').onclick = function() {
        loginContainer.classList.remove("displaynone");
        registerContainer.classList.add("displaynone");
    };

    function clearCustomValidity(field) {
        field.addEventListener('input', (event) => {
            if (field.validity.customError) {
                field.setCustomValidity("");
            }
        })
    }

    let registerForm = document.forms["registerform"];

    clearCustomValidity(registerForm['name']);
    clearCustomValidity(registerForm['retypepassword']);
    clearCustomValidity(registerForm['password']);

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if(registerForm['password'].value !== registerForm['retypepassword'].value) {
            registerForm['retypepassword'].setCustomValidity("Пароли не совподают");
            registerForm.reportValidity();
            return false;
        }
        let res = window.electronAPI.register(registerForm['name'].value, registerForm['password'].value);
        res.then((res) => {
            switch(res) {
                case "ok":
                    loginContainer.classList.remove("displaynone");
                    registerContainer.classList.add("displaynone");
                    break;
                case "name":
                    console.log("a");
                    registerForm['name'].setCustomValidity("Аккаунт с таким иминем уже существует");
                    break;
            }
            registerForm.reportValidity();
        });
    });


    let loginForm = document.forms["loginform"];

    function clearCustomValidityLogin(field) {
        field.addEventListener('input', (event) => {
            loginForm['submit'].setCustomValidity("");
        })
    }

    clearCustomValidityLogin(loginForm['name']);
    clearCustomValidityLogin(loginForm['password']);

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let res = window.electronAPI.login(loginForm['name'].value, loginForm['password'].value);
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
