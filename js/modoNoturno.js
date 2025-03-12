// Função para aplicar o tema
function applyTheme(isDarkMode) {
  const body = document.body;
  const containers = document.querySelectorAll('.container-default'); // Seleciona todos os containers com a classe .container-default
  const nav = document.querySelector('.navbar');
  const cards = document.querySelectorAll('.card');
  const footer = document.querySelector('.footer');
  const toggleButton = document.getElementById('toggleDarkMode');
  const buttons = document.querySelectorAll('.btns'); // Seleciona todos os botões com a classe .btns
  const html = document.documentElement; // Seleciona a tag <html>

  if (isDarkMode) {
    // Aplica o modo noturno
    body.classList.add('bg-dark', 'text-light');
    containers.forEach(container => container.classList.add('container-default-dark')); // Aplica o tema escuro a todos os containers
    nav.classList.add('header-dark', 'navbar-dark');
    nav.classList.remove('navbar-light');
    cards.forEach(card => card.classList.add('bg-dark', 'text-light', 'border-light'));
    footer.classList.add('footer-dark', 'text-light');
    buttons.forEach(button => button.classList.add('btn-dark', 'text-light', 'border-light')); // Aplica o dark mode nos botões
    toggleButton.textContent = '🌞';
    html.setAttribute('data-bs-theme', 'dark'); // Adiciona o atributo ao <html>
  } else {
    // Remove o modo noturno
    body.classList.remove('bg-dark', 'text-light');
    containers.forEach(container => container.classList.remove('container-default-dark')); // Remove o tema escuro de todos os containers
    nav.classList.remove('header-dark', 'navbar-dark');
    nav.classList.add('navbar-light');
    cards.forEach(card => card.classList.remove('bg-dark', 'text-light', 'border-light'));
    footer.classList.remove('footer-dark', 'text-light');
    buttons.forEach(button => button.classList.remove('btn-dark', 'text-light', 'border-light')); // Remove o dark mode dos botões
    toggleButton.textContent = '🌙';
    html.removeAttribute('data-bs-theme'); // Remove o atributo do <html>
  }
}

// Carrega o tema ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  applyTheme(isDarkMode); // Aplica o tema salvo
});

// Alterna o tema e salva no localStorage
document.getElementById('toggleDarkMode').addEventListener('click', function () {
  const isDarkMode = document.body.classList.contains('bg-dark');
  applyTheme(!isDarkMode); // Alterna o tema
  localStorage.setItem('darkMode', !isDarkMode); // Salva a preferência
});
