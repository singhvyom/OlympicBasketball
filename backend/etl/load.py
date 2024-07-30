import json
import psycopg2
import csv
import logging
import os
from datetime import datetime

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

#get the config file
with open('config.json', 'r') as config_file:
    config = json.load(config_file)

#create all the necessary tables first

def create_tables(cur):
    cur.execute('''CREATE TABLE IF NOT EXISTS Olympics (
                    year INT PRIMARY KEY,
                    location VARCHAR(100)
                );
                ''')
    logging.info('Olympics table created successfully')
    
    cur.execute('''CREATE TABLE IF NOT EXISTS Teams (
                    team_id SERIAL PRIMARY KEY,
                    country_name VARCHAR(100) UNIQUE
                );
                ''')
    logging.info('Teams table created successfully')

    cur.execute('''CREATE TABLE IF NOT EXISTS Players (
                    player_id SERIAL PRIMARY KEY,
                    player_name VARCHAR(100) UNIQUE
                );
                ''')
    logging.info('Players table created successfully')

    cur.execute('''CREATE TABLE IF NOT EXISTS Player_Team (
                    player_id INT,
                    team_id INT,
                    year INT,
                    PRIMARY KEY (player_id, team_id, year),
                    FOREIGN KEY (player_id) REFERENCES Players(player_id),
                    FOREIGN KEY (team_id) REFERENCES Teams(team_id),
                    FOREIGN KEY (year) REFERENCES Olympics(year)
                );
                ''')
    logging.info('Player_Team table created successfully')

    cur.execute('''CREATE TABLE IF NOT EXISTS Games (
                    game_id SERIAL PRIMARY KEY,
                    year INT,
                    date DATE,
                    home_team_id INT,
                    home_country_name VARCHAR(100),
                    away_team_id INT,
                    away_country_name VARCHAR(100),
                    home_score INT,
                    away_score INT,
                    FOREIGN KEY (year) REFERENCES Olympics(year),
                    FOREIGN KEY (home_team_id) REFERENCES Teams(team_id),
                    FOREIGN KEY (away_team_id) REFERENCES Teams(team_id)
                );
                ''')
    logging.info('Games table created successfully')

    cur.execute('''CREATE TABLE IF NOT EXISTS Box_Scores (
                    box_id SERIAL PRIMARY KEY,
                    game_id INT,
                    player_id INT,
                    team_id INT,
                    points INT,
                    minutes FLOAT,
                    offensive_rebounds INT,
                    defensive_rebounds INT,
                    total_rebounds INT,
                    assists INT,
                    steals INT,
                    blocks INT,
                    turnovers INT,
                    fouls INT,
                    field_goals_made INT,
                    field_goals_attempted INT,
                    three_point_field_goals_made INT,
                    three_point_field_goals_attempted INT,
                    free_throws_made INT,
                    free_throws_attempted INT,
                    field_goal_percentage FLOAT,
                    three_point_percentage FLOAT,
                    free_throw_percentage FLOAT,
                    effective_field_goal_percentage FLOAT,
                    true_shooting_percentage FLOAT,
                    gamescore FLOAT,
                    FOREIGN KEY (game_id) REFERENCES Games(game_id),
                    FOREIGN KEY (player_id) REFERENCES Players(player_id),
                    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
                );
                ''')
    logging.info('Box_Scores table created successfully')
    
    cur.execute('''CREATE TABLE IF NOT EXISTS Team_Stats (
                    team_total_id SERIAL PRIMARY KEY,
                    game_id INT,
                    team_id INT,
                    points INT,
                    offensive_rebounds INT,
                    defensive_rebounds INT,
                    total_rebounds INT,
                    assists INT,
                    steals INT,
                    blocks INT,
                    turnovers INT,
                    fouls INT,
                    field_goals_made INT,
                    field_goals_attempted INT,
                    three_point_field_goals_made INT,
                    three_point_field_goals_attempted INT,
                    free_throws_made INT,
                    free_throws_attempted INT,
                    field_goal_percentage FLOAT,
                    three_point_percentage FLOAT,
                    free_throw_percentage FLOAT,
                    effective_field_goal_percentage FLOAT,
                    true_shooting_percentage FLOAT,
                    turnover_percentage FLOAT,
                    FOREIGN KEY (game_id) REFERENCES Games(game_id),
                    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
                );
                ''')
    logging.info('Team_Stats table created successfully')

    cur.execute('''CREATE TABLE IF NOT EXISTS  Medals (
                    medal_id SERIAL PRIMARY KEY,
                    gold varchar(100),
                    silver varchar(100),
                    bronze varchar(100),
                    fourth varchar(100),
                    year INT,
                    FOREIGN KEY (year) REFERENCES Olympics(year),
                    FOREIGN KEY (gold) REFERENCES Teams(country_name),
                    FOREIGN KEY (silver) REFERENCES Teams(country_name),
                    FOREIGN KEY (bronze) REFERENCES Teams(country_name),
                    FOREIGN KEY (fourth) REFERENCES Teams(country_name)
                );
                ''')
    logging.info('Medals table created successfully')

    logging.info('Tables created successfully')

