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

// inputs para cadastrar chave
const modeloCadastrar = document.querySelector('#inputModeloCadastrar');
const codigoCadastrar = document.querySelector('#inputCodigoCadastrar');
const quantidadeCadastrar = document.querySelector('#inputQuantidadeCadastrar');
const btnCadastrar = document.querySelector('#btnCadastrar');

// cadastra chave
btnCadastrar.addEventListener('click', async(event)=> {
  if(!modeloCadastrar.value || !codigoCadastrar.value || !quantidadeCadastrar.value) {
    Swal.fire({
      title: "Preencha todos os campos e tente novamente!",
      icon: "info",
      confirmButtonColor: "#5bc0de",
    });
    return;
  }

  try {
    event.preventDefault();
    const raw = {
      nome: modeloCadastrar.value,
      codigo: codigoCadastrar.value,
      quantidade: quantidadeCadastrar.value
    }

    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(raw),
      headers: {
        "Content-Type": "application/json"
      }
    };

    const resposta = await fetch(urlApi, requestOptions);
    const conteudo = await resposta.json();

    if(conteudo == 'Código de chave já cadastrado!'){
      await Swal.fire({
        title: "Código de chave já cadastrado!",
        icon: "warning",
        confirmButtonColor: "#5bc0de",
      });
      return;
    }

    if(conteudo == 'Chave cadastrada com sucesso!'){
    await  Swal.fire({
        title: "Chave cadastrada com sucesso!",
        icon: "success",
        confirmButtonColor: "#5cb85c",
      });

        window.location.href = './estoque.html';

    }

  } catch (error) {
    return console.log(error);
  }
});


// Exclui chave do estoque
confirmaSaida.addEventListener('click', async(event)=> {
  try {
    event.preventDefault();
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      }
    }

    const resposta = await fetch(`${urlApi}/${id}`, requestOptions);
    const conteudo = await resposta.json();

    if(conteudo == 'Chave não encontrada!'){
     await Swal.fire({
        title: "Chave não encontrada!",
        icon: "warning",
        confirmButtonColor: "#0275d8",
      });
      return;
    };

    if(conteudo == 'Falha ao excluir chave tente novamnte!'){
      Swal.fire({
        title: "Falha ao excluir chave tente novamnte!",
        icon: "warning",
        confirmButtonColor: "#0275d8",
      });
      return;
    }

    if(conteudo == 'Chave excluida com sucesso!'){
     await Swal.fire({
        title: "Chave excluída com sucesso!",
        icon: "success",
        confirmButtonColor: "#0275d8",
      });

        window.location.href = './estoque.html';


    };

  } catch (error) {
    return console.log(error);
  }
});