var createCommenterIfNeeded = function(user) {
  var existing = Commenters.findOne({username: user});

  if (!existing) {
    var commenter = Commenters.insert({
      username: user,
      feedback_given: 0,
      project: {
        body: '',
        feedback_received: 0
      }
    });
    return commenter;
  }
  return existing;
};

var getCommenters = function(commentArray) {
  var length = commentArray.length, subArr = null;

  for (var i = 0; i < length; i++) {
    subArr = commentArray[i];
    var name = subArr["user"];
    var commenter = createCommenterIfNeeded(name);

    Commenters.update(commenter, {$set: {
      project: {
        body: subArr["content"],
        feedback_received: subArr["comments"].length
      }
    }});

    getHelpers(subArr["comments"]);
  }
};

// remove autopub

var getHelpers = function(commentArray) {
  var length = commentArray.length, subArr = null;

  for (var i = 0; i < length; i++) {
    subArr = commentArray[i];
    var name = subArr["user"];

    var commenter = createCommenterIfNeeded(name);

    Commenters.update(commenter, {$inc: {
      feedback_given: 1
    }});
  };
};

var processComments = function(err, result) {
  var data = JSON.parse(result.content);

  comments = data["comments"];

  var commenters = getCommenters(comments);
};

Meteor.methods({
  loadCommenters: function() {
    this.unblock();
    HTTP.call("GET", "http://node-hnapi.herokuapp.com/item/6294650", processComments);
  }
})