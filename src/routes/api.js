const UserController = require('../modules/user/controller/user.controller');
const db = require(`../helpers/database`);

module.exports = async (app) => {
    app.get(`/api/v1/users/describeTable`, UserController.describeTable);
    app.get(`/api/v1/users/:UserID`, UserController.findByID);
    app.post(`/api/v1/users`, UserController.create);
    app.patch(`/api/v1/users/:UserID/:Points`, UserController.update);
    app.delete(`/api/v1/users/:UserID`, UserController.deleteByID);
    app.get("/describeTable", (req, res) => {
        const params = {
            TableName: 'PointsUsers', // replace with your table name
        };

        db.describeTable(params, (err, data) => {
            if (err) {
                console.error('Error:', err);
            } else {
                console.log('Key Schema:', data.Table.KeySchema);
            }
        });

    })

    app.get("/getItem", (req, res) => {
        const params = {
            TableName: 'PointsUsers',
            Key: {

                UserId9023483940578234123: {
                    S: '1'
                },
            }
        }


        db.getItem(params, (err, data) => {
            if (err) {
                console.error('Error:', err);
            } else {
                console.log('Item:', data.Item);
                res.send(data.Item);
            }
        });
    })

    app.get("/scanTable", (req, res) => {
        const params = {
            TableName: 'PointsUsers',
        }


        db.scan(params, (err, data) => {
            if (err) {
                console.error('Error:', err);
            } else {
                console.log('Item:', data);
                dataJson = JSON.stringify(data.Items);
                console.log("JSON DATA STARTTTTTTTTTTTTTTTTTTTTTTTT")
                console.log(dataJson);
                console.log("JSON DATA STARTTTTTTTTTTTTTTTTTTTTTTTT")

                res.status(200).json(dataJson);
            }
        });
    });

}

// Sequence of events (in order)
// routes/api.js
// controller
// service
// repro