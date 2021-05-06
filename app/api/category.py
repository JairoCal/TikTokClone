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


# Make another query like the one before except we will implement grabbing all of the videos
# that are linked to the return of those categories
