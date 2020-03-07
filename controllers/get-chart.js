const GenerateDateRange = require('../helpers/date').GenerateDateRange;

module.exports = (req, res, next)=>{
  req.dbConnection.aggregate([{
    "$facet": {
      "columns":[
        {
          "$project": {
            "size": [{ $size: "$record" }] ,
            "labels": "$record.name"
          }
        },
        { "$sort": { "size": -1 } },
        { "$limit": 1 }
      ],
      "chart":[
        {
          "$project": {
            "y": { "$year": {"$dateFromString": { dateString: "$date" }}},
            "record": { "$arrayToObject": {
                    "$map": {
                        "input": "$record",
                        "as": "rec",
                        "in": {
                            "k": "$$rec.name",
                            "v": "$$rec.price"
                        }
                    }
                }
              }
           }
        },
        {
          "$group": {
            "_id": "$y",
            "records" : { "$push": "$record"}
          }
        },
        { "$sort": { "_id": 1 }}
      ]
    }
  }])
  .toArray((err, result)=>{
      if (err && err.stack) return next(err);

      let keys = result[0]['columns'][0]['labels'];
      let val = result[0]['chart'].map((item) => {
       let _obj = {};
           _obj['date'] = item._id;
            for(let o in keys){
               _obj[keys[o]] = avg(item.records.map((i) => i[keys[o]]))
            }
       return _obj
      });
      res.status(200).json({ records: val, columns: keys })
    })
}

function avg(arr){
  let _arr = arr.filter((el)=>{ return  el != "" });
  let sum = 0;
      sum = _arr.reduce( ( p, c ) => p + c, 0);

  return sum / _arr.length
}
