// URL da API
const ulrApi = 'https://projeto-integrador-back-end.vercel.app';

// input e buttons - adiciona e remove
const inputNumero = document.querySelector('#numero');
const botaoMais = document.querySelector('#botaoMais');
const botaoMenos = document.querySelector('#botaoMenos');
const confirmaEntrada = document.querySelector('#inputConfirmaEntrada');

// inputs formulario registrar saida
const modelo = document.querySelector('#inputModeloEntrada');
const codigo = document.querySelector('#inputCodigoEntrada');
const quantidade = document.querySelector('#inputQuantidadeEntrada');
const quantidadeSaida = document.querySelector('#numero');

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

    const resposta = await fetch(ulrApi, requestOptions);
    const conteudo = await resposta.json();

    if(conteudo == 'Código de chave já cadastrado!'){
      Swal.fire({
        title: "Código de chave já cadastrado!",
        icon: "warning",
        confirmButtonColor: "#5bc0de",
      });
      return;
    }

    if(conteudo == 'Chave cadastrada com sucesso!'){
      Swal.fire({
        title: "Chave cadastrada com sucesso!",
        icon: "success",
        confirmButtonColor: "#5cb85c",
      });

      setTimeout(()=> {
        window.location.href = './estoque.html';
      }, 1500);  
    }

  } catch (error) {
    return console.log(error);
  }
});


// Registra entradas no estoque
confirmaEntrada.addEventListener('click', async(event) => {
  try {
    event.preventDefault();
    const raw = {
      quantidade: +quantidadeSaida.value,
    }

    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(raw),
      headers: {
        "Content-Type": "application/json"
      }
    };

    if(quantidadeSaida.value == 0){
      Swal.fire({
        title: "Quantidade deve ser maior ou igual a 1.",
        icon: "warning",
        confirmButtonColor: "#0275d8",
      });
      return;
    }
    
    const resposta = await fetch(`${ulrApi}/entradas/${id}`, requestOptions);
    const conteudo = await resposta.json();

    if(conteudo == 'Entrada realizada com sucesso!'){
      await Swal.fire({
        title: `${quantidadeSaida.value} unidades adicionadas ao estoque!`,
        icon: "success",
        confirmButtonColor: "#5cb85c",
      });
    }

      window.location.href = './estoque.html';

  } catch (error) {
    return console.log(error);
  }
});

    // Adiciona um evento de clique ao botão de mais
    botaoMais.addEventListener('click', function(event) {
      event.preventDefault();
      inputNumero.value = parseInt(inputNumero.value) + 1;
    });

    // Adiciona um evento de clique ao botão de menos
    botaoMenos.addEventListener('click', function(event) {
      event.preventDefault();
      if (parseInt(inputNumero.value) > 0) {
        inputNumero.value = parseInt(inputNumero.value) - 1;
      }
    });