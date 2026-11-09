

// Array global que armazena os produtos cadastrados
const listaDeProdutos = [];

// Estado auxiliar: null indica "Modo Cadastro", número indica "Modo Edição"
let indiceEdicao = null;
let edicaoPeloNome = false;


class Produto {

    #preco;
    #quantidade;

    constructor(nome, preco, quantidade) {

        // Validação do nome
        if (!nome || nome.trim() === "") {
            throw new Error("O nome do produto não pode estar vazio.");
        }

        // Validação do preço
        if (isNaN(preco) || preco <= 0) {
            throw new Error("O preço deve ser maior que zero.");
        }

        // Validação da quantidade
        if (isNaN(quantidade) || quantidade <= 0) {
            throw new Error("A quantidade deve ser maior que zero.");
        }

        // Atribuição das propriedades
        this.nome = nome.trim();
        this.#preco = preco;
        this.#quantidade = quantidade;
    }

    // Getters
    get preco() {
        return this.#preco;
    }

    get quantidade() {
        return this.#quantidade;
    }

    // Calcula o subtotal
    get subtotal() {
        return this.#preco * this.#quantidade;
    }
}


// Salva os produtos no navegador
function salvarProdutos() {

    const produtosParaSalvar = listaDeProdutos.map(produto => {
        return {
            nome: produto.nome,
            preco: produto.preco,
            quantidade: produto.quantidade
        };
    });

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtosParaSalvar)
    );
}


// Recupera os produtos salvos
function carregarProdutos() {

    const dadosSalvos = localStorage.getItem("produtos");

    if (!dadosSalvos) {
        renderizarTabela();
        return;
    }

    try {

        const produtosSalvos = JSON.parse(dadosSalvos);

        if (!Array.isArray(produtosSalvos)) {
            throw new Error("Dados salvos inválidos.");
        }

        listaDeProdutos.length = 0;

        produtosSalvos.forEach(produto => {

            const produtoRecuperado = new Produto(
                produto.nome,
                produto.preco,
                produto.quantidade
            );

            listaDeProdutos.push(produtoRecuperado);
        });

    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        alert("Não foi possível recuperar os produtos salvos.");
    }

    renderizarTabela();
}


const form = document.getElementById("produto-form");

const tabelaCorpo = document.querySelector("#tabela-produtos tbody");

const botaoSubmit = document.querySelector(".btn-primary");


const campoBusca = document.getElementById("campo-busca");

