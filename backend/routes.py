from flask import request, jsonify
from config import app, db
import os
import json
from models import Olympics, Teams, Players, PlayerTeam, Games, BoxScores, TeamStats, Medals
from sqlalchemy import func, case

@app.route('/')
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


@app.route('/box_scores/<int:year>', methods=['GET'])
def box_scores(year):
    #use json to construct scores, no need to query
    file_path = f'box_scores/box_scores_{year}.json'

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
    
    if(year != 2024):
        medal_results = db.session.query(
            Medals.gold,
            Medals.silver,
            Medals.bronze
        ).filter(
            Medals.year == year
        ).first()
    else:
        medal_results = {
            'gold': 'TBD',
            'silver': 'TBD',
            'bronze': 'TBD'
        }
    

    return jsonify({
        'scores': scoresDict,
        'medal_results': {
            'gold': medal_results.gold,
            'silver': medal_results.silver,
            'bronze': medal_results.bronze
        }
    })

    

@app.route('/stat_leaders', methods=['GET'])
def stat_leaders():
    return 'This is the stat leaders route'

@app.route('/team_stats', methods=['GET'])
def team_stats():
    return 'This is the team stats route'

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)