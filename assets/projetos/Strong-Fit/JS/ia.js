console.log("Strong Fit IA carregada");

// ===============================
// ELEMENTOS
// ===============================

const chat = document.getElementById("chat");
const perguntaInput = document.getElementById("pergunta");
const typing = document.getElementById("typing");
const botaoEnviar = document.getElementById("enviar");


// ===============================
// MEMÓRIA
// ===============================

let memoria = JSON.parse(
    localStorage.getItem("strongfit_memoria")
) || {};


// ===============================
// SALVAR MEMÓRIA
// ===============================

function salvarMemoria() {

    localStorage.setItem(
        "strongfit_memoria",
        JSON.stringify(memoria)
    );

}


// ===============================
// HORA
// ===============================

function hora() {

    return new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

}


// ===============================
// CRIAR MENSAGEM
// ===============================

function criarMensagem(texto, classe) {

    const div = document.createElement("div");

    div.className = "message " + classe;

    const avatar = classe === "bot"
        ? "🤖"
        : "👤";

    div.innerHTML = `

        <div class="message-avatar">
            ${avatar}
        </div>

        <div class="message-content">

            ${texto}

            <div class="message-time">
                ${hora()}
            </div>

        </div>

    `;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;

    salvarChat();

}


// ===============================
// ATUALIZAR MEMÓRIA
// ===============================

function atualizarMemoria(pergunta) {

    const texto = pergunta
        .toLowerCase()
        .trim();


    // ===========================
    // NOME
    // ===========================

    if (texto.includes("me chamo ")) {

        let nome = texto
            .replace("me chamo ", "")
            .trim();

        memoria.nome = nome;

        salvarMemoria();

        return `Prazer em conhecer você, ${nome}! 💪`;
    }


    if (texto.includes("meu nome é ")) {

        let nome = texto
            .replace("meu nome é ", "")
            .trim();

        memoria.nome = nome;

        salvarMemoria();

        return `Prazer em conhecer você, ${nome}! 💪`;
    }


    // ===========================
    // PESO
    // ===========================

    if (texto.includes("meu peso é ")) {

        let peso = texto
            .replace("meu peso é ", "")
            .trim();

        memoria.peso = peso;

        salvarMemoria();

        return `Peso salvo: ${peso} kg ⚖️`;
    }


    // ===========================
    // ALTURA
    // ===========================

    if (texto.includes("minha altura é ")) {

        let altura = texto
            .replace("minha altura é ", "")
            .trim()
            .replace(",", ".");

        memoria.altura = altura;

        salvarMemoria();

        return `Altura salva: ${altura} m 📏`;
    }


    // ===========================
    // IDADE
    // ===========================

    if (texto.includes("minha idade é ")) {

        let idade = texto
            .replace("minha idade é ", "")
            .trim();

        memoria.idade = idade;

        salvarMemoria();

        return `Idade salva: ${idade} anos 🎂`;
    }


    // ===========================
    // OBJETIVO
    // ===========================

    if (texto.includes("meu objetivo é ")) {

        let objetivo = texto
            .replace("meu objetivo é ", "")
            .trim();

        memoria.objetivo = objetivo;

        salvarMemoria();

        return `Objetivo salvo: ${objetivo} 🔥`;
    }


    // ===========================
    // LEMBRETE
    // ===========================

    if (texto.includes("lembrar ")) {

        let lembrete = texto
            .replace("lembrar ", "")
            .trim();

        memoria.lembrete = lembrete;

        salvarMemoria();

        return `Lembrete salvo: ${lembrete} 🔔`;
    }


    return null;

}


// ===============================
// NORMALIZAR TEXTO
// ===============================

function normalizarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

}


// ===============================
// BUSCAR NA BASE DA IA
// ===============================

