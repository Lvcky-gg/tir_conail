from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Category, db
from datetime import datetime

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

@category_routes.route("/", methods=["POST"])
@login_required
def category_add():
    request_body = request.json
    name = request_body.get("name")
    
    user_id = int(session["_user_id"])
    print(user_id)
    category = Category(
        name=name,
        user_id=user_id,
        created_at=datetime.now(),
        updated_at=datetime.now(),

    )
    if category:
        db.session.add(category)
        db.session.commit()
        return category.to_dict(), 200
    else:
        return jsonify({"message":"Failed"}), 400