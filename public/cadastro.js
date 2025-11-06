// Cadastro
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCadastro");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // impede o recarregamento da página

    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, cpf, telefone, endereco }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ " + data.message);
        form.reset(); // limpa o formulário
      } else {
        alert("Erro: " + data.message);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao se conectar ao servidor.");
    }
  });
});

