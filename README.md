# dyte-SDE-Intern-Assignment
# Log Ingestor and Query Interface


This repository contains code for a simple log ingestor and query interface built using Node.js, Express, and MongoDB.

## Running the Application

### Prerequisites
- Node.js installed
- MongoDB installed and running locally


#For running log ingestor
### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd log-ingestor-query-interface # Replace with your repository name
cd logIngestor
npm install
node logIngestor.js
   <!-- Pass the logs as parameters in post request save them in the local mongoDB database-->

#For running the query interface
cd ../query_interface
npm install
node query_interface.js


<!-- Run the queries of search and filter by passing parameters in the get request -->


