var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;
  models.Project
  .find({"_id":projectID})
  .exec(afterQuery);

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);
  var newPost = new models.Project ({
    "title": form_data["project_title"],
    "date": form_data["date"],
    "image": form_data["image_url"],
    "summary": form_data["summary"]
  })
  newPost.save(afterSaving);

  function afterSaving(err) {
    if(err) {console.log(err); res.send(500); }
    res.redirect('/');
  }

  function addCallback(err,projects) {
    if(err) console.log(err);
    res.send(projects[0])
  }

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;
  models.Project
  .find({"_id":projectID})
  .remove()
  .exec(deleteCallback)

  function deleteCallback(err,projects) {
    if(err) console.log(err);
    res.send(projects[0])
  }
}