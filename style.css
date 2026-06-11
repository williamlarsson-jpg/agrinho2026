// Base de conhecimento real para o Chatbot
const aiKnowledge = {
    definicao: "O agronegócio engloba três setores: antes da porteira (insumos e pesquisas), dentro da porteira (produção agrícola/pecuária) e depois da porteira (indústria de processamento, logística e distribuição).",
    impacto: "De acordo com o IPCC e a FAO, os principais impactos ecológicos são a supressão de vegetação ativa para pastagens/monoculturas, emissão de metano (pecuária entérica), óxido nitroso (fertilizantes) e alta captação de água doce para irrigação.",
    atitudes: "Medidas eficazes de mitigação incluem os sistemas ILPF da Embrapa, agricultura de precisão para racionalizar insumos nitrogenados e a transição para bioinsumos biológicos."
};

// Variáveis de Controle do Minigame Baseado em Dados Científicos
let gameMoney = 100;
let gameEco = 100;
let currentGameStage = 0;
let ecoChoicesCount = 0; 

const gameStages = [
    {
        text: "Cenário 1 (Manejo de Pragas): Sua plantação de soja sofreu infestação severa. Os defensivos de síntese química tradicionais são mais baratos no mercado, porém causam contaminação residual de polinizadores e corpos d'água.",
        options: [
            { text: "Aplicar defensivo químico de largo espectro convencional (Baixo custo operacional imediato)", money: -15, eco: -25, isEco: false },
            { text: "Investir em manejo integrado de pragas (MIP) e bioinsumos biológicos (Maior investimento inicial em transição)", money: -40, eco: +10, isEco: true }
        ]
    },
    {
        text: "Cenário 2 (Uso da Terra): Seu planejamento de produção demanda expandir a área de pastagem bovina. O desmatamento de remanescentes florestais nativos gera passivo ambiental legal e emissões severas de carbono.",
        options: [
            { text: "Efetuar a supressão vegetal de mata nativa na propriedade (Custo financeiro direto nulo, alto dano ecológico)", money: 0, eco: -40, isEco: false },
            { text: "Recuperar pastagens degradadas através do sistema ILPF recomendado pela Embrapa (Custo técnico de implantação elevado)", money: -35, eco: +20, isEco: true }
        ]
    },
    {
        text: "Cenário 3 (Nutrição e Solo): O uso contínuo de fertilizantes nitrogenados convencionais está provocando lixiviação de nitrato no solo e altas taxas de emissão de óxido nitroso (N₂O).",
        options: [
            { text: "Manter as aplicações de adubação química tradicional sem fracionamento (Evita custos de novos equipamentos)", money: +10, eco: -25, isEco: false },
            { text: "Implementar maquinários com tecnologia de Agricultura de Precisão com aplicação em taxa variável (Custo alto de maquinário)", money: -45, eco: +20, isEco: true }
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

// 3. CALCULO DE RESULTADOS DA CALCULADORA (DADOS WATER FOOTPRINT NETWORK)
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
                resText.textContent = total === 0 ? "Pegada Mínima Registrada." : `Aproximadamente ${total.toLocaleString('pt-BR')} Litros de água virtual mobilizados semanalmente por estes indicadores de consumo selecionados.`;
                resBox.scrollIntoView({ behavior: "smooth" });
            }
        };
    }
}

// 4. LÓGICA DO MINIGAME REALISTA
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
        
        if (gameMoney <= 0) {
            endGame(false, "💸 Falência Financeira: A transição para práticas sustentáveis no agronegócio requer planejamento de fluxo de caixa de médio prazo. Investimentos verdes sem viabilidade econômica imediata inviabilizam o custeio operacional da atividade rural.");
        } else if (gameEco <= 0) {
            endGame(false, "🚨 Colapso Ecológico / Embargo Legal: A degradação cumulativa dos recursos naturais (contaminação hídrica, erosão e desmatamento ilegal) acarretou multas governamentais críticas e o embargo comercial da sua produção.");
        }
    }

    function loadStage() {
        if (currentGameStage >= gameStages.length) {
            if (ecoChoicesCount === 0) {
                endGame(true, "⚠️ Margem Crítica de Sustentabilidade: A propriedade manteve balanço financeiro positivo, contudo, a dependência integral de matrizes químicas e práticas agressivas reduziu drasticamente os serviços ecossistêmicos do solo e da água.");
            } else if (ecoChoicesCount === gameStages.length) {
                endGame(true, "🌱 Perfil Preservacionista de Alto Custo: Sua gestão implementou todas as salvaguardas ecológicas disponíveis, porém exauriu quase em sua totalidade as reservas de capital produtivo, sinalizando problemas de sustentabilidade econômica.");
            } else {
                endGame(true, "🏆 Gestão de Balanço Integrado (ESG): Excelente. Você equilibrou a adoção de tecnologias de mitigação ambiental validadas (como ILPF e agricultura de precisão) sem comprometer o fluxo de capital de giro necessário para manter a atividade produtiva viável.");
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
        if(gameOverTitle) gameOverTitle.textContent = victory ? "Análise do seu Perfil de Gestão:" : "Simulação Interrompida:";
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

// 5. SISTEMA DO CHATBOT 
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
                    let reply = "Consulta inconclusiva. Digite palavras exatas como 'definição', 'impacto' ou 'atitudes' para obter as bases científicas cadastrais.";
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
