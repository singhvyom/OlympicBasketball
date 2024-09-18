from flask import request, jsonify, send_from_directory
from config import app, db
import urllib.parse
import os
import json
from models import Olympics, Teams, Players, PlayerTeam, Games, BoxScores, TeamStats, Medals
from sqlalchemy import func,and_, case
from sqlalchemy.orm import aliased
from langchain_community.agent_toolkits.sql.base import create_sql_agent
from langchain_openai import ChatOpenAI
from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits.sql.toolkit import SQLDatabaseToolkit
from sqlalchemy import create_engine

# @app.route('/')
# def serve_react_app():
#     # return "backend working"
#     return send_from_directory('../frontend/build', 'index.html')

# @app.route('/<path:path>')
# def serve_static_files(path):
#     return send_from_directory('../frontend/build', path)

@app.route('/', methods=['GET'])
def home():
    #we will display the top 3 teams with the most medals
    #with designations for gold, silver, and bronze
    #and we will display the top 5 players with the most points, and their respective teams

    top_teams = db.session.query(
        Teams.country_name.label('team'),
        func.sum(case((Medals.gold == Teams.country_name, 1), else_=0)).label('gold'),
        func.sum(case((Medals.silver == Teams.country_name, 1), else_=0)).label('silver'),
        func.sum(case((Medals.bronze == Teams.country_name, 1), else_=0)).label('bronze'),
        (
            func.sum(case((Medals.gold == Teams.country_name, 1), else_=0)) +
            func.sum(case((Medals.silver == Teams.country_name, 1), else_=0)) +
            func.sum(case((Medals.bronze == Teams.country_name, 1), else_=0))
        ).label('total_medals')
    ).join(
        Medals, 
        (Teams.country_name == Medals.gold) | 
        (Teams.country_name == Medals.silver) | 
        (Teams.country_name == Medals.bronze)
    ).group_by(
        Teams.country_name
    ).order_by(
        db.desc('gold'),
        db.desc('silver'),
        db.desc('bronze'),
    ).limit(3).all()
    

    top_players = db.session.query(
        Players.player_name,
        db.func.sum(BoxScores.points).label('total_points')
    ).join(
        BoxScores, Players.player_id == BoxScores.player_id
    ).group_by(
        Players.player_name
    ).order_by(
        db.desc('total_points')
    ).limit(5).all()

    top_rebounders = db.session.query(
        Players.player_name,
        db.func.sum(BoxScores.total_rebounds).label('total_rebounds')
    ).join(
        BoxScores, Players.player_id == BoxScores.player_id
    ).group_by(
        Players.player_name
    ).order_by(
        db.desc('total_rebounds')
    ).limit(5).all()

    top_passers = db.session.query(
        Players.player_name,
        db.func.sum(BoxScores.assists).label('assists')
    ).join(
        BoxScores, Players.player_id == BoxScores.player_id
    ).group_by(
        Players.player_name
    ).order_by(
        db.desc('assists')
    ).limit(5).all()

    top_teams_dict = [{
        'team': team.team,
        'total_medals': team.total_medals,
        'gold': team.gold,
        'silver': team.silver,
        'bronze': team.bronze
    } for team in top_teams]

    top_players_dict = [{
        'player': player.player_name,
        'total_points': player.total_points
    } for player in top_players]

    top_rebounders_dict = [{
        'player': player.player_name,
        'total_rebounds': player.total_rebounds
    } for player in top_rebounders]

    top_passers_dict = [{
        'player': player.player_name,
        'assists': player.assists
    } for player in top_passers]

    response = {
        'top_teams': top_teams_dict,
        'top_players': top_players_dict,
        'top_rebounders': top_rebounders_dict,
        'top_passers': top_passers_dict
    }

    return jsonify(response)


