document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM caricato.");

  // Inizializza Supabase
  const supabaseUrl = "https://owrguuznmjhtkoqqlcen.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
  // Usa un nome diverso per evitare confusione con la libreria
  const sbClient = window.supabase.createClient(supabaseUrl, supabaseKey);

  // Quando clicchi il pulsante, fa una SELECT sulla tabella "sezioni"
  document.getElementById("btn-test").addEventListener("click", async () => {
    try {
      const { data, error } = await sbClient
        .from("sezioni")
        .select("*");
      if (error) {
        console.error("Errore:", error);
      } else {
        console.log("Dati dalla tabella 'sezioni':", data);
      }
    } catch (err) {
      console.error("Eccezione:", err);
    }
  });
});
