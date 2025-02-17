// Mostra il primo step all'avvio
document.addEventListener("DOMContentLoaded", () => {
    showStep(1);
});

// Funzione per navigare tra gli step
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

// Funzione per gestire l'invio del form
document.getElementById("formIscrizione").addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const file = document.getElementById("immagine").files[0];

    if (!nome || !email || !file) {
        alert("Compila tutti i campi!");
        return;
    }

    // 1. Carica l'immagine su Google Drive tramite Make.com
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nome", nome);
    formData.append("email", email);

    try {
        const response = await fetch("https://hook.eu2.make.com/a5vjjx4danetsr5ni7u65352idtu2x53", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            nextStep(3); // Passa allo step di conferma
        } else {
            alert("Errore durante l'invio!");
        }
    } catch (error) {
        console.error("Errore:", error);
        alert("Errore di connessione!");
    }
});
