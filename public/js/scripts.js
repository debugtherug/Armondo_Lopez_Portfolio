document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".see-more").forEach((button) => {
    button.addEventListener("click", function () {
      const project = this.parentElement;
      const fullDesc = project.querySelector(".full-desc");

      if (fullDesc.style.display === "none" || fullDesc.style.display === "") {
        fullDesc.style.display = "block";
        this.textContent = "See Less";
      } else {
        fullDesc.style.display = "none";
        this.textContent = "See More";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".timeline-card").forEach((card) => {
    card.addEventListener("click", function () {
      this.classList.toggle("expanded");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".timeline-card").forEach((card) => {
        card.querySelectorAll(".flip-button").forEach((button) => {
            button.addEventListener("click", function () {
                card.classList.toggle("flipped");
            });
        });
    });
});