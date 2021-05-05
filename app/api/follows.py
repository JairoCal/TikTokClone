from flask import Blueprint, jsonify, request
from app.models import Video, User, Follow, Category, video_category, user_category

follows_routes = Blueprint('follows', __name__)


# Queries for people the logged in user follows (working)
@follows_routes.route('/<user_id>')
def following(user_id):
    # check the Follow table for all situations where
    # the logged in user is a follower
    follows = Follow.query.filter(Follow.follower_id == user_id).all()
    return {"follows": [follow.to_dict() for follow in follows]}

