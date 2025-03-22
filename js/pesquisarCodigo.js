const apiURL = 'https://projeto-integrador-back-end-2-0.vercel.app';


// inputs para pesquisar um código
const buscaCodigo = document.querySelector('#buscaCodigo');
const btnBuscaCodigo = document.querySelector('#btnBuscaCodigo');

// Pesquisa codigo
btnBuscaCodigo.addEventListener('click', async (event) => {
  event.preventDefault();
  if (!buscaCodigo.value) {
    Swal.fire({
      title: "Preencha o campo corretamente e tente novamente",
      icon: "info",
      confirmButtonColor: "#5bc0de",
    });
    return buscaCodigo.value = '';
  }

  try {
    const codigo = buscaCodigo.value;
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      }
    };

    const resposta = await fetch(`${apiURL}/busca/${codigo}`, requestOptions);
    const conteudo = await resposta.json();

    if (conteudo == 'Chave não encontrada!') {
      Swal.fire({
        title: "Chave não consta no estoque!",
        icon: "info",
        confirmButtonColor: "#5bc0de",
      });
      return buscaCodigo.value = '';
    }

    if (conteudo) {
      Swal.fire({
        title: `${conteudo.nome}`,
        icon: "success",
        html: `
        <strong>Modelo: ${conteudo.nome}</strong><br>
        <strong>Código: ${conteudo.codigo}</strong><br>
        <strong>Quantidade: ${conteudo.quantidade}</strong><br>
        `,
        confirmButtonColor: "#5bc0de",
      });
      buscaCodigo.value = '';
    }

  } catch (error) {
    return console.log(error);
  }
});
