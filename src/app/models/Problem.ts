import { DataTypes, Model } from 'sequelize';
import config from '../../config/config';
import { ProblemType } from '../enums';
import { E_CODES } from '../errors';
import { solveExpression } from '../services/expressionSolver.service';
import Answer from './Answer';
import { sequelize } from './index';

const tableName = 'problems';

export type Solution = string | number;

export default class Problem extends Model {
    [x: string]: any;
    public id!: number;
    public type!: string;
    public query!: string;
    public createdBy!: string;

    public getSolution(): Solution {
        switch (this.type) {
            case ProblemType[ProblemType.riddle]:
                return config.answerToEverything;
            case ProblemType[ProblemType.expression]:
                return solveExpression(this.query);
        }
        throw new Error(E_CODES.e0002);
    }
}

Problem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.TINYINT,
            allowNull: false,
            get(this: Problem) {
                const type: number = (this.getDataValue('type') as unknown) as number;
                return ProblemType[type];
            },
            set(this: Problem, value: string) {
                const type: string = (ProblemType as any)[value];
                this.setDataValue('type', type);
            },
        },
        query: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName,
    }
);

Problem.hasMany(Answer);
Answer.belongsTo(Problem);