function buscarNaBase(pergunta) {

    const texto = normalizarTexto(pergunta);

    if (typeof baseIA === "undefined") {

        console.error(
            "ERRO: baseIA não foi encontrada."
        );

        return null;
    }


    for (const item of baseIA) {

        for (const palavra of item.palavras) {

            const palavraNormalizada =
                normalizarTexto(palavra);

            if (texto.includes(palavraNormalizada)) {

                return item.resposta;
            }

        }

    }

    return null;

}


// ===============================
// GERAR RESPOSTA
// ===============================

function gerarResposta(pergunta) {

    const texto = normalizarTexto(pergunta);


    // ===========================
    // PERFIL
    // ===========================

    if (
        texto.includes("meu perfil") ||
        texto === "perfil"
    ) {

        return `

        💪 <strong>Perfil Strong Fit</strong>

        <br><br>

        👤 Nome:
        ${memoria.nome || "Não informado"}

        <br><br>

        🎂 Idade:
        ${memoria.idade || "Não informada"} anos

        <br><br>

        ⚖️ Peso:
        ${memoria.peso || "Não informado"} kg

        <br><br>

        📏 Altura:
        ${memoria.altura || "Não informada"} m

        <br><br>

        🎯 Objetivo:
        ${memoria.objetivo || "Não informado"}

        <br><br>

        🔥 Continue evoluindo todos os dias!

        `;

    }


    // ===========================
    // NOME
    // ===========================

    if (
        texto.includes("qual meu nome") ||
        texto.includes("qual e meu nome")
    ) {

        return memoria.nome

            ? `Seu nome é ${memoria.nome}! 💪`

            : `Ainda não sei seu nome.

               <br><br>

               Digite:

               <br>

               <strong>Me chamo David</strong>`;

    }


    // ===========================
    // PESO
    // ===========================

    if (
        texto.includes("qual meu peso") ||
        texto.includes("quanto eu peso")
    ) {

        return memoria.peso

            ? `Seu peso atual é ${memoria.peso} kg ⚖️`

            : `Ainda não sei seu peso.

               <br><br>

               Digite:

               <br>

               <strong>Meu peso é 86</strong>`;

    }


    // ===========================
    // ALTURA
    // ===========================

    if (
        texto.includes("qual minha altura") ||
        texto.includes("quanto eu tenho de altura")
    ) {

        return memoria.altura

            ? `Sua altura é ${memoria.altura} m 📏`

            : `Ainda não sei sua altura.

               <br><br>

               Digite:

               <br>

               <strong>Minha altura é 1.80</strong>`;

    }


    // ===========================
    // IDADE
    // ===========================

    if (
        texto.includes("qual minha idade") ||
        texto.includes("quantos anos eu tenho")
    ) {

        return memoria.idade

            ? `Sua idade é ${memoria.idade} anos 🎂`

            : `Ainda não sei sua idade.

               <br><br>

               Digite:

               <br>

               <strong>Minha idade é 36</strong>`;

    }


    // ===========================
    // OBJETIVO
    // ===========================

    if (
        texto.includes("qual meu objetivo") ||
        texto.includes("meu objetivo")
    ) {

        if (memoria.objetivo) {

            return `Seu objetivo é ${memoria.objetivo} 🔥`;

        }

    }


    // ===========================
    // MEUS DADOS
    // ===========================

    if (
        texto.includes("meus dados") ||
        texto.includes("minhas informacoes") ||
        texto.includes("minhas informações")
    ) {

        return `

        📋 <strong>Seus dados Strong Fit</strong>

        <br><br>

        👤 Nome:
        ${memoria.nome || "Não informado"}

        <br>

        🎂 Idade:
        ${memoria.idade || "Não informada"} anos

        <br>

        ⚖️ Peso:
        ${memoria.peso || "Não informado"} kg

        <br>

        📏 Altura:
        ${memoria.altura || "Não informada"} m

        <br>

        🎯 Objetivo:
        ${memoria.objetivo || "Não informado"}

        `;

    }


    // ===========================
    // CALORIAS
    // ===========================

    if (
        texto.includes("calorias") ||
        texto.includes("quantas calorias")
    ) {

        if (
            !memoria.peso ||
            !memoria.altura ||
            !memoria.idade
        ) {

            return `

            Para calcular suas calorias,
            preciso dos seus dados primeiro.

            <br><br>

            ⚖️ <strong>Meu peso é 86</strong>

            <br>

            📏 <strong>Minha altura é 1.80</strong>

            <br>

            🎂 <strong>Minha idade é 36</strong>

            `;

        }


        let peso = parseFloat(
            String(memoria.peso)
                .replace(",", ".")
        );


        let altura = parseFloat(
            String(memoria.altura)
                .replace(",", ".")
        );


        let idade = parseInt(
            memoria.idade
        );


        if (isNaN(peso)) {

            return "Digite seu peso assim: <strong>Meu peso é 86</strong>";

        }


        if (isNaN(altura)) {

            return "Digite sua altura assim: <strong>Minha altura é 1.80</strong>";

        }


        if (isNaN(idade)) {

            return "Digite sua idade assim: <strong>Minha idade é 36</strong>";

        }


        // Fórmula Mifflin-St Jeor
        // estimativa masculina

        const basal =
            (10 * peso) +
            (6.25 * altura * 100) -
            (5 * idade) +
            5;


        const gasto =
            basal * 1.55;


        const definicao =
            gasto - 500;


        const proteina =
            peso * 2;


        const agua =
            peso * 35;


        return `

        🔥 <strong>Cálculo Strong Fit</strong>

        <br><br>

        ⚖️ Peso:
        ${peso} kg

        <br>

        📏 Altura:
        ${altura} m

        <br>

        🎂 Idade:
        ${idade} anos

        <br><br>

        🔥 Calorias estimadas para definição:

        <br>

        <strong>
        ${Math.round(definicao)} kcal
        </strong>

        <br><br>

        🥩 Proteína aproximada:

        <br>

        <strong>
        ${Math.round(proteina)} g
        </strong>
        por dia

        <br><br>

        💧 Água aproximada:

        <br>

        <strong>
        ${Math.round(agua)} ml
        </strong>
        por dia

        <br><br>

        ⚠️ Esses valores são estimativas e podem variar conforme sexo,
        nível de atividade e objetivo.

        `;

    }


    // ===========================
    // LEMBRETE
    // ===========================

    if (
        texto.includes("meu lembrete") ||
        texto.includes("meus lembretes") ||
        texto.includes("lembrente")
    ) {

        return memoria.lembrete

            ? `

              🔔 <strong>Seu lembrete:</strong>

              <br><br>

              ${memoria.lembrete}

              `

            : "Você ainda não possui lembretes salvos.";

    }


    // ===========================
    // PRIMEIRO:
    // PROCURAR NA BASE IA
    // ===========================

    const respostaBase =
        buscarNaBase(pergunta);


    if (respostaBase) {

        return respostaBase;

    }


    // ===========================
    // SAUDAÇÕES
    // ===========================

    if (
        texto === "oi" ||
        texto === "ola" ||
        texto === "olá" ||
        texto.includes("bom dia") ||
        texto.includes("boa tarde") ||
        texto.includes("boa noite")
    ) {

        const nome =
            memoria.nome
                ? `, ${memoria.nome}`
                : "";

        return `

        👋 Olá${nome}!

        <br><br>

        Sou a <strong>Strong Fit IA</strong> 🤖

        <br><br>

        Posso ajudar você com:

        <br><br>

        💪 Treinos

        <br>

        🥗 Dieta

        <br>

        🥤 Suplementação

        <br>

        🔥 Definição

        <br>

        📋 Seus dados

        <br>

        🔔 Lembretes

        `;

    }


    // ===========================
    // RESPOSTA PADRÃO
    // ===========================

    return `

    🤖 Ainda não sei responder essa pergunta.

    <br><br>

    Tente perguntar sobre:

    <br><br>

    💪 <strong>Treino</strong>

    <br>

    🥗 <strong>Dieta</strong>

    <br>

    🥤 <strong>Creatina ou Whey</strong>

    <br>

    🔥 <strong>Definição</strong>

    <br>

    💧 <strong>Água</strong>

    <br>

    📋 <strong>Meu perfil</strong>

    <br>

    🔔 <strong>Lembretes</strong>

    `;

}


