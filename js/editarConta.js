const apiServico = 'http://localhost:3333/usuarios';


const btnAtualizar = document.querySelector('#btnAtualizar');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const email = params.get('email');
const usuario = params.get('usuario');

const usuarioEmail = document.querySelector('#usuarioEmail');
const usuarioNome = document.querySelector('#usuarioNome');
const usuarioSenha = document.querySelector('#usuarioSenha');
const confirmaSenha = document.querySelector('#confirmaSenha');




usuarioEmail.value = email;
usuarioNome.value = usuario;

btnAtualizar.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    if(!usuarioNome.value){
      return usuarioNome.focus();
    }
    if(!usuarioSenha.value){
      return usuarioSenha.focus();
    }
    if(!confirmaSenha.value){
      return confirmaSenha.focus();
    }

    if(usuarioSenha.value !== confirmaSenha.value ){
      await Swal.fire({
        title: "Senhas não conferem. Tente novamente!",
        icon: "alert",
        confirmButtonColor: "#bb0000",
      });

      return;
    }

    const raw = {
      nome: usuarioNome.value,
      senha: usuarioSenha.value,
    }

    const requestOptions = {
      method: 'PUT',
      redirect: 'follow',
      body: JSON.stringify(raw),
      headers: {
        "Content-Type": "application/json"
      }
    };

    const resposta = await fetch(`${apiServico}/${id}`, requestOptions);
    const conteudo = await resposta.json();

 
      await Swal.fire({
        title: "Serviço atualizado com sucesso!",
        icon: "success",
        confirmButtonColor: "#0275d8",
      });
    
    console.log(conteudo)
    window.location.href = './gerenciarContas.html';
    
  } catch (error) {
    console.log(error);
  }
})
