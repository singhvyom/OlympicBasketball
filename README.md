Currently looking at Olympic Basketball data requires looking at different sites for different information. Aggregating the data across various sources to see how well someone has performed for team USA, or any specific country historically is also a challenge. This project aims to put all this information in to one place for basketball enthusiasts keeping up with the Olympics

## **Process** 
### ETL process
- **Extract:** Scrape data from various sources plus manual entry where data is missing
- **Transform:** Compute advanced stats and additional metrics
- **Load:** Store the data into a PostgreSQL database with 8 relational tables, all powered through Python

### Build Backend
- Flask powered backend with different routes for various DB queries
- SQLAlchemy for database connection
- **Natural Language Queries:** Integrated Langchain for handling natural language queries, allowing users to ask questions like "Who scored the most points in a single game?"

### Build Frontend
- Frontend developed in React.js 

### Hosting
- Backend hosted on **Heroku** (utilizing a subdirectory buildpack to focus on backend)
- Frontend hosted on **Netlify**
- Environment variables configured on each platform
