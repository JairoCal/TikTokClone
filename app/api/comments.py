from flask import Blueprint, jsonify, request
from app.models import Video, User, Comment

comments_routes = Blueprint('comments', __name__)


# Queries for people the logged in user comments (working)
@comments_routes.route('/all/<video_id>')
def following(video_id):
    following_list_ids = []
    following_list = []
    comments = Video.query.filter(Video.id == video_id).all()
    return {"comments": [comment.to_dict()['comments'] for comment in comments]}
