const SUPABASE_URL = "https://owrguuznmjhtkoqqlcen.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93cmd1dXpubWpodGtvcXFsY2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NDMwMjQsImV4cCI6MjA1NTExOTAyNH0._P2X1F6jiZSDCTXN6hwhtdetEonk7W7xVCnJ64l9pIA";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function caricaSezioni() {
    let { data, error } = await supabase.from("sezioni").select("*");
    if (error) {
        console.error("Errore nel recupero sezioni", error);
        return;
    }

    const lista = document.getElementById("lista-sezioni");
    lista.innerHTML = "";
    data.forEach(sezione => {
        let li = document.createElement("li");
        li.textContent = sezione.nome;
        lista.appendChild(li);
    });
}

async function aggiungiSezione() {
    let nome = document.getElementById("nome-sezione").value;
    if (!nome) return alert("Inserisci un nome!");

    let { data, error } = await supabase.from("sezioni").insert([{ nome }]);
    if (error) {
        console.error("Errore nell'inserimento", error);
        return;
    }

    document.getElementById("nome-sezione").value = "";
    caricaSezioni();
}

caricaSezioni();
