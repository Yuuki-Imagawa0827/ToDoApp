"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var loginService = require('../services/loginService');
var bcrypt = require('bcrypt');
//ログイン処理
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginData = req.body;
        //ログイン処理
        console.log("ここきてwる");
        const loginToken = yield loginService.loginCheck(loginData);
        console.log("loginToken");
        console.log(loginToken);
        res.json(loginToken);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ユーザー情報の取得に失敗しました。' });
    }
});
module.exports = {
    login,
};
//# sourceMappingURL=loginController.js.map