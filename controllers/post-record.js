var ObjectID = require('mongodb').ObjectID;

module.exports = (req, res, next)=>{
  let date = req.body.date;

  let record = req.body;
  delete record.date;
  let recordArray = [];
  for (let i in record) {
    recordArray.push({ name: i, price: record[i] })
  }

  console.log(recordArray);
  req.dbConnection.insert(
    { date: date, record: recordArray },
    (err, result)=>{
      if (err && err.stack) return next(err);

      console.log(result);
      res.status(201).json(true)
    })
}
