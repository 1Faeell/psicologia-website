// Menu Mobile Toggle
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

// Header Scroll Effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Fechar menu mobile após clicar
      const navLinks = document.getElementById("navLinks");
      navLinks.classList.remove("active");
    }
  });
});

// Carousel de Depoimentos
let currentDepoimento = 0;
const depoimentos = document.querySelectorAll(".depoimento");
const wrapper = document.getElementById("depoimentosWrapper");
const dotsContainer = document.getElementById("carouselDots");

// Criar dots
depoimentos.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToDepoimento(index));
  dotsContainer.appendChild(dot);
});

function updateCarousel() {
  wrapper.style.transform = `translateX(-${currentDepoimento * 100}%)`;
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentDepoimento);
  });
}

function nextDepoimento() {
  currentDepoimento = (currentDepoimento + 1) % depoimentos.length;
  updateCarousel();
}

function previousDepoimento() {
  currentDepoimento =
    (currentDepoimento - 1 + depoimentos.length) % depoimentos.length;
  updateCarousel();
}

function goToDepoimento(index) {
  currentDepoimento = index;
  updateCarousel();
}

// Auto-play carousel
setInterval(nextDepoimento, 6000);

// FAQ Toggle
function toggleFaq(element) {
  const faqItem = element.parentElement;
  const wasActive = faqItem.classList.contains("active");

  // Fechar todos os FAQs
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Abrir o clicado se não estava ativo
  if (!wasActive) {
    faqItem.classList.add("active");
  }
}

// Form Submit
function enviarFormulario(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const mensagem = document.getElementById("mensagem").value;

  // Criar mensagem para WhatsApp
  const textoWhatsApp = `Olá! Meu nome é ${nome}.%0A%0AE-mail: ${email}%0ATelefone: ${telefone}%0A%0AMensagem: ${mensagem}`;
  const numeroWhatsApp = "5511987654321"; // Substitua pelo número real

  // Abrir WhatsApp
  window.open(
    `https://wa.me/${numeroWhatsApp}?text=${textoWhatsApp}`,
    "_blank"
  );

  // Limpar formulário
  e.target.reset();

  alert("Obrigada pelo contato! Você será redirecionado para o WhatsApp.");
}

// Animação de scroll reveal
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});
