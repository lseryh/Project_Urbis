document.getElementById("registro-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const comentario = document.getElementById("comentario").value;
  const categoria = document.getElementById("categoria").value;
  const local = document.getElementById("local") ? document.getElementById("local").value : "";
  const foto = document.getElementById("foto").files[0];

  const formData = new FormData();
  formData.append("comentario", comentario);
  formData.append("categoria", categoria);
  formData.append("local", local);
  if (foto) formData.append("foto", foto);

  try {
    const resposta = await fetch("http://localhost:3000/api/ocorrencias", {
      method: "POST",
      body: formData
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      alert("✅ Ocorrência registrada com sucesso!");
      window.location.href = "feed.html";
    } else {
      alert(resultado.error || "Erro ao registrar ocorrência.");
    }
  } catch (erro) {
    console.error("❌ Erro ao enviar ocorrência:", erro);
    alert("Erro ao conectar com o servidor.");
  }
});
