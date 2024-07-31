from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json

#get the config file
with open('config.json', 'r') as config_file:
    config = json.load(config_file)

app = Flask(__name__)
CORS(app)

db_url = f'postgresql://{config["username"]}:{config["pwd"]}@{config["hostname"]}:{config["port_id"]}/{config["database"]}'
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