// ===============================
// ENVIAR PERGUNTA
// ===============================

async function enviarPergunta() {

    const pergunta =
        perguntaInput.value.trim();


    if (!pergunta) {
        return;
    }


    // Mensagem do usuário

    criarMensagem(
        pergunta,
        "user"
    );


    // Limpar campo

    perguntaInput.value = "";


    // Verificar se é informação
    // para salvar na memória

    const respostaMemoria =
        atualizarMemoria(pergunta);


    if (respostaMemoria) {

        criarMensagem(
            respostaMemoria,
            "bot"
        );

        return;
    }


    // Mostrar digitando

    typing.style.display = "block";


    // Pequeno atraso para parecer natural

    setTimeout(() => {

        const resposta =
            gerarResposta(pergunta);


        typing.style.display = "none";


        criarMensagem(
            resposta,
            "bot"
        );

    }, 600);

}


// ===============================
// ENTER
// ===============================

if (perguntaInput) {

    perguntaInput.addEventListener(
        "keydown",
        function (e) {

            if (e.key === "Enter") {

                e.preventDefault();

                enviarPergunta();

            }

        }
    );

}


// ===============================
// BOTÃO ENVIAR
// ===============================

if (botaoEnviar) {

    botaoEnviar.addEventListener(
        "click",
        enviarPergunta
    );

}