// Lista pronta + nomes cadastrados. O aluno também pode digitar um nome novo.
const nomesSugeridos = [
    "Abacate",
    "Abacaxi",
    "Abajur",
    "Abóbora",
    "Absorvente",
    "Açúcar",
    "Adaptador USB",
    "Água mineral",
    "Água sanitária",
    "Álcool",
    "Alface",
    "Algodão",
    "Alho",
    "Alicate",
    "Almofada",
    "Amaciante",
    "Amendoim",
    "Anel",
    "Apagador",
    "Apontador",
    "Ar-condicionado",
    "Arroz",
    "Armário",
    "Aspirador de pó",
    "Azeite",
    "Azeitona",
    "Bacia",
    "Bala",
    "Balança",
    "Balde",
    "Banana",
    "Banco",
    "Bandeja",
    "Banheira",
    "Baralho",
    "Barbeador",
    "Barbante",
    "Barra de cereal",
    "Barraca",
    "Batata",
    "Batata-doce",
    "Batedeira",
    "Bateria",
    "Batom",
    "Baú",
    "Bebedouro",
    "Berço",
    "Bermuda",
    "Beterraba",
    "Bicicleta",
    "Biscoito",
    "Bloco de notas",
    "Blusa",
    "Bola",
    "Bolacha",
    "Bolsa",
    "Bomba de ar",
    "Boné",
    "Borracha",
    "Bota",
    "Botijão de gás",
    "Brinco",
    "Broca",
    "Bucha",
    "Bule",
    "Cabo de rede",
    "Cabo HDMI",
    "Cabo USB",
    "Cabide",
    "Caderno",
    "Cadeira",
    "Café",
    "Caixa de som",
    "Caixa organizadora",
    "Calculadora",
    "Calça",
    "Câmera",
    "Camiseta",
    "Caneca",
    "Canela",
    "Caneta",
    "Canetinha",
    "Capa de celular",
    "Capacete",
    "Carne",
    "Carregador",
    "Carteira",
    "Cartolina",
    "Cartucho de tinta",
    "Cebola",
    "Celular",
    "Cenoura",
    "Cera",
    "Chaleira",
    "Chave de fenda",
    "Chave inglesa",
    "Chinelo",
    "Chocolate",
    "Chuveiro",
    "Clips",
    "Cobertor",
    "Coca-Cola",
    "Cola",
    "Colchão",
    "Colher",
    "Condicionador",
    "Copo",
    "Corda",
    "Corretivo",
    "Cortina",
    "Cotonete",
    "Couve",
    "Creme dental",
    "Creme hidratante",
    "Cuscuz",
    "Desinfetante",
    "Desodorante",
    "Detergente",
    "Dicionário",
    "Disco rígido",
    "Doce de leite",
    "DVD",
    "Elástico",
    "Embalagem",
    "Enfeite",
    "Envelope",
    "Ervilha",
    "Escada",
    "Escova de cabelo",
    "Escova de dentes",
    "Esfregão",
    "Esmalte",
    "Espelho",
    "Esponja",
    "Estojo",
    "Estante",
    "Estilete",
    "Estabilizador",
    "Extensão elétrica",
    "Faca",
    "Farelo de aveia",
    "Farinha de mandioca",
    "Farinha de trigo",
    "Fechadura",
    "Feijão",
    "Ferro de passar",
    "Filtro de água",
    "Fio elétrico",
    "Fita adesiva",
    "Fita isolante",
    "Fita métrica",
    "Fone de ouvido",
    "Forma de bolo",
    "Fósforo",
    "Fralda",
    "Frango",
    "Frigideira",
    "Fruteira",
    "Furadeira",
    "Garfo",
    "Garrafa",
    "Garrafa térmica",
    "Gaveteiro",
    "Geladeira",
    "Gelatina",
    "Geleia",
    "Grampeador",
    "Grampo",
    "Granola",
    "Guarda-chuva",
    "Guarda-roupa",
    "Guardanapo",
    "HD externo",
    "Headset",
    "Hub USB",
    "Impressora",
    "Incenso",
    "Interruptor",
    "Iogurte",
    "Jaleco",
    "Jarra",
    "Jogo de panelas",
    "Joystick",
    "Kit de ferramentas",
    "Lâmpada",
    "Lancheira",
    "Lanterna",
    "Lápis",
    "Lápis de cor",
    "Laranja",
    "Lava-louças",
    "Leite",
    "Lençol",
    "Lenço umedecido",
    "Lentilha",
    "Lixeira",
    "Livro",
    "Luminária",
    "Luva",
    "Macarrão",
    "Maçã",
    "Maionese",
    "Mala",
    "Mamadeira",
    "Mamão",
    "Manga",
    "Mangueira",
    "Manteiga",
    "Maracujá",
    "Marcador de texto",
    "Martelo",
    "Máscara",
    "Meia",
    "Mel",
    "Melancia",
    "Melão",
    "Memória RAM",
    "Mesa",
    "Microfone",
    "Micro-ondas",
    "Milho",
    "Mochila",
    "Molho de tomate",
    "Monitor",
    "Morango",
    "Mouse",
    "Mousepad",
    "Multímetro",
    "Notebook",
    "Óculos",
    "Óleo de cozinha",
    "Organizador",
    "Ovo",
    "Pá",
    "Panela",
    "Pano de chão",
    "Pano de prato",
    "Pão",
    "Papel-alumínio",
    "Papel higiênico",
    "Papel sulfite",
    "Parafuso",
    "Pasta de amendoim",
    "Pasta escolar",
    "Patins",
    "Peixe",
    "Pendrive",
    "Peneira",
    "Pente",
    "Pepino",
    "Perfume",
    "Pilha",
    "Pincel",
    "Pipoca",
    "Placa de vídeo",
    "Placa-mãe",
    "Plástico-filme",
    "Pneu",
    "Porta-retrato",
    "Pote",
    "Prato",
    "Pregador",
    "Prego",
    "Presunto",
    "Projetor",
    "Pulseira",
    "Quebra-cabeça",
    "Queijo",
    "Ração",
    "Rádio",
    "Ralador",
    "Raquete",
    "Refrigerante",
    "Régua",
    "Relógio",
    "Repolho",
    "Resma de papel",
    "Requeijão",
    "Rodo",
    "Roteador",
    "Sabão em barra",
    "Sabão em pó",
    "Sabonete",
    "Sabonete líquido",
    "Saco de lixo",
    "Saia",
    "Sal",
    "Sanduicheira",
    "Sapato",
    "Scanner",
    "Secador de cabelo",
    "Serra",
    "Shampoo",
    "Sofá",
    "SSD",
    "Suco",
    "Suporte para notebook",
    "Tablet",
    "Tábua de corte",
    "Talher",
    "Tapete",
    "Teclado",
    "Telefone",
    "Televisão",
    "Tênis",
    "Tesoura",
    "Tinta",
    "Tinta para impressora",
    "Toalha",
    "Tomada",
    "Tomate",
    "Torneira",
    "Torradeira",
    "Travesseiro",
    "Uniforme",
    "Uva",
    "Vassoura",
    "Vela",
    "Ventilador",
    "Vestido",
    "Videogame",
    "Vinagre",
    "Violão",
    "Webcam",
    "Xícara",
    "Zíper"
];

