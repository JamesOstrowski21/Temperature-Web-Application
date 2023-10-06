const db = require("../static/js/influxdb-connector.js");

exports.updateTemp = async (req, res) => {
    const temp = await db.readLatest()
    const response = {'temperature': temp};
    res.status(200).send(response);
}