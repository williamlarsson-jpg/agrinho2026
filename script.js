// ==========================================
// 1. DATA STORE (Simulando uma API/Banco)
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

const faqData = [
    { q: "O que é consumo consciente no agronegócio?", a: "É a escolha por produtos que respeitam os limites ambientais, garantem condições justas de trabalho no campo e evitam o desperdício em todas as etapas." },
    { q: "Como a tecnologia ajuda na sustentabilidade?", a: "Sensores de umidade evitam o desperdício de água, enquanto drones identificam pragas cirurgicamente, reduzindo drasticamente o uso de insumos." }
];

// ==========================================
// 2. INICIALIZAÇÃO E RENDERIZAÇÃO DINÂMICA
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    renderPillars();
    renderCarousel();
    renderFAQ();
    initAccessibility();
    initCarouselLogic();
    initAccordionLogic();
    initScrollReveal();
});

// Renderizar os Pilares em Grid
function renderPillars() {
    const grid = document.getElementById("pillars-grid");
    grid.innerHTML = pillarsData.map(item => `
        <article class="card">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        </article>
    `).join('');
}

// Renderizar Itens do Carrossel
function renderCarousel() {
    const track = document.getElementById("carousel-track");
    track.innerHTML = carouselData.map((item, index) => `
        <div class="carousel-item" role="group" aria-roledescription="slide" aria-label="${index + 1} de ${carouselData.length}">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        </div>
    `).join('');
}

// Renderizar FAQ (Acordeão) com atributos ARIA dinâmicos
function renderFAQ() {
    const accordion = document.getElementById("faq-accordion");
    accordion.innerHTML = faqData.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-header" id="faq-header-${index}" aria-expanded="false" aria-controls="faq-content-${index}">
                ${item.q}
                <span class="icon" aria-hidden="true">+</span>
            </button>
            <div id="faq-content-${index}" class="accordion-content" role="region" aria-labelledby="faq-header-${index}">
                <p style="padding: 1rem 0;">${item.a}</p>
            </div>
        </div>
    `).join('');
}

// ==========================================
// 3. LOGICA DO CARROSSEL (Acessível)
// ==========================================
function initCarouselLogic() {
    const track = document.getElementById("carousel-track");
    const nextBtn = document.getElementById("next-slide");
    const prevBtn = document.getElementById("prev-slide");
    let currentIndex = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % carouselData.length;
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        updateCarousel();
    });
}

// ==========================================
// 4. LÓGICA DO ACORDEÃO (Expandables)
// ==========================================
function initAccordionLogic() {
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const isExpanded = header.getAttribute("aria-expanded") === "true";
            const content = document.getElementById(header.getAttribute("aria-controls"));
            const icon = header.querySelector(".icon");

            // Fecha todos antes de abrir o atual (Opcional - UX de sanfona)
            headers.forEach(h => {
                h.setAttribute("aria-expanded", "false");
                document.getElementById(h.getAttribute("aria-controls")).style.maxHeight = null;
                h.querySelector(".icon").textContent = "+";
            });

            if (!isExpanded) {
                header.setAttribute("aria-expanded", "true");
                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = "−";
            }
        });
    });
}

// ==========================================
// 5. ACESSIBILIDADE: CONTRASTE E FONTE
// ==========================================
function initAccessibility() {
    const btnContrast = document.getElementById("btn-contrast");
    const btnFontIncrease = document.getElementById("btn-font-increase");
    const btnFontDecrease = document.getElementById("btn-font-decrease");
    
    let currentFontSize = 100; // Porcentagem base

    // Alternar Alto Contraste
    btnContrast.addEventListener("click", () => {
        const isHighContrast = document.body.classList.toggle("high-contrast");
        btnContrast.setAttribute("aria-pressed", isHighContrast);
    });

    // Controle de Fonte
    btnFontIncrease.addEventListener("click", () => {
        if(currentFontSize < 130) { // Limite de UX para não quebrar o layout
            currentFontSize += 10;
            document.documentElement.style.fontSize = `${currentFontSize}%`;
        }
    });

    btnFontDecrease.addEventListener("click", () => {
        if(currentFontSize > 90) {
            currentFontSize -= 10;
            document.documentElement.style.fontSize = `${currentFontSize}%`;
        }
    });
}

// ==========================================
// 6. ANIMAÇÃO SCROLL REVEAL (Intersection Observer)
// ==========================================
function initScrollReveal() {
    const items = document.querySelectorAll(".scroll-reveal");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Anima apenas uma vez ao rolar
            }
        });
    }, { threshold: 0.15 });

    items.forEach(item => observer.observe(item));
}