var ObjectID = require('mongodb').ObjectID;

module.exports = (req, res, next)=>{
  let record = req.body;
  if (!record || !record.id) return next({ status: 440, msg: 'Nothing to delete!'});


  req.dbConnection.deleteOne(
    { _id: ObjectID(record.id) },
    (err, result)=>{
      if (err && err.stack) return next(err);
      res.status(201).json(result)
    })
}
