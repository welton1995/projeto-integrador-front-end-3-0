const apiTeste = 'https://projeto-integrador-back-end-2-0.vercel.app';
const address = 'https://bschaveiro.vercel.app';

// Inputs de cadastro
const tipo = document.querySelector('#tipoServicoModal'); // Atualizado
const preco = document.querySelector('#precoModal');
const custo = document.querySelector('#custoModal');
const quantidadeServico = document.querySelector('#quantidadeModal');
const observacao = document.querySelector('#observacaoModal');
const hora = document.querySelector('#horaModal');
const btnCadastrarServico = document.querySelector('#btnServicoCadastrar');
const loadingImg1 = document.querySelector('#loading');

// Cadastrar Serviço
btnCadastrarServico.addEventListener('click', async (e) => {
  e.preventDefault();
  
  // Validações dos campos
  if (tipo.value === 'Selecione um tipo' || !tipo.value) {
    tipo.focus();
    return;
  }
  if (!preco.value) {
    preco.focus();
    return;
  }
  if (!custo.value) {
    custo.focus();
    return;
  }
  if (!quantidadeServico.value) {
    quantidadeServico.focus();
    return;
  }
  if (!hora.value) {
    hora.focus();
    return;
  }

  loadingImg1.style.display = 'inline-block';

  const raw = {
    tipo: tipo.value,
    preco: parseFloat(preco.value),
    custo: parseFloat(custo.value),
    quantidade: parseInt(quantidadeServico.value),
    data: new Date(hora.value).toISOString(), // Convertido para ISO
    observacao: observacao.value,
  };

  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify(raw),
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const resposta = await fetch(`${apiTeste}/servicos`, requestOptions);
    const conteudo = await resposta.json();

    if (resposta.ok) {
      await Swal.fire({
        title: "Serviço cadastrado com sucesso!",
        icon: "success",
        confirmButtonColor: "#5cb85c",
      });

      window.location.href = `${address}/pages/servicos.html`;
    } else {
      await Swal.fire({
        title: "Erro ao cadastrar serviço!",
        text: conteudo.message || "Verifique os dados e tente novamente.",
        icon: "error",
        confirmButtonColor: "#d9534f",
      });
    }
  } catch (error) {
    console.error(error);
    await Swal.fire({
      title: "Erro ao cadastrar serviço!",
      text: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
      icon: "error",
      confirmButtonColor: "#d9534f",
    });
  } finally {
    loadingImg1.style.display = 'none';
  }
});
