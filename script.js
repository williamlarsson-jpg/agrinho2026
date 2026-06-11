// Banco de respostas do chat local
const aiKnowledge = {
    definicao: "O agronegócio é a integração de toda a cadeia produtiva rural, desde insumos e maquinários até a colheita, industrialização e venda.",
    impacto: "Os impactos severos incluem degradação de solos, desmatamento para pastagem, e o uso de químicos contaminantes em ecossistemas hídricos.",
    atitudes: "Atitudes essenciais envolvem o uso de agricultura de precisão, sistemas integrados ILPF, e a escolha por alimentos locais com certificação verde."
};

// Variáveis de Controle do Minigame
let gameMoney = 100;
let gameEco = 100;
let currentGameStage = 0;
let ecoChoicesCount = 0; // Conta quantas opções sustentáveis o jogador escolheu

const gameStages = [
    {
        text: "Estágio 1: Pragas atacaram sua grande plantação de soja. Qual insumo você vai comprar para resolver?",
        options: [
            { text: "Comprar pesticidas químicos tradicionais (Barato, mas polui a água)", money: -15, eco: -25, isEco: false },
            { text: "Investir em bio-defensivos e drones de precisão (Mais caro, mas ecológico)", money: -40, eco: +5, isEco: true }
        ]
    },
    {
        text: "Estágio 2: Você precisa expandir a área de pastagem para o gado da sua agroindústria. O que fazer?",
        options: [
            { text: "Derrubar uma parte da mata nativa da fazenda (Custo zero, mas gera desmatamento)", money: 0, eco: -40, isEco: false },
            { text: "Implementar o sistema de Integração Lavoura-Pecuária-Floresta (Ganha bônus de sustentabilidade)", money: -30, eco: +20, isEco: true }
        ]
    },
    {
        text: "Estágio 3: O maquinário da sua indústria está antigo e gastando muito diesel, liberando muito CO₂.",
        options: [
            { text: "Ignorar e manter funcionando assim mesmo (Economiza dinheiro agora)", money: +20, eco: -20, isEco: false },
            { text: "Financiar novos tratores elétricos e biocombustíveis (Gasto alto, reduz emissões)", money: -50, eco: +20, isEco: true }
        ]
    }
];

// Disparador principal ao carregar o DOM
document.addEventListener("DOMContentLoaded", () => {
    initPageNavigation();
    initCarouselLogic();
    initCalculadora();
    initAiChatLogic();
    initAccessibility();
    initGameLogic();
});

// 1. SISTEMA UNIFICADO DE NAVEGAÇÃO SPA
function initPageNavigation() {
    const allNavButtons = document.querySelectorAll("[data-target]");
    
    allNavButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = button.getAttribute("data-target");
            const targetPage = document.getElementById(targetId);

            if (targetPage) {
                document.querySelectorAll(".site-page").forEach(page => page.setAttribute("hidden", ""));
                targetPage.removeAttribute("hidden");

                document.querySelectorAll(".nav-links .nav-btn").forEach(btn => {
                    btn.classList.remove("active");
                    if (btn.getAttribute("data-target") === targetId) {
                        btn.classList.add("active");
                    }
                });

                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    });

    const logoHome = document.getElementById("logo-home");
    if (logoHome) {
        logoHome.addEventListener("click", (e) => {
            e.preventDefault();
            const startBtn = document.querySelector('.nav-btn[data-target="page-inicio"]');
            if (startBtn) startBtn.click();
        });
    }
}

// 2. CONTROLE DO CARROSSEL DE INOVAÇÕES
function initCarouselLogic() {
    const track = document.getElementById("carousel-track");
    const prevBtn = document.getElementById("prev-slide");
    const nextBtn = document.getElementById("next-slide");
    let slideIdx = 0;

    if (track && prevBtn && nextBtn) {
        const items = track.querySelectorAll(".carousel-item");
        if (items.length > 0) {
            nextBtn.onclick = () => {
                slideIdx = (slideIdx + 1) % items.length;
                track.style.transform = `translateX(-${slideIdx * 100}%)`;
            };
            prevBtn.onclick = () => {
                slideIdx = (slideIdx - 1 + items.length) % items.length;
                track.style.transform = `translateX(-${slideIdx * 100}%)`;
            };
        }
    }
}

// 3. CALCULO DE RESULTADOS DA CALCULADORA
function initCalculadora() {
    const calcForm = document.getElementById("calc-form");
    if (calcForm) {
        calcForm.onsubmit = (e) => {
            e.preventDefault();
            const carne = document.getElementById("carne") ? parseFloat(document.getElementById("carne").value) : 0;
            const descarte = document.getElementById("desperdicio") ? parseFloat(document.getElementById("desperdicio").value) : 0;
            const total = carne + descarte;

            const resBox = document.getElementById("calc-result");
            const resText = document.getElementById("result-text");

            if (resBox && resText) {
                resBox.removeAttribute("hidden");
                resText.textContent = total >= 45 ? "Pegada Ecológica Elevada 🚨 (Ajuste suas atitudes!)" : "Pegada Ecológica Baixa 🌱 (Excelente impacto!)";
                resBox.scrollIntoView({ behavior: "smooth" });
            }
        };
    }
}