const campoNome = document.getElementById("nome");
const listaSugestoes = document.getElementById("sugestoes-produtos");

// Permite buscar "agua" e encontrar "Água", por exemplo.
function normalizarNome(nome) {
    return nome.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function ocultarSugestoes() {
    listaSugestoes.innerHTML = "";
    listaSugestoes.hidden = true;
}

function atualizarSugestoes() {
    ocultarSugestoes();
    const termo = normalizarNome(campoNome.value);

    // Campo vazio: nenhuma sugestão aparece.
    if (termo === "") {
        return;
    }

    const nomes = [...nomesSugeridos];
    listaDeProdutos.forEach(produto => {
        if (!nomes.some(nome => normalizarNome(nome) === normalizarNome(produto.nome))) {
            nomes.push(produto.nome);
        }
    });

    // startsWith verifica se o nome começa com as letras digitadas.
    const encontrados = nomes.filter(nome => normalizarNome(nome).startsWith(termo));
    encontrados.sort((a, b) => a.localeCompare(b, "pt-BR"));

    encontrados.forEach(nome => {
        const item = document.createElement("li");
        const botao = document.createElement("button");
        botao.type = "button";
        botao.textContent = nome;
        botao.addEventListener("click", () => {
            campoNome.value = nome;
            preencherDadosDoProduto();
            campoNome.focus();
            ocultarSugestoes();
        });
        item.appendChild(botao);
        listaSugestoes.appendChild(item);
    });

    listaSugestoes.hidden = encontrados.length === 0;
}

// Usa o cadastro existente como modelo para um novo produto.
let dadosPreenchidosAutomaticamente = false;

function preencherDadosDoProduto() {
    // A edição pelo botão Editar também permite mudar o nome do produto.
    if (indiceEdicao !== null && !edicaoPeloNome) return;

    const nomeDigitado = normalizarNome(campoNome.value);
    const index = listaDeProdutos.findIndex(produto => {
        return normalizarNome(produto.nome) === nomeDigitado;
    });

    if (index !== -1) {
        // Não recarrega os valores se o usuário já estiver alterando este produto.
        if (!edicaoPeloNome || indiceEdicao !== index) {
            const produto = listaDeProdutos[index];
            document.getElementById("preco").value = produto.preco;
            document.getElementById("quantidade").value = produto.quantidade;
        }
        indiceEdicao = index;
        edicaoPeloNome = true;
        dadosPreenchidosAutomaticamente = true;
        botaoSubmit.textContent = "Salvar Atualização";
    } else {
        if (dadosPreenchidosAutomaticamente) {
            document.getElementById("preco").value = "";
            document.getElementById("quantidade").value = "";
        }
        indiceEdicao = null;
        edicaoPeloNome = false;
        dadosPreenchidosAutomaticamente = false;
        botaoSubmit.textContent = "Adicionar Produto";
    }
}

campoNome.addEventListener("input", () => {
    atualizarSugestoes();
    preencherDadosDoProduto();
});
campoNome.addEventListener("change", preencherDadosDoProduto);
campoNome.addEventListener("keydown", event => {
    if (event.key === "Escape") ocultarSugestoes();

    if (event.key === "Enter") {
        event.preventDefault();
        preencherDadosDoProduto();
        ocultarSugestoes();
        document.getElementById("preco").focus();
    }
});
form.addEventListener("reset", () => {
    edicaoPeloNome = false;
    dadosPreenchidosAutomaticamente = false;
    ocultarSugestoes();
});
document.addEventListener("click", event => {
    if (event.target !== campoNome && !listaSugestoes.contains(event.target)) {
        ocultarSugestoes();
    }
});

// O filter cria uma nova lista sem alterar os produtos cadastrados.
function obterProdutosFiltrados() {
    const termoBusca = campoBusca.value.trim().toLowerCase();

    return listaDeProdutos.filter(produto => {
        return produto.nome.toLowerCase().includes(termoBusca);
    });
}

// O evento input acontece a cada alteração no campo de pesquisa.
campoBusca.addEventListener("input", renderizarTabela);

function atualizarTotalEstoque(produtosVisiveis) {

    // Soma somente os subtotais dos produtos exibidos na tabela.
    const valorTotal = produtosVisiveis.reduce((acumulador, produto) => {
        return acumulador + produto.subtotal;
    }, 0);

    const totalFormatado = valorTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    document.getElementById("total-estoque").innerText =
        `Total em Estoque: ${totalFormatado}`;
}

function renderizarTabela() {

    ocultarSugestoes();

    tabelaCorpo.innerHTML = "";

    const produtosFiltrados = obterProdutosFiltrados();

    if (produtosFiltrados.length === 0) {
        const linha = document.createElement("tr");
        const mensagem = document.createElement("td");
        mensagem.colSpan = 5;
        mensagem.className = "mensagem-vazia";
        mensagem.textContent = campoBusca.value.trim()
            ? "Nenhum produto encontrado."
            : "Nenhum produto cadastrado.";
        linha.appendChild(mensagem);
        tabelaCorpo.appendChild(linha);
    }

    produtosFiltrados.forEach(produto => {
        // Usa o índice da lista original para editar e remover o produto certo.
        const index = listaDeProdutos.indexOf(produto);

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td></td>

            <td>
                ${produto.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </td>

            <td>${produto.quantidade}</td>

            <td>
                ${produto.subtotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </td>

            <td>
                <button class="btn-editar"
                    onclick="prepararEdicao(${index})">
                    Editar
                </button>

                <button class="btn-remover"
                    onclick="removerProduto(${index})">
                    Remover
                </button>
            </td>
        `;

        linha.querySelector("td").textContent = produto.nome;

        tabelaCorpo.appendChild(linha);
    });

    atualizarTotalEstoque(produtosFiltrados);
}

function removerProduto(index) {

    listaDeProdutos.splice(index, 1);

    // Ajusta o estado de edição
    if (indiceEdicao !== null) {

        if (indiceEdicao === index) {
            cancelarEdicao();

        } else if (index < indiceEdicao) {
            indiceEdicao--;
        }
    }

    salvarProdutos();

    renderizarTabela();
}


document.getElementById("limpar-tabela").addEventListener("click", () => {

    const confirmar = confirm(
        "Tem certeza que deseja remover todos os produtos?"
    );

    if (!confirmar) {
        return;
    }

    listaDeProdutos.length = 0;

    cancelarEdicao();

    salvarProdutos();

    renderizarTabela();
});

// Função solicitada no PDF
function prepararEdicao(index) {

    const produto = listaDeProdutos[index];

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    // 1. Preenche os campos do formulário com os dados existentes
    document.getElementById("nome").value = produto.nome;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("quantidade").value = produto.quantidade;

    // 2. Transfere o estado para Modo Edição
    indiceEdicao = index;
    edicaoPeloNome = false;

    // 3. Atualiza o texto do botão
    document.querySelector(".btn-primary").textContent = "Salvar Atualização";

    // Leva o usuário até o formulário
    form.scrollIntoView({
        behavior: "smooth"
    });
}

function cancelarEdicao() {

    indiceEdicao = null;

    form.reset();

    document.querySelector(".btn-primary").textContent = "Adicionar Produto";
}

form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Captura os valores conforme o PDF
    const nome = document.getElementById("nome").value.trim();

    const precoTexto = document.getElementById("preco").value.trim();
    const quantidadeTexto = document.getElementById("quantidade").value.trim();

    const preco = parseFloat(precoTexto);
    const quantidade = parseInt(quantidadeTexto, 10);

    if (!nome) {
        alert("Por favor, informe um nome válido para o produto.");
        return;
    }

    if (
        precoTexto === "" ||
        quantidadeTexto === "" ||
        isNaN(preco) ||
        preco <= 0 ||
        isNaN(quantidade) ||
        quantidade <= 0 ||
        !Number.isFinite(preco) ||
        !Number.isInteger(Number(quantidadeTexto))
    ) {
        alert("O preço e a quantidade devem ser valores numéricos maiores que zero.");
        return;
    }

    try {

        // Cria o objeto Produto
        const novoProduto = new Produto(nome, preco, quantidade);

        // Confere o nome novamente ao salvar para evitar um cadastro repetido.
        const indiceExistente = listaDeProdutos.findIndex(produto => {
            return normalizarNome(produto.nome) === normalizarNome(nome);
        });
        if (indiceExistente !== -1 && indiceExistente !== indiceEdicao) {
            if (indiceEdicao !== null) {
                alert("Já existe outro produto com esse nome. Escolha outro nome para esta edição.");
                return;
            }
            indiceEdicao = indiceExistente;
        }

        // MODO INCLUSÃO
        if (indiceEdicao === null) {

            listaDeProdutos.push(novoProduto);

        } else {

            // MODO EDIÇÃO
            listaDeProdutos[indiceEdicao] = novoProduto;

        }

        // Salva as alterações no navegador
        salvarProdutos();

        // Atualiza a tabela
        renderizarTabela();

        // Restaura o estado após salvar
        indiceEdicao = null;

        // Limpa o formulário
        form.reset();

        // Restaura o texto do botão
        document.querySelector(".btn-primary").textContent = "Adicionar Produto";

    } catch (error) {

        alert(error.message);

    }

});

carregarProdutos();