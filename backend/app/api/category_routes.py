from flask import Blueprint, jsonify, session, request
from app.models import Category, db

category_routes = Blueprint('category', __name__)


@category_routes.route("/<int:id>", methods=["GET"])
def category_by_id(id):
    category = Category.query.get(id)
    if category:
        return jsonify(category.to_dict()), 200
    else:
        return jsonify({"Message":"This category does not exist"}), 404


@category_routes.route("/", methods=["GET"])
def category_home():
    categories = Category.query.all()

    return {"Categories": [item.to_dict() for item in categories]}

