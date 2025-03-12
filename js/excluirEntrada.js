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

confirmaSaida.addEventListener('click', async (event)=> {
  try {
    event.preventDefault();
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      }
    }

    const resposta = await fetch(`${urlApi}/entradas/${id}`, requestOptions);
    const conteudo = await resposta.json();

    if(conteudo == 'Entrada não encontrada!'){
      Swal.fire({
        title: "Entrada não encontrada!",
        icon: "warning",
        confirmButtonColor: "#0275d8",
      });
      return;
    };

    if(conteudo == 'Falha ao excluir entrada tente novamnte!'){
      Swal.fire({
        title: "Falha ao excluir entrada tente novamnte!",
        icon: "warning",
        confirmButtonColor: "#0275d8",
      });
      return;
    }

    if(conteudo == 'Entrada excluida com sucesso!'){
      Swal.fire({
        title: "Entrada excluida com sucesso!",
        icon: "success",
        confirmButtonColor: "#0275d8",
      });

      setTimeout(()=> {
        window.location.href = './entradas.html';
      }, 1500)

    };

    console.log(conteudo);

  } catch (error) {
    return console.log(error);
  }
});