document.addEventListener("DOMContentLoaded", () => {
    showStep(1);
});

function showStep(step) {
    document.querySelectorAll(".step").forEach(el => el.classList.remove("active"));
    document.getElementById(`step${step}`).classList.add("active");
}

function nextStep(step) {
    showStep(step);
}

function prevStep(step) {
    showStep(step);
}

function toggleDomicilio() {
    let domicilioDiv = document.getElementById("domicilio_extra");
    domicilioDiv.style.display = document.getElementById("domicilio_diverso").value === "si" ? "block" : "none";
}

function toggleCalcio() {
    document.getElementById("calcio_extra").style.display = document.getElementById("attualmente_gioca").value === "si" ? "block" : "none";
}

function toggleAIA() {
    document.getElementById("aia_extra").style.display = document.getElementById("ex_aia").value === "si" ? "block" : "none";
}
