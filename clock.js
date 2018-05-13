var CronJob = require('./node_modules/cron').CronJob;
var bot = require('./quickstart.js');

//every Tuesday at 11:00am '00 00 11 * * 2'
var changeNodeWeekly = new CronJob({
  cronTime: '00 00 11 * * 2',
  onTick: function() {
  bot.changeNodeWeekly();
  },
  start: true,
  timeZone: 'America/Los_Angeles'
});
changeNodeWeekly.start();

//Mon-Fri at 11:50am '00 50 11 * * 1-5'
var startDaily = new CronJob({
  cronTime: '00 50 11 * * 1-5',
  onTick: function() {
  bot.startDaily();
  },
  start: true,
  timeZone: 'America/Los_Angeles'
});
startDaily.start();


// every firday at 12:45 '00 45 12 * * 5'
var startWeekly = new CronJob({
  cronTime: '00 45 12 * * 5',
  onTick: function() {
  bot.startWeekly();
  },
  start: true,
  timeZone: 'America/Los_Angeles'
});
startWeekly.start();

module.exports = {
startWeekly: startWeekly,
startDaily: startDaily,
changeNodeWeekly: changeNodeWeekly
}


  // git add .
  // git commit -m "Adds basic bot functionality to bot.js"
  // git push heroku master