// ===============================
// SALVAR CHAT
// ===============================

function salvarChat() {

    localStorage.setItem(
        "strongfit_chat",
        chat.innerHTML
    );

}


// ===============================
// CARREGAR CHAT
// ===============================

function carregarChat() {

    const historico =
        localStorage.getItem(
            "strongfit_chat"
        );


    if (historico) {

        chat.innerHTML =
            historico;

        chat.scrollTop =
            chat.scrollHeight;

    }

}


// ===============================
// PERGUNTA RÁPIDA
// ===============================

function perguntaRapida(texto) {

    perguntaInput.value =
        texto;

    enviarPergunta();

}


// ===============================
// LIMPAR CHAT
// ===============================

function limparChat() {

    if (
        confirm(
            "Deseja apagar toda a conversa?"
        )
    ) {

        chat.innerHTML = "";


        localStorage.removeItem(
            "strongfit_chat"
        );


        criarMensagem(

            `

            👋 <strong>Olá!</strong>

            <br><br>

            Eu sou a
            <strong>Strong Fit IA</strong> 🤖

            <br><br>

            Posso ajudar com:

            <br><br>

            💪 Treinos

            <br>

            🥗 Dieta

            <br>

            🥤 Suplementação

            <br>

            🔥 Definição muscular

            <br>

            🏋️ Hipertrofia

            `,

            "bot"

        );

    }

}


// ===============================
// INICIALIZAÇÃO
// ===============================

window.addEventListener(
    "load",
    function () {

        carregarChat();


        if (
            chat.innerHTML.trim() === ""
        ) {

            criarMensagem(

                `

                👋 <strong>
                Bem-vindo à Strong Fit IA!
                </strong>

                <br><br>

                Sou seu treinador virtual. 🤖

                <br><br>

                Posso ajudar com:

                <br><br>

                💪 Treinos

                <br>

                🥗 Dieta

                <br>

                🥤 Suplementação

                <br>

                🔥 Definição muscular

                <br>

                🏋️ Hipertrofia

                <br>

                💧 Hidratação

                <br>

                📋 Seus dados

                `,

                "bot"

            );

        }

    }
);