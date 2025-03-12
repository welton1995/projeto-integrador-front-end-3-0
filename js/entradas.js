// URL da API
const apiServico = 'https://projeto-integrador-back-end.vercel.app';

const modeloCadastrar = document.querySelector('#inputModeloCadastrar');
const codigoCadastrar = document.querySelector('#inputCodigoCadastrar');
const quantidadeCadastrar = document.querySelector('#inputQuantidadeCadastrar');
const btnCadastrar = document.querySelector('#btnCadastrar');
const tabela = document.querySelector('#tabela');
const loadingImg = document.querySelector('#loading');

// Lista todas chaves cadastradas
const buscaRegistros = async () => {
  try {
    loadingImg.style.display = 'inline-block';
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const resposta = await fetch(`${apiServico}/entradas`, requestOptions);
    const conteudo = await resposta.json();
    console.log(conteudo)

    // Se não possuir entradas
    if(conteudo.length == 0){
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td colspan="5" class="text-center">Nenhuma entrada realizada.</td>
      `
      tabela.appendChild(tr);
      loadingImg.style.display = 'none';
      return;
    }

    conteudo.reverse().forEach((chave)=>{

      const dataFormatada = new Date(chave.data);
      const dataCorreta = dataFormatada.toLocaleDateString('pt-BR', {timeZone: 'UTC', year: '2-digit', month:'numeric', day: 'numeric'});

      const tr = document.createElement('tr');
      tr.innerHTML = `

      <td class="text-center align-middle">${chave.chaves.nome}</a></td>
      <td class="text-center align-middle">${chave.chaves.codigo}</a></td>
      <td class="text-center align-middle">${chave.quantidade}</a></td>
      <td class="text-center align-middle">${dataCorreta}</a></td>
      <td class="text-center align-middle">
        <a href="./excluirEntrada.html?id=${chave._id}&nome=${chave.chaves.nome}&codigo=${chave.chaves.codigo}&quantidade=${chave.chaves.quantidade}&=${chave.data}"><img src="../imgs/lixeira.png" width="24px" title="Remover produto" class='icon'></a>
      </td>
      `
      tabela.appendChild(tr); 
    loadingImg.style.display = 'none';
    });

  } catch (error) {
    return console.log(error);
  }
}
buscaRegistros();


// Cadastra uma chave no Banco de dados
btnCadastrar.addEventListener('click', async(event)=> {
  if(!modeloCadastrar.value || !codigoCadastrar.value || !quantidadeCadastrar.value) {
   await Swal.fire({
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

    const resposta = await fetch(apiServico, requestOptions);
    const conteudo = await resposta.json();

    if(conteudo == 'Código de chave já cadastrado!'){
      await Swal.fire({
        title: "Código de chave já cadastrado!",
        icon: "info",
        confirmButtonColor: "#5bc0de",
      });
      return;
    }

    if(conteudo == 'Chave cadastrada com sucesso!'){
     await Swal.fire({
        title: "Chave cadastrada com sucesso!",
        icon: "success",
        confirmButtonColor: "#5cb85c",
      });
    }


      window.location.href = './estoque.html';

  } catch (error) {
    return console.log(error);
  }
});
