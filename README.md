<div align="center">
  <img src="https://github.com/Valik3201/tic-tac-toe/blob/main/app/assets/icon-x.svg" height="30" alt="Icon X"  />
  <img src="https://github.com/Valik3201/tic-tac-toe/blob/main/app/assets/icon-o.svg" height="30" alt="Icon 0"  />
  <h1>Frontend Mentor - Tic Tac Toe solution</h1>
</div>

This repository contains my solution to the Tic Tac Toe challenge on Frontend Mentor. Frontend Mentor challenges are designed to help you improve your coding skills by building realistic projects.

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#screenshot">Screenshot</a></li>
    <li><a href="#links">Links</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#what-i-learned">What I Learned</a></li>
    <li><a href="#useful-resources">Useful Resources</a></li>
    <li><a href="#author">Author</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

This repository showcases my solution to the challenging Tic Tac Toe project presented by Frontend Mentor. Admittedly, the development process was intricate, and I invested approximately 33 hours to bring this project to completion.

Key aspects of the project include:

- **Learning Curve:** The project served as a valuable learning experience, pushing me to explore and implement complex concepts to meet the challenge requirements.
- **Development Challenges:** Despite the Tic Tac Toe concept being straightforward, the implementation brought forward nuances that required adaptive thinking.
- **Time Investment:** Acknowledging the learning curve and challenges, the project demanded a total of 33 hours, reflecting the commitment and effort invested.

Despite the challenges faced, this project signifies a significant step in my learning journey, reflecting the time and effort devoted to mastering new skills.

## Screenshot

[![ScreenShot](https://github.com/Valik3201/tic-tac-toe/raw/main/app/assets/screenshot.png)](https://github.com/Valik3201/tic-tac-toe/blob/main/app/assets/screenshot.png)

## Links

- Solution URL: [GitHub Repository](https://github.com/Valik3201/tic-tac-toe)
- Live Site URL: [GitHub Pages](https://valik3201.github.io/tic-tac-toe/)

## Built With

- Semantic HTML5 markup
- SCSS styles
- Flexbox
- CSS Grid
- Mobile-first workflow
- Minimax algorithm 

## What I Learned

In the process of building this project, I gained knowledge in the following areas:

1. **Implementation of the Minimax algorithm**

    - **Recursive Function:** Developed a recursive minimax function to evaluate possible moves and determine the best strategy for the computer player.
    - **Terminal States:** Handled terminal states such as victory, defeat, or a tie, assigning appropriate scores (-1, 1, or 0) to guide the decision-making process.
    - **Depth Limitation:** Implemented depth limitation in the recursion to optimize performance and avoid unnecessary computations.
    - **Maximizing and Minimizing Players:** Alternated between maximizing and minimizing players during the recursive calls, simulating each possible move.
    - **Optimal Move Selection:** Iterated through available moves in the main function (`findBestMove`) and selected the move with the highest score for the maximizing player, representing the computer's optimal move.
  
2. **Enhancement of animation skills**

    In this section of the SCSS code, the focus is on refining animation techniques for a modal component. The class `.show` encapsulates the animation sequence for displaying the modal, while `.out` represents the exit animation state.
    
    #### Initial State (`.show`)
    
    - **Transformation:** The modal starts with a scaled-down appearance (`transform: scaleY(0.01) scaleX(0)`) to create a visually appealing unfold effect.
    
    - **Animation:** Utilizes the `unfoldIn` animation with a duration of 1 second and a cubic-bezier easing function for a smooth and gradual appearance.
    
    - **Visibility:** The modal is set to be visible during the animation process.
    
    - **Nested Animation:** Within the `.show` state, the modal content (`.modal__content`) undergoes a distinct zoom-in animation (`zoomIn`). This nested animation introduces a delayed start (`0.8s`) for a staggered and sophisticated visual effect.
    
    #### Exit Animation State (`.out`)
    
    - **Transformation:** When transitioning out, the modal scales back to its original size (`transform: scale(1)`).
    
    - **Animation:** Employs the `unfoldOut` animation with a 1-second duration and a cubic-bezier easing function, providing a graceful exit effect.
    
    - **Nested Exit Animation:** Similar to the initial state, the modal content within the `.out` state executes a zoom-out animation (`zoomOut`) with a duration of 0.5 seconds.
    
    This SCSS code segment not only enhances the visual appeal of modal transitions but also demonstrates a structured and professional approach to incorporating animations in the project.

## Useful Resources 

I found the following resources helpful during the development of this project:

- [Mastering CSS — Sliding Background to an Active Button](https://javascript.plainenglish.io/mastering-css-sliding-background-to-an-active-button-15a735e3631d)
- [Modals Animation](https://codepen.io/designcouch/pen/obvKxm)

## Author

- LinkedIn - [Valentyn Chernetskyi](https://www.linkedin.com/in/valentynchernetskyi/)
- Frontend Mentor - [@valik3201](https://www.frontendmentor.io/profile/Valik3201)

## Acknowledgments

I would like to express my gratitude to [Frontend Mentor](https://www.frontendmentor.io) for providing challenging projects that contribute to my growth as a developer.
