const loader = document.querySelector(".page-loader");
if (loader) window.addEventListener("load", () => setTimeout(() => loader.classList.add("loaded"), 450));

const slides = [...document.querySelectorAll(".slide")];
const dotsContainer = document.querySelector(".slider-dots");
let currentSlide = 0;

slides.forEach((_, index) => {
  if (!dotsContainer) return;
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Ir a la imagen ${index + 1}`);
  dot.addEventListener("click", () => showSlide(index));
  dotsContainer.appendChild(dot);
});

function showSlide(index) {
  if (!slides.length || !dotsContainer) return;
  slides[currentSlide].classList.remove("active");
  dotsContainer.children[currentSlide].classList.remove("active");
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  dotsContainer.children[currentSlide].classList.add("active");
}

if (dotsContainer && dotsContainer.children.length) dotsContainer.children[0].classList.add("active");
document.querySelector(".slider-arrow.next")?.addEventListener("click", () => showSlide(currentSlide + 1));
document.querySelector(".slider-arrow.prev")?.addEventListener("click", () => showSlide(currentSlide - 1));
if (slides.length > 1) setInterval(() => showSlide(currentSlide + 1), 6000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .15 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const menuButton = document.querySelector(".menu-button");
if (menuButton) {
  menuButton.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}
document.querySelectorAll("nav a").forEach(link => link.addEventListener("click", () => document.body.classList.remove("nav-open")));

const modal = document.getElementById("breathingModal");
const breathLabel = document.getElementById("breathLabel");
const breathCount = document.getElementById("breathCount");
const modalAction = document.querySelector(".modal-action");
let breathingTimer;

if (modal) {
  document.querySelectorAll(".breathe-trigger").forEach(button => {
    button.addEventListener("click", () => modal.showModal());
  });
  document.querySelector(".modal-close").addEventListener("click", () => {
    clearInterval(breathingTimer);
    modal.close();
  });
  modal.addEventListener("click", event => {
    if (event.target === modal) modal.close();
  });

  modalAction.addEventListener("click", () => {
    clearInterval(breathingTimer);
    modalAction.textContent = "Reiniciar";
    let elapsed = 0;
    let phase = 0;
    breathingTimer = setInterval(() => {
      elapsed++;
      if (elapsed <= 4) {
        breathLabel.textContent = "Inhala";
        breathCount.textContent = `${5 - elapsed} segundos`;
      } else if (elapsed <= 8) {
        breathLabel.textContent = "Exhala";
        breathCount.textContent = `${9 - elapsed} segundos`;
      } else {
        elapsed = 0;
        phase++;
        if (phase >= 3) {
          clearInterval(breathingTimer);
          breathLabel.textContent = "Bien hecho";
          breathCount.textContent = "Llevate esta calma contigo";
          modalAction.textContent = "Terminar";
        }
      }
    }, 1000);
  });
}

document.querySelectorAll("[data-tool]").forEach(button => {
  button.addEventListener("click", () => {
    const messages = {
      ground: "Mira 5 cosas, toca 4, escucha 3, huele 2 y saborea 1.",
      journal: "Escribe una cosa que puedas soltar y una cosa que puedes controlar hoy."
    };
    alert(messages[button.dataset.tool]);
  });
});
