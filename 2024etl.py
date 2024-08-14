import os
from dotenv import load_dotenv
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
# with open('config.json', 'r') as config_file:
#     config = json.load(config_file)
load_dotenv()

def filter_games_by_date(games, date, date2):
    target_date = datetime.strptime(date, "%b. %d, %Y")
    target_date2 = datetime.strptime(date2, "%b. %d, %Y")
    target_dates = [target_date, target_date2]

    filtered_games = []
    for game in games:
        game_date = datetime.strptime(game.get('Date', ""), "%b. %d, %Y")
        if game_date in target_dates:
            filtered_games.append(game)

    return filtered_games


def load_processed_urls():
    if os.path.exists('processed_urls.json'):
        with open('processed_urls.json', 'r') as f:
            return set(json.load(f))
    
    return set()

def save_processed_urls(urls):
    with open('processed_urls.json', 'w') as f:
        json.dump(list(urls), f, indent=4)

def get_new_urls(all_urls, processed_urls):
    return [url for url in all_urls if url not in processed_urls]

processed_urls = load_processed_urls()


urls = get_box_score_urls(url2024)

new_urls = get_new_urls(urls, processed_urls)



with open('box_score_urls/box_score_urls_2024.json', 'w') as f:
    json.dump(urls, f)


def load_existing_data(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            return json.load(f)
    
    return []

existing_data = load_existing_data('backend/box_scores/box_scores_2024.json')

year_box_scores = []
for url in new_urls:
    try:
        box_score = parse_box_score(url)
        year_box_scores.append(box_score)
        processed_urls.add(url)
    except Exception as e:
        print(f"Error parsing {url}: {e}")



output_dir = 'backend/box_scores'
# if not os.path.exists(output_dir):
#     os.makedirs(output_dir)
all_box_scores = existing_data + year_box_scores

output_file = os.path.join(output_dir, 'box_scores_2024.json')
with open(output_file, 'w') as out_file:
    json.dump(all_box_scores, out_file, indent=4)

save_processed_urls(processed_urls)

def load_data(cur, date, date2):
    games = []
    with open('backend/box_scores/box_scores_2024.json', 'r') as f:
        games = json.load(f)
    
    filtered_games = filter_games_by_date(games, date, date2)
    load_box_execution(cur, filtered_games)

# def insert_olympics_data(cur, year, location):
#     # Check if the year already exists
#     cur.execute("""
#         SELECT EXISTS (
#             SELECT 1 
#             FROM Olympics 
#             WHERE year = %s
#         );
#     """, (year,))
    
#     exists = cur.fetchone()[0]
    
#     if not exists:
#         # Insert data if it doesn't exist
#         cur.execute("""
#             INSERT INTO Olympics (year, location) 
#             VALUES (%s, %s);
#         """, (year, location))
#         print(f"Inserted data for year {year} with location {location}.")
#     else:
#         print(f"Data for year {year} already exists.")

def insert_2024_results(cur):
    year = 2024
    gold = 'USA'
    silver = 'France'
    bronze = 'Serbia'
    fourth = 'Germany'

    cur.execute("""
        INSERT INTO MEDALS (year, gold, silver, bronze, fourth)
        VALUES (%s, %s, %s, %s, %s);
        """, (year, gold, silver, bronze, fourth))
    

def main(date, date2):

    try:
        #Connect to the database
        with psycopg2.connect(
                host=os.getenv('hostname'), 
                dbname=os.getenv('database'), 
                user=os.getenv('username'), 
                password=os.getenv('pwd'), 
                port=os.getenv('port_id')
            ) as conn:


            with conn.cursor() as cur:
                logging.info("Connected to the database")
                insert_2024_results(cur)
                
                logging.info("Loading box score data...")
                load_data(cur, date, date2)

                #conn.commit()
                logging.info("Data loaded successfully")

    except psycopg2.Error as e:
        logging.error(f'DATABASE ERROR: {e}')
    except Exception as e:
        logging.error(f'ERROR: {e}')


if __name__ == '__main__':
    #NOT RAN YET, AUG 13 5:46 PM
    date_str = "Aug. 8, 2024"
    date_str_2 = "Aug. 10, 2024"
    main(date_str, date_str_2)