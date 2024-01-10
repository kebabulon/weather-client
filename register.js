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
});