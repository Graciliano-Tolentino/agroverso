export function getDefaultTransition(delay = 0) {
  return {
    duration: 0.6,
    delay,
    ease: [0.43, 0.13, 0.23, 0.96],
  };
}
