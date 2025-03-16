const url = 'https://pi3univesp.vercel.app/usuarios';


const contaNomeExcluir = document.querySelector('#contaNomeExcluir');
const contaEmailExcluir = document.querySelector('#contaEmailExcluir');
const btnExcluirConfirma = document.querySelector('#btnExcluirConfirma');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const usuario = params.get('usuario');
const email = params.get('email');

contaNomeExcluir.value = usuario;
contaEmailExcluir.value = email;

btnExcluirConfirma.addEventListener('click', async (event)=> {
  event.preventDefault();
  try {
    event.preventDefault();
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      }
    }

    const resposta = await fetch(`${url}/${id}`, requestOptions);
    const conteudo = await resposta.json();

    if(resposta.status === 404){
     await Swal.fire({
        title: "Usuário não encontrado!",
        icon: "info",
        confirmButtonColor: "#0275d8",
      });
      return;
    }

    if(resposta.status === 500){
     await Swal.fire({
        title: "Falha ao excluir usuário tente novamnte!",
        icon: "info",
        confirmButtonColor: "#0275d8",
      });
      return;
    }

    if(resposta.status === 200){
     await Swal.fire({
        title: "Usuário excluido com sucesso!",
        icon: "success",
        confirmButtonColor: "#0275d8",
      });

      window.location.href = './gerenciarContas.html'
      return;
    }

  } catch (error) {
    console.log(error);
  }
});



contaNomeExcluir.value = 'welton'