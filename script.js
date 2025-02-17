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
