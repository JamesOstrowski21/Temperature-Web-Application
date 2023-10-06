const { InfluxDB, Point } = require('@influxdata/influxdb-client')

const INFLUXDB_TOKEN="Dui9LJyTx4dvXiwmljQMVuqZW8b7VN9HwiZrqQYwyREa78ROI-exm-hWM_7tmn2P1agwcBACAT4UC4V46itKaQ=="

console.log("Connected to Influx");
const influxDB = new InfluxDB({ url: "http://influxdb:8086", token: INFLUXDB_TOKEN })

const writeApi = influxDB.getWriteApi("uiowa", "temperature");
const queryApi = influxDB.getQueryApi("uiowa");

const fluxGetLastTempPoint =
    `from(bucket: "temperature")
    |> range(start: -12h)
    |> filter(fn: (r) => r["_measurement"] == "temperature")
    |> filter(fn: (r) => r["_field"] == "value")
    |> filter(fn: (r) => r["sensor_id"] == "DS18B20")
    |> last()`

const temp = []

module.exports = {
    writeTemp: (temp) => {
        const point = new Point('temperature')
            .tag('sensor_id', 'DS18B20')
            .floatField('value', temp)
        try {
            writeApi.writePoint(point)
        } catch (err) {
            console.log(err)
        }   
        writeApi.flush()
    },
    readLatest: async () => {
         queryApi.queryRows(fluxGetLastTempPoint, {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row);
                // console.log(
                //     `${o._time} ${o._field}=${o._value}`
                // ) 
                temp[0] = o._value; 
            },
            complete() { 
                //console.log('FINISHED');
            },
            error(error) {
                console.log('QUERY FAILED', error)
            },
        });

        return temp[0];
    }

};