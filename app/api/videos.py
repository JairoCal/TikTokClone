from flask import Blueprint, jsonify, request
from app.models import Video, User, Follow, Category, video_category, user_category

video_routes = Blueprint('videos', __name__)


# Queries for all videos in the datbase (works)
@video_routes.route('/')
def all_videos():
    videos = Video.query.all()
    return {"videos": [video.to_dict() for video in videos]}


# Query for all videos created by a specific user (works)
@video_routes.route('/user/<user_id>')
def user_videos(user_id):
    videos = Video.query.filter(Video.user_id == user_id).all()
    return {"videos": [video.to_dict() for video in videos]}
