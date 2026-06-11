// Dicionário de Termos e Conhecimento da IA do Chat
const aiKnowledge = {
    definicao: "O agronegócio é a integração de toda a cadeia produtiva rural, desde insumos e maquinários até a colheita, industrialização e venda.",
    impacto: "Os impactos severos incluem degradação de solos, desmatamento para pastagem, e o uso de químicos contaminantes em ecossistemas hídricos.",
    atitudes: "Atitudes essenciais envolvem o uso de agricultura de precisão, sistemas integrados ILPF, e a escolha por alimentos locais com certificação de desmatamento zero."
};

// Configurações Globais ao Carregar o Navegador
document.addEventListener("DOMContentLoaded", () => {
    initTabsLogic();
    initCarouselLogic();
    initAiChatLogic();
    initAccessibility();
});

// Lógica de Alternância das Abas (Tabs)
function initTabsLogic() {
    const tabs = document.querySelectorAll('.tab-list button');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanelId = tab.getAttribute('aria-controls');

            // Atualiza acessibilidade dos botões das abas
            tabs.forEach(t => {
                t.setAttribute('aria-selected', 'false');
                t.setAttribute('tabindex', '-1');
            });
            tab.setAttribute('aria-selected', 'true');
            tab.setAttribute('tabindex', '0');

            // Alterna a visibilidade dos painéis de texto
            document.querySelectorAll('.tab-panel').forEach(p => p.setAttribute('hidden', ''));
            document.getElementById(targetPanelId).removeAttribute('hidden');
        });
    });
}

// Lógica de Deslocamento do Carrossel de Tecnologias
function initCarouselLogic() {
    const track = document.getElementById("carousel-track");
    const totalSlides = document.querySelectorAll(".carousel-item").length;
    let index = 0;

    document.getElementById("next-slide").addEventListener("click", () => {
        index = (index + 1) % totalSlides;
        track.style.transform = `translateX(-${index * 100}%)`;
    });

    document.getElementById("prev-slide").addEventListener("click", () => {
        index = (index - 1 + totalSlides) % totalSlides;
        track.style.transform = `translateX(-${index * 100}%)`;
    });
}

// Lógica Operacional da IA (Chatbot)
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
            let reply = "Não captei essa linha de dúvida. Tente digitar termos chave como 'definição', 'impacto' ou 'atitudes'.";
            for (let key in aiKnowledge) {
                if (query.includes(key)) {
                    reply = aiKnowledge[key];
                    break;
                }
            }
            appendMessage(reply, "bot-msg");
        }, 400);
    });

    function appendMessage(text, className) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `msg ${className}`;
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Lógica de Acessibilidade (Alto Contraste e Fontes)
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
