require('dotenv').config();
const app = require ('./src/routes/server.js');
const { db } = require("./src/DB_connection.js");
const saveApiData = require ('./src/controllers/saveApiData.js');

const PORT = process.env.PORT || 3001

db.sync({ force: false }).then(async () => {
    console.log('DB conectada, master');
    // console.log(await saveApiData());
    //await saveApiData();
    app.listen(3001, () => {
        console.log(`Server on port ${PORT}`);
    })
}).catch((error) => {
    console.log(error);
})