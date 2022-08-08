const mongoose = require('mongoose');
const config = require('../config/dev');
const FakeDB = require('./FakeDB');

mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    useCreateIndex:true
},async () =>{
      const fakeDB = new FakeDB();
      console.log("starting populating db ");
      await fakeDB.poupulate();
      await mongoose.connection.close();
      console.log("DB has been populated");
    });