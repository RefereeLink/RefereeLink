document.getElementById("dataForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const immagine = document.getElementById("immagine").files[0];
    const statusMessage = document.getElementById("statusMessage");

    if (!nome || !email || !immagine) {
        statusMessage.textContent = "Compila tutti i campi e seleziona un'immagine!";
        statusMessage.style.color = "red";
        return;
    }

    statusMessage.textContent = "Caricamento in corso...";
    statusMessage.style.color = "black";

    const WEBHOOK_URL = "https://hook.eu2.make.com/a5vjjx4danetsr5ni7u65352idtu2x53";
    
    // Preparare il form data
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
            statusMessage.textContent = "Dati inviati con successo!";
            statusMessage.style.color = "green";
            document.getElementById("dataForm").reset();
        } else {
            statusMessage.textContent = "Errore nell'invio!";
            statusMessage.style.color = "red";
        }
    } catch (error) {
        console.error("Errore di rete:", error);
        statusMessage.textContent = "Errore di connessione.";
        statusMessage.style.color = "red";
    }
});
