const router = require("express").Router();
const parquet = require("parquetjs-lite");
const { groupbyProperty, weekdays, months, byWeekday, byMonth } = require("../utils");

router.get("/", async (req, res, next) => {
  try {
    let reader = await parquet.ParquetReader.openFile('data/sample.parquet');

    let cursor = reader.getCursor();

    let record = null;
    const data = [];

    while (record = await cursor.next()) {
      data.push(record);
    }

    reader.close();
    res.send(data);
  }
  catch(err) {
    console.error(err)
  }
});

router.get("/groupby/report_date/:option", async (req, res, next) => {
  const { option } = req.params;

  try {
    let reader = await parquet.ParquetReader.openFile('data/sample.parquet');

    let cursor = reader.getCursor();

    let record = null;
    const byProperty = option === "weekday" ? Object.assign({}, byWeekday) : option === "month" ? Object.assign({}, byMonth) : {};
    const data = [];

    while (record = await cursor.next()) {
      const key = record["REPORT_DATE"];

      if (option === "weekday") {
        const day = new Date(key).getDay()
        const weekday = weekdays[day]
        if (!byProperty[weekday]) {
          byProperty[weekday] = 1
        } else {
          byProperty[weekday] += 1
        }
      }

      if (option === "month") {
        const mth = new Date(key).getMonth()
        const month = months[mth]
        if (!byProperty[month]) {
          byProperty[month] = 1
        } else {
          byProperty[month] += 1
        }
      }

      if (option === "year") {
        const year = new Date(key).getFullYear()
        if (!byProperty[year]) {
          byProperty[year] = 1
        } else {
          byProperty[year] += 1
        }
      }

      data.push(record);
    }

    reader.close();

    res.send({...byProperty });
  }
  catch(err) {
    console.error(err)
  }
});

router.get("/groupby/:property/:num?", async (req, res, next) => {
  const { property, num } = req.params;
  const limit = num ? num : 20;

  try {
    let reader = await parquet.ParquetReader.openFile('data/sample.parquet');

    let cursor = reader.getCursor();

    let record = null;
    const byProperty = {};
    const data = [];

    while (record = await cursor.next()) {
      const key = record[`${property.toLocaleUpperCase()}`];
      if (!byProperty[key]) {
        byProperty[key] = 1
      } else {
        byProperty[key] += 1
      }
      data.push(record);
    }

    reader.close();

    const topResults = groupbyProperty(byProperty, limit);
    const total = data.length;
    const totalTopResults = Object.values(topResults).reduce((a, b) => a + b);
    const others = total - totalTopResults;
    if (others > 0) {
      res.send({...topResults, others });
    } else {
      res.send({...topResults });
    }
  }
  catch(err) {
    console.error(err)
  }
});

module.exports = router;
