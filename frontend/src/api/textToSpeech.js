// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API#javascript_2

const synth = window.speechSynthesis

export const say = (phrase) => {
  const utterance = new SpeechSynthesisUtterance(phrase);
  synth.speak(utterance)
}