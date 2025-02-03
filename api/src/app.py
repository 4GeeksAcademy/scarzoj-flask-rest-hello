import os
from flask import Flask, request, jsonify, url_for
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from utils import APIException, generate_sitemap
from admin import setup_admin
from models import db, User, Favourite, Planet, Character

app = Flask(__name__)
app.url_map.strict_slashes = False

db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db)
db.init_app(app)
CORS(app)
setup_admin(app)

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@app.route('/')
def sitemap():
    return generate_sitemap(app)

@app.route("/characters", methods=["GET"])
def get_characters():
    characters = Character.query.all()
    return jsonify(characters), 200

@app.route("/characters/<int:people_id>", methods=["GET"])
def get_character(people_id):
    character = Character.query.get(people_id)
    return jsonify(character) if character else (jsonify({"error": "Character not found"}), 404)

@app.route("/planets", methods=["GET"])
def get_planets():
    planets = Planet.query.all()
    return jsonify(planets), 200

@app.route("/planets/<int:planet_id>", methods=["GET"])
def get_planet(planet_id):
    planet = Planet.query.get(planet_id)
    return jsonify(planet) if planet else (jsonify({"error": "Planet not found"}), 404)

@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify(users), 200

@app.route("/favorites", methods=["GET"])
def get_favorites():
    user_id = 1
    favorites = Favourite.query.filter_by(user_id=user_id).all()
    return jsonify(favorites), 200

@app.route("/favorites", methods=["POST"])
def add_favorite():
    data = request.get_json(force=True)
    required_fields = {"type", "external_id", "name"}
    
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    user_id = 1

    a = {
        "external_id": 1,
        "type": "character",
        "name": "whaet",
    }

    new_fav = Favourite(
        external_id=data["external_id"],
        type=data["type"],
        name=data["name"],
        user_id=user_id,
    )
    db.session.add(new_fav)
    db.session.commit()

    return jsonify(new_fav), 201

@app.route("/favorites", methods=["DELETE"])
def delete_favorite():
    data = request.get_json(force=True)
    
    if not data or "type" not in data or "external_id" not in data:
        return jsonify({"error": "Missing required fields"}), 400

    user_id = 1

    favorite = Favourite.query.filter_by(
        external_id=data["external_id"], type=data["type"], user_id=user_id
    ).first()

    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404

    db.session.delete(favorite)
    db.session.commit()
    
    return jsonify({"message": "Favorite deleted successfully"}), 200

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=PORT, debug=False)
