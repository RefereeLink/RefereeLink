document.getElementById("dataForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const immagine = document.getElementById("immagine").files[0];
    const statusMessage = document.getElementById("statusMessage");

    if (!nome || !email || !immagine) {
        statusMessage.textContent = "Compila tutti i campi!";
        statusMessage.style.color = "red";
        return;
    }

    statusMessage.textContent = "Caricamento...";
    statusMessage.style.color = "black";

    const WEBHOOK_URL = "https://hook.eu2.make.com/a5vjjx4danetsr5ni7u65352idtu2x53";
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("immagine", immagine);

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            nextStep(3); // Passa allo step 3 dopo l'invio
        } else {
            statusMessage.textContent = "Errore nell'invio!";
            statusMessage.style.color = "red";
        }
    } catch (error) {
        console.error("Errore:", error);
        statusMessage.textContent = "Errore di connessione.";
        statusMessage.style.color = "red";
    }
});

function nextStep(step) {
    document.querySelectorAll(".form-step").forEach((el) => el.classList.remove("active"));
    document.getElementById(`step-${step}`).classList.add("active");
}
