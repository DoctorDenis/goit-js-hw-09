import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();
  const FIRST_DELAY = Number(
    document.querySelector('input[name="delay"]').value
  );
  const DELAY_STEP = Number(document.querySelector('input[name="step"]').value);
  const AMOUNT = Number(document.querySelector('input[name="amount"]').value);

  Notify.init({
  position: "center-top",
  width: "450px",
  timeout: DELAY_STEP,
  cssAnimationDuration: 600,
  cssAnimationStyle: 'zoom',
  fontAwesomeIconStyle: "shadow"
});

  console.log(FIRST_DELAY, DELAY_STEP, AMOUNT);

  let del = FIRST_DELAY;

  for (let pos = 1; pos <= AMOUNT; pos += 1) {
    createPromise(pos, del)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    del += DELAY_STEP;
  }
});
