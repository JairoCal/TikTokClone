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


# Query for all of the videos created by the people the current user follows
@follows_routes.route('/<user_id>/users/videos')
def following_videos(user_id):
    # list that will hold all the dictionaries for videos (final result)
    following_list_videos = []
    # list that will hold all of the uploader_id for who the current user follows
    following_list = []
    following = Follow.query.filter(Follow.follower_id == user_id).all()
    for follow in following:
        following_list.append(follow.to_dict()['uploader_id'])

    for uploader_id in following_list:
        videos_obj = Video.query.filter(Video.user_id == uploader_id).all()
        videos = [video.to_dict() for video in videos_obj]
        for video in videos:
            following_list_videos.append(video)
    return {"following_videos": following_list_videos}