// 4. LÓGICA DO MINIGAME COM COMENTÁRIOS E ANÁLISE DE EQUILÍBRIO
function initGameLogic() {
    const moneyDisplay = document.getElementById("game-money");
    const ecoDisplay = document.getElementById("game-eco");
    const textDisplay = document.getElementById("game-text");
    const optionsContainer = document.getElementById("game-options");
    const gameContent = document.getElementById("game-content");
    const gameOverScreen = document.getElementById("game-over-screen");
    const gameOverTitle = document.getElementById("game-over-title");
    const gameOverText = document.getElementById("game-over-text");
    const restartBtn = document.getElementById("btn-restart-game");

    function updateDashboard() {
        if(moneyDisplay) moneyDisplay.textContent = gameMoney;
        if(ecoDisplay) ecoDisplay.textContent = gameEco;
        
        // Derrotas antes do fim dos estágios
        if (gameMoney <= 0) {
            endGame(false, "💸 Falência total! Você focou tanto em salvar o planeta ou investir caro que seu caixa zerou. O agronegócio sustentável precisa ser economicamente viável para continuar existindo. Tente planejar seus gastos melhor na próxima rodada!");
        } else if (gameEco <= 0) {
            endGame(false, "🚨 Desastre Ecológico! Suas escolhas esgotaram os recursos naturais, poluíram a água e causaram desmatamento crítico. Sua fazenda foi multada e interditada pela fiscalização ambiental. Lucro sem consciência destrói o futuro!");
        }
    }

    function loadStage() {
        if (currentGameStage >= gameStages.length) {
            // Análise do comportamento do jogador se ele vencer sobrevivendo a todas as fases
            if (ecoChoicesCount === 0) {
                endGame(true, "⚠️ Você venceu raspando! Suas finanças estão ótimas, mas você escolheu o caminho mais agressivo para o planeta em todas as rodadas. Sua Sustentabilidade despencou. Lembre-se: no agronegócio moderno, ignorar o impacto ambiental gera prejuízos de longo prazo!");
            } else if (ecoChoicesCount === gameStages.length) {
                endGame(true, "🌱 Perfil Preservacionista Extremista! Você escolheu todas as opções ecológicas. O planeta agradece, mas seu bolso quase zerou! Para um agronegócio se manter vivo no mundo real, precisamos balancear investimentos verdes com o retorno financeiro.");
            } else {
                endGame(true, "🏆 Equilíbrio Perfeito! Parabéns, você agiu como um verdadeiro Gestor Consciente! Soube investir em tecnologia limpa (como bio-defensivos ou ILPF) nos momentos certos e manteve a saúde financeira da sua cadeia produtiva rodando. Esse é o futuro do agro!");
            }
            return;
        }

        const stage = gameStages[currentGameStage];
        if(textDisplay) textDisplay.textContent = stage.text;
        if(optionsContainer) {
            optionsContainer.innerHTML = "";
            stage.options.forEach(option => {
                const btn = document.createElement("button");
                btn.className = "game-btn";
                btn.textContent = option.text;
                btn.onclick = () => {
                    gameMoney += option.money;
                    gameEco = Math.max(0, Math.min(100, gameEco + option.eco));
                    if (option.isEco) ecoChoicesCount++;
                    
                    currentGameStage++;
                    updateDashboard();
                    if (gameMoney > 0 && gameEco > 0) loadStage();
                };
                optionsContainer.appendChild(btn);
            });
        }
    }

    function endGame(victory, message) {
        if(gameContent) gameContent.hidden = true;
        if(gameOverScreen) gameOverScreen.hidden = false;
        if(gameOverTitle) gameOverTitle.textContent = victory ? "Análise do seu Perfil:" : "Fim de Jogo!";
        if(gameOverText) gameOverText.textContent = message;
    }

    if (restartBtn) {
        restartBtn.onclick = () => {
            gameMoney = 100;
            gameEco = 100;
            currentGameStage = 0;
            ecoChoicesCount = 0;
            if(gameContent) gameContent.hidden = false;
            if(gameOverScreen) gameOverScreen.hidden = true;
            updateDashboard();
            loadStage();
        };
    }

    updateDashboard();
    loadStage();
}

// 5. SISTEMA DO CHATBOT (ABRE, FECHA NO X, E RESPONDE)
function initAiChatLogic() {
    const toggle = document.getElementById("chat-toggle");
    const chatWin = document.getElementById("chat-window");
    const closeBtn = document.getElementById("chat-close");
    const form = document.getElementById("chat-form-element");
    const inp = document.getElementById("chat-input");
    const msgArea = document.getElementById("chat-messages");

    if (toggle && chatWin) {
        toggle.onclick = () => { chatWin.hidden = !chatWin.hidden; };
        if (closeBtn) {
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                chatWin.hidden = true;
            };
        }
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
                }, 300);
            };
        }
    }
}

// 6. CONTROLES DE ACESSIBILIDADE
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
            if (fontSize < 130) { fontSize += 10; document.documentElement.style.fontSize = fontSize + "%"; }
        };
    }
    if (btnDecrease) {
        btnDecrease.onclick = () => {
            if (fontSize > 90) { fontSize -= 10; document.documentElement.style.fontSize = fontSize + "%"; }
        };
    }
}
