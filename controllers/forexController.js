const db = require("../db/db");

// Handle the POST request for querying data
function getForexData(req, res) {
  const { from, to, period } = req.query;

  if (!from || !to || !period) {
    return res
      .status(400)
      .json({ error: "Missing query parameters: from, to, period" });
  }

  let periodInDays;
  switch (period) {
    case "1W":
      periodInDays = 7;
      break;
    case "1M":
      periodInDays = 30;
      break;
    case "3M":
      periodInDays = 90;
      break;
    case "6M":
      periodInDays = 180;
      break;
    case "1Y":
      periodInDays = 365;
      break;
    default:
      return res.status(400).json({ error: "Invalid period" });
  }

  const fromDate =
    Math.floor(new Date().getTime() / 1000) - periodInDays * 24 * 60 * 60;
  const toDate = Math.floor(new Date().getTime() / 1000);

  const query = `SELECT * FROM exchange_data WHERE from_currency = ? AND to_currency = ?
  AND date BETWEEN datetime(?, 'unixepoch') AND datetime(?, 'unixepoch')`;

  // Ensure the correct callback function is used with an error handler
  db.runQuery(query, [from, to, fromDate, toDate], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Database query failed", details: err.message });
    }

    if (!rows) {
      console.error("No rows returned from the query");
      callback(null, []); // Return an empty array if no rows are returned
      return;
    }

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the specified parameters" });
    }

    res.json(rows);
  });
}

module.exports = {
  getForexData,
};
