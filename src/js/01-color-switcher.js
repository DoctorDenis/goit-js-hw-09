const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalTimer = null;
stopBtn.setAttribute('disabled', '');

startBtn.addEventListener('click', evt => {
  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled');
  intervalTimer = setInterval(() => {
    document.querySelector('body').style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', evt => {
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', '');
  clearInterval(intervalTimer);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
