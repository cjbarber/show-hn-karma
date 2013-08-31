Postdata = new Meteor.Collection('Postdata');

Meteor.methods({
  postdata: function(id) {
    // var api_result;

    // Meteor.call("pullPostData", function(err, result) {
    //   api_result = result;
    // });

    var postdata = {
      data: api_result,
      postId: id
    }

    postdata._id = Postdata.insert(postdata);
  }
});