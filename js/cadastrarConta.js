const api = 'https://pi3univesp.vercel.app/usuarios';

const contaNome = document.querySelector('#contaNome');
const contaEmail = document.querySelector('#contaEmail');
const contaSenha = document.querySelector('#contaSenha');
const contaTipo = document.querySelector('#contaTipo');
const contaConfirmaSenha = document.querySelector('#contaConfirmaSenha');
const btnContaCadastrar = document.querySelector('#btnContaCadastrar');
const contaLoading = document.querySelector('#cadastrarLoading');

// Função para validar e-mail
function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}


btnContaCadastrar.addEventListener('click', async (event) => {
  event.preventDefault(); // Impede o envio padrão do formulário

  const userStorage = JSON.parse(localStorage.getItem('user'));

  if (userStorage && userStorage.tipo != "administrador") {
    await Swal.fire({
      text: `${userStorage.nome}, Você não possui permissão para adicionar usuários!`,
      icon: "info",
      confirmButtonColor: "#0275d8",
    });
    return;
  } 
  

  contaLoading.style.display = 'block';

  // Verificar se todos os campos estão preenchidos
  if (!contaNome.value || !contaEmail.value || !contaSenha.value || !contaConfirmaSenha.value) {
    await Swal.fire({
      title: "Preencha todos os campos corretamente!",
      icon: "warning",
      confirmButtonColor: "#5bc0de",
    });

    if (!contaNome.value) contaNome.focus();
    else if (!contaEmail.value) contaEmail.focus();
    else if (contaTipo.value === 'none') contaTipo.focus();
    else if (!contaSenha.value) contaSenha.focus();
    else contaConfirmaSenha.focus();

    contaLoading.style.display = 'none';

    return;
  }

  if(contaTipo.value === 'none') {
    await Swal.fire({
      title: "Selecione o tipo de usuário!",
      icon: "info",
      confirmButtonColor: "#5bc0de",
    });
    contaTipo.focus();
  
    contaLoading.style.display = 'none';

    return;
  }

  // Verificar se o e-mail é válido
  if (!validarEmail(contaEmail.value)) {
    await Swal.fire({
      title: "E-mail inválido!",
      text: "Por favor, insira um e-mail válido.",
      icon: "warning",
      confirmButtonColor: "#5bc0de",
    });

    contaLoading.style.display = 'none';
    
    contaEmail.focus();
    return;
  }

  // Verificar se as senhas conferem
  if (contaSenha.value !== contaConfirmaSenha.value) {
    await Swal.fire({
      title: "Senhas não conferem!",
      icon: "info",
      confirmButtonColor: "#5bc0de",
    });

    contaLoading.style.display = 'none';

    contaSenha.focus();
    return;
  }

  // Verificar se a senha tem pelo menos 6 caracteres
  if (contaSenha.value.length < 6) {
    await Swal.fire({
      title: "A senha deve ter no mínimo 6 caracteres!",
      icon: "info",
      confirmButtonColor: "#5bc0de",
    });

    contaLoading.style.display = 'none';

    contaSenha.focus();
    return;
  }

  try {
    const raw = {
      nome: contaNome.value,
      email: contaEmail.value,
      senha: contaSenha.value,
      tipo: contaTipo.value
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(raw),
      redirect: 'follow'
    };

    const resposta = await fetch(api, requestOptions);
    const conteudo = await resposta.json();

    if (resposta.status === 409) {
      await Swal.fire({
        title: "E-mail já cadastrado!",
        icon: "warning",
        confirmButtonColor: "#f0ad4e",
      });
      return;
    }

    if (resposta.status === 201) {
      await Swal.fire({
        title: "Usuário cadastrado com sucesso!",
        icon: "success",
        confirmButtonColor: "#5cb85c",
      });

      window.location.href = './gerenciarContas.html';
    }

  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    await Swal.fire({
      title: "Erro ao cadastrar!",
      text: "Ocorreu um erro inesperado. Tente novamente.",
      icon: "error",
      confirmButtonColor: "#d9534f",
    });
  }
});
