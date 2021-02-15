import {
    trigger,
    state,
    style,
    animate,
    transition
  } from "@angular/animations";

export const animation = (name = 'fadeIn', duration = 0.1) =>
  trigger(name, [
    state('void', style({opacity: 0, 'margin-top': '5%'})),
    transition("void => *", [
      animate(`${duration}s ease-in-out`)
    ], )
  ])

//   export const topToBottom = (name = 'fadeIn', duration = 0.1) =>
//   trigger(name, [
//     state('void', style({opacity: 0, position: 'relative', bottom: '20px', right: '10px'})),
//     transition("void => *", [
//       animate(`${duration}s ease-in-out`)
//     ], )
//   ])
