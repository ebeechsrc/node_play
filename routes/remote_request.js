var express = require('express');
var router = express.Router();
var https = require('https');
var querystring = require('querystring');



  
/* GET home page. */
router.get('/', function(req, page_response, next) {
  let args = req.query;
  if (!args?.query) {
    page_response.render('response', { title: 'Add query=???', args: {}});
    return;
  }
  https.get(args.query, res => {
    let data = [];
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    res.on('data', chunk => {
      data.push(chunk);
    });

    res.on('end', () => {
      console.log('Response ended: ');
      page_response.render('response', { title: 'Express', args: {'raw_data': data} });
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
  });
});

router.get('/post', function(req, page_response, next) {
  let args = req.query;
  if (!args?.query) {
    page_response.render('response', { title: 'Add query=???', args: {}});
    return;
  }

  let post_data = querystring.stringify({
    'my_date': 'my_values'
  });

  let post_options = {
    host: args.query,
    port: '443',
    path: 'post_path',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data)
    }
  }

  let post_req = https.request(post_options, res => {
    res.setEncoding('utf8');
    res.on('data', chunk => {
      console.log('Response: ' + chunk);
    });
    res.on('end', () => {
      console.log('Response ended: ');
      page_response.render('response', { title: 'Express', args: {'raw_data': data} });
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
  });
  post_req.write(post_data);
  post_req.end();
});

module.exports = router;