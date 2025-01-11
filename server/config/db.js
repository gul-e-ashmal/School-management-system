const mongoose = require("mongoose");

const connection = async () => {
    await mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("database is connected")
    }).catch((error) => {
        console.log("error in connection with database", error);
    })
}

module.exports = connection
