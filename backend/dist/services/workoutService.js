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
Object.defineProperty(exports, "__esModule", { value: true });
var { PrismaClient } = require('@prisma/client');
var { Bodypart } = require("../models/bodyPart");
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
//部位取得処理
const getAllBodyParts = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBodyParts = yield prisma.bodypart.findMany();
        return allBodyParts;
    }
    catch (error) {
        console.log("エラー", error);
    }
});
//部位名取得処理
const getTrainingDisciplines = (bodyPartId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainingDisciplines = yield prisma.training_discipline.findMany({
            where: {
                bodypartId: bodyPartId
            }
        });
        if (!trainingDisciplines) {
            return null;
        }
        return trainingDisciplines;
    }
    catch (error) {
    }
});
//部位ID取得処理
const getBodyPart = (bodyPartName, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyPart = yield prisma.bodypart.findUnique({
            where: {
                name: bodyPartName
            },
        });
        return bodyPart;
    }
    catch (error) {
        throw Error("部位IDを取得できませんでした");
    }
});
//種目登録
const registTrainingDiscipline = (bodyPartId, disciplineName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registardDiscipline = yield prisma.training_discipline.create({
            data: {
                name: disciplineName,
                bodypartId: bodyPartId
            }
        });
        return registardDiscipline;
    }
    catch (error) {
        console.log(error);
    }
});
//ワークアウト登録
const recordWorkout = (workout, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const record = yield prisma.workoutLog.create({
            data: {
                userId: workout.userId,
                bodypartId: workout.bodyPartId,
                training_disciplineId: workout.disciplineId,
                weight: workout.weight,
                rep: workout.reps,
                RM: workout.weight * workout.reps / 40 + workout.weight,
                memo: workout.memo
            }
        });
        yield prisma.$disconnect();
        return record;
    }
    catch (error) {
    }
});
//ワークアウト取得
const getWorkout = (userId, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workoutsWithDetails = yield prisma.workoutLog.findMany({
            where: {
                userId: userId, // 引数として渡された userId でフィルタリング
            },
            include: {
                bodypart: {
                    select: {
                        name: true, // Bodypart テーブルの name フィールドを取得
                    },
                },
                training_discipline: {
                    select: {
                        name: true, // Training_discipline テーブルの name フィールドを取得
                    },
                },
            },
        });
        console.log(workoutsWithDetails);
        return workoutsWithDetails;
    }
    catch (error) {
    }
});
module.exports = {
    getAllBodyParts,
    getTrainingDisciplines,
    registTrainingDiscipline,
    recordWorkout,
    getBodyPart,
    getWorkout,
};
//# sourceMappingURL=workoutService.js.map