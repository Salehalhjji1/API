const catagorizeDates = require('../helpers/date').catagorizeDates;

module.exports = (req, res, next)=>{
  req.dbConnection
     .find({})
     .project({ date: 1, _id: 0 })
     .toArray((err, records)=>{
        if (err && err.stack) return next(err);
        res.status(200).json({ filters: catagorizeDates(records) })
      })
}
