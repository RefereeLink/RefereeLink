let currentStep = 1;

function nextStep(step) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${step}`).classList.add('active');
    currentStep = step;
}

function prevStep(step) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${step}`).classList.add('active');
    currentStep = step;
}

function toggleDomicilio() {
    const domicilioFields = document.getElementById('domicilioFields');
    domicilioFields.style.display = document.getElementById('domicilio_diverso').value === "Si" ? "block" : "none";
}
