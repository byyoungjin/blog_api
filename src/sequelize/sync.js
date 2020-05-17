const db = require("./models/index");

const sequelize = db.sequelize;

const syncOptions = { force: true };

sequelize.sync(syncOptions);
