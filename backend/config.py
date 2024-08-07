from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json
import os
from dotenv import load_dotenv
#get the config file
# with open('config.json', 'r') as config_file:
#     config = json.load(config_file)

load_dotenv()

app = Flask(__name__)
CORS(app)

db_url = f"postgresql://{os.getenv('username')}:{os.getenv('pwd')}@{os.getenv('hostname')}:{os.getenv('port_id')}/{os.getenv('database')}"
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
