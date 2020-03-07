var ObjectID = require('mongodb').ObjectID;

module.exports = (req, res, next)=>{
  let record = req.body;
  if (!record || !record.id || !record.name || !record.value)
    return next({ status: 440, msg: 'Parameter missing!'});


  req.dbConnection.updateOne(
    { _id: ObjectID(record.id), 'record.name': record.name },
    { $set: {'record.$.price': record.value} },
    (err, result)=>{
      if (err && err.stack) return next(err);
      res.status(201).json(result)
    })
}
