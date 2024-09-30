Currently looking at Olympic Basketball data requires looking at different sites for different information. Aggregating the data across various sources to see how well someone has performed for team USA, or any specific country historically is also a challenge. This project aims to put all this information in to one place for basketball enthusiasts keeping up with the Olympics

## **Development Process** 
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


## **Requirements**
- Node.js
- Python
- PostgreSQL
- Check the requirements.txt (backend) and package.json (frontend) for required packages / versions

### Installation Instructions

#### Frontend
1. Navigate to the frontend folder
   ```bash
   cd frontend
   ```

2. Install the required dependences:
   ```bash
   npm install
   ```

3. Run the frontend:
   ```bash
   npm start
   ```
   This will start the React frontend on 'http://localhost:3000'

#### Backend
1. Navigate to the backend folder
   ```bash
   cd backend
   ```
2. Set up a virtual environment (optional)
   ```bash
   python -m venv myenv
   source venv/bin/activate #(Windows: venv\Scripts\activate)
   ```
3. Install required dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend Flask app
   ```bash
   python routes.py
   ```
   The flask app should be running on 'http://localhost:5000'

#### Database (opt)
If you need to setup the database / restore from a backup, use these steps

1. Ensure you have PostgreSQL installed and running
2. To restore the database from a backup file:
   ```bash
   pg_restore -U <db_user> -h <db_host> -d <db_name> --clean --no-owner <path_to_backup_file>
   ```
   Use this when the database needs updating with new tables
   Or if/when the deployed DB is deactivated and needs to be restored
   
4. Update your .env file with the correct database connection info

#### Notes
- along with db info, your .env should have an openai_api_key as well
- for development, your react_app_backend_url is the backend localhost (should be localhost:5000)
