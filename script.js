const aiKnowledge = {
    definicao: "O agronegócio é a integração de toda a cadeia produtiva rural, desde insumos e maquinários até a colheita, industrialização e venda.",
    impacto: "Os impactos severos incluem degradação de solos, desmatamento para pastagem, e o uso de químicos contaminantes em ecossistemas hídricos.",
    atitudes: "Atitudes essenciais envolvem o uso de agricultura de precisão, sistemas integrados ILPF, e a escolha por alimentos locais com certificação verde."
};

document.addEventListener("DOMContentLoaded", () => {
    initPageNavigation();
    initCarouselLogic();
    initCalculadora();
    initAiChatLogic();
    initAccessibility();
});

// NAVEGAÇÃO ENTRE AS ABAS/PÁGINAS DO SITE
function initPageNavigation() {
    const navButtons = document.querySelectorAll(".nav-btn, .link-btn");
    
    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");

            // Oculta todas as páginas do arquivo único
            document.querySelectorAll(".site-page").forEach(page => page.setAttribute("hidden", ""));
            
            // Exibe a página selecionada
            document.getElementById(targetId).removeAttribute("hidden");

            // Define o botão ativo no menu superior
            document.querySelectorAll(".nav-btn").forEach(btn => {
                btn.classList.remove("active");
                if(btn.getAttribute("data-target") === targetId) {
                    btn.classList.add("active");
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    const logoHome = document.getElementById("logo-home");
    if (logoHome) {
        logoHome.onclick = (e) => {
            e.preventDefault();
            document.querySelector('.nav-btn[data-target="page-inicio"]').click();
        };
    }
}

// FUNCIONAMENTO DO CARROSSEL
function initCarouselLogic() {
    const track = document.getElementById("carousel-track");
    let slideIdx = 0;
    
    if (track) {
        const totalSlides = track.querySelectorAll(".carousel-item").length;
        if (document.getElementById("next-slide") && totalSlides > 0) {
            document.getElementById("next-slide").onclick = () => { 
                slideIdx = (slideIdx + 1) % totalSlides; 
                track.style.transform = `translateX(-${slideIdx * 100}%)`; 
            };
            document.getElementById("prev-slide").onclick = () => { 
                slideIdx = (slideIdx - 1 + totalSlides) % totalSlides; 
                track.style.transform = `translateX(-${slideIdx * 100}%)`; 
            };
        }
    }
}

// CÁLCULO DA CALCULADORA
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

// FUNCIONAMENTO DO CHATBOT (CORRIGIDO)
function initAiChatLogic() {
    const toggle = document.getElementById("chat-toggle");
    const chatWin = document.getElementById("chat-window");
    const form = document.getElementById("chat-form-element");
    const inp = document.getElementById("chat-input");
    const msgArea = document.getElementById("chat-messages");
    const closeBtn = document.getElementById("chat-close");

    if (toggle && chatWin) {
        // Abre e fecha pelo botão principal
        toggle.onclick = () => chatWin.hidden = !chatWin.hidden;
        
        // CORREÇÃO: Fecha a janela clicando no X
        if (closeBtn) {
            closeBtn.onclick = () => {
                chatWin.hidden = true;
            };
        }
        
        if (form) {
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

// CONTROLES DE ACESSIBILIDADE
function initAccessibility() {
    const btnContrast = document.getElementById("btn-contrast");
    if (btnContrast) {
        btnContrast.onclick = () => document.body.classList.toggle("high-contrast");
    }
    
    let fontSize = 100;
    const btnIncrease = document.getElementById("btn-font-increase");
    const btnDecrease = document.getElementById("btn-font-decrease");
    
    if (btnIncrease) {
        btnIncrease.onclick = () => { if(fontSize < 130) { fontSize += 10; document.documentElement.style.fontSize = fontSize + "%"; } };
    }
    if (btnDecrease) {
        btnDecrease.onclick = () => { if(fontSize > 90) { fontSize -= 10; document.documentElement.style.fontSize = fontSize + "%"; } };
    }
}