@app.route('/scores/<int:year>', methods=['GET'])
def scores(year):
    #use json to construct scores, no need to query
    # file_path = f'backend/box_scores/box_scores_{year}.json'

    base_dir = os.path.dirname(os.path.abspath(__file__))  # Get the current file's directory
    file_path = os.path.join(base_dir, 'box_scores', f'box_scores_{year}.json')

    if not os.path.exists(file_path):
        return jsonify({'message': 'Year not found'}), 404
    
    with open(file_path, 'r') as f:
        data = json.load(f)

    scoresDict = []
    for game in data:
        scoresDict.append({
            'Date': game.get('Date'),
            'Home Team': game.get('Home Team'),
            'Home Score': game.get('Home Score'),
            'Away Team': game.get('Away Team'),
            'Away Score': game.get('Away Score')
        })

    
    medal_results = db.session.query(
            Medals.gold,
            Medals.silver,
            Medals.bronze
        ).filter(
            Medals.year == year
        ).first()
    
    medal_results_dict = {
            'gold': medal_results.gold,
            'silver': medal_results.silver,
            'bronze': medal_results.bronze
        }
    
    return jsonify({
        'scores': scoresDict,
        'medal_results': medal_results_dict
    })

    
@app.route('/scores/<int:year>/<hometeam_vs_awayteam_date>', methods=['GET'])
def boxscore(year, hometeam_vs_awayteam_date):
    # change this to get the box score from the database
    # with advanced stats and more details
    
    hometeam_vs_awayteam_date = urllib.parse.unquote(hometeam_vs_awayteam_date)
    try:
        # Split based on the '_vs_' and '_'
        home_team_part, date = hometeam_vs_awayteam_date.rsplit('_', 1)
        home_team, away_team = home_team_part.split('_vs_')

        # Remove extra spaces
        home_team = home_team.strip()
        away_team = away_team.strip()
        date = date.strip()

    except (ValueError, IndexError) as e:
        return jsonify({'message': 'Invalid URL format', 'error': str(e)}), 400
    

    # file_path = f'backend/box_scores/box_scores_{year}.json'
    base_dir = os.path.dirname(os.path.abspath(__file__))  # Get the current file's directory
    file_path = os.path.join(base_dir, 'box_scores', f'box_scores_{year}.json')

    with open(file_path, 'r') as f:
        data = json.load(f)

    for game in data:
        if(game['Home Team'] == home_team and
            game['Away Team'] == away_team and
            game['Date'] == date):
            return jsonify(game)
    
    return jsonify({'message': 'Box Score not found'}), 404

