const commits = require("../models/commitsModel");

exports.newCommit = (req, res, next) => {
  const data = new commits({
    postId: req.body.postId,
    comment: req.body.comment,
  });
  data.save().then(result => {
    res.status(201).json({
      message: "commit add!",
      result: result
    });
  }).catch(err =>{
    res.status(500).json({
      message: "Error"
    })
  });
};


exports.getCommits = (req, res, next) => {
  commits.find().then(info => {
    if (info) {
      res.status(200).json(info);
    } else {
      //res.status(404).json({ message: "user not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Error"
    });
  });
};
