var MyCron = new Cron();

MyCron.addJob(30, function() {
  Meteor.call('loadCommenters');
});