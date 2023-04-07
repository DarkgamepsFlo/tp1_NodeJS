const app = require('./routes/index');
const { loggerinfo } = require('./log');
const port = 3000;
const { connectTodB } = require('./services/db/connection');

startServer()

function startServer() {
    connectTodB();
    app.listen(port, () => {
        loggerinfo.log("info", `Listening on port ${port}`)
    });
}
