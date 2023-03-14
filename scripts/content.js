const DEBUG = -1;
const INFO = 0;
const WARN = 1;

const logLevel = WARN;

let debug = (logLevel <= DEBUG)? console.log.bind(window.console) : () => {};
let info = (logLevel <= INFO)? console.log.bind(window.console) : () => {};
let warn = (logLevel <= WARN)? console.warn.bind(window.console) : () => {};
let error = console.error.bind(window.console);

let downtimeHours;
let downtimeDays;

chrome.storage.sync.get({
   hours: [0, 1, 2, 3, 4, 5, 19, 20, 21, 22, 23],
   days: [0, 6]
}, (items) => {
   downtimeHours = items.hours;
   downtimeDays = items.days;
});

const updateButton = () => {
   const sendButton = document.querySelector('button[title="Send"].ms-Button');
   debug(sendButton);

   if (null != sendButton) {
      info(sendButton);

      const date = new Date();
      const day = date.getDay();
      const hour = date.getHours();

      // Are we in downtime?
      if (downtimeDays.includes(day) || downtimeHours.includes(hour)) {
         // add the warning
         sendButton.classList.add('ms-Button--warn');
      } else {
         // remove the warning
         sendButton.classList.remove('ms-Button--warn');
      }
   }
};

const INTERVAL = 1000;
const run = () => {
   updateButton();
   setTimeout(() => run(), INTERVAL);
};
run();