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

    let loginForm = document.forms["loginform"];
    let registerForm = document.forms["registerform"];

    function validateName(inputElement) {
        let validityState = inputElement.validity;
        if (validityState.valueMissing) {
            inputElement.setCustomValidity("Незаполненое поле");
        } else if (validityState.tooLong) {
            inputElement.setCustomValidity("Имя должно быть короче чем 20 знаков");
        } else if (validityState.patternMismatch) {
            inputElement.setCustomValidity("Имя должно быть составлено только из латинского алфавита, цифр и нижных подчеркиваний");
        } else {
            inputElement.setCustomValidity("");
        }
    }

    function validatePassword(inputElement) {
        let validityState = inputElement.validity;
        if (validityState.valueMissing) {
            inputElement.setCustomValidity("Незаполненое поле");
        } else if (validityState.tooShort) {
            inputElement.setCustomValidity("Пароль должнен быть длинее или равен чем 5 знаков");
        } else if (validityState.tooLong) {
            inputElement.setCustomValidity("Пароль должнен быть короче или равен чем 20 знаков");
        } else if (validityState.patternMismatch) {
            inputElement.setCustomValidity("Пароль должнен быть составлен только из латинского алфавита, цифр и спецальны знаков ( !\"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~ )");
        } else {
            inputElement.setCustomValidity("");
        }
    }

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        validateName(registerForm["name"]);
        validatePassword(registerForm["password"]);
        validatePassword(registerForm["retypepassword"]);

        registerForm.reportValidity();
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        validateName(registerForm["name"]);
        validatePassword(registerForm["password"]);

        loginForm.reportValidity();
    });
});
