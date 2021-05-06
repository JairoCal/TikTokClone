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
        print(category, "this is a category in the categories list */****************************")
        add_category = Category.query.filter(Category.id == category[0]).first()