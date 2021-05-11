from flask import Blueprint, request
from app.models import db, Video, Comment
import datetime
comments_routes = Blueprint('comments', __name__)


# Queries for people the logged in user comments (working)
@comments_routes.route('/all/<video_id>')
def following(video_id):
    comments = Video.query.filter(Video.id == video_id).all()
    return {"comments": [comment.to_dict()['comments'] for comment in comments]}


@comments_routes.route('/post', methods=['POST'])
def post_comment():
    video_id = request.json["video_id"]
    user_id = request.json["user_id"]
    message = request.json["message"]
    comment = Comment(
        video_id=video_id,
        user_id=user_id,
        message=message,
        created_at=datetime.datetime.now()
    )
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()
