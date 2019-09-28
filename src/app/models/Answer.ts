import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

const tableName = 'answers';

export default class Answer extends Model {
    [x: string]: any;
    public username!: string;
}

Answer.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName,
        sequelize,
    }
);
