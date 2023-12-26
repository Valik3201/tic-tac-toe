/**
 * The width of the background in percentage.
 * @constant
 * @type {number}
 */
const WIDTH = 50;

/**
 * The wrapper element containing the game menu buttons.
 * @type {HTMLElement}
 */
const btnWrapper = document.querySelector(".game-menu__buttons--wrapper");

/**
 * Slides the background based on the given index.
 *
 * @param {number} n - The index indicating which background to display.
 * @returns {void}
 */
export function slideBg(n) {
  // Calculate the offset based on the width and index
  const bgOffset = WIDTH * n;

  // Set the CSS variable to update the background position
  btnWrapper.style.setProperty("--bg-offset", `${bgOffset}%`);

  // Remove the "active" class from all buttons
  const buttons = btnWrapper.querySelectorAll(".game-menu__mark-btn");
  buttons.forEach((button) => button.classList.remove("active"));

  // Add the "active" class to the selected button
  const selectedButton = buttons[n];
  selectedButton.classList.add("active");
}