def load_Olympic_Tables(cur, filepath):
    with open(filepath, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            cur.execute('''INSERT INTO Olympics(year, location)
                            VALUES (%s, %s)''', (int(row['Year']), row['Location']))
            
    

def load_Medals_Table(cur, filepath):
    with open(filepath, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            cur.execute('''INSERT INTO Medals(gold, silver, bronze, fourth, year)
                            VALUES (%s, %s, %s, %s, %s)
                        ''', (row['Gold'], row['Silver'], row['Bronze'], row['Fourth'], int(row['Year'])))
        
    

def convert_date(date_str):
    return datetime.strptime(date_str, '%b. %d, %Y').date()

def convert_minutes(minutes_str):
    if ':' in minutes_str:
        minutes, seconds = map(int, minutes_str.split(':'))
        return minutes + seconds / 60.0
    else:
        try:
            return float(minutes_str)
        except:
            return 0.0

def safe_int(value):
    try:
        return int(value)
    except:
        return 0

def load_totals_data(cur, stats, game_id, team_id):

    #will be called by load_box_data when iterating throught the team's box scores
    #need the team name, the game id, and the box score data
    #player here is just 'Totals'
    #stats is the box score data for the team
    points = safe_int(stats['Points'])
    offensive_rebounds = safe_int(stats['Offensive Rebounds'])
    defensive_rebounds = safe_int(stats['Defensive Rebounds'])
    total_rebounds = safe_int(stats['Total Rebounds'])
    assists = safe_int(stats['Assists'])
    steals = safe_int(stats['Steals'])
    blocks = safe_int(stats['Blocks'])
    turnovers = safe_int(stats['Turnovers'])
    fouls = safe_int(stats['Fouls'])

    field_goals_made, field_goals_attempted = map(int, stats['Field Goals'].split('-'))
    three_point_field_goals_made, three_point_field_goals_attempted = map(int, stats['3 Point Field Goals'].split('-'))
    free_throws_made, free_throws_attempted = map(int, stats['Free Throws'].split('-'))

    fg_percentage = float(field_goals_made / field_goals_attempted) if field_goals_attempted > 0 else 0.0

    three_percentage = float(three_point_field_goals_made / three_point_field_goals_attempted) if three_point_field_goals_attempted > 0 else 0.0

    ft_percentage = float(free_throws_made / free_throws_attempted) if free_throws_attempted > 0 else 0.0

    efg_percentage = float((field_goals_made + 0.5 * three_point_field_goals_made) / field_goals_attempted) if field_goals_attempted > 0 else 0.0

    ts_percentage = float(points/ (2 * (field_goals_attempted + 0.44 * free_throws_attempted))) if (field_goals_attempted + 0.44 * free_throws_attempted) > 0 else 0.0

    tov_percentage = float(turnovers / (field_goals_attempted + 0.44 * free_throws_attempted + turnovers)) if (field_goals_attempted + 0.44 * free_throws_attempted + turnovers) > 0 else 0.0

    cur.execute('''INSERT INTO Team_Stats(game_id, team_id, points, offensive_rebounds, defensive_rebounds, total_rebounds,
                                            assists, steals, blocks, turnovers, fouls, field_goals_made, field_goals_attempted,
                                            three_point_field_goals_made, three_point_field_goals_attempted, free_throws_made,
                                            free_throws_attempted, field_goal_percentage, three_point_percentage, free_throw_percentage,
                                            effective_field_goal_percentage, true_shooting_percentage, turnover_percentage)
                    VALUES (%s, %s, %s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s)
                ''', (game_id, team_id, points, offensive_rebounds, defensive_rebounds, total_rebounds, assists, steals, blocks,
                      turnovers, fouls, field_goals_made, field_goals_attempted, three_point_field_goals_made, three_point_field_goals_attempted,
                      free_throws_made, free_throws_attempted, fg_percentage, three_percentage, ft_percentage, efg_percentage,
                      ts_percentage, tov_percentage))
    

def load_player_stats(cur, player, stats, game_id, team_id, year):
    
    #will be called by load_box_data when iterating through the team's box scores
    #need the player name, the game id, the team id, and the box score data
    cur.execute(''' INSERT INTO Players(player_name)
                    VALUES (%s)
                    ON CONFLICT (player_name) DO NOTHING
                    RETURNING player_id
                ''', (player,))
    player_id = cur.fetchone()
    if not player_id:
        cur.execute('''SELECT player_id FROM Players WHERE player_name = %s''', (player,))
        player_id = cur.fetchone()[0]
    else:
        player_id = player_id[0]
    

    cur.execute('''INSERT INTO Player_Team(player_id, team_id, year)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (player_id, team_id, year) DO NOTHING
                    ''', (player_id, team_id, year))
    
    #Calculate some stats
    points = safe_int(stats['Points'])
    minutes = convert_minutes(stats['Minutes'])
    offensive_rebounds = safe_int(stats['Offensive Rebounds'])
    defensive_rebounds = safe_int(stats['Defensive Rebounds'])
    total_rebounds = safe_int(stats['Total Rebounds'])
    assists = safe_int(stats['Assists'])
    steals = safe_int(stats['Steals'])
    blocks = safe_int(stats['Blocks'])
    turnovers = safe_int(stats['Turnovers'])
    fouls = safe_int(stats['Fouls'])
    
    if(stats['Field Goals'] == '-'):
        field_goals_made = 0
        field_goals_attempted = 0
    else:
        field_goals_made, field_goals_attempted = map(int, stats['Field Goals'].split('-'))
    
    if(stats['3 Point Field Goals'] == '-'):
        three_point_field_goals_made = 0
        three_point_field_goals_attempted = 0
    else:
        three_point_field_goals_made, three_point_field_goals_attempted = map(int, stats['3 Point Field Goals'].split('-'))
    
    if(stats['Free Throws'] == '-'):
        free_throws_made = 0
        free_throws_attempted = 0
    else:
        free_throws_made, free_throws_attempted = map(int, stats['Free Throws'].split('-'))

    fg_percentage = float(field_goals_made / field_goals_attempted) if field_goals_attempted > 0 else 0.0

    three_percentage = float(three_point_field_goals_made / three_point_field_goals_attempted) if three_point_field_goals_attempted > 0 else 0.0

    ft_percentage = float(free_throws_made / free_throws_attempted) if free_throws_attempted > 0 else 0.0

    efg_percentage = float((field_goals_made + 0.5 * three_point_field_goals_made) / field_goals_attempted) if field_goals_attempted > 0 else 0.0


    ts_percentage = float(points/ (2 * (field_goals_attempted + 0.44 * free_throws_attempted))) if (field_goals_attempted + 0.44 * free_throws_attempted) > 0 else 0.0

    gamescore = float(points + (0.4 * field_goals_made) - (0.7 * field_goals_attempted )
                      - (0.4 * (free_throws_attempted - free_throws_made)) + (0.7 * offensive_rebounds) 
                      + (0.3 * defensive_rebounds) + steals + (0.7 * assists) + (0.7 * blocks) - (0.4 * fouls) - turnovers)
    
    
    cur.execute('''INSERT INTO Box_Scores(game_id, player_id, team_id, points, minutes, offensive_rebounds, defensive_rebounds,
                                                total_rebounds, assists, steals, blocks, turnovers, fouls, field_goals_made, field_goals_attempted,
                                                three_point_field_goals_made, three_point_field_goals_attempted, free_throws_made, free_throws_attempted,
                                                field_goal_percentage, three_point_percentage, free_throw_percentage, effective_field_goal_percentage,
                                                true_shooting_percentage, gamescore)
                    VALUES (%s, %s, %s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s)
                ''', (game_id, player_id, team_id, points, minutes, offensive_rebounds, defensive_rebounds, total_rebounds
                      ,assists, steals, blocks, turnovers, fouls, field_goals_made, field_goals_attempted, three_point_field_goals_made
                      ,three_point_field_goals_attempted, free_throws_made, free_throws_attempted, fg_percentage, three_percentage
                      , ft_percentage, efg_percentage, ts_percentage, gamescore))
    


def load_box_execution(cur, boxes):
    #boxes is the set of box scores for a given year
    
    for game in boxes:

        Year = int(game["Olympic Year"])
        Date = convert_date(game["Date"])
        home_team = game["Home Team"]
        away_team = game["Away Team"]
        home_score = int(game["Home Score"])
        away_score = int(game["Away Score"])
        
    
        for team in [home_team, away_team]:
        
            cur.execute('''INSERT INTO Teams(country_name)
                            VALUES (%s)
                            ON CONFLICT (country_name) DO NOTHING
                            ''', (team,))
        

        #now we can insert the games Table
        #first get the 2 team ids we need
        cur.execute('''SELECT team_id FROM Teams WHERE country_name = %s''', (home_team,))
        home_team_id = cur.fetchone()[0]
        home_team_id = int(home_team_id)
        cur.execute('''SELECT team_id FROM Teams WHERE country_name = %s''', (away_team,))
        away_team_id = cur.fetchone()[0]
        away_team_id = int(away_team_id)
        
        cur.execute('''INSERT INTO Games(year, date, home_team_id, home_country_name, away_team_id, 
                                            away_country_name, home_score, away_score)
                    Values (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING game_id
                    ''', (Year, Date, home_team_id, home_team, away_team_id, away_team, home_score, away_score))
        game_id = cur.fetchone()[0]

        
        for player, stats in game["Home_box"].items():
            if player == 'Totals':
                load_totals_data(cur, stats, game_id, home_team_id)
            else:
                load_player_stats(cur, player, stats, game_id, home_team_id, Year)
       
        for player, stats in game["Away_box"].items():
            if player == 'Totals':
                load_totals_data(cur, stats, game_id, away_team_id)
            else:
                load_player_stats(cur, player, stats, game_id, away_team_id, Year)
        


def load_box_data(cur, folder_path):
    #load the box score data into the database
    games = []
    for file in os.listdir(folder_path):
        if file.endswith('.json'):
            with open(os.path.join(folder_path, file), 'r') as f:
                games_boxes = json.load(f)
                games.append(games_boxes)
    
    for year_boxes in games:
        load_box_execution(cur, year_boxes)


if __name__ == "__main__":
    # Connect to the database

    try:
        #Connect to the database
        with psycopg2.connect(
                host=config['hostname'], 
                dbname=config['database'], 
                user=config['username'], 
                password=config['pwd'], 
                port=config['port_id']
            ) as conn:


            with conn.cursor() as cur:
                logging.info("Creating tables...")
                create_tables(cur)

                logging.info("Loading Olympics data...")
                load_Olympic_Tables(cur, 'OlympicYearLocsMedals.csv')

                logging.info("Loading box score data...")
                load_box_data(cur, 'box_scores')

                logging.info("Loading Medals data...")
                load_Medals_Table(cur, 'OlympicYearLocsMedals.csv')

                #conn.commit()
                logging.info("Data loaded successfully")
    except psycopg2.Error as e:
        logging.error(f'DATABASE ERROR: {e}')
    except Exception as e:
        logging.error(f'ERROR: {e}')
    