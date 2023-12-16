const WIDTH = 50;

const btnWrapper = document.querySelector(".game-menu__buttons--wrapper");

export function slideBg(n) {
  const bgOffset = WIDTH * n;
  btnWrapper.style.setProperty("--bg-offset", `${bgOffset}%`);

  const buttons = btnWrapper.querySelectorAll(".game-menu__mark-btn");
  buttons.forEach((button) => button.classList.remove("active"));

  const selectedButton = buttons[n];
  selectedButton.classList.add("active");
}
