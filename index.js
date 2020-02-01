'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const config = require('./config.json');
// create LINE SDK client

const client = new line.Client(config);

const app = express();

// webhook callback
app.post('/webhook', line.middleware(config), (req, res) => {
  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }
  // handle events separately
  Promise.all(req.body.events.map(event => {
      //console.log('event', event);
      // check verify webhook event
      if (event.replyToken === '00000000000000000000000000000000' ||
        event.replyToken === 'ffffffffffffffffffffffffffffffff') {
        return;
      }
      return handleEvent(event);
    }))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

var tid = setTimeout(() => {
  handleText();
}, 5000);

function handleEvent(event) {
  const message = event.message;
  console.log('event', event.timestamp);
  console.log('read', event.replyToken);
  console.log(event.type);
  // console.log(event.source.read.watermark);
  //console.log(message);
  //console.log(event);
  if (event.type) {
    var Number =0 ;
    // handleText(event.replyToken);
    //console.log(event);
    switch (event.type) {
      case 'message': 
          if(Number==0){
            tid = setTimeout(() => {
            handleText(event.replyToken);
            Number =1;
          }, 10000);
          }else{
            
          }
          

        console.log(event); break;
      case 'chatRead' : clearTimeout(tid);
                        console.log(event);
                        Number = 0;
                        stopplss();
                        
                        break; 
      case 'follow' :  handleFollw(event.replyToken);   break;      
    }
  }
  //stopplss();
  else {
  client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'ไม่รองรับข้อความ',
  });
}
}

function stopplss() {
  clearTimeout(tid);
  clearTimeout(tid);
}
const port = config.port;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

function handleText(event) {
  return client.replyMessage(event, {
    type: 'text',
    text: 'ขออภัยในความไม่สะดวกตอนนี้ admin ไม่อยู่ เมื่อกลับมาแล้วจะตอบข้อความ'
  });
}
function handleFollw(event) {
  return client.replyMessage(event, {
    type: 'text',
    text: 'ยินดีต้อนรับเข้าสู่ DOSCG Bot'
  });
}