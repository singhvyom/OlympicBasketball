import os
import requests
from bs4 import BeautifulSoup
import json
import re 
from urls import headers


# Function to parse player stats from a table row
def parse_player_stats(row):
    cells = row.find_all('td')
    if len(cells) < 16:  
        return None  
        
    return {
        "Minutes": cells[3].text.strip(),
        "Points": cells[4].text.strip(),
        "Offensive Rebounds": cells[5].text.strip(),
        "Defensive Rebounds": cells[6].text.strip(),
        "Total Rebounds": cells[7].text.strip(),
        "Assists": cells[8].text.strip(),
        "Steals": cells[9].text.strip(),
        "Blocks": cells[10].text.strip(),
        "Turnovers": cells[11].text.strip(),
        "Fouls": cells[12].text.strip(),
        "Field Goals": cells[13].text.strip(),
        "3 Point Field Goals": cells[14].text.strip(),
        "Free Throws": cells[15].text.strip()
    }

# Function to parse box score for a team
def parse_team_box_score(table):
    team_box_score = {}
    rows = table.find_all('tr', class_='a-top')  
    for row in rows:
        cells = row.find_all('td')
        player_name = cells[1].text.strip()  
        player_stats = parse_player_stats(row)
        if player_stats:
            team_box_score[player_name] = player_stats
    return team_box_score

def parse_box_score(url):
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract the game information
    title = soup.find('main', class_='main-content').find('h1').text.strip()
    year_match = re.search(r'\b(\d{4})\b Olympic Games', title)
    if year_match:
        year = year_match.group(1)
    else:
        year = "Unknown"  
    
    date_text = soup.find('main', class_='main-content').find('h2').text.strip()
    date_match = re.search(r'\bon\b\s*(\w+\.\s*\d+,\s*\d{4})', date_text)
    if date_match:
        game_date = date_match.group(1).strip()
    else:
        game_date = "Unknown"

    teams = title.split(",")[0].split(" vs. ")
    home_team = teams[0].strip()
    away_team = teams[1].strip()
    scores = re.findall(r'\b\d+\b', title.split(",")[1].strip()) 
    home_score = int(scores[0].strip())
    away_score = int(scores[1].strip())

    # Initialize the game data structure
    game_data = {
        "Olympic Year": year,
        "Date": game_date,
        "Home Team": home_team,
        "Home Score": home_score,
        "Away Team": away_team,
        "Away Score": away_score,
        "Home_box": {},
        "Away_box": {}
    }

    # Parse the box scores for both teams
    box_score_tables = soup.find_all('div', class_='clearfix overflow-x-auto')
    home_box_score_table = box_score_tables[0].find('table')
    away_box_score_table = box_score_tables[1].find('table')

    game_data["Home_box"] = parse_team_box_score(home_box_score_table)
    game_data["Away_box"] = parse_team_box_score(away_box_score_table)

    return game_data


def process_box_score_urls(folder_path):
    # Iterate through each JSON file in the folder
    for json_file in os.listdir(folder_path):
        if json_file.endswith('.json'):
            year = json_file.split('_')[-1].split('.')[0] 
            with open(os.path.join(folder_path, json_file), 'r') as file:
                urls = json.load(file)
            
            year_box_scores = []
            for url in urls:
                try:
                    box_score = parse_box_score(url)
                    year_box_scores.append(box_score)
                except Exception as e:
                    print(f"Error parsing {url}: {e}")
            
            # Save the box scores to a new JSON file
            output_dir = 'box_scores'
            if not os.path.exists(output_dir):
                os.makedirs(output_dir)

            output_file = os.path.join(output_dir, f'box_scores_{year}.json')
            with open(output_file, 'w') as out_file:
                json.dump(year_box_scores, out_file, indent=4)



if __name__ == "__main__":
    folder_path = 'box_score_urls'
    process_box_score_urls(folder_path)