Currently looking at Olympic Basketball data requires looking at different sites for different information. Aggregating the data across various sources to see how well someone has performed for team USA, or any specific country historically is also a challenge. This project aims to put all this information in to one place for basketball enthusiasts keeping up with the Olympics

## **Process** 
### ETL process
- Scrape data from various sources + manual entry
- Transform by adding additional and advanced stats
- Load into PostgreSQL database with 8 relational tables
### Build Backend
- Flask powered backend with different routes for various queries 
- SQLAlchemy for database connection
- Hosted on Heroku 
    - Heroku Postgres add-on for db
### Build Frontend
- Frontend developed in React.js
- Hosted with Netlify 
