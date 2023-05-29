from flask import Blueprint, jsonify, session, request
from app.models import Story, db

story_routes = Blueprint('story', __name__)