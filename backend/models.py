from config import db

class Olympics(db.Model):
    __tablename__ = 'olympics'
    year = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(100))

class Teams(db.Model):
    __tablename__ = 'teams'
    team_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String(100), unique=True)


class Players(db.Model):
    __tablename__ = 'players'
    player_id = db.Column(db.Integer, primary_key=True)
    player_name = db.Column(db.String(100), unique=True)

class PlayerTeam(db.Model):
    __tablename__ = 'player_team'
    player_id = db.Column(db.Integer, db.ForeignKey('players.player_id'), primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.team_id'), primary_key=True)
    year = db.Column(db.Integer, db.ForeignKey('olympics.year'), primary_key=True)

class Games(db.Model):
    __tablename__ = 'games'
    game_id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, db.ForeignKey('olympics.year'))
    date = db.Column(db.Date)
    home_team_id = db.Column(db.Integer, db.ForeignKey('teams.team_id'))
    home_country_name = db.Column(db.String(100))
    away_team_id = db.Column(db.Integer, db.ForeignKey('teams.team_id'))
    away_country_name = db.Column(db.String(100))
    home_score = db.Column(db.Integer)
    away_score = db.Column(db.Integer)

class BoxScores(db.Model):
    __tablename__ = 'box_scores'
    box_id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.game_id'))
    player_id = db.Column(db.Integer, db.ForeignKey('players.player_id'))
    team_id = db.Column(db.Integer, db.ForeignKey('teams.team_id'))
    points = db.Column(db.Integer)
    minutes = db.Column(db.Float)
    offensive_rebounds = db.Column(db.Integer)
    defensive_rebounds = db.Column(db.Integer)
    total_rebounds = db.Column(db.Integer)
    assists = db.Column(db.Integer)
    steals = db.Column(db.Integer)
    blocks = db.Column(db.Integer)
    turnovers = db.Column(db.Integer)
    fouls = db.Column(db.Integer)
    field_goals_made = db.Column(db.Integer)
    field_goals_attempted = db.Column(db.Integer)
    three_point_field_goals_made = db.Column(db.Integer)
    three_point_field_goals_attempted = db.Column(db.Integer)
    free_throws_made = db.Column(db.Integer)
    free_throws_attempted = db.Column(db.Integer)
    field_goal_percentage = db.Column(db.Float)
    three_point_percentage = db.Column(db.Float)
    free_throw_percentage = db.Column(db.Float)
    effective_field_goal_percentage = db.Column(db.Float)
    true_shooting_percentage = db.Column(db.Float)
    gamescore = db.Column(db.Float)

class TeamStats(db.Model):
    __tablename__ = 'team_stats'
    team_total_id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.game_id'))
    team_id = db.Column(db.Integer, db.ForeignKey('teams.team_id'))
    points = db.Column(db.Integer)
    offensive_rebounds = db.Column(db.Integer)
    defensive_rebounds = db.Column(db.Integer)
    total_rebounds = db.Column(db.Integer)
    assists = db.Column(db.Integer)
    steals = db.Column(db.Integer)
    blocks = db.Column(db.Integer)
    turnovers = db.Column(db.Integer)
    fouls = db.Column(db.Integer)
    field_goals_made = db.Column(db.Integer)
    field_goals_attempted = db.Column(db.Integer)
    three_point_field_goals_made = db.Column(db.Integer)
    three_point_field_goals_attempted = db.Column(db.Integer)
    free_throws_made = db.Column(db.Integer)
    free_throws_attempted = db.Column(db.Integer)
    field_goal_percentage = db.Column(db.Float)
    three_point_percentage = db.Column(db.Float)
    free_throw_percentage = db.Column(db.Float)
    effective_field_goal_percentage = db.Column(db.Float)
    true_shooting_percentage = db.Column(db.Float)
    turnover_percentage = db.Column(db.Float)

class Medals(db.Model):
    __tablename__ = 'medals'
    medal_id = db.Column(db.Integer, primary_key=True)
    gold = db.Column(db.String(100), db.ForeignKey('teams.country_name'))
    silver = db.Column(db.String(100), db.ForeignKey('teams.country_name'))
    bronze = db.Column(db.String(100), db.ForeignKey('teams.country_name'))
    fourth = db.Column(db.String(100), db.ForeignKey('teams.country_name'))
    year = db.Column(db.Integer, db.ForeignKey('olympics.year'))  