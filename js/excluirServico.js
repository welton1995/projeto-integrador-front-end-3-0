const apiTeste = 'https://projeto-integrador-back-end-2-0.vercel.app';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const tipoURL = params.get('tipo');
const precoURL = params.get('preco');
const custoURL = params.get('custo');
const quantidadeURL = params.get('quantidade');
const observacaoURL = params.get('observacao');
const horaURL = params.get('data');
const btnExcluir = document.querySelector('#btnExcluirServico');

// Excluir Servico
const excluir = async () => {
  try {
    const excluir = document.querySelector('#servicosExcluir');
    const tr = document.createElement('tr');
    tr.innerHTML = `
  <td class="text-center align-middle" title="Tipo do serviço realizado.">${tipoURL}</td>
  <td class="text-center align-middle" title="Valor cobrado pelo serviço.">${precoURL}</td>
  <td class="text-center align-middle" title="Custo para realizar o serviço.">${custoURL}</td>
  <td class="text-center align-middle" title="Quantidade realizado(a).">${quantidadeURL}</td>
  <td class="text-center align-middle" title="Lucro ganho pelo serviço realizado.">${((precoURL - custoURL) * quantidadeURL).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
  <td class="text-center align-middle" title="Porcentagem de lucro ganha no serviço realizado. (Por unidade)">${(((precoURL - custoURL) / custoURL) * 100).toFixed(2)} % </td>
  <td class="text-center align-middle" title="Data que o serviço foi realizado.">${new Date(horaURL).toLocaleDateString('pt-BR')}</td>
  <td class="text-center align-middle" title="Observações.">${observacaoURL}</td>
`;

    excluir.appendChild(tr);
  } catch (error) {
    console.log(error);
  }
}

excluir();

btnExcluir.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      }
    }

    const resposta = await fetch(`${apiTeste}/servicos/${id}`, requestOptions);
    const conteudo = await resposta.json();

    if (conteudo.message == 'Servico removido com sucesso!') {
      await Swal.fire({
        title: "Serviço removido com sucesso!",
        icon: "success",
        confirmButtonColor: "#0275d8",
      });
    }

    window.location.href = './servicos.html';

    console.log(conteudo);

  } catch (error) {
    console.log(error);
  }
})