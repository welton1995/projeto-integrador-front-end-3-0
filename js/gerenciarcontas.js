const urlApi = 'https://pi3univesp.vercel.app/usuarios';


// Lista todas chaves cadastradas
const buscaRegistros = async () => {
  try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const resposta = await fetch(urlApi, requestOptions);
    const conteudo = await resposta.json();

    if(conteudo.users.length == 0){
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td colspan="5" class="text-center">Estoque vazio.</td>
      `
      tabela.appendChild(tr);
      return;
    }

    console.log(conteudo);

    conteudo.users.reverse().forEach((usuario)=>{
      const tabela = document.querySelector('#tabela');
      const tr = document.createElement('tr');
      tr.innerHTML = `

      <td class="text-center align-middle">${usuario.nome}</a></td>
      <td class="text-center align-middle">${usuario.email}</a></td>
      <td class="text-center align-middle">
        <a href="./editarConta.html?id=${usuario._id}&usuario=${usuario.nome}&email=${usuario.email}"><img src="../imgs/pencil.png" width="24px" title="Editar Usuario" class='icon'></a>
        <a href="./excluirConta.html?id=${usuario._id}&usuario=${usuario.nome}&email=${usuario.email}"><img src="../imgs/lixeira.png" width="24px" title="Remover Usuario" class='icon'></a>
      </td>
      `
      tabela.appendChild(tr); 
    });

  } catch (error) {
    return console.log(error);

  }
}

buscaRegistros();