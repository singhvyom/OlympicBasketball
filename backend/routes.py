from flask import request, jsonify
from config import app, db
from models import Olympics, Teams, Players, PlayerTeam, Games, BoxScores, TeamStats, Medals


@app.route('/')
def home():
    #we will display the top 3 teams with the most medals
    #with designations for gold, silver, and bronze
    #and we will display the top 3 players with the most points, and their respective teams

    top_teams = db.session.query(
        Teams.country_name,
        db.func.count(Medals.medal_id).label('total_medals'),
        db.func.count(Medals.gold).label('gold'),
        db.func.count(Medals.silver).label('silver'),
        db.func.count(Medals.bronze).label('bronze')
    ).join(
        Medals, Teams.country_name.in_([Medals.gold, Medals.silver, Medals.bronze])
        ).group_by(Teams.country_name).order_by(db.desc('total_medals')).limit(3).all()
    

    top_players = db.session.query(
        Players.player_name,
        Teams.country_name,
        db.func.sum(BoxScores.points).label('total_points')
    ).join(
        PlayerTeam, Players.player_id == PlayerTeam.player_id
    ).join(
        Teams, PlayerTeam.team_id == Teams.team_id
    ).join(
        BoxScores, Players.player_id == BoxScores.player_id
    ).group_by(
        Players.player_name, Teams.country_name
    ).order_by(db.desc('total_points')).limit(3).all()

    top_teams_dict = [{
        'team': team.country_name,
        'total_medals': team.total_medals,
        'gold': team.gold,
        'silver': team.silver,
        'bronze': team.bronze
    } for team in top_teams]

    top_players_dict = [{
        'player': player.player_name,
        'team': player.country_name,
        'total_points': player.total_points
    } for player in top_players]

    response = {
        'top_teams': top_teams_dict,
        'top_players': top_players_dict
    }

    return jsonify(response)


# app.route('/box_scores', methods=['GET'])
# def box_scores():
#     return 'This is the box scores route'

# app.route('/stat_leaders', methods=['GET'])
# def stat_leaders():
#     return 'This is the stat leaders route'

# app.route('/team_stats', methods=['GET'])
# def team_stats():
#     return 'This is the team stats route'

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)