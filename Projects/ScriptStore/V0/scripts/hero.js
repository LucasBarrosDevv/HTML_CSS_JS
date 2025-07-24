document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".benefit-card, .code-card");
  animatedElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
  });
});
