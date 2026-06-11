// ==========================================
// 1. ARRAYS DE DADOS E ESTRUTURAS DINÂMICAS
// ==========================================

// Dados Expandidos da Central de Conhecimento (Abas)
const knowledgeSections = [
    {
        id: "o-que-e",
        title: "O que é o Agronegócio?",
        content: "O agronegócio não engloba apenas a plantação do alimento na terra. Ele representa toda a cadeia econômica produtiva interconectada: iniciando pela indústria de insumos (maquinários, adubos e tecnologia), passando pelas atividades de cultivo no campo, e finalizando nas etapas de processamento industrial, logística, comercialização e distribuição até a sua mesa."
    },
    {
        id: "impactos",
        title: "Impactos Socioambientais Críticos",
        content: "A expansão irrestrita do agronegócio tradicional sem critérios ecológicos severos provoca degradações globais alarmantes como:",
        list: [
            "Desmatamento em larga escala e conversão de florestas nativas em pastagens.",
            "Consumo exacerbado e desperdício direto de recursos hídricos potáveis.",
            "Erosão severa, perda de nutrientes fundamentais e desertificação do solo.",
            "Poluição química de rios e lençóis freáticos por uso massivo de agrotóxicos."
        ]
    },
    {
        id: "atitudes",
        title: "Atitudes e Práticas de Transformação",
        content: "Mudar o rumo do setor exige ações tecnológicas e escolhas conscientes:",
        list: [
            "**Agricultura de Precisão:** Sensores IoT monitoram o solo reduzindo água e insumos a níveis mínimos.",
            "**Sistemas Integrados (ILPF):** Alternar Lavoura, Pecuária e Floresta regenera a terra de forma natural.",
            "**Consumo Regional:** Comprar de micro e pequenos produtores elimina a pegada de CO2 dos transportes.",
            "**Certificação Certificada:** Exigir selos que comprovem práticas de desmatamento zero."
        ]
    }
];

// Dados das Tecnologias do Carrossel
const carouselData = [
    { title: "Manejo Agroflorestal", text: "Plantar culturas agrícolas em consórcio com árvores nativas, recuperando biomas." },
    { title: "Inteligência Artificial no Campo", text: "Algoritmos que analisam imagens de drones para detectar focos de pragas isoladas." },
    { title: "Rastreabilidade Blockchain", text: "Armazenamento imutável de dados para garantir a origem sustentável do produto." }
];

// Dados dos Cards de Métricas
const metricsData = [
    { value: "-40%", text: "Redução no Desperdício de Água" },
    { value: "+30%", text: "Preservação de Áreas Nativas" },
    { value: "100%", text: "Rastreabilidade Auditada" }
];

// Dicionário de Termos e Conhecimento da IA do Chat
const aiKnowledge = {
    definicao: "O agronegócio é a integração de toda a cadeia produtiva rural, desde insumos e maquinários até a colheita, industrialização e venda.",
    impacto: "Os impactos severos incluem degradação de solos, desmatamento para pastagem, e o uso de químicos contaminantes em ecossistemas de água doce.",
    atitudes: "Atitudes essenciais envolvem o uso de agricultura regenerativa, sistemas integrados ILPF, e a exigência de alimentos com rastreabilidade auditada por selos verdes."
};

// ==========================================
// 2. INICIALIZADOR GLOBAL (DOM READY)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Injeções Iniciais
    renderKnowledgePanels();
    renderCarousel();
    renderMetrics();

    // Motores de Comportamento e UX
    initTabsLogic();
    initCarouselLogic();
    initAiChatLogic();
    initAccessibility();
    initScrollReveal();
});

// ==========================================
// 3. FUNÇÕES DE RENDERIZAÇÃO DINÂMICA
// ==========================================
function renderKnowledgePanels() {
    const container = document.getElementById("knowledge-panels-container");
    container.innerHTML = knowledgeSections.map((sec, index) => `
        <article id="panel-${sec.id}" class="tab-panel" role="tabpanel" aria-labelledby="tab-${sec.id}" ${index > 0 ? "hidden" : ""}>
            <h3>${sec.title}</h3>
            <p>${sec.content}</p>
            ${sec.list ? `<ul>${sec.list.map(li => `<li>${li}</li>`).join('')}</ul>` : ""}
        </article>
    `).join('');
}

