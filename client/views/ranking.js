Template.ranking.helpers({
  // ranking: function() {
  //   Meteor.call("pullRankings", function(err, result) {
  //     return results["comments"].length;
  //   });
  // }

  commenters: function() {
    return Commenters.find({}, {sort: {feedback_given: -1}});
  }
});

Template.ranking.events({
  'click a': function(e) {
    e.preventDefault();

    Meteor.call('loadCommenters');
  }
})