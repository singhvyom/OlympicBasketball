from flask import request, jsonify
from config import app, db
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
        db.desc('total_medals')
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

    response = {
        'top_teams': top_teams_dict,
        'top_players': top_players_dict
    }
    return jsonify(response)


@app.route('/box_scores', methods=['GET'])
def box_scores():
    return 'This is the box scores route'

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