document.addEventListener("DOMContentLoaded", () => {
  // 1) Inizializzo Supabase
  const supabaseUrl = "https://owrguuznmjhtkoqqlcen.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93cmd1dXpubWpodGtvcXFsY2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NDMwMjQsImV4cCI6MjA1NTExOTAyNH0._P2X1F6jiZSDCTXN6hwhtdetEonk7W7xVCnJ64l9pIA";
  const sb = window.supabase.createClient(supabaseUrl, supabaseKey);

  // 2) Funzione per caricare i record
  async function caricaSezioni() {
    const { data, error } = await sb.from("sezioni").select("*");
    if (error) {
      console.error("Errore nel caricamento delle sezioni:", error);
      return;
    }
    console.log("Dati da Supabase:", data);

    const lista = document.getElementById("sezioni-list");
    lista.innerHTML = "";

    if (!data || data.length === 0) {
      lista.innerHTML = "<tr><td colspan='4'>Nessuna sezione trovata</td></tr>";
      return;
    }

    data.forEach(sezione => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${sezione.id}</td>
        <td>${sezione.Nome}</td>
        <td>${sezione.Email}</td>
        <td>
          <button class="btn-details" data-id="${sezione.id}" data-nome="${sezione.Nome}" data-email="${sezione.Email}">Dettagli</button>
          <button class="btn-delete" data-id="${sezione.id}">Elimina</button>
        </td>
      `;
      lista.appendChild(row);
    });
  }

  // 3) Funzione per aggiungere un record
  async function aggiungiSezione() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nome || !email) {
      alert("Inserisci tutti i campi!");
      return;
    }

    const { error } = await sb.from("sezioni").insert([{ Nome: nome, Email: email }]);
    if (error) {
      console.error("Errore nell'inserimento:", error);
      alert("Errore nell'inserimento!");
    } else {
      document.getElementById("nome").value = "";
      document.getElementById("email").value = "";
      caricaSezioni();
    }
  }

  // 4) Funzione per mostrare dettagli in un modale
  function mostraDettagli(id, nome, email) {
    document.getElementById("modal-id").textContent = id;
    document.getElementById("modal-nome").textContent = nome;
    document.getElementById("modal-email").textContent = email;
    document.getElementById("modal").style.display = "block";
  }

  // 5) Funzione per chiudere il modale
  function chiudiModal() {
    document.getElementById("modal").style.display = "none";
  }

  // 6) Funzione per eliminare una sezione
  async function eliminaSezione(id) {
    if (!confirm("Sei sicuro di voler eliminare la sezione?")) return;
    const { error } = await sb.from("sezioni").delete().eq("id", id);
    if (error) {
      console.error("Errore eliminazione:", error);
      alert("Errore nell'eliminazione!");
    } else {
      caricaSezioni();
    }
  }

  // 7) Assegno gli event listener
  document.getElementById("btn-aggiungi").addEventListener("click", aggiungiSezione);
  document.getElementById("close-modal").addEventListener("click", chiudiModal);

  // Event delegation per pulsanti "Dettagli" ed "Elimina"
  document.getElementById("sezioni-list").addEventListener("click", (e) => {
    const target = e.target;
    // Se clicco su "Dettagli"
    if (target.classList.contains("btn-details")) {
      const id = target.dataset.id;
      const nome = target.dataset.nome;
      const email = target.dataset.email;
      mostraDettagli(id, nome, email);
    }
    // Se clicco su "Elimina"
    else if (target.classList.contains("btn-delete")) {
      const id = target.dataset.id;
      eliminaSezione(id);
    }
  });

  // 8) Carico subito la lista all'avvio
  caricaSezioni();
});
