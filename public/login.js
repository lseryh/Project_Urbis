document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login realizado com sucesso!");
        console.log("Usuário logado:", data);
        window.location.href = "feed.html";
      } else {
        alert("Erro: " + data.message);
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
      alert("Erro ao se conectar ao servidor.");
    }
  });
});
