const apiServico = 'http://localhost:3333/usuarios';


const btnAtualizar = document.querySelector('#btnAtualizar');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const email = params.get('email');
const usuario = params.get('usuario');

const usuarioEmail = document.querySelector('#usuarioEmail');
const usuarioNome = document.querySelector('#usuarioNome');
const usuarioTipo = document.querySelector('#usuarioTipo');
const usuarioSenha = document.querySelector('#usuarioSenha');
const confirmaSenha = document.querySelector('#confirmaSenha');
const imgloading = document.querySelector('#loading');


usuarioEmail.value = email;
usuarioNome.value = usuario;

btnAtualizar.addEventListener('click', async (e) => {
  e.preventDefault();

  const userStorage = JSON.parse(localStorage.getItem('user'));

  if (userStorage && userStorage.tipo != "administrador") {
    await Swal.fire({
      text: `${userStorage.nome}, Você não possui permissão para editar usuários!`,
      icon: "info",
      confirmButtonColor: "#0275d8",
    });
    return;
  } 
  
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
    if(usuarioTipo.value == 'none'){
      await Swal.fire({
        title: "Selecione um tipo!",
        icon: "info",
      });
      return usuarioTipo.focus();
    }

    if(usuarioSenha.value !== confirmaSenha.value ){
      await Swal.fire({
        title: "Senhas não conferem. Tente novamente!",
        icon: "alert",
        confirmButtonColor: "#bb0000",
      });

      return;
    }
    imgloading.style.display = 'block';
    const raw = {
      nome: usuarioNome.value,
      senha: usuarioSenha.value,
      tipo: usuarioTipo.value,
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
        title: "Conta atualizada com sucesso!",
        icon: "success",
        confirmButtonColor: "#0275d8",
      });
    
    console.log(conteudo)
    window.location.href = './gerenciarContas.html';
    
  } catch (error) {
    console.log(error);
  }
})
