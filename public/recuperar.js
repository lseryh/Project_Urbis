document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("input[name='email']").value;

    try {
      const response = await fetch("http://localhost:3000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("E-mail confirmado!");
        // Redireciona para a página de nova senha
        window.location.href = `nova-senha.html?email=${encodeURIComponent(email)}`;
      } else {
        alert(data.message || "Erro ao confirmar e-mail.");
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
      alert("Erro ao se conectar ao servidor.");
    }
  });
});
