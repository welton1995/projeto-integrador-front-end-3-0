const apiTeste = 'https://projeto-integrador-back-end-2-0.vercel.app';
const address = 'https://bschaveiro.vercel.app';
const tabelaServicos = document.querySelector('#servicos');
const loadingImg = document.querySelector('#loading');

// Inputs de busca
const tipoFormulario = document.querySelector('#tipo');
const inicioFormulario = document.querySelector('#dataInicio');
const fimFormulario = document.querySelector('#dataFim');
const btnFormulario = document.querySelector('#btnFormulario');
const loadingImg1 = document.querySelector('#loading');

// Inputs de cadastro
const tipo = document.querySelector('#servicoTipo');
const preco = document.querySelector('#servicoPreco');
const custo = document.querySelector('#servicoCusto');
const quantidadeServico = document.querySelector('#servicoQuantidade');
const observacao = document.querySelector('#servicoObservacao');
const hora = document.querySelector('#servicoData');
const btnCadastrarServico = document.querySelector('#btnServicoCadastrar');

btnFormulario.addEventListener('click', async (e) => {
    e.preventDefault();
    tabelaServicos.innerHTML = '';

    if (!tipoFormulario.value) {
        return tipoFormulario.focus();
    }
    if (!inicioFormulario.value) {
        return inicioFormulario.focus();
    }
    if (!fimFormulario.value) {
        return fimFormulario.focus();
    }

    loadingImg1.style.display = 'inline-block';

    const raw = {
        tipo: tipoFormulario.value,
        dataInicio: inicioFormulario.value,
        dataFim: fimFormulario.value
    };

    try {
        const response = await fetch(`${apiTeste}/servicos/busca-periodo`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(raw)
        });

        const conteudo = await response.json();

        if (!response.ok) {
            throw new Error(conteudo.message || "Erro ao buscar serviços.");
        }

        if (conteudo.message) {
            await Swal.fire({
                title: conteudo.message,
                icon: "warning",
                confirmButtonColor: "#5cb85c",
            });
            return;
        }

        let totalLucro = 0;
        let totalPreco = 0;
        let totalCusto = 0;

        conteudo.servicos.forEach((servico) => {
            const tr = document.createElement('tr');
            const lucro = (servico.preco - servico.custo) * servico.quantidade;

            totalLucro += lucro;
            totalPreco += servico.preco * servico.quantidade;
            totalCusto += servico.custo * servico.quantidade;

            tr.innerHTML = `
                <td class="text-center">${servico.tipo}</td>
                <td class="text-center">${(servico.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td class="text-center">${(servico.custo).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td class="text-center">${servico.quantidade}</td>
                <td class="text-center">${lucro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td class="text-center">${(((servico.preco - servico.custo) / servico.custo) * 100).toFixed(2)} %</td>
                <td class="text-center">${new Date(servico.data).toLocaleDateString('pt-BR')}</td>
                <td class="text-center">${servico.observacao}</td>
                <td class="text-center">
                    <a href="./excluirServico.html?id=${servico._id}" title="Excluir"><img src="../imgs/lixeira.png" width="20px"></a>
                    <a href="./editarServico.html?id=${servico._id}" title="Editar"><img src="../imgs/editar.png" width="20px"></a>
                </td>
            `;

            tabelaServicos.appendChild(tr);
        });

        const trTotal = document.createElement('tr');
        trTotal.innerHTML = `
            <td class="text-center"><strong>Total:</strong></td>
            <td class="text-center"><strong>${totalPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></td>
            <td class="text-center"><strong>${totalCusto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></td>
            <td class="text-center"></td>
            <td class="text-center"><strong>${totalLucro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></td>
            <td colspan="5"></td>
        `;

        tabelaServicos.appendChild(trTotal);
    } catch (error) {
        console.error(error);
        await Swal.fire({
            title: "Erro",
            text: error.message,
            icon: "error",
            confirmButtonColor: "#d9534f",
        });
    } finally {
        loadingImg1.style.display = 'none';
    }
});

// Cadastrar Serviço
btnCadastrarServico.addEventListener('click', async () => {
    try {
        if (tipo.value === 'Selecione um tipo' || !tipo.value) {
            return tipo.focus();
        }
        if (!preco.value || !custo.value || !quantidadeServico.value || !hora.value) {
            return;
        }

        loadingImg.style.display = 'block';

        const raw = {
            tipo: tipo.value,
            preco: parseFloat(preco.value),
            custo: parseFloat(custo.value),
            quantidade: parseInt(quantidadeServico.value),
            data: new Date(hora.value),
            observacao: observacao.value,
        };

        const response = await fetch(`${apiTeste}/servicos`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(raw)
        });

        const conteudo = await response.json();

        if (!response.ok) {
            throw new Error(conteudo.message || "Erro ao cadastrar serviço.");
        }

        await Swal.fire({
            title: "Serviço cadastrado com sucesso!",
            icon: "success",
            confirmButtonColor: "#5cb85c",
        });

        window.location.href = `${address}/pages/servicos.html`;
    } catch (error) {
        loadingImg.style.display = 'none';
        console.error(error);
        await Swal.fire({
            title: "Erro",
            text: error.message,
            icon: "error",
            confirmButtonColor: "#d9534f",
        });
    }
});
