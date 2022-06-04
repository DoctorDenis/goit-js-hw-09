import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const time = new Date();
const timepicker = document.querySelector('#datetime-picker');
let intervalCounter;
let onCloseFunction;
document.querySelector('[data-start]').setAttribute("disabled", "");

flatpickr(timepicker, {
  enableTime: true,
  dateFormat: 'd M y  H:m',
  time_24hr: true,
  // defaultDate: new Date(),
  minDate: 'today',
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateHandler(selectedDates[0]);
  }
});

const dateHandler = dateTime => {
  if (dateTime.getTime() < time.getTime()) {
    Report.failure('Oops!!!', 'Select the date somewhere in the future, please!', 'Got it', {
      width: '360px',
      svgSize: '80px',
      backOverlayClickToClose: true,
      titleColor: "#ff0000",
      messageFontSize: "16px",
      cssAnimationStyle: "zoom",
      backgroundColor: "#e2a4a4",
    });
  } else {
    document.querySelector('[data-start]').removeAttribute("disabled");
    document.querySelector('[data-seconds]').textContent = AddLeadingZero(convertMs(dateTime.getTime() - new Date().getTime()).seconds);
    document.querySelector('[data-minutes]').textContent = AddLeadingZero(convertMs(dateTime.getTime() - new Date().getTime()).minutes);
    document.querySelector('[data-hours]').textContent = AddLeadingZero(convertMs(dateTime.getTime() - new Date().getTime()).hours);
    document.querySelector('[data-days]').textContent = AddLeadingZero(convertMs(dateTime.getTime() - new Date().getTime()).days);
   
    document.querySelector('[data-start]').addEventListener("click", () => {
      intervalCounter = setInterval((dateTime) => {
        if (dateTime.toString() === new Date(new Date().getTime() + 1000).toString()) {
          clearInterval(intervalCounter);
        }
        document.querySelector('[data-seconds]').textContent = AddLeadingZero(convertMs(dateTime.getTime() - new Date().getTime()).seconds);
        document.querySelector('[data-minutes]').textContent = AddLeadingZero(convertMs(dateTime.getTime() - new Date().getTime()).minutes);
        document.querySelector('[data-hours]').textContent = AddLeadingZero(convertMs(dateTime.getTime() - new Date().getTime()).hours);
        document.querySelector('[data-days]').textContent = AddLeadingZero(convertMs(dateTime.getTime() - new Date().getTime()).days);
      }, 1000, dateTime);
    });
  }
};

function AddLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
