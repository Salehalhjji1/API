module.exports = (err, req, res, next)=>{
  let status = err.status || 500;
  let msg = err.msg || 'Something is not right in our servers! Will be fixed shortly';

  console.log(err);
  res.json({
    msg: msg,
    status: status
  });
}
