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
    
@story_routes.route("<int:id>", methods=["PUT"])
@login_required
def update_stories(id):
    try:
        story = Story.query.get(id)
        if story:
            request_body = request.json
            title = request_body.get("title")
            content = request_body.get("content")
            if int(story.user_id) == int(session["_user_id"]):
                story.title = title
                story.content = content
                story.updated_at = datetime.now()
                db.session.commit()
                check_story = Story.query.get(id)
                return jsonify(check_story.to_dict())
        else:
            return jsonify({"Message":"This story does not exist."})

                
                
    except BaseException as err:
        return handle_error(err)
    
@story_routes.route("<int:id>", methods=["DELETE"])
@login_required
def delete_story(id):
    try:
        story = Story.query.get(id)
        if story:
            user_id = int(story.user_id)
            session_id = int(session["_user_id"])
            if user_id == session_id:
                Story.query.filter_by(id=id).delete()
                db.session.commit()
                return jsonify({"Message":"Success", "Status":"200"}),200
            else:
                return jsonify({"Message": "Unauthorized User", "status": "403"}), 403
        else:
            return jsonify({"Message":"Story could not be found.", "status": "404"}), 404

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

