document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM caricato.");

  // Inizializza Supabase
  const supabaseUrl = "https://owrguuznmjhtkoqqlcen.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93cmd1dXpubWpodGtvcXFsY2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NDMwMjQsImV4cCI6MjA1NTExOTAyNH0._P2X1F6jiZSDCTXN6hwhtdetEonk7W7xVCnJ64l9pIA";
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
