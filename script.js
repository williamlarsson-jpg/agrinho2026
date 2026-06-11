// ==========================================
// 1. DATA STORES (Dados Dinâmicos)
// ==========================================
const pillarsData = [
    { title: "Produção Local", desc: "Apoio direto ao pequeno produtor, reduzindo a pegada de carbono do transporte urbano." },
    { title: "Desperdício Zero", desc: "Sistemas inteligentes de colheita e distribuição que evitam perdas na cadeia produtiva." },
    { title: "Tecnologia Verde", desc: "Uso de IA e IoT para otimizar o uso da água e eliminar defensivos químicos nocivos." }
];

const carouselData = [
    { title: "Agricultura Regenerativa", text: "Técnicas que recuperam a saúde do solo e promovem a biodiversidade local." },
    { title: "Crédito de Carbono", text: "Incentivos financeiros para produtores que mantêm florestas nativas de pé." },
    { title: "Rastreabilidade por Blockchain", text: "Saiba exatamente de onde veio o seu alimento, do plantio até a sua mesa." }
];

const metricsData = [
    { value: "-40%", text: "Uso de Água Potável" },
    { value: "+25%", text: "Renda Média do Produtor" },
    { value: "0%", text: "Uso de Desmatamento" }
];

const faqData = [
    { q: "O que é consumo consciente no agronegócio?", a: "É a escolha por produtos que respeitam os limites ambientais, garantem condições justas de trabalho no campo e evitam o desperdício." },
    { q: "Como a tecnologia ajuda na sustentabilidade?", a: "Sensores de umidade evitam o desperdício de água, enquanto drones identificam pragas cirurgicamente, reduzindo o uso de insumos químicos." }
];

// Base de Conhecimento do Chatbot de IA
const aiKnowledge = {
    credito: "Nosso programa de crédito de carbono recompensa produtores que mantêm áreas de preservação ambiental intactas.",
    tecnologia: "Utilizamos inteligência artificial em drones e sensores IoT para monitorar o solo e aplicar água e bioinsumos apenas onde é estritamente necessário.",
    desperdicio: "Com nossa logística inteligente rastreada por blockchain, conseguimos mitigar perdas de alimentos em até 80% do campo à mesa.",
    consumo: "Consumir consciente significa comprar de produtores certificados que não utilizam áreas desmatadas e garantem direitos trabalhistas justos."
};

// ==========================================
// 2. INICIALIZAÇÃO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    renderPillars();
    renderCarousel();
    renderMetrics();
    renderFAQ();
    initAccessibility();
    initCarouselLogic();
    initAccordionLogic();
    initScrollReveal();
    initAiChatLogic();
});

// Renderizadores Dinâmicos
function renderPillars() {
    document.getElementById("pillars-grid").innerHTML = pillarsData.map(item => `
        <article class="card">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        </article>
    `).join('');
}

function renderCarousel() {
    document.getElementById("carousel-track").innerHTML = carouselData.map((item, i) => `
        <div class="carousel-item" role="group" aria-roledescription="slide" aria-label="${i+1} de ${carouselData.length}">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        </div>
    `).join('');
}

function renderMetrics() {
    document.getElementById("metrics-container").innerHTML = metricsData.map(item => `
        <div class="card metric-card">
            <span class="metric-number">${item.value}</span>
            <p>${item.text}</p>
        </div>
    `).join('');
}

function renderFAQ() {
    document.getElementById("faq-accordion").innerHTML = faqData.map((item, i) => `
        <div class="accordion-item">
            <button class="accordion-header" id="faq-header-${i}" aria-expanded="false" aria-controls="faq-content-${i}">
                ${item.q} <span class="icon" aria-hidden="true">+</span>
            </button>
            <div id="faq-content-${i}" class="accordion-content" role="region" aria-labelledby="faq-header-${i}">
                <p style="padding: 1rem 0;">${item.a}</p>
            </div>
        </div>
    `).join('');
}

// ==========================================
// 3. COMPONENTE: CAMADA DE INTELIGÊNCIA (IA CHATBOT)
// ==========================================
function initAiChatLogic() {
    const toggleBtn = document.getElementById("chat-toggle");
    const closeBtn = document.getElementById("chat-close");
    const windowChat = document.getElementById("chat-window");
    const form = document.getElementById("chat-form");
    const input = document.getElementById("chat-input");
    const messagesContainer = document.getElementById("chat-messages");

    // Abrir/Fechar Janela
    toggleBtn.addEventListener("click", () => {
        const isHidden = windowChat.hasAttribute("hidden");
        if (isHidden) {
            windowChat.removeAttribute("hidden");
            toggleBtn.setAttribute("aria-expanded", "true");
            input.focus();
        } else {
            windowChat.setAttribute("hidden", "");
            toggleBtn.setAttribute("aria-expanded", "false");
        }
    });

    closeBtn.addEventListener("click", () => {
        windowChat.setAttribute("hidden", "");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.focus();
    });

    // Processamento da mensagem enviado pelo usuário
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = input.value.trim().toLowerCase();
        if (!query) return;

        // Adiciona mensagem do usuário na tela
        appendMessage(input.value, "user-msg");
        input.value = "";

        // Resposta Simulado da IA (Delay UX de digitação)
        setTimeout(() => {
            let reply = "Desculpe, ainda estou aprendendo sobre esse tópico. Tente palavras-chave como 'crédito', 'tecnologia' ou 'consumo'.";
            
            // Busca simplificada por palavra-chave
            for (let key in aiKnowledge) {
                if (query.includes(key)) {
                    reply = aiKnowledge[key];
                    break;
                }
            }
            appendMessage(reply, "bot-msg");
        }, 600);
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
// 4. LÓGICAS DE COMPONENTES E ACESSIBILIDADE
// ==========================================
function initCarouselLogic() {
    const track = document.getElementById("carousel-track");
    let index = 0;
    document.getElementById("next-slide").addEventListener("click", () => { index = (index + 1) % carouselData.length; track.style.transform = `translateX(-${index * 100}%)`; });
    document.getElementById("prev-slide").addEventListener("click", () => { index = (index - 1 + carouselData.length) % carouselData.length; track.style.transform = `translateX(-${index * 100}%)`; });
}

function initAccordionLogic() {
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", () => {
            const isExpanded = header.getAttribute("aria-expanded") === "true";
            const content = document.getElementById(header.getAttribute("aria-controls"));
            header.setAttribute("aria-expanded", !isExpanded);
            content.style.maxHeight = !isExpanded ? content.scrollHeight + "px" : null;
            header.querySelector(".icon").textContent = !isExpanded ? "−" : "+";
        });
    });
}

function initAccessibility() {
    let baseSize = 100;
    document.getElementById("btn-contrast").addEventListener("click", (e) => {
        const active = document.body.classList.toggle("high-contrast");
        e.target.setAttribute("aria-pressed", active);
    });
    document.getElementById("btn-font-increase").addEventListener("click", () => { if(baseSize < 130) { baseSize += 10; document.documentElement.style.fontSize = `${baseSize}%`; } });
    document.getElementById("btn-font-decrease").addEventListener("click", () => { if(baseSize > 90) { baseSize -= 10; document.documentElement.style.fontSize = `${baseSize}%`; } });
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add("active"); observer.unobserve(entry.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
}
