const context = require('../context');

function uuid() {
  let uuid = '';
  let d = new Date().getTime();

  do {
    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16);
      }
    );
  } while (context.sessions.has(uuid));

  return uuid;
}

module.exports = { uuid };
