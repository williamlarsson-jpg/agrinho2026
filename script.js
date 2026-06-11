// BANCO DE DADOS INTERNO
const glossaryData = [
    { t: "O que é o Agronegócio?", d: "O agronegócio representa toda a cadeia econômica produtiva interconectada: iniciando pela indústria de insumos (maquinários, adubos e tecnologia), passando pelas atividades de cultivo no campo, e finalizando nas etapas de processamento industrial, logística, comercialização e distribuição até a sua mesa." },
    { t: "Impactos Socioambientais Críticos", d: "A expansão irrestrita do agronegócio tradicional sem critérios ecológicos severos provoca degradações globais alarmantes como desmatamento em larga escala, consumo exacerbado de água potável, erosão severa do solo e poluição química de rios e lençóis freáticos por uso massivo de agrotóxicos." },
    { t: "Atitudes e Práticas de Transformação", d: "Mudar o rumo do setor exige ações como Agricultura de Precisão (sensores IoT reduzindo água), Sistemas Integrados (ILPF alternando lavoura e floresta) e a valorização do Consumo Regional de microprodutores rurais." }
];

const metricsData = [
    { v: "-40%", t: "Uso de Água com Tecnologias" },
    { v: "+30%", t: "Preservação de Áreas Nativas" },
    { v: "100%", t: "Rastreabilidade Sem Desmatamento" }
];

const carouselData = [
    { t: "Manejo Agroflorestal", p: "Plantar culturas agrícolas em consórcio com árvores nativas, recuperando biomas." },
    { t: "Inteligência Artificial no Campo", p: "Algoritmos que analisam imagens de drones para detectar focos de pragas isoladas." },
    { t: "Rastreabilidade Blockchain", p: "Armazenamento imutável de dados para garantir a origem sustentável do produto." }
];

const aiKnowledge = {
    definicao: "O agronegócio é a integração de toda a cadeia produtiva rural, desde insumos e maquinários até a colheita, industrialização e venda.",
    impacto: "Os impactos severos incluem degradação de solos, desmatamento para pastagem, e o uso de químicos contaminantes em ecossistemas hídricos.",
    atitudes: "Atitudes essenciais envolvem o uso de agricultura de precisão, sistemas integrados ILPF, e a escolha por alimentos locais com certificação verde."
};

// INICIALIZADOR DO SISTEMA SPA
document.addEventListener("DOMContentLoaded", () => {
    // Injetar dados dinâmicos na tela
    renderSystemData();
    
    // Ativar gerenciador de páginas
    initPageNavigation();

    // Ativar componentes interativos
    initCarouselLogic();
    initCalculadora();
    initAiChatLogic();
    initAccessibility();
});

// FUNÇÃO DE RENDERIZAÇÃO
function renderSystemData() {
    const glossaryContainer = document.getElementById("glossary-container");
    if (glossaryContainer) {
        glossaryContainer.innerHTML = glossaryData.map(i => `
            <article class="card"><h3>${i.t}</h3><p style="margin-top:0.5rem; color:var(--text-main); opacity:0.85;">${i.d}</p></article>
        `).join('');
    }

    const metricsContainer = document.getElementById("metrics-container");
    if (metricsContainer) {
        metricsContainer.innerHTML = metricsData.map(i => `
            <div class="card metric-card"><span class="metric-number">${i.v}</span><p>${i.t}</p></div>
        `).join('');
    }

    const carouselTrack = document.getElementById("carousel-track");
    if (carouselTrack) {
        carouselTrack.innerHTML = carouselData.map(i => `
            <div class="carousel-item"><h3>${i.t}</h3><p style="margin-top:0.5rem;">${i.p}</p></div>
        `).join('');
    }
}

// MOTOR DE NAVEGAÇÃO DA PÁGINA ÚNICA (SPA)
function initPageNavigation() {
    const navButtons = document.querySelectorAll(".nav-btn, .link-btn");
    
    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");

            // Ocultar todas as páginas
            document.querySelectorAll(".site-page").forEach(page => page.setAttribute("hidden", ""));
            
            // Mostrar a página destino
            document.getElementById(targetId).removeAttribute("hidden");

            // Atualizar estado ativo dos botões no menu superior
            document.querySelectorAll(".nav-btn").forEach(btn => {
                btn.classList.remove("active");
                if(btn.getAttribute("data-target") === targetId) {
                    btn.classList.add("active");
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    document.getElementById("logo-home").onclick = (e) => {
        e.preventDefault();
        document.querySelector('.nav-btn[data-target="page-inicio"]').click();
    };
}

// CARROSSEL
function initCarouselLogic() {
    const track = document.getElementById("carousel-track");
    let slideIdx = 0;
    if (document.getElementById("next-slide")) {
        document.getElementById("next-slide").onclick = () => { slideIdx = (slideIdx + 1) % carouselData.length; track.style.transform = `translateX(-${slideIdx * 100}%)`; };
        document.getElementById("prev-slide").onclick = () => { slideIdx = (slideIdx - 1 + carouselData.length) % carouselData.length; track.style.transform = `translateX(-${slideIdx * 100}%)`; };
    }
}

// CALCULADORA
function initCalculadora() {
    const calcForm = document.getElementById("calc-form");
    if (calcForm) {
        calcForm.onsubmit = (e) => {
            e.preventDefault();
            const total = parseFloat(document.getElementById("carne").value) + parseFloat(document.getElementById("desperdicio").value);
            const resBox = document.getElementById("calc-result");
            const resText = document.getElementById("result-text");
            
            resBox.removeAttribute("hidden");
            resText.textContent = total >= 45 ? "Pegada Ecológica Elevada 🚨 (Ajuste suas atitudes!)" : "Pegada Ecológica Baixa 🌱 (Excelente impacto!)";
            resBox.scrollIntoView({ behavior: 'smooth' });
        };
    }
}

// CHATBOT OPERACIONAL
function initAiChatLogic() {
    const toggle = document.getElementById("chat-toggle");
    const chatWin = document.getElementById("chat-window");
    const form = document.getElementById("chat-form-element");
    const inp = document.getElementById("chat-input");
    const msgArea = document.getElementById("chat-messages");

    if (toggle) {
        toggle.onclick = () => chatWin.hidden = !chatWin.hidden;
        document.getElementById("chat-close").onclick = () => chatWin.hidden = true;
        
        form.onsubmit = (e) => {
            e.preventDefault();
            const query = inp.value.trim().toLowerCase();
            if (!query) return;

            msgArea.innerHTML += `<div class="msg user-msg">${inp.value}</div>`;
            inp.value = "";
            msgArea.scrollTop = msgArea.scrollHeight;

            setTimeout(() => {
                let reply = "Não captei. Use palavras chave como 'definição', 'impacto' ou 'atitudes'.";
                for (let key in aiKnowledge) {
                    if (query.includes(key)) { reply = aiKnowledge[key]; break; }
                }
                msgArea.innerHTML += `<div class="msg bot-msg">${reply}</div>`;
                msgArea.scrollTop = msgArea.scrollHeight;
            }, 400);
        };
    }
}

// ACESSIBILIDADE
function initAccessibility() {
    document.getElementById("btn-contrast").onclick = () => document.body.classList.toggle("high-contrast");
    let fontSize = 100;
    document.getElementById("btn-font-increase").onclick = () => { if(fontSize < 130) { fontSize += 10; document.documentElement.style.fontSize = fontSize + "%"; } };
    document.getElementById("btn-font-decrease").onclick = () => { if(fontSize > 90) { fontSize -= 10; document.documentElement.style.fontSize = fontSize + "%"; } };
}
