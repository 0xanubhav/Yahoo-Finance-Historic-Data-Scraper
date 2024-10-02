# Yahoo Finance Historic Data Scraper

This project scrapes historic financial data from Yahoo Finance using Puppeteer, stores the data in an SQLite database, and provides a REST API using Express. The project also features scheduled scraping via `node-cron`.

## Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **SQLite** (or use the bundled `sqlite3` package)

## Setup Instructions

Follow these steps to clone and set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/0xanubhav/Yahoo-Finance-Historic-Data-Scraper.git
cd Yahoo-Finance-Historic-Data-Scraper
```

### 2. Install Dependencies

Run the following command to install the required Node.js packages:

```bash
npm install
```

The project uses the following dependencies:

- **express**: To build the REST API.
- **puppeteer**: For scraping Yahoo Finance data.
- **node-cron**: For scheduling recurring scraping tasks.
- **sqlite3**: SQLite database to store the scraped data.

### 3. Setting Up SQLite

Make sure SQLite is properly set up on your machine, or use the `sqlite3` package included in this project.

1. **Install SQLite** if you haven't already, by following instructions from [SQLite's official website](https://www.sqlite.org/download.html).
   
2. **Database Initialization**: You don’t need to manually create the database; the Node.js project will create it for you. However, ensure the appropriate directory structure for the database file exists:

   If you're storing the SQLite database in a specific directory, ensure that the directory exists. For example:

   ```bash
   mkdir -p ./data
   ```

3. **Database Configuration**: The SQLite database is set up in the code. If you need to modify the database location or name, you can do so in the appropriate configuration file or in the database initialization part of the code.



### 4. Run the Application

Start the Node.js server with the following command:

```bash
node app.js
```

This will run the application on `http://localhost:3000`.

### 5. Testing the API

You can test the API using tools like **Postman** . For example:

```bash
curl http://localhost:3000/api/forex-data?from=GBP&to=INR&period=1W
```

### 6. Scheduling Data Scraping

The project uses `node-cron` to automatically scrape data at regular intervals. The scraping frequency can be customized by modifying the cron schedule in the `cronJob` setup in the project. The default schedule is set to scrape daily.

---

### Additional Notes

- **Puppeteer** requires Chromium to be installed. It will be automatically installed when you run `npm install`, but if you encounter any issues related to Chromium, follow [Puppeteer's troubleshooting guide](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md).
- If SQLite database operations fail, ensure the database file path is correct and writable.

---
