// Assicurati che il codice venga eseguito solo dopo che il DOM è completamente caricato
document.addEventListener("DOMContentLoaded", async function () {
    // Inizializzazione di Supabase
    const supabaseUrl = "https://owrguuznmjhtkoqqlcen.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";  // La tua API Key
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    // Funzione per aggiungere una nuova sezione
    async function aggiungiSezione() {
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!nome || !email) {
            alert("Inserisci tutti i campi!");
            return;
        }

        let { error } = await supabase
            .from("sezioni")
            .insert([{ Nome: nome, Email: email }]);

        if (error) {
            console.error("Errore nell'aggiunta", error);
            alert("Errore nell'inserimento!");
        } else {
            document.getElementById("nome").value = "";
            document.getElementById("email").value = "";
            caricaSezioni(); // Ricarica la lista dopo l'aggiunta
        }
    }

    // Funzione per caricare la lista delle sezioni
    async function caricaSezioni() {
        let { data, error } = await supabase.from("sezioni").select("*");

        if (error) {
            console.error("Errore nel caricamento delle sezioni:", error);
            return;
        }

        console.log("Dati ricevuti da Supabase:", data); // Debug

        const lista = document.getElementById("sezioni-list");
        lista.innerHTML = "";

        if (!data || data.length === 0) {
            lista.innerHTML = "<tr><td colspan='4'>Nessuna sezione trovata</td></tr>";
            return;
        }

        // Aggiungi i record nella lista
        data.forEach(sezione => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${sezione.id}</td>
                <td>${sezione.Nome}</td>
                <td>${sezione.Email}</td>
                <td>
                    <button class="btn-details" onclick="mostraDettagli(${sezione.id}, '${sezione.Nome}', '${sezione.Email}')">Dettagli</button>
                    <button class="btn-delete" onclick="confermaEliminazione(${sezione.id})">❌</button>
                </td>
            `;
            lista.appendChild(row);
        });
    }

    // Funzione per mostrare i dettagli di una sezione in un modal
    function mostraDettagli(id, nome, email) {
        document.getElementById("modal-id").innerText = id;
        document.getElementById("modal-nome").innerText = nome;
        document.getElementById("modal-email").innerText = email;
        document.getElementById("modal").style.display = "block";
    }

    // Funzione per chiudere il modal
    function chiudiModal() {
        document.getElementById("modal").style.display = "none";
    }

    // Funzione per eliminare una sezione dopo conferma
    async function confermaEliminazione(id) {
        if (confirm("Sei sicuro di voler eliminare questa sezione?")) {
            let { error } = await supabase.from("sezioni").delete().eq("id", id);
            if (error) {
                console.error("Errore eliminazione", error);
                alert("Errore nell'eliminazione!");
            } else {
                caricaSezioni(); // Ricarica la lista dopo eliminazione
            }
        }
    }

    // Carica le sezioni all'avvio della pagina
    caricaSezioni();
});
