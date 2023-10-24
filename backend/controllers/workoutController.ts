import { BodyPart } from "../interfaces/bodyPart"
import { TrainingDiscipline } from "../interfaces/trainingDiscipline";
import { Response } from 'express';
var workoutService = require('../services/workoutService');
var errorMessageService = require( '../services/errorMessageService');


//部位名取得
const getBodyParts=async (req:Request,res:Response) =>{
    try {
      //リクエスト内容検証
      if(req.body==null){
        const errorMessage:string=errorMessageService.requestInvalid;        
        throw new Error(errorMessage)
      }
      
        //部位名を取得
        const allBodyParts:typeof BodyPart=await workoutService.getAllBodyParts();
        res.status(200).json(allBodyParts);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error:error });
    }   
}

//部位ID取得
const getBodyPartId=async(req:any,res:any)=>{
    try {
        const bodyPartName=req.query.name;
        const bodyPart=await workoutService.getBodyPart(bodyPartName);
        console.log(bodyPart)
        res.status(200).json(bodyPart);
    } catch (error) {
        console.log(error)
        throw new Error("部位IDの取得ができません");
    }
  
}

//種目名取得
const getTrainingDisciplines=async (req:any,res:any)=>{
    try {
        const bodyPartId=Number(req.query.id);
        const trainingDisciplines:TrainingDiscipline[]=await workoutService.getTrainingDisciplines(bodyPartId);
        res.status(200).json(trainingDisciplines)
    } catch (error) {
        console.log(error)
        throw new Error("種目の取得ができません");
        
    }
}

//種目登録
const registTrainingDiscipline=async(req:any,res:any)=>{
    try {
        const bodyPartId:number=req.body.bodyPartId;
        const disciplineName:string=req.body.bodyPartName;
        const trainingDisciplines=await workoutService.registTrainingDiscipline(bodyPartId,disciplineName);
        res.status(200).json(trainingDisciplines)
    } catch (error) {
        console.log(error)
        throw Error ("種目が取得取得できませんでした")
    }
}


//ワークアウト登録
const recordWorkout=async(req:any,res:any)=>{
    try {
        console.log("workout")
        const workout=req.body;
        console.log(workout)
        const workoutlog=await workoutService.recordWorkout(workout);
        res.status(200).json(workoutlog);
        
    } catch (error) {
        console.log(error);
        throw new Error("ワークアウトの登録ができません")
        
    }
   
}

//ワークアウト取得
const getWorkout=async(req:any,res:any)=>{
    try {
        const userId:number=Number(req.query.userId);
        const workouts=await workoutService.getWorkout(userId);
        console.log(workouts)
        res.status(200).json(workouts);
    } catch (error) {
        console.log(error);
        throw new Error("ワークアウトの取得ができません")

        
    }
}







module.exports={
    getBodyParts,
    getTrainingDisciplines,
    registTrainingDiscipline,
    recordWorkout,
    getBodyPartId,
    getWorkout,
}