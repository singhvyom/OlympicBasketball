Currently looking at Olympic Basketball data requires looking at different sites for different information. Aggregating the data across various sources to see how well someone has performed for team USA, or any specific country historically is also a challenge. This project aims to put all this information in to one place for basketball enthusiasts keeping up with the Olympics

## **Process** 
### ETL process
- Scrape data from various sources + manual entry
- Transform by adding additional and advanced stats
- Load into PostgreSQL database with 8 relational tables
- All done in Python

### Build Backend
- Flask powered backend with different routes for various DB queries
- SQLAlchemy for database connection
- Langchain for NLP queries (under Query tab)

### Build Frontend
- Frontend developed in React.js

### Hosting
- Backend hosted on Heroku
    - subdir buildpack used to only use the backend folder
- Frontend hosted on Netlify
- appropiate env variables set in both Heroku and Netlify 
