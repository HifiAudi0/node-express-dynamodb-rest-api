const UserService = require(`../service/user.service`);

class UserController {

    async describeTable(req, res) {
        const describeTable = await UserService.describeTable()

        res.json("Okkkkkkkk")

        console.log(data.Table.KeySchema);
    }

    async findByID(req, res) {
        console.log("Checking UserId:::::::", req.params.UserID)
        const data = await UserService.findByID(req.params.UserID)

        res.json(data)

    }

    async create(req, res) {
        const data = await UserService.create(req.body)

        res.json(data)
    }

    async update(req, res) {
        console.log("userId CONTROLLERRRRRRRRRRRRR........", req.params.UserID);
        console.log("Points CONTROLLERRRRRRRRRRRRR............", req.params.Points)
        const data = await UserService.update(req.params.UserID, req.params.Points, req.body)

        res.json(data)
    }

    async deleteByID(req, res) {
        await UserService.deleteByID(req.params.UserID)

        res.json(`Success`)
    }


}



module.exports = new UserController()
