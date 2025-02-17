// Inizializzazione Supabase
const SUPABASE_URL = "https://owrguuznmjhtkoqqlcen.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93cmd1dXpubWpodGtvcXFsY2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NDMwMjQsImV4cCI6MjA1NTExOTAyNH0._P2X1F6jiZSDCTXN6hwhtdetEonk7W7xVCnJ64l9pIA";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// URL Webhook di Make.com
const WEBHOOK_URL = "https://hook.eu2.make.com/a5vjjx4danetsr5ni7u65352idtu2x53";

// Sezione Modal
const modal = document.getElementById("modal");
const modalNome = document.getElementById("modalNome");
const modalEmail = document.getElementById("modalEmail");
const closeModal = document.querySelector(".close");
const eliminaBtn = document.getElementById("eliminaBtn");
let selectedId = null;

// Caricamento dati iniziale
document.addEventListener("DOMContentLoaded", caricaSezioni);

async function caricaSezioni() {
    const { data, error } = await supabase.from("sezioni").select("*");
    if (error) {
        console.error("Errore nel caricamento:", error);
        return;
    }

    const lista = document.getElementById("listaSezioni");
    lista.innerHTML = "";

    data.forEach(sezione => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${sezione.Nome} - ${sezione.Email}
            <button class="dettagli" onclick="mostraDettagli(${sezione.id}, '${sezione.Nome}', '${sezione.Email}')">Dettagli</button>
        `;
        lista.appendChild(li);
    });
}

// Aggiunta di una nuova sezione
document.getElementById("sezioneForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (!nome || !email) {
        alert("Compila tutti i campi!");
        return;
    }

    // Salva su Supabase
    const { data, error } = await supabase.from("sezioni").insert([{ Nome: nome, Email: email }]);

    if (error) {
        console.error("Errore inserimento:", error);
        return;
    }

    // Invia a Make.com
    await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email })
    });

    alert("Sezione aggiunta con successo!");
    document.getElementById("sezioneForm").reset();
    caricaSezioni();
});

// Mostra dettagli nel modal
function mostraDettagli(id, nome, email) {
    selectedId = id;
    modalNome.textContent = nome;
    modalEmail.textContent = email;
    modal.style.display = "flex";
}

// Chiudi il modal
closeModal.onclick = () => modal.style.display = "none";

// Elimina sezione
eliminaBtn.onclick = async function () {
    if (confirm("Sei sicuro di voler eliminare questa sezione?")) {
        await supabase.from("sezioni").delete().match({ id: selectedId });
        modal.style.display = "none";
        caricaSezioni();
    }
};
