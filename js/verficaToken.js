document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    await Swal.fire({
      title: "Usuário não autorizado!",
      icon: "info",
      confirmButtonColor: "#0275d8",
    });
    window.location.href = "../index.html";
  }
});


setInterval(() => {
  localStorage.clear(); 
  window.location.reload();
}, 3 * 60 * 60 * 1000); 

const sair = document.querySelector("#sair");

sair.addEventListener("click", async (event) => {
  event.preventDefault();

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 80);
});
