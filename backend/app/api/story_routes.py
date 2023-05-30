from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from datetime import datetime
from app.models import Story,Category, db
from ..models.utils import (
    BaseException,
    ValidationException,
    NotFoundException,
    ForbiddenException,
    handle_error,
)

story_routes = Blueprint('story', __name__)

@story_routes.route("/<int:id>", methods=["GET"])
def story_by_id(id):
    try:
        story = Story.query.get(id)
        if story:
            return jsonify(story.to_dict()),200
        else: return jsonify({"Message": "This story does not exist."})
    except BaseException as err:
        return handle_error(err)

@story_routes.route("/", methods=["POST"])
@login_required
def story_add():
    try:
        request_body = request.json
        id = request_body.get("id")
        category = Category.query.get(id)
        if category:
            story = Story(
                title = request_body.get("title"),
                content = request_body.get("content"),
                created_at = datetime.now(),
                updated_at = datetime.now(),
                user_id = int(session["_user_id"]),
                category_id = category.id
            )
            db.session.add(story)
            db.session.commit()
            return story.to_dict(), 200
        else:
            return jsonify({"Message":"This category does not exist."})
    except BaseException as err:
        return handle_error(err)

@story_routes.route("/", methods=["GET"])
def story_all():
    try:
        stories = Story.query.all()
        print(stories)
        return { "Stories":[item.to_dict() for item in stories]}
    except BaseException as err:
        return handle_error(err)

