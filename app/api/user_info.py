from flask import Blueprint, jsonify
from app.models import User

user_info_routes = Blueprint('users_info', __name__)


@user_info_routes.route('/<user_id>')
def user(user_id):
    user = User.query.filter(User.id == user_id).first()
    return user.to_dict()
