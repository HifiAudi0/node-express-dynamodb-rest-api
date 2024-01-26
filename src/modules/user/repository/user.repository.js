const db = require(`../../../helpers/database-DocumentClient`);
const { v4: uuidv4 } = require('uuid');

class UserRepository {
    constructor() {
        this.tableName = 'PointsUsers';
    }

    async describeTable() {
        const params = {
            TableName: this.tableName,
        }

        await db.describeTable(params).promise();

        return;
    }

    async findByID(UserID) {
        const params = {
            TableName: this.tableName,
            Key: {
                "UserId9023483940578234123": {
                    "UserId": UserID,
                },
            },
        };

        return await db.get(params).promise();
    }

    async create(data) {
        const params = {
            TableName: this.tableName,
            Item: {
                UserID: uuidv4(),
                Username: data.Username,
            },
        };

        await db.put(params).promise();

        return params.Item;
    }

    async update(UserID, Points, data) {
        console.log("userId REPROOOOOOOOOOOOOO........", UserID);
        console.log("Points REPROOOOOOOOOOOOOO............", Points)

        console.log("type of points......................", typeof (Points.Points))

        const params = {
            TableName: this.tableName,
            Key: {
                "UserId9023483940578234123": UserID
            },
            UpdateExpression: 'set #Points = :Points',
            ExpressionAttributeNames: {
                '#Points': 'Points',
            },
            ExpressionAttributeValues: {
                ':Points': Points.Points,
            },
            ReturnValues: 'UPDATED_NEW',
        };

        try {
            const update = await db.update(params).promise();
            return update.Attributes;
        } catch (error) {
            console.error("Error updating item:", error);
            throw error;
        }
    }
    /*
        async update(UserID, data) {
            const params = {
                TableName: this.tableName,
                Key: {
                    UserID: UserID
                },
                UpdateExpression: `set #Username = :Username`,
                ExpressionAttributeNames: {
                    '#Username': `Username`,
                },
                ExpressionAttributeValues: {
                    ":Username": data.Username,
                },
                ReturnValues: `UPDATED_NEW`,
            };
    
            const update = await db.update(params).promise();
    
            return update.Attributes;
        }
    */
    async deleteByID(UserID) {
        const params = {
            TableName: this.tableName,
            Key: {
                UserID,
            },
        };

        return await db.delete(params).promise();
    }
}

module.exports = new UserRepository();
