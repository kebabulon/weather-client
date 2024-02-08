window.addEventListener('DOMContentLoaded', () => {
    let visualizationButton = document.getElementById("visualization");

    let graph = document.getElementById("graph");
    let graph2 = document.getElementById("graph2");
    let diag = document.getElementById("diag");
    let diag2 = document.getElementById("diag2");

    visualizationButton.addEventListener("click", (event) => {
        let radio = document.querySelector('input[name="graph-type"]:checked').value;

        if(radio == "graph") {
            graph.classList.remove("d-none");
            graph2.classList.remove("d-none");
            diag.classList.add("d-none");
            diag2.classList.add("d-none");
        }
        else {
            graph.classList.add("d-none");
            graph2.classList.add("d-none");
            diag.classList.remove("d-none");
            diag2.classList.remove("d-none");
        }
    });
});
