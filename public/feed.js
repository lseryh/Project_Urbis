const form = document.getElementById('formOcorrencia'); // o formulário que você já criou
const feed = document.getElementById('feedOcorrencias'); // onde as ocorrências aparecerão

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  await fetch('http://localhost:3000/api/ocorrencias/nova', {
    method: 'POST',
    body: formData
  });

  form.reset();
  carregarOcorrencias();
});

// Função para carregar o feed
async function carregarOcorrencias() {
  const res = await fetch('http://localhost:3000/api/ocorrencias');
  const ocorrencias = await res.json();

  feed.innerHTML = ocorrencias.map(o => `
    <div class="card">
      <h3>${o.local}</h3>
      <p><strong>Data:</strong> ${new Date(o.data).toLocaleDateString()}</p>
      <p>${o.comentario || ''}</p>
      ${o.foto ? `<img src="http://localhost:3000/uploads/${o.foto}" width="250">` : ''}
    </div>
  `).join('');
}

carregarOcorrencias();
