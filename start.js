
const app = require ('./src/routes/server.js');
const { db } = require("./src/DB_connection.js");
const saveApiData = require ('./src/controllers/saveApiData.js');

// app.listen(3001,() => {
//   		console.log(`Server listening on port 3001`);
// 	db.sync({ force: true }).then(()=>{
// 			saveApiData()
// 			console.log('db connected')
// 	})
//   });

db.sync({ force: true }).then(async () => {
    console.log('DB conectada, master');
    // console.log(await saveApiData());
    await saveApiData();
    app.listen(3001, () => {
        console.log('Server on port 3001');
    })
}).catch((error) => {
    console.log(error);
})