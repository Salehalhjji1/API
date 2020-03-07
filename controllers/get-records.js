const GenerateDateRange = require('../helpers/date').GenerateDateRange;

module.exports = (req, res, next)=>{
  let query = setupFilters(req.query);
  let page = req.query.page || 0;
  let limit = 10;

  req.dbConnection.aggregate([{
    "$facet": {
      "records": [
        { "$match": query },
        { "$sort": { "date": -1 } },
        { "$skip": page * limit },
        { "$limit": 100 }
      ],
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
      "count": [
        { "$match": query },
        { "$count": "count" }
      ]
    }
  }])
  .toArray((err, result)=>{
      // if (err && err.stack) return next(err);
if (err && err.stack) throw(err);
      result[0]['columns'] = result[0]['columns'][0]['labels'];
      result[0]['columns'].unshift('Date');
      res.status(200).json(result[0])
    })
}

function setupFilters(params) {
  let filter = {};

  if(params['id']) return { _id: params['id'] };
  if(params['start']) filter['date'] = GenerateDateRange(params['start'], params['end']);
  if(params['price']) filter['record.price'] = parseFloat(params['price']);
  return filter;
}
