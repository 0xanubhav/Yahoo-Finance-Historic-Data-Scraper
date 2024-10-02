const sqlite3 = require("sqlite3").verbose();

// Path to your local SQLite database file
const dbFilePath = "./demodb.db"; // Replace with the actual path to your SQLite file

let db;

function init() {
  // Connect to the local SQLite file
  db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) {
      console.error("Error connecting to the SQLite database:", err.message);
    } else {
      console.log("Connected to the local SQLite database.");
      db.run(`CREATE TABLE IF NOT EXISTS exchange_data (
                from_currency TEXT,
                to_currency TEXT,        
                date DATE NOT NULL,
                open REAL,
                high REAL,
                low REAL,
                close REAL,
                adj_close REAL,
                volume TEXT
            )`);
    }
  });
}

function runQuery(query, params = [], callback) {
  // Make sure the callback is defined
  if (typeof callback !== "function") {
    console.error("Callback function not provided.");
    return;
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      callback(err, null); // Pass the error to the callback
      return;
    }

    // Ensure `rows` is defined before accessing its `length` property
    if (!rows) {
      console.error("No rows returned from the query");
      callback(null, []); // Return an empty array if no rows are returned
      return;
    }

    // Safely check the length of the rows
    if (rows.length === 0) {
      console.log("No data found.");
    }

    callback(null, rows); // Pass the results to the callback
  });
}

function insertData(row) {
  const query = `INSERT INTO exchange_data 
                   (from_currency,to_currency,date, open, high, low, close, adj_close, volume)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, Object.values(row), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = {
  init,
  runQuery,
  insertData,
};
