import { DataTypes, Model } from 'sequelize';
import config from '../../config/config';
import { ProblemType } from '../enums';
import { sequelize } from './index';

const tableName = 'problems';

export default class Problem extends Model {
    public id!: number;
    public type!: string;
    public query!: string;
    public createdBy!: string;
    public answered!: boolean;

    public getAnswer() {
        switch (this.type) {
            case ProblemType[ProblemType.riddle]:
                return config.answerToEverything;
            case ProblemType[ProblemType.expression]:
                return true; // here be arithmetic expression solver
        }
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
        answered: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize,
        tableName,
    }
);
