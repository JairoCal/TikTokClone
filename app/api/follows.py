from flask import Blueprint, jsonify, request
from app.models import Video, User, Follow, Category, video_category, user_category

follows_routes = Blueprint('follows', __name__)


# Queries for people the logged in user follows (working)
@follows_routes.route('/<user_id>')
def following(user_id):
    following_list_ids = []
    following_list = []
    # check the Follow table for all situations where
    # the logged in user is a follower
    follows = Follow.query.filter(Follow.follower_id == user_id).all()
    for follow in follows:
        following_list_ids.append(follow.to_dict()["uploader_id"])
    for uploader_id in following_list_ids:
        user_obj = User.query.filter(User.id == uploader_id).all()
        users = [user.to_dict() for user in user_obj]
        for user in users:
            following_list.append(user)
    return {"follows": following_list}


# Query for all of the videos created by the people the current user follows
@follows_routes.route('/<user_id>/users/videos')
def following_videos(user_id):
    # list that will hold all the dictionaries for videos (final result)
    following_list_videos = []
    # list that will hold all of the uploader_id for who the current user follows [2,4,7]
    following_list = []
    following = Follow.query.filter(Follow.follower_id == user_id).all()
    for follow in following:
        # without the key-in {'id': 1, 'follower_id': 1, 'uploader_id': 2}
        following_list.append(follow.to_dict()['uploader_id'])
        # with the key-in [2]
    for uploader_id in following_list:
        videos_obj = Video.query.filter(Video.user_id == uploader_id).all()
        # will be converted to [{},{},{}..]
        videos = [video.to_dict() for video in videos_obj]
        # so we go through the list each time and pass each dict to a list that will hold it all
        for video in videos:
            following_list_videos.append(video)
    return {"following_videos": following_list_videos}
