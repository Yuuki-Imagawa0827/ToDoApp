"use strict";
var express = require('express');
var router = express.Router();
var app = express();
// const cors = require('cors');
// app.use(cors({
//   origin: 'http://localhost:4200', //アクセス許可するオリジン
//   credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
//   optionsSuccessStatus: 200 //レスポンスstatusを200に設定
// }))
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/api', (req, res) => {
    const requestData = req.body;
    console.log('POSTデータを受け取りました:', requestData);
    // レスポンスを送信f
    res.json({ message: 'データを受け取りました' });
});
module.exports = router;
