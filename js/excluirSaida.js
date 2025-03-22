// URL da API
const urlApi = 'https://projeto-integrador-back-end.vercel.app';

// inputs formulario registrar saida
const modelo = document.querySelector('#inputModeloSaida');
const codigo = document.querySelector('#inputCodigoSaida');
const quantidade = document.querySelector('#inputQuantidadeSaida');
const confirmaSaida = document.querySelector('#inputConfirmaSaida');

// informações captadas via parametros de URL
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id');
const modeloURL = parametros.get('nome');
const codigoURL = parametros.get('codigo');
const quantidadeURL = parametros.get('quantidade');

// atribui as informações recebidas ao html;
modelo.value = modeloURL;
codigo.value = codigoURL;
quantidade.value = quantidadeURL;

confirmaSaida.addEventListener('click', async (event) => {
  try {
    event.preventDefault();
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      }
    }

    const resposta = await fetch(`${urlApi}/saidas/${id}`, requestOptions);
    const conteudo = await resposta.json();

    if (conteudo == 'Saída não encontrada!') {
      Swal.fire({
        title: "Saída não encontrada!",
        icon: "warning",
        confirmButtonColor: "#0275d8",
      });
      return;
    };

    if (conteudo == 'Falha ao excluir saída tente novamnte!') {
      Swal.fire({
        title: "Falha ao excluir saída tente novamnte!",
        icon: "warning",
        confirmButtonColor: "#0275d8",
      });
      return;
    }

    if (conteudo == 'Saída excluida com sucesso!') {
      Swal.fire({
        title: "Saída excluida com sucesso!",
        icon: "success",
        confirmButtonColor: "#0275d8",
      });

      setTimeout(() => {
        window.location.href = './saidas.html';
      }, 1500)

    };

    console.log(conteudo);

  } catch (error) {
    return console.log(error);
  }
});