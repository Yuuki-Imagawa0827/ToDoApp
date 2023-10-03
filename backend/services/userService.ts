
var { PrismaClient } = require('@prisma/client');

var bcrypt = require('bcrypt');
const saltRounds = 10;

const prisma = new PrismaClient({
  // Prismaログを有効化
  log: ['query', 'info', 'warn', 'error'],
});


//新規登録
const createUser = async (userData: any) => {
  try {
    delete userData.confirmPassword;
    //パスワードハッシュ化
    console.log(2)
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    console.log(3)
    //会員登録
    const newUser = await prisma.user.create({
      data: {
        email:userData.email,
        name:userData.name,
        password:hashedPassword
      }
       
    })
    await prisma.$disconnect();
    console.log(4)
    return newUser;
  } 
  catch (error) {
   //メールアドレス重複時の処理を後々実装予定
    throw error;
  }
  
};



//ユーザ取得
const selectUser=async (loginData:any)=>{
  try {
    const email=loginData.email;
    const user = await prisma.user.findUnique({
      where: {
        email:email
      },
    });
    await prisma.$disconnect;
    return user;
    
  } catch (error) {
    console.log(error)
    throw error;
  }

}


  module.exports={
    createUser,
    selectUser
  }
  