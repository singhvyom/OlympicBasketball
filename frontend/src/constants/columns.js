//all the columns used on the stats page

export const BasicColumns = [
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    { field: 'games', headerName: 'Games', width: 90 },
    { field: 'minutes', headerName: 'Min', width: 90 },
    { field: 'points', headerName: 'Pts', width: 70 },
    { field: 'rebounds', headerName: 'Rebs', width: 70 },
    { field: 'assists', headerName: 'Asts', width: 70 },
    { field: 'steals', headerName: 'Stls', width: 70 },
    { field: 'blocks', headerName: 'Blks', width: 70 },
    { field: 'turnovers', headerName: 'TOs', width: 70 },
    { field: 'fouls', headerName: 'Fls', width: 70 },
    { field: 'field_goals', headerName: 'Field Goals', width: 90 },
    { field: 'three_pointers', headerName: '3 Pointers', width: 90 },
    { field: 'free_throws', headerName: 'Free Throws', width: 90 }
];

export const BasicAvgColumns = [
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    { field: 'games', headerName: 'Games', width: 90 },
    { field: 'minutes', headerName: 'MPG', width: 90 },
    { field: 'points', headerName: 'PPG', width: 90 },
    { field: 'rebounds', headerName: 'RPG', width: 90 },
    { field: 'assists', headerName: 'APG', width: 90 },
    { field: 'steals', headerName: 'SPG', width: 90 },
    { field: 'blocks', headerName: 'BPG', width: 90 },
    { field: 'turnovers', headerName: 'ToPG', width: 90 },
    { field: 'fouls', headerName: 'FPG', width: 90 },
    { field: 'field_goals', headerName: 'FGMpg', width: 90 },
    { field: 'three_pointers', headerName: '3PMpg', width: 90 },
    { field: 'free_throws', headerName: 'FTMpg', width: 90 }
];

export const ShootingColumns =[
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    { field: 'games', headerName: 'Games', width: 90 },
    { field: 'field_goals', headerName: 'FGM', width: 90 },
    { field: 'field_goals_attempted', headerName: 'FGA', width: 90 },
    { field: 'field_goal_percentage', headerName: 'FG %', width: 90 },
    { field: 'three_pointers', headerName: '3PM', width: 90 },
    { field: 'three_pointers_attempted', headerName: '3PA', width: 90 },
    { field: 'three_point_percentage', headerName: '3pFG %', width: 90 },
    { field: 'free_throws', headerName: 'FTM', width: 90 },
    { field: 'free_throws_attempted', headerName: 'FTA', width: 90 },
    { field: 'free_throw_percentage', headerName: 'FT %', width: 90 }
];

export const ShootingAvgColumns =[
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    { field: 'games', headerName: 'Games', width: 90 },
    { field: 'field_goals', headerName: 'FGMpg', width: 90 },
    { field: 'field_goals_attempted', headerName: 'FGApg', width: 90 },
    { field: 'field_goal_percentage', headerName: 'FG %', width: 90 },
    { field: 'three_pointers', headerName: '3PMpg', width: 90 },
    { field: 'three_pointers_attempted', headerName: '3PApg', width: 90 },
    { field: 'three_point_percentage', headerName: '3pFG %', width: 90 },
    { field: 'free_throws', headerName: 'FTMpg', width: 90 },
    { field: 'free_throws_attempted', headerName: 'FTApg', width: 90 },
    { field: 'free_throw_percentage', headerName: 'FT %', width: 90 }
];

export const AdvancedColumns =[
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    { field: 'games', headerName: 'Games', width: 90 },
    {field: 'avg_game_score', headerName: 'Avg Game Score', width: 90},
    {field: 'effective_field_goal_percentage', headerName: 'eFG %', width: 90},
    {field: 'true_shooting_percentage', headerName: 'TS %', width: 90},
    { field: 'field_goals', headerName: 'FGM', width: 90 },
    { field: 'field_goals_attempted', headerName: 'FGA', width: 90 },
    { field: 'field_goal_percentage', headerName: 'FG %', width: 90 },
    { field: 'three_pointers', headerName: '3PM', width: 90 },
    { field: 'three_pointers_attempted', headerName: '3PA', width: 90 },
    { field: 'three_point_percentage', headerName: '3pFG %', width: 90 },
    { field: 'free_throws', headerName: 'FTM', width: 90 },
    { field: 'free_throws_attempted', headerName: 'FTA', width: 90 },
    { field: 'free_throw_percentage', headerName: 'FT %', width: 90 }
];

export const AdvancedAvgColumns = [
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    { field: 'games', headerName: 'Games', width: 90 },
    {field: 'effective_field_goal_percentage', headerName: 'eFG %', width: 90},
    {field: 'true_shooting_percentage', headerName: 'TS %', width: 90},
    {field: 'avg_game_score', headerName: 'Avg Game Score', width: 90},
    { field: 'field_goals_attempted', headerName: 'FGApg', width: 90 },
    { field: 'field_goal_percentage', headerName: 'FG %', width: 90 },
    { field: 'three_pointers', headerName: '3PMpg', width: 90 },
    { field: 'three_pointers_attempted', headerName: '3PApg', width: 90 },
    { field: 'three_point_percentage', headerName: '3pFG %', width: 90 },
    { field: 'free_throws', headerName: 'FTMpg', width: 90 },
    { field: 'free_throws_attempted', headerName: 'FTApg', width: 90 },
    { field: 'free_throw_percentage', headerName: 'FT %', width: 90 }

];

export const BasicYearColumns = [
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    {field: 'olympic_year', headerName: 'Olympic Year', width: 90},
    { field: 'games', headerName: 'Games', width: 90 },
    { field: 'minutes', headerName: 'Min', width: 90 },
    { field: 'points', headerName: 'Pts', width: 70 },
    { field: 'rebounds', headerName: 'Rebs', width: 70 },
    { field: 'assists', headerName: 'Asts', width: 70 },
    { field: 'steals', headerName: 'Stls', width: 70 },
    { field: 'blocks', headerName: 'Blks', width: 70 },
    { field: 'turnovers', headerName: 'TOs', width: 70 },
    { field: 'fouls', headerName: 'Fls', width: 70 },
    { field: 'field_goals', headerName: 'Field Goals', width: 90 },
    { field: 'three_pointers', headerName: '3 Pointers', width: 90 },
    { field: 'free_throws', headerName: 'Free Throws', width: 90 }
];

export const BasicYearAvgColumns = [
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    {field: 'olympic_year', headerName: 'Olympic Year', width: 90},
    { field: 'games', headerName: 'Games', width: 90 },
    { field: 'minutes', headerName: 'MPG', width: 90 },
    { field: 'points', headerName: 'PPG', width: 90 },
    { field: 'rebounds', headerName: 'RPG', width: 90 },
    { field: 'assists', headerName: 'APG', width: 90 },
    { field: 'steals', headerName: 'SPG', width: 90 },
    { field: 'blocks', headerName: 'BPG', width: 90 },
    { field: 'turnovers', headerName: 'ToPG', width: 90 },
    { field: 'fouls', headerName: 'FPG', width: 90 },
    { field: 'field_goals', headerName: 'FGMpg', width: 90 },
    { field: 'three_pointers', headerName: '3PMpg', width: 90 },
    { field: 'free_throws', headerName: 'FTMpg', width: 90 }
];

export const ShootingYearColumns = [
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    {field: 'olympic_year', headerName: 'Olympic Year', width: 90},
    { field: 'games', headerName: 'Games', width: 90 },
    { field: 'field_goals', headerName: 'FGM', width: 90 },
    { field: 'field_goals_attempted', headerName: 'FGA', width: 90 },
    { field: 'field_goal_percentage', headerName: 'FG %', width: 90 },
    { field: 'three_pointers', headerName: '3PM', width: 90 },
    { field: 'three_pointers_attempted', headerName: '3PA', width: 90 },
    { field: 'three_point_percentage', headerName: '3pFG %', width: 90 },
    { field: 'free_throws', headerName: 'FTM', width: 90 },
    { field: 'free_throws_attempted', headerName: 'FTA', width: 90 },
    { field: 'free_throw_percentage', headerName: 'FT %', width: 90 }
];

export const ShootingYearAvgColumns = [
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    {field: 'olympic_year', headerName: 'Olympic Year', width: 90},
    { field: 'games', headerName: 'Games', width: 90 },
    { field: 'field_goals', headerName: 'FGMpg', width: 90 },
    { field: 'field_goals_attempted', headerName: 'FGApg', width: 90 },
    { field: 'field_goal_percentage', headerName: 'FG %', width: 90 },
    { field: 'three_pointers', headerName: '3PMpg', width: 90 },
    { field: 'three_pointers_attempted', headerName: '3PApg', width: 90 },
    { field: 'three_point_percentage', headerName: '3pFG %', width: 90 },
    { field: 'free_throws', headerName: 'FTMpg', width: 90 },
    { field: 'free_throws_attempted', headerName: 'FTApg', width: 90 },
    { field: 'free_throw_percentage', headerName: 'FT %', width: 90 }
];

export const AdvancedYearColumns = [
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    {field: 'olympic_year', headerName: 'Olympic Year', width: 90},
    { field: 'games', headerName: 'Games', width: 90 },
    {field: 'avg_game_score', headerName: 'Avg Game Score', width: 90},
    {field: 'effective_field_goal_percentage', headerName: 'eFG %', width: 90},
    {field: 'true_shooting_percentage', headerName: 'TS %', width: 90},
    { field: 'field_goals', headerName: 'FGM', width: 90 },
    { field: 'field_goals_attempted', headerName: 'FGA', width: 90 },
    { field: 'field_goal_percentage', headerName: 'FG %', width: 90 },
    { field: 'three_pointers', headerName: '3PM', width: 90 },
    { field: 'three_pointers_attempted', headerName: '3PA', width: 90 },
    { field: 'three_point_percentage', headerName: '3pFG %', width: 90 },
    { field: 'free_throws', headerName: 'FTM', width: 90 },
    { field: 'free_throws_attempted', headerName: 'FTA', width: 90 },
    { field: 'free_throw_percentage', headerName: 'FT %', width: 90 }

];
export const AdvancedYearAvgColumns = [
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    {field: 'olympic_year', headerName: 'Olympic Year', width: 90},
    { field: 'games', headerName: 'Games', width: 90 },
    {field: 'avg_game_score', headerName: 'Avg Game Score', width: 90},
    {field: 'effective_field_goal_percentage', headerName: 'eFG %', width: 90},
    {field: 'true_shooting_percentage', headerName: 'TS %', width: 90},
    { field: 'field_goals_attempted', headerName: 'FGApg', width: 90 },
    { field: 'field_goal_percentage', headerName: 'FG %', width: 90 },
    { field: 'three_pointers', headerName: '3PMpg', width: 90 },
    { field: 'three_pointers_attempted', headerName: '3PApg', width: 90 },
    { field: 'three_point_percentage', headerName: '3pFG %', width: 90 },
    { field: 'free_throws', headerName: 'FTMpg', width: 90 },
    { field: 'free_throws_attempted', headerName: 'FTApg', width: 90 },
    { field: 'free_throw_percentage', headerName: 'FT %', width: 90 }
    
];

export const BasicGameColumns = [
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    {field: 'date', headerName: 'Date', width: 90},
    {field: 'olympic_year', headerName: 'Olympic Year', width: 90},
    { field: 'opponent', headerName: 'Opponent', width: 90 },
    { field: 'minutes', headerName: 'Min', width: 90 },
    { field: 'points', headerName: 'Pts', width: 70 },
    { field: 'rebounds', headerName: 'Rebs', width: 70 },
    { field: 'assists', headerName: 'Asts', width: 70 },
    { field: 'steals', headerName: 'Stls', width: 70 },
    { field: 'blocks', headerName: 'Blks', width: 70 },
    { field: 'turnovers', headerName: 'TOs', width: 70 },
    { field: 'fouls', headerName: 'Fls', width: 70 },
    { field: 'field_goals', headerName: 'Field Goals', width: 90 },
    { field: 'three_pointers', headerName: '3 Pointers', width: 90 },
    { field: 'free_throws', headerName: 'Free Throws', width: 90 }
];
export const ShootingGameColumns = [
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    {field: 'date', headerName: 'Date', width: 90},
    {field: 'olympic_year', headerName: 'Olympic Year', width: 90},
    { field: 'opponent', headerName: 'Opponent', width: 90 },
    { field: 'minutes', headerName: 'Min', width: 90 },
    { field: 'field_goals', headerName: 'FGM', width: 90 },
    { field: 'field_goals_attempted', headerName: 'FGA', width: 90 },
    { field: 'field_goal_percentage', headerName: 'FG %', width: 90 },
    { field: 'three_pointers', headerName: '3PM', width: 90 },
    { field: 'three_pointers_attempted', headerName: '3PA', width: 90 },
    { field: 'three_point_percentage', headerName: '3pFG %', width: 90 },
    { field: 'free_throws', headerName: 'FTM', width: 90 },
    { field: 'free_throws_attempted', headerName: 'FTA', width: 90 },
    { field: 'free_throw_percentage', headerName: 'FT %', width: 90 }
];

export const AdvancedGameColumns = [
    { field: 'player', headerName: 'Player', width: 170 },
    { field: 'country', headerName: 'Country', width: 110 },
    {field: 'date', headerName: 'Date', width: 90},
    {field: 'olympic_year', headerName: 'Olympic Year', width: 90},
    { field: 'opponent', headerName: 'Opponent', width: 90 },
    {field: 'game_score', headerName: 'Game Score', width: 90},
    {field: 'effective_field_goal_percentage', headerName: 'eFG %', width: 90},
    {field: 'true_shooting_percentage', headerName: 'TS %', width: 90},
    { field: 'field_goals', headerName: 'FGM', width: 90 },
    { field: 'field_goals_attempted', headerName: 'FGA', width: 90 },
    { field: 'field_goal_percentage', headerName: 'FG %', width: 90 },
    { field: 'three_pointers', headerName: '3PM', width: 90 },
    { field: 'three_pointers_attempted', headerName: '3PA', width: 90 },
    { field: 'three_point_percentage', headerName: '3pFG %', width: 90 },
    { field: 'free_throws', headerName: 'FTM', width: 90 },
    { field: 'free_throws_attempted', headerName: 'FTA', width: 90 },
    { field: 'free_throw_percentage', headerName: 'FT %', width: 90 }
];