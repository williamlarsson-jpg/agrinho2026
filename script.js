// Base de conhecimento para o Chatbot
const aiKnowledge = {
    definicao: "O agronegócio é a integração de toda a cadeia produtiva rural, desde insumos e maquinários até a colheita, industrialização e venda.",
    impacto: "Os impactos severos incluem degradação de solos, desmatamento para pastagem, e o uso de químicos contaminantes em ecossistemas hídricos.",
    atitudes: "Atitudes essenciais envolvem o uso de agricultura de precisão, sistemas integrados ILPF, e a escolha por alimentos locais com certificação verde."
};

// Executa assim que a página carregar
document.addEventListener("DOMContentLoaded", () => {
    initPageNavigation();
    initCarouselLogic();
    initCalculadora();
    initAiChatLogic();
    initAccessibility();
});

// 1. SISTEMA DE NAVEGAÇÃO (Aba Ativa / Esconder as outras)
function initPageNavigation() {
    // Seleciona todos os botões que possuem o atributo data-target
    const navButtons = document.querySelectorAll("[data-target]");
    
    navButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = button.getAttribute("data-target");
            const targetPage = document.getElementById(targetId);

            if (targetPage) {
                // Oculta todas as páginas do site
                document.querySelectorAll(".site-page").forEach(page => {
                    page.setAttribute("hidden", "");
                });
                
                // Mostra a página que foi clicada
                targetPage.removeAttribute("hidden");

                // Atualiza o visual do menu superior (botão ativo)
                document.querySelectorAll(".nav-links .nav-btn").forEach(btn => {
                    btn.classList.remove("active");
                    if(btn.getAttribute("data-target") === targetId) {
                        btn.classList.add("active");
                    }
                });

                // Joga a tela para o topo suavemente
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Clique na Logo leva para o Início
    const logoHome = document.getElementById("logo-home");
    if (logoHome) {
        logoHome.onclick = (e) => {
            e.preventDefault();
            const btnInicio = document.querySelector('.nav-btn[data-target="page-inicio"]');
            if (btnInicio) btnInicio.click();
        };
    }
}

// 2. LOGICA DO CARROSSEL
function initCarouselLogic() {
    const track = document.getElementById("carousel-track");
    const prevBtn = document.getElementById("prev-slide");
    const nextBtn = document.getElementById("next-slide");
    let slideIdx = 0;

    if (track && prevBtn && nextBtn) {
        const totalSlides = track.querySelectorAll(".carousel-item").length;
        
        if (totalSlides > 0) {
            nextBtn.onclick = () => { 
                slideIdx = (slideIdx + 1) % totalSlides; 
                track.style.transform = `translateX(-${slideIdx * 100}%)`; 
            };
            prevBtn.onclick = () => { 
                slideIdx = (slideIdx - 1 + totalSlides) % totalSlides; 
                track.style.transform = `translateX(-${slideIdx * 100}%)`; 
            };
        }
    }
}

// 3. LOGICA DA CALCULADORA
function initCalculadora() {
    const calcForm = document.getElementById("calc-form");
    if (calcForm) {
        calcForm.onsubmit = (e) => {
            e.preventDefault();
            const carneVal = document.getElementById("carne") ? parseFloat(document.getElementById("carne").value) : 0;
            const despVal = document.getElementById("desperdicio") ? parseFloat(document.getElementById("desperdicio").value) : 0;
            const total = carneVal + despVal;
            
            const resBox = document.getElementById("calc-result");
            const resText = document.getElementById("result-text");
            
            if (resBox && resText) {
                resBox.removeAttribute("hidden");
                resText.textContent = total >= 45 ? "Pegada Ecológica Elevada 🚨 (Ajuste suas atitudes!)" : "Pegada Ecológica Baixa 🌱 (Excelente impacto!)";
                resBox.scrollIntoView({ behavior: 'smooth' });
            }
        };
    }
}

// 4. LOGICA DO CHATBOT (ABRIR, FECHAR E RESPONDER)
function initAiChatLogic() {
    const toggle = document.getElementById("chat-toggle");
    const chatWin = document.getElementById("chat-window");
    const closeBtn = document.getElementById("chat-close");
    const form = document.getElementById("chat-form-element");
    const inp = document.getElementById("chat-input");
    const msgArea = document.getElementById("chat-messages");

    if (toggle && chatWin) {
        // Abre / Fecha clicando no botão flutuante
        toggle.onclick = () => {
            chatWin.hidden = !chatWin.hidden;
        };
        
        // Fecha clicando no X
        if (closeBtn) {
            closeBtn.onclick = (e) => {
                e.stopPropagation(); // Evita conflitos de clique
                chatWin.hidden = true;
            };
        }
        
        // Envio de mensagens
        if (form && inp && msgArea) {
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
}

// 5. FERRAMENTAS DE ACESSIBILIDADE
function initAccessibility() {
    const btnContrast = document.getElementById("btn-contrast");
    if (btnContrast) {
        btnContrast.onclick = () => document.body.classList.toggle("high-contrast");
    }
    
    let fontSize = 100;
    const btnIncrease = document.getElementById("btn-font-increase");
    const btnDecrease = document.getElementById("btn-font-decrease");
    
    if (btnIncrease) {
        btnIncrease.onclick = () => { 
            if(fontSize < 130) { fontSize += 10; document.documentElement.style.fontSize = fontSize + "%"; } 
        };
    }
    if (btnDecrease) {
        btnDecrease.onclick = () => { 
            if(fontSize > 90) { fontSize -= 10; document.documentElement.style.fontSize = fontSize + "%"; } 
        };
    }
}
