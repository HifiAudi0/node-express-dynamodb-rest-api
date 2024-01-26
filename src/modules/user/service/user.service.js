const UserRepository = require(`../repository/user.repository`);

class UserService {

    async describeTable() {
        return await UserRepository.describeTable()
    }

    async findByID(UserID) {
        const data = await UserRepository.findByID(UserID);

        if (data) {
            return data.Item;
        }

        return data;
    }

    async create(data) {
        return await UserRepository.create({
            Username: data.Username
        });
    }

    async update(UserID, Points, data) {
        console.log("userId SERVICEEEEEEEEEEEEEEEEEEEE........", UserID);
        console.log("Points SERVICEEEEEEEEEEEEEEEEEEEE............", Points)
        return await UserRepository.update(UserID, {
            Username: UserID,
            Points: Points
        });
    }

    async deleteByID(UserID) {
        return await UserRepository.deleteByID(UserID);
    }

}

module.exports = new UserService()
