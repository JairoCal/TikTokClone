from flask import Blueprint, jsonify, request
from app.models import db, Video, User, Category, video_category, user_category

category_routes = Blueprint('categories', __name__)


# Query for all of the categories the user likes
@category_routes.route('/<user_id>')
def user_categories(user_id):
    categories = db.session.query(user_category).filter(
        user_category.c.user_id == user_id).all()
    categories_list = []
    for category in categories:
        # each category returns a tuple so must refer to an index when querying
        add_category = Category.query.filter(
            Category.id == category[0]).first()
        categories_list.append(add_category)
    return {"user_categories": [category.to_dict() for category in categories_list]}


# Query for all the videos with relation to the categories that the user
# logged in user follows
@category_routes.route('/videos/user/<user_id>')
def category_videos(user_id):
    # will hold a list with all the IDs of the categories the user follows [2,5..]
    category_id_list = []
    category_videos_list = []
    user = User.query.filter(User.id == user_id).first()
    # At this point we have an object with an array inside full of objects
    # for each category the user follows
    categories = {"categories": user.to_dict()["categories"]}
    # {"categories": [{info},{info},{info}...]}
    for category in categories["categories"]:
        category_id_list.append(category["id"])
    all_videos = Video.query.all()
    all_videos_obj = {"all_videos": [video.to_dict() for video in all_videos]}
    # we have access to each videos individual object (that holds everything)
    for video in all_videos_obj["all_videos"]:
        for category in video["categories"]:
            category_id = category["id"]
            # if each video has a category_id that matches one of the videos
            # the user follows from the category_id_list then we add that video
            # to list of videos that we will render
            if category_id in category_id_list:
                category_videos_list.append(video)
    return {"category_videos": category_videos_list}


# grab all categories
@category_routes.route('/all')
def all_categories():
    categories = Category.query.all()
    return {"categories": [category.to_dict() for category in categories]}


# Adding a video to a category
@category_routes.route('/video/follow/category', methods=['POST'])
def video_category():
    categories_list = request.json['categories']
    video_id = request.json['video_id']
    video = Video.query.filter(Video.id == video_id).first()
    for category in categories_list:
        category_obj = Category.query.filter(Category.id == category).first()
        video.categories_video.append(category_obj)
        db.session.commit()
    return {}


# Adding a user to a category
@category_routes.route('/user/follow/category', methods=['POST'])
def user_category():
    categories_list = request.json['categories']
    user_id = request.json['user_id']
    user = User.query.filter(User.id == user_id).first()
    for category in categories_list:
        category_obj = Category.query.filter(Category.id == category).first()
        user.categories.append(category_obj)
        db.session.commit()
    return {}
