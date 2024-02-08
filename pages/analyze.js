window.addEventListener('DOMContentLoaded', () => {
    let analyzeButton = document.getElementById("analyze");
    let img = document.getElementById("img-container");

    analyzeButton.addEventListener("click", (event) => {
        img.classList.remove("d-none");
    });
});
