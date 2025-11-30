// ================================================
//             Voltar para o Feed
// ================================================
function voltarFeed() {
  window.location.href = "feed.html";
}

// ================================================
//         Geolocalização automática
// ================================================
window.addEventListener("load", () => {
  const statusLocal = document.getElementById("status-local");
  const campoLocal = document.getElementById("local");

  if (!navigator.geolocation) {
    statusLocal.textContent = "⚠️ Geolocalização não suportada.";
    campoLocal.placeholder = "Digite o local manualmente";
    return;
  }

  statusLocal.textContent = "📍 Obtendo localização...";

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude.toFixed(6);
      const lon = pos.coords.longitude.toFixed(6);
      campoLocal.value = `${lat}, ${lon}`;
      statusLocal.textContent = "✅ Localização detectada automaticamente.";
    },
    (err) => {
      console.warn("Erro ao obter localização:", err);
      statusLocal.textContent =
        "⚠️ Não foi possível detectar a localização. Digite manualmente.";
      campoLocal.placeholder =
        "Ex: Rua das Flores, 120 - Centro";
    }
  );
});

// ================================================
//            Envio do formulário
// ================================================
document.getElementById("registro-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // 🔹 Elementos
  const comentarioEl = document.getElementById("comentario");
  const categoriaEl = document.getElementById("categoria");
  const localEl = document.getElementById("local");
  const fotoEl = document.getElementById("foto");

  // 🔹 Valores
  const comentario = comentarioEl.value.trim();
  const categoria = categoriaEl.value;
  const local = localEl ? localEl.value.trim() : "";
  const foto = fotoEl.files[0];

  // ================================
  //          Validações
  // ================================
  if (!comentario) {
    alert("Por favor, escreva um comentário.");
    return;
  }

  if (!categoria) {
    alert("Por favor, selecione uma categoria.");
    return;
  }

  // ================================
  //    Preparar dados para envio
  // ================================
  const formData = new FormData();
  formData.append("comentario", comentario);
  formData.append("categoria", categoria);
  formData.append("local", local);
  if (foto) formData.append("foto", foto);

  // ================================
  //      Enviar ao servidor
  // ================================
  try {
    const resposta = await fetch("http://localhost:3000/api/ocorrencias", {
      method: "POST",
      body: formData
    });

    let resultado;

    try {
      resultado = await resposta.json();
    } catch {
      resultado = { error: "Resposta inválida do servidor." };
    }

    if (resposta.ok) {
      alert("✅ Ocorrência registrada com sucesso!");
      window.location.href = "feed.html";
    } else {
      console.error("Erro no servidor:", resultado);
      alert(resultado.error || "Erro ao registrar ocorrência.");
    }

  } catch (erro) {
    console.error("❌ Erro ao enviar ocorrência:", erro);
    alert("Erro ao conectar com o servidor.");
  }
});