@app.route('/stats', methods=['GET'])
def stat_leaders():
    #here we will need to set up queries
    #table can handle sorting by country, and ordering on stats
    #need averages, totals, by year options available
    #default is all time leaders, sorted by points
    #need to get the country of each player and all their stats
    
    latest_team_cte = (
        db.session.query(
            PlayerTeam.player_id,
            PlayerTeam.team_id,
            func.max(PlayerTeam.year).label('latest_year')
        ).group_by(
            PlayerTeam.player_id,
            PlayerTeam.team_id
        ).cte('latest_team_cte')
    )

    career_totals = db.session.query(
        Players.player_name,
        Teams.country_name,
        db.func.sum(BoxScores.points).label('points'),
        db.func.sum(BoxScores.total_rebounds).label('rebounds'),
        db.func.sum(BoxScores.assists).label('assists'),
        db.func.sum(BoxScores.steals).label('steals'),
        db.func.sum(BoxScores.blocks).label('blocks'),
        db.func.sum(BoxScores.turnovers).label('turnovers'),
        db.func.sum(BoxScores.fouls).label('fouls'),
        db.func.sum(BoxScores.field_goals_made).label('field_goals_made'),
        db.func.sum(BoxScores.field_goals_attempted).label('field_goals_attempted'),
        db.func.sum(BoxScores.three_point_field_goals_made).label('three_point_field_goals_made'),
        db.func.sum(BoxScores.three_point_field_goals_attempted).label('three_point_field_goals_attempted'),
        db.func.sum(BoxScores.free_throws_made).label('free_throws_made'),
        db.func.sum(BoxScores.free_throws_attempted).label('free_throws_attempted'),
        db.func.sum(BoxScores.minutes).label('minutes'),
        db.func.sum(BoxScores.gamescore).label('gamescore'),
        db.func.count(db.distinct(BoxScores.game_id)).label('games_played')
    ).join(
        BoxScores, Players.player_id == BoxScores.player_id
    ).join(
        latest_team_cte,
        and_(
            Players.player_id == latest_team_cte.c.player_id,
            BoxScores.team_id == latest_team_cte.c.team_id
        )
    ).join(
        Teams,
        latest_team_cte.c.team_id == Teams.team_id
    ).group_by(
        Players.player_name,
        Teams.country_name
    ).order_by(
        db.desc('points'),
    ).all()
    
    yearly_totals = db.session.query(
    Players.player_name,
    Teams.country_name,
    Games.year,
    func.sum(BoxScores.points).label('points'),
    func.sum(BoxScores.total_rebounds).label('rebounds'),
    func.sum(BoxScores.assists).label('assists'),
    func.sum(BoxScores.steals).label('steals'),
    func.sum(BoxScores.blocks).label('blocks'),
    func.sum(BoxScores.turnovers).label('turnovers'),
    func.sum(BoxScores.fouls).label('fouls'),
    func.sum(BoxScores.field_goals_made).label('field_goals_made'),
    func.sum(BoxScores.field_goals_attempted).label('field_goals_attempted'),
    func.sum(BoxScores.three_point_field_goals_made).label('three_point_field_goals_made'),
    func.sum(BoxScores.three_point_field_goals_attempted).label('three_point_field_goals_attempted'),
    func.sum(BoxScores.free_throws_made).label('free_throws_made'),
    func.sum(BoxScores.free_throws_attempted).label('free_throws_attempted'),
    func.sum(BoxScores.gamescore).label('gamescore'),
    func.sum(BoxScores.minutes).label('minutes'),
    func.count(BoxScores.game_id.distinct()).label('games_played')
    ).join(
        BoxScores, Players.player_id == BoxScores.player_id
    ).join(
        Games, BoxScores.game_id == Games.game_id
    ).join(
        PlayerTeam, and_(
            Players.player_id == PlayerTeam.player_id,
            Games.year == PlayerTeam.year
        )
    ).join(
        Teams, PlayerTeam.team_id == Teams.team_id
    ).group_by(
        Players.player_name,
        Teams.country_name,
        Games.year
    ).order_by(
        db.desc('points'),
    ).all()

    TeamsHome = aliased(Teams)
    TeamsAway = aliased(Teams)

    game_totals = db.session.query(
        Players.player_name,
        Teams.country_name,
        Games.year,
        Games.date,
        BoxScores.points,
        BoxScores.total_rebounds,
        BoxScores.assists,
        BoxScores.steals,
        BoxScores.blocks,
        BoxScores.turnovers,
        BoxScores.fouls,
        BoxScores.field_goals_made,
        BoxScores.field_goals_attempted,
        BoxScores.three_point_field_goals_made,
        BoxScores.three_point_field_goals_attempted,
        BoxScores.free_throws_made,
        BoxScores.free_throws_attempted,
        BoxScores.field_goal_percentage,
        BoxScores.three_point_percentage,
        BoxScores.free_throw_percentage,
        BoxScores.effective_field_goal_percentage,
        BoxScores.true_shooting_percentage,
        BoxScores.gamescore,
        BoxScores.minutes,
        case(
            (BoxScores.team_id == Games.home_team_id, TeamsAway.country_name),
            else_=TeamsHome.country_name
        ).label('opponent')
    ).join(
        BoxScores, Players.player_id == BoxScores.player_id
    ).join(
        Games, BoxScores.game_id == Games.game_id
    ).join(
        PlayerTeam, and_(
            Players.player_id == PlayerTeam.player_id,
            Games.year == PlayerTeam.year
        )
    ).join(
        Teams, PlayerTeam.team_id == Teams.team_id
    ).join(
        TeamsHome, Games.home_team_id == TeamsHome.team_id
    ).join(
        TeamsAway, Games.away_team_id == TeamsAway.team_id
    ).order_by(
        db.desc(BoxScores.gamescore),
        Players.player_name,
        Games.year,
        Games.date
    ).all()




    career_stats_dict = [{
        'player': player.player_name,
        'country': player.country_name,
        'minutes': round(player.minutes, 2),
        'points': player.points,
        'rebounds': player.rebounds,
        'assists': player.assists,
        'steals': player.steals,
        'blocks': player.blocks,
        'turnovers': player.turnovers,
        'fouls': player.fouls,
        'field_goals_made': player.field_goals_made,
        'field_goals_attempted': player.field_goals_attempted,
        'field_goal_percentage': round((player.field_goals_made/player.field_goals_attempted * 100), 2) if player.field_goals_attempted > 0 else 0,
        'three_point_field_goals_made': player.three_point_field_goals_made,
        'three_point_field_goals_attempted': player.three_point_field_goals_attempted,
        'three_point_percentage': round((player.three_point_field_goals_made/player.three_point_field_goals_attempted * 100), 2) if player.three_point_field_goals_attempted > 0 else 0,
        'free_throws_made': player.free_throws_made,
        'free_throws_attempted': player.free_throws_attempted,
        'free_throw_percentage': round((player.free_throws_made/player.free_throws_attempted * 100), 2) if player.free_throws_attempted > 0 else 0,
        'games_played': player.games_played,
        'avg_minutes': round(player.minutes/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_points': round(player.points/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_rebounds': round(player.rebounds/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_assists': round(player.assists/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_steals': round(player.steals/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_blocks': round(player.blocks/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_turnovers': round(player.turnovers/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_fouls': round(player.fouls/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_field_goals_made': round(player.field_goals_made/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_field_goals_attempted': round(player.field_goals_attempted/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_three_point_field_goals_made': round(player.three_point_field_goals_made/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_three_point_field_goals_attempted': round(player.three_point_field_goals_attempted/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_free_throws_made': round(player.free_throws_made/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_free_throws_attempted': round(player.free_throws_attempted/player.games_played, 2) if player.games_played > 0 else 0,
        'career_effective_field_goal_percentage': round(((player.field_goals_made + 0.5 * player.three_point_field_goals_made)/player.field_goals_attempted) * 100, 2) if player.field_goals_attempted > 0 else 0,
        'career_true_shooting_percentage': round((player.points/(2 * (player.field_goals_attempted + 0.44 * player.free_throws_attempted))) * 100, 2) if player.field_goals_attempted > 0 else 0,
        'career_avg_gamescore': round(player.gamescore/player.games_played, 2) if player.games_played > 0 else 0
    } for player in career_totals]

    yearly_stats_dict = [{
        'player': player.player_name,
        'country': player.country_name,
        'year': player.year,
        'minutes': player.minutes,
        'points': player.points,
        'rebounds': player.rebounds,
        'assists': player.assists,
        'steals': player.steals,
        'blocks': player.blocks,
        'turnovers': player.turnovers,
        'fouls': player.fouls,
        'field_goals_made': player.field_goals_made,
        'field_goals_attempted': player.field_goals_attempted,
        'field_goal_percentage': round((player.field_goals_made/player.field_goals_attempted * 100), 2) if player.field_goals_attempted > 0 else 0,
        'three_point_field_goals_made': player.three_point_field_goals_made,
        'three_point_field_goals_attempted': player.three_point_field_goals_attempted,
        'three_point_percentage': round((player.three_point_field_goals_made/player.three_point_field_goals_attempted * 100), 2) if player.three_point_field_goals_attempted > 0 else 0,
        'free_throws_made': player.free_throws_made,
        'free_throws_attempted': player.free_throws_attempted,
        'free_throw_percentage': round((player.free_throws_made/player.free_throws_attempted * 100), 2) if player.free_throws_attempted > 0 else 0,
        'games_played': player.games_played,
        'avg_minutes': round(player.minutes/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_points': round(player.points/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_rebounds': round(player.rebounds/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_assists': round(player.assists/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_steals': round(player.steals/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_blocks': round(player.blocks/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_turnovers': round(player.turnovers/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_fouls': round(player.fouls/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_field_goals_made': round(player.field_goals_made/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_field_goals_attempted': round(player.field_goals_attempted/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_three_point_field_goals_made': round(player.three_point_field_goals_made/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_three_point_field_goals_attempted': round(player.three_point_field_goals_attempted/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_free_throws_made': round(player.free_throws_made/player.games_played, 2) if player.games_played > 0 else 0,
        'avg_free_throws_attempted': round(player.free_throws_attempted/player.games_played, 2) if player.games_played > 0 else 0,
        'effective_field_goal_percentage': round(((player.field_goals_made + 0.5 * player.three_point_field_goals_made)/player.field_goals_attempted) * 100, 2) if player.field_goals_attempted > 0 else 0,
        'true_shooting_percentage': round((player.points/(2 * (player.field_goals_attempted + 0.44 * player.free_throws_attempted))) * 100, 2) if player.field_goals_attempted > 0 else 0,
        'avg_gamescore': round(player.gamescore/player.games_played, 2) if player.games_played > 0 else 0

    } for player in yearly_totals]

    game_stats_dict = [{
        'player': player.player_name,
        'country': player.country_name,
        'year': player.year,
        'date': player.date,
        'opponent': player.opponent,
        'minutes': player.minutes,
        'points': player.points,
        'rebounds': player.total_rebounds,
        'assists': player.assists,
        'steals': player.steals,
        'blocks': player.blocks,
        'turnovers': player.turnovers,
        'fouls': player.fouls,
        'field_goals_made': player.field_goals_made,
        'field_goals_attempted': player.field_goals_attempted,
        'field_goal_percentage': round(player.field_goal_percentage, 2),
        'three_point_field_goals_made': player.three_point_field_goals_made,
        'three_point_field_goals_attempted': player.three_point_field_goals_attempted,
        'three_point_percentage': round(player.three_point_percentage, 2),
        'free_throws_made': player.free_throws_made,
        'free_throws_attempted': player.free_throws_attempted,
        'free_throw_percentage': round(player.free_throw_percentage, 2),
        'effective_field_goal_percentage': round(player.effective_field_goal_percentage, 2),
        'true_shooting_percentage': round(player.true_shooting_percentage, 2),
        'gamescore': round(player.gamescore, 2)
    } for player in game_totals]  

    stats = {
        'career_stats': career_stats_dict,
        'yearly_stats': yearly_stats_dict,
        'game_stats': game_stats_dict
    }

    
    return jsonify(stats)

@app.route('/team_stats', methods=['GET'])
def team_stats():
    return 'This is the team stats route'


openai_api_key = os.getenv('OPENAI_API_KEY')

database_uri = os.getenv('DATABASE_URL')
engine = create_engine(database_uri)
database = SQLDatabase(engine)

llm = ChatOpenAI(model_name='gpt-3.5-turbo', temperature=0, openai_api_key=openai_api_key)

toolkit = SQLDatabaseToolkit(llm=llm, db=database)
executor = create_sql_agent(
    llm=llm,
    toolkit=toolkit,
    verbose=True
)
@app.route('/query', methods=['POST'])
def query():
    try:

        data = request.json
        user_query = data.get('query')
        enhancement = '''
                        When returning the results of this query use full player names or team names.
                        With a player_id you can find the corresponding name in the Players table with player_id
                        With a team_id you can find the corresponding name of the team in the Teams table with country_name
                    '''
        enhanced_query = enhancement + "\n" + user_query
        result = executor.invoke(enhanced_query)

        result_output = result.get('output', '')
       
        # print(f'RESULT: {result_output}')
        # print(type(result_output))

        return jsonify({
                'message': f'Query received: {user_query}', 
                'result': result_output
            })
    
    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)