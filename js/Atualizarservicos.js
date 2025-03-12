const apiServico = 'https://projeto-integrador-back-end-2-0.vercel.app';
const address = 'https://bschaveiro.vercel.app';


const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const tipoURL = params.get('tipo');
const precoURL = params.get('preco');
const custoURL = params.get('custo');
const quantidadeURL = params.get('quantidade');
const observacaoURL = params.get('observacao');
const horaURL = params.get('data');
const btnAtualizar = document.querySelector('#btnAtualizarServico');

// Atualizar
const tipoServico = document.querySelector('#servicoTipo');
const precoServico = document.querySelector('#servicoPreco');
const custoServico = document.querySelector('#servicoCusto');
const quantidadeServicoAtualizar = document.querySelector('#servicoQuantidade');
const observacaoServico = document.querySelector('#servicoObservacao');
const horaServico = document.querySelector('#servicoData');

// Cadastrar
const tipoModal = document.querySelector('#servicoTipoModal');
const precoModal = document.querySelector('#servicoPrecoModal');
const custoModal = document.querySelector('#servicoCustoModal');
const quantidadeServicoModal = document.querySelector('#servicoQuantidadeModal');
const observacaoModal = document.querySelector('#servicoObservacaoModal');
const horaModal = document.querySelector('#servicoDataModal');
const btnCadastrarServicoModal = document.querySelector('#btnServicoCadastrar');

// Seta os valores vindos da URL nos inputs
tipoServico.value = tipoURL;
precoServico.value = precoURL;
custoServico.value = custoURL;
quantidadeServicoAtualizar.value = quantidadeURL;
observacaoServico.value = observacaoURL;
// horaServico.value = new Date(horaURL).toISOString().slice(0, 16);
observacaoServico.value = observacaoURL;

// Atualizar
btnAtualizar.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    if(!tipoServico.value || tipoServico.value == 'Selecione um tipo'){
      return tipoServico.focus();
    }
    if(!precoServico.value){
      return precoServico.focus();
    }
    if(!custoServico.value){
      return custoServico.focus();
    }
    if(!quantidadeServicoAtualizar.value){
      return quantidadeServicoAtualizar.focus();
    }
    if(!horaServico.value){
      return horaServico.focus();
    }

    const raw = {
      tipo: tipoServico.value,
      preco: precoServico.value,
      custo: custoServico.value,
      quantidade: quantidadeServicoAtualizar.value,
      data: new Date(horaServico.value),
      observacao: observacaoServico.value,
    }

    const requestOptions = {
      method: 'PUT',
      redirect: 'follow',
      body: JSON.stringify(raw),
      headers: {
        "Content-Type": "application/json"
      }
    };

    const resposta = await fetch(`${apiServico}/servicos/${id}`, requestOptions);
    const conteudo = await resposta.json();

    if(conteudo.message == 'Servico editado com sucesso!'){
      await Swal.fire({
        title: "Serviço atualizado com sucesso!",
        icon: "success",
        confirmButtonColor: "#0275d8",
      });
    }
    console.log(conteudo)
    window.location.href = './servicos.html';
    
  } catch (error) {
    console.log(error);
  }
})

// Cadastrar
btnCadastrarServicoModal.addEventListener('click', async () => {
  try {
    if(tipoModal.value == 'Selecione um tipo' || !tipoModal.value){
      return tipotipoModal.focus();
    }
    if(!precoModal.value){
      return precoModal.focus();
    }
    if(!custoModal.value){
      return custoModal.focus();
    }
    if(!quantidadeServicoModal.value){
      return quantidadeServicoModal.focus();
    }
    if(!horaModal.value){
      return horaModal.focus();
    }


    const raw = {
      tipo: tipoModal.value,
      preco: precoModal.value,
      custo: custoModal.value,
      quantidade: quantidadeServicoModal.value,
      data: new Date(horaModal.value),
      observacao: observacaoModal.value,
    }

    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(raw),
      headers: {
        "Content-Type": "application/json"
      }
    };

    const resposta = await fetch(`${apiServico}/servicos`, requestOptions);
    const conteudo = await resposta.json();

    console.log(conteudo)

    await Swal.fire({
      title: "Serviço cadastrado com sucesso!",
      icon: "success",
      confirmButtonColor: "#5cb85c",
    });
    return;
    window.location.href = `${address}/pages/servicos.html`;

  } catch (error) {
    console.log(error);
  }
});