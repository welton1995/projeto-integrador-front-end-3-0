const api = 'https://pi3univesp.vercel.app/usuarios';

const contaNome = document.querySelector('#contaNome');
const contaEmail = document.querySelector('#contaEmail');
const contaSenha = document.querySelector('#contaSenha');
const contaConfirmaSenha = document.querySelector('#contaConfirmaSenha');
const btnContaCadastrar = document.querySelector('#btnContaCadastrar');

// Função para validar e-mail
function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

btnContaCadastrar.addEventListener('click', async (event) => {
  event.preventDefault();
  
  // Verificar se todos os campos estão preenchidos
  if (!contaNome.value || !contaEmail.value || !contaSenha.value || !contaConfirmaSenha.value) {
    await Swal.fire({
      title: "Preencha todos os campos!",
      icon: "warning",
      confirmButtonColor: "#5bc0de",
    });

    if (!contaNome.value) contaNome.focus();
    else if (!contaEmail.value) contaEmail.focus();
    else if (!contaSenha.value) contaSenha.focus();
    else contaConfirmaSenha.focus();

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
    contaSenha.focus();
    return;
  }

  // Verificar se a senha tem pelo menos 6 caracteres
  if (contaSenha.value.length < 6 || contaConfirmaSenha.value.length < 6) {
    await Swal.fire({
      title: "A senha deve ter no mínimo 6 caracteres!",
      icon: "info",
      confirmButtonColor: "#5bc0de",
    });
    contaSenha.focus();
    return;
  }

  try {
    const raw = {
      nome: contaNome.value,
      email: contaEmail.value,
      senha: contaSenha.value
    };

    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(raw),
      headers: {
        "Content-Type": "application/json"
      }
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
