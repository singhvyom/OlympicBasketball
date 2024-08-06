import os
import sys
import json
import logging
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import psycopg2

from datetime import datetime
from urls import url2024

from backend.etl.boxScoreUrls import get_box_score_urls
from backend.etl.extractBoxScores import parse_box_score, parse_player_stats, parse_team_box_score
from backend.etl.load import load_box_execution, load_player_stats, safe_int, convert_minutes, convert_date


# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
with open('config.json', 'r') as config_file:
    config = json.load(config_file)

def filter_games_by_date(games, date):
    date_obj = datetime.strptime(date, "%b. %d, %Y")
    return [game for game in games if datetime.strptime(game.get('Date', ""), "%b. %d, %Y") == date_obj]

def load_processed_urls():
    if os.path.exists('processed_urls.json'):
        with open('processed_urls.json', 'r') as f:
            return set(json.load(f))
    
    return set()

def save_processed_urls(urls):
    with open('processed_urls.json', 'w') as f:
        json.dump(list(urls), f)

def get_new_urls(all_urls, processed_urls):
    return [url for url in all_urls if url not in processed_urls]

processed_urls = load_processed_urls()


urls = get_box_score_urls(url2024)

new_urls = get_new_urls(urls, processed_urls)



with open('box_score_urls/box_score_urls_2024.json', 'w') as f:
    json.dump(new_urls, f)

year_box_scores = []
for url in new_urls:
    try:
        box_score = parse_box_score(url)
        year_box_scores.append(box_score)
        processed_urls.add(url)
    except Exception as e:
        print(f"Error parsing {url}: {e}")



    
output_dir = 'box_scores'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)
    
output_file = os.path.join(output_dir, 'box_scores_2024.json')
with open(output_file, 'w') as out_file:
    json.dump(year_box_scores, out_file, indent=4)

save_processed_urls(processed_urls)

def load_data(cur, date_str):
    games = []
    with open('box_scores/box_scores_2024.json', 'r') as f:
        games = json.load(f)
    
    filtered_games = filter_games_by_date(games, date_str)
    load_box_execution(cur, filtered_games)

def insert_olympics_data(cur, year, location):
    # Check if the year already exists
    cur.execute("""
        SELECT EXISTS (
            SELECT 1 
            FROM Olympics 
            WHERE year = %s
        );
    """, (year,))
    
    exists = cur.fetchone()[0]
    
    if not exists:
        # Insert data if it doesn't exist
        cur.execute("""
            INSERT INTO Olympics (year, location) 
            VALUES (%s, %s);
        """, (year, location))
        print(f"Inserted data for year {year} with location {location}.")
    else:
        print(f"Data for year {year} already exists.")
    

def main(date_str):

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
                logging.info("Connected to the database")
                # insert_olympics_data(cur, 2024, 'Paris')
                
                logging.info("Loading box score data...")
                load_data(cur, date_str)

                #conn.commit()
                logging.info("Data loaded successfully")

    except psycopg2.Error as e:
        logging.error(f'DATABASE ERROR: {e}')
    except Exception as e:
        logging.error(f'ERROR: {e}')


if __name__ == '__main__':
    #HASNT BEEN RAN YET 4:43 PM
    date_str = "Aug 6. 2024"
    main(date_str)