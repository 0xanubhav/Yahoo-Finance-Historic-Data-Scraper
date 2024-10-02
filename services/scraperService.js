const db = require("../db/db");
const puppeteer = require("puppeteer");

// Scrape historical data
async function fetchHistoricalData(
  fromCurrency,
  toCurrency,
  fromTimestamp,
  toTimestamp
) {
  const quote = `${fromCurrency}${toCurrency}=X`;
  const url = `https://finance.yahoo.com/quote/${encodeURIComponent(
    quote
  )}/history/?period1=${fromTimestamp}&period2=${toTimestamp}`;

  const browser = await puppeteer.launch({
    headless: false, // Set to false if you want to see the browser window for debugging
    defaultViewport: null, // Ensure full viewport for the browser
  });

  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(60000);

  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    console.log("Page loaded");

    // Wait for the table to appear on the page
    await page.waitForSelector("table", { timeout: 60000 });
    ("Table found");

    // Extract data from the table
    const data = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("table tbody tr"));
      const extractedData = [];

      rows.forEach((row) => {
        const columns = row.querySelectorAll("td");

        if (columns.length === 7) {
          const dateStr = columns[0].textContent.trim(); // Extract date string
          // const dateOnly = moment(dateStr, 'MM/DD/YYYY').format('YYYY-MM-DD'); // Parse date string using moment.js
          const rowData = {
            date: new Date(dateStr).toISOString().split("T")[0],
            open: parseFloat(columns[1].textContent.replace(/,/g, "").trim()),
            high: parseFloat(columns[2].textContent.replace(/,/g, "").trim()),
            low: parseFloat(columns[3].textContent.replace(/,/g, "").trim()),
            close: parseFloat(columns[4].textContent.replace(/,/g, "").trim()),
            adj_close: parseFloat(
              columns[5].textContent.replace(/,/g, "").trim()
            ),
            volume: columns[6].textContent.trim(),
          };
          extractedData.push(rowData);
        }
      });

      return extractedData;
    });

    console.log("Data extracted:", data);

    // Store data in the database
    data.forEach((rowData) => {
      rowData = { fromCurrency, toCurrency, ...rowData };
      db.insertData(rowData); // Assuming you have a working DB insert function
    });

    console.log(`Data for ${fromCurrency}/${toCurrency} scraped and stored.`);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

module.exports = {
  fetchHistoricalData,
};
