const cron = require('node-cron');
const scraperService = require('../services/scraperService');

    
// Schedule CRON jobs
function start() {
  // Daily scraping for GBP-INR and AED-INR
  cron.schedule("0 0 * * *", () => {
    console.log("Running daily scraping job...");
    const fromDate = Math.floor(new Date().getTime() / 1000) - 24 * 60 * 60; // last 1 day
    const toDate = Math.floor(new Date().getTime() / 1000);
    scraperService.fetchHistoricalData("GBP", "INR", fromDate, toDate);
    scraperService.fetchHistoricalData("AED", "INR", fromDate, toDate);
  });

}

module.exports = {
    start
};
