document.addEventListener("DOMContentLoaded", async () => {
  const feedContainer = document.getElementById("feed");

  try {
    const response = await fetch("http://localhost:3000/api/ocorrencias");
    const ocorrencias = await response.json();

    feedContainer.innerHTML = ""; // limpa o texto "Carregando..."

    if (!ocorrencias || ocorrencias.length === 0) {
      feedContainer.innerHTML = "<p>Nenhuma ocorrência registrada ainda.</p>";
      return;
    }

    ocorrencias.forEach(ocorrencia => {
      const item = document.createElement("div");
      item.classList.add("feed-item");

      // Formata data de criação corretamente
      let dataFormatada = "Data não disponível";
      if (ocorrencia.createdAt) {
        dataFormatada = new Date(ocorrencia.createdAt).toLocaleString("pt-BR");
      } else if (ocorrencia._id) {
        // se não tiver createdAt, usa o timestamp do MongoID
        const timestamp = parseInt(ocorrencia._id.substring(0, 8), 16) * 1000;
        dataFormatada = new Date(timestamp).toLocaleString("pt-BR");
      }

      // Mostra a imagem se existir
      const imagemHTML = ocorrencia.imagem
        ? `<img src="/uploads/${ocorrencia.imagem}" 
                 alt="Imagem da ocorrência"
                 class="feed-imagem">`
        : "";

      item.innerHTML = `
        <h3>${ocorrencia.titulo || "Sem título"}</h3>
        <p>${ocorrencia.descricao || ""}</p>
        <p><strong>Local:</strong> ${ocorrencia.local || "Não informado"}</p>
        ${imagemHTML}
        <small>Registrado em: ${dataFormatada}</small>
      `;

      feedContainer.appendChild(item);
    });

  } catch (error) {
    console.error("Erro ao carregar ocorrências:", error);
    feedContainer.innerHTML = "<p>Erro ao carregar ocorrências.</p>";
  }
});

// --- Lightbox (abrir imagem ao clicar) ---
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('feed-imagem')) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = event.target.src;
    lightbox.style.display = 'flex';
  }
});

// Fechar lightbox ao clicar fora da imagem
document.getElementById('lightbox').addEventListener('click', (event) => {
  if (event.target.id === 'lightbox') {
    event.target.style.display = 'none';
  }
});
