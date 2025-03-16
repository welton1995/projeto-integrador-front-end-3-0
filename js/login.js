document.addEventListener("DOMContentLoaded", () => {
    const modeToggleBtn = document.getElementById("toggleDarkMode");
    const modeIcon = document.getElementById("modeIcon");
    const modalContent = document.querySelector(".modal-content");
  
    // Verifica se o modo escuro estava ativo ao carregar a página
    if (localStorage.getItem("darkMode") === "true") {
        ativarModoEscuro();
    }
  
    // Alternar Modo Claro/Escuro ao clicar no botão
    modeToggleBtn.addEventListener("click", () => {
        if (document.body.classList.contains("dark-mode")) {
            desativarModoEscuro();
        } else {
            ativarModoEscuro();
        }
    });
  
    function ativarModoEscuro() {
        document.body.classList.add("dark-mode");
        if (modalContent) modalContent.classList.add("dark-mode");
  
        localStorage.setItem("darkMode", "true");
        modeIcon.classList.replace("fa-moon", "fa-sun");
    }
  
    function desativarModoEscuro() {
        document.body.classList.remove("dark-mode");
        if (modalContent) modalContent.classList.remove("dark-mode");
  
        localStorage.setItem("darkMode", "false");
        modeIcon.classList.replace("fa-sun", "fa-moon");
    }
  
    // Verifica se o usuário já está logado
    const usuarioLogado = JSON.parse(localStorage.getItem("user"));
    if (usuarioLogado) {
        console.log("Usuário logado:", usuarioLogado);
        // Você pode exibir uma mensagem ou redirecionar o usuário para a home
    }
  
    // Lógica de Login
    document.getElementById("loginForm").addEventListener("submit", async function(event) {
        event.preventDefault();
  
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const errorMessage = document.getElementById("errorMessage");
        const loading = document.querySelector('#loading');
  
        try {
            const response = await fetch('https://projeto-integrador-back-end-3-0.vercel.app/login', {  
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
  
            const data = await response.json();
  
            if (!response.ok) {
                throw new Error(data.msg || 'Erro ao fazer login');
            }
  
            // Armazena os dados no localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
  
            loading.style.display = 'block';
            setTimeout(() => {
                window.location.href = "./pages/home.html";
            }, 300);
  
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });
  
    // Recuperação de senha
    document.getElementById("sendRecoveryEmail").addEventListener("click", async function() {
        const forgotEmail = document.getElementById("forgotEmail").value;
        const successMessage = document.getElementById("successMessage");
  
        if (!forgotEmail) {
            successMessage.textContent = "Por favor, insira um email válido.";
            successMessage.style.color = "red";
            return;
        }
  
        try {
            const response = await fetch('http://localhost:3333/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotEmail })
            });
  
            const data = await response.json();
  
            if (!response.ok) {
                throw new Error(data.msg || 'Erro ao enviar email de recuperação.');
            }
  
            successMessage.textContent = "Email enviado com sucesso! Verifique sua caixa de entrada.";
            successMessage.style.color = "green";
  
        } catch (error) {
            successMessage.textContent = error.message;
            successMessage.style.color = "red";
        }
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  });
  