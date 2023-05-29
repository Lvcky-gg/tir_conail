from flask import Blueprint, jsonify, session, request
from app.models import Category, db

category_routes = Blueprint('category', __name__)

@category_routes.route("/", methods=["GET"])
def category_home():
    categories = Category.query.all()

    return {"Categories": [item.to_dict() for item in categories]}