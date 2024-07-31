from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json

#get the config file
with open('config.json', 'r') as config_file:
    config = json.load(config_file)

app = Flask(__name__)
CORS(app)

db_url = f'postgresql://{config["db_user"]}:{config["db_password"]}@{config["db_host"]}:{config["db_port"]}/{config["db_name"]}'
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
