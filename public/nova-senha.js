document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  const form = document.getElementById("formNovaSenha");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newPassword = document.getElementById("novaSenha").value;

    try {
      const response = await fetch("http://localhost:3000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Senha redefinida com sucesso!");
        window.location.href = "login.html";
      } else {
        alert(data.message || "Erro ao redefinir senha.");
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
      alert("Erro no servidor.");
    }
  });
});
