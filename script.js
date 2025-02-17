document.getElementById("dataForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const statusMessage = document.getElementById("statusMessage");

    if (!nome || !email) {
        statusMessage.textContent = "Compila tutti i campi!";
        statusMessage.style.color = "red";
        return;
    }

    const WEBHOOK_URL = "https://hook.eu2.make.com/a5vjjx4danetsr5ni7u65352idtu2x53";

    const payload = { nome, email };

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
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
        console.error("Errore:", error);
        statusMessage.textContent = "Si è verificato un errore.";
        statusMessage.style.color = "red";
    }
});
