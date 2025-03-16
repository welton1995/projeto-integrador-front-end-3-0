document.addEventListener("DOMContentLoaded", async ()=> {
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