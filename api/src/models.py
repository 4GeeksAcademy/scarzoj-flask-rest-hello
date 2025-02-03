from flask_sqlalchemy import SQLAlchemy
from dataclasses import asdict, dataclass
from sqlalchemy import ForeignKey
db = SQLAlchemy()
from enum import Enum

@dataclass
class User(db.Model):
    __tablename__ = 'user'
    id:int = db.Column(db.Integer, primary_key=True, nullable = False)
    user_name:str = db.Column(db.String(50), nullable = False)
    password:str = db.Column(db.String(50), nullable = False)
    email:str = db.Column(db.String(50), nullable = False)
    def __repr__(self):
        return '<User %r>' % self.user_name

class FavoriteTypeEnum(str, Enum):
    character= "character"
    planet= "planet"
    starship= "starship"

@dataclass
class Favourite(db.Model):
    __tablename__ = 'favourite'
    id = db.Column(db.Integer, primary_key=True, nullable = False)
    external_id:int = db.Column(db.Integer, nullable = False)
    type:str = db.Column(db.Enum(FavoriteTypeEnum), nullable = False)
    name:str = db.Column(db.String(50), nullable = False)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable = False)

    def __repr__(self):
        return '<Favourite %r>' % self.name


@dataclass
class Character(db.Model):
    __tablename__ = 'character'
    id:int = db.Column(db.Integer, primary_key=True, nullable = False)
    name:str = db.Column(db.String(50), nullable=False)
    height:int = db.Column(db.Integer, nullable=False)
    home_world:str = db.Column(db.Integer,ForeignKey('planet.id'), nullable = False)
    mass:int= db.Column(db.Integer, nullable = False)
    def __repr__(self):
        return self.name

@dataclass
class Starship(db.Model):
    _tablename_= 'starship'
    id:int = db.Column(db.Integer, primary_key=True, nullable = False)
    name:str = db.Column(db.String(50), nullable=False)
    cost_in_credits:int = db.Column(db.Integer, primary_key=True)
    crew:str = db.Column(db.String(5000), nullable=False)
    passengers:str = db.Column(db.String(5000), nullable=False)
    def __repr__(self):
        return self.name

@dataclass
class Planet(db.Model):
    _tablename_ = 'planet'
    id:int = db.Column(db.Integer, primary_key=True, nullable = False)
    name:str = db.Column(db.String(50), nullable=False)
    diameter:int  = db.Column(db.Integer, primary_key=False)
    population:int  = db.Column(db.Integer, primary_key=False)
    def __repr__(self):
        return self.name