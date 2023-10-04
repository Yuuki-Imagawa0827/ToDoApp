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
var { PrismaClient } = require('@prisma/client');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const prisma = new PrismaClient({
    // Prismaログを有効化
    log: ['query', 'info', 'warn', 'error'],
});
//新規登録
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        delete userData.confirmPassword;
        //パスワードハッシュ化
        const hashedPassword = yield bcrypt.hash(userData.password, saltRounds);
        //会員登録
        const newUser = yield prisma.user.create({
            data: {
                email: userData.email,
                name: userData.name,
                password: hashedPassword
            }
        });
        yield prisma.$disconnect();
        return newUser;
    }
    catch (error) {
        //メールアドレス重複時の処理を後々実装予定
        throw error;
    }
});
//ユーザ取得
const selectUser = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("userss");
    try {
        const email = loginData.email;
        console.log("userssdd");
        const user = yield prisma.user.findUnique({
            where: {
                email: email
            },
        });
        console.log("userdadadss");
        console.log(user);
        yield prisma.$disconnect;
        return user;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
module.exports = {
    createUser,
    selectUser
};
//# sourceMappingURL=userService.js.map