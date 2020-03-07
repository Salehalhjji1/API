const Router = require('express').Router();


Router.get('/filter-list', require('./controllers/filter-list'))
      .get('/chart', require('./controllers/get-chart'))
      .get('/', require('./controllers/get-records'))
      .post('/', require('./controllers/post-record'))
      .put('/', require('./controllers/update-record'))
      .delete('/', require('./controllers/delete-record'))


// TODO: 404
Router.get('*', (req, res)=>{ res.json(false) });

module.exports = Router
