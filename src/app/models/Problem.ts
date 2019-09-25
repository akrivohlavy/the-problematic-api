import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

export default class Problem extends Model {
    public id!: number;
    public type!: string;
    public query!: string;
    public createdBy!: string;
    public answered!: boolean;
}

Problem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: 'problems',
    }
);