function renderCarousel() {
    const track = document.getElementById("carousel-track");
    track.innerHTML = carouselData.map((item, i) => `
        <div class="carousel-item" role="group" aria-label="Slide ${i+1} de ${carouselData.length}">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        </div>
    `).join('');
}

function renderMetrics() {
    const container = document.getElementById("metrics-container");
    container.innerHTML = metricsData.map(item => `
        <div class="card metric-card">
            <span class="metric-number">${item.value}</span>
            <p>${item.text}</p>
        </div>
    `).join('');
}

// ==========================================
// 4. LÓGICA DE COMPONENTES DE INTERAÇÃO
// ==========================================

// Sistema de Abas Acessível
function initTabsLogic() {
    const tabs = document.querySelectorAll('.tab-list button');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanelId = tab.getAttribute('aria-controls');

            tabs.forEach(t => {
                t.setAttribute('aria-selected', 'false');
                t.setAttribute('tabindex', '-1');
            });
            tab.setAttribute('aria-selected', 'true');
            tab.setAttribute('tabindex', '0');

            document.querySelectorAll('.tab-panel').forEach(p => p.setAttribute('hidden', ''));
            document.getElementById(targetPanelId).removeAttribute('hidden');
        });
    });
}

// Carrossel
function initCarouselLogic() {
    const track = document.getElementById("carousel-track");
    let index = 0;

    document.getElementById("next-slide").addEventListener("click", () => {
        index = (index + 1) % carouselData.length;
        track.style.transform = `translateX(-${index * 100}%)`;
    });

    document.getElementById("prev-slide").addEventListener("click", () => {
        index = (index - 1 + carouselData.length) % carouselData.length;
        track.style.transform = `translateX(-${index * 100}%)`;
    });
}

// ==========================================
// 5. CAMADA DE INTELIGÊNCIA ARTIFICIAL (BOT)
// ==========================================
function initAiChatLogic() {
    const toggleBtn = document.getElementById("chat-toggle");
    const closeBtn = document.getElementById("chat-close");
    const windowChat = document.getElementById("chat-window");
    const form = document.getElementById("chat-form");
    const input = document.getElementById("chat-input");
    const messagesContainer = document.getElementById("chat-messages");

    toggleBtn.addEventListener("click", () => {
        windowChat.removeAttribute("hidden");
        toggleBtn.setAttribute("aria-expanded", "true");
        input.focus();
    });

    closeBtn.addEventListener("click", () => {
        windowChat.setAttribute("hidden", "");
        toggleBtn.setAttribute("aria-expanded", "false");
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = input.value.trim().toLowerCase();
        if (!query) return;

        appendMessage(input.value, "user-msg");
        input.value = "";

        setTimeout(() => {
            let reply = "Perdoe-me, não entendi o termo completo. Tente usar palavras-chave como 'definição', 'impacto' ou 'atitudes'.";
            for (let key in aiKnowledge) {
                if (query.includes(key)) {
                    reply = aiKnowledge[key];
                    break;
                }
            }
            appendMessage(reply, "bot-msg");
        }, 500);
    });

    function appendMessage(text, className) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `msg ${className}`;
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// ==========================================
// 6. ACESSIBILIDADE E ANIMAÇÕES DE ENTRADA
// ==========================================
function initAccessibility() {
    let baseFontSizePercentage = 100;
    
    document.getElementById("btn-contrast").addEventListener("click", (e) => {
        const active = document.body.classList.toggle("high-contrast");
        e.target.setAttribute("aria-pressed", active);
    });

    document.getElementById("btn-font-increase").addEventListener("click", () => {
        if(baseFontSizePercentage < 130) {
            baseFontSizePercentage += 10;
            document.documentElement.style.fontSize = `${baseFontSizePercentage}%`;
        }
    });

    document.getElementById("btn-font-decrease").addEventListener("click", () => {
        if(baseFontSizePercentage > 90) {
            baseFontSizePercentage -= 10;
            document.documentElement.style.fontSize = `${baseFontSizePercentage}%`;
        }
    });
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
}
