const ulrApi = 'https://pi3univesp.vercel.app/usuarios';

const contaNome = document.querySelector('#contaNome');
const contaEmail = document.querySelector('#contaEmail');
const contaSenha = document.querySelector('#contaSenha');
const contaConfirmaSenha = document.querySelector('#contaConfirmaSenha');
const btnContaCadastrar = document.querySelector('#btnContaCadastrar');

btnContaCadastrar.addEventListener('click', async (event) => {
  event.preventDefault();
  
  if (contaSenha.value !== contaConfirmaSenha.value) {
    Swal.fire({
      title: "Senhas não conferem!",
      icon: "info",
      confirmButtonColor: "#5bc0de",
    });
    return;
  }

  if (!contaConfirmaSenha.value) {
    contaConfirmaSenha.focus();
  }
  if (!contaSenha.value) {
    contaSenha.focus();
  }
  if (!contaEmail.value) {
    contaEmail.focus();
  }
  if (!contaNome.value) {
    contaNome.focus();
  }

  try {
    const raw = {
      nome: contaNome.value,
      email: contaEmail.value,
      senha: contaSenha.value
    }

    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(raw),
      headers: {
        "Content-Type": "application/json"
      }
    };

    const resposta = await fetch(ulrApi, requestOptions);
    const conteudo = await resposta.json();

    if (resposta.status === 409) {
      Swal.fire({
        title: "E-mail já cadastrado!",
        icon: "warning",
        confirmButtonColor: "#f0ad4e",
      });
      return;
    }

    if (resposta.status === 201) {
      Swal.fire({
        title: "Usuário cadastrado com sucesso!",
        icon: "success",
        confirmButtonColor: "#5cb85c",
      });

      setTimeout(() => {
        window.location.href = './gerenciarContas.html';
      }, 1500);
    }

  } catch (error) {
    console.log(error);
  }

});
