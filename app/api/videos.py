from flask import Blueprint, jsonify, request
from app.forms import VideoForm
from app.models import db, User, Follow, Category, video_category, user_category, Video
from app.aws_upload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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


# Upload video route (form submission)
@video_routes.route('/uploadvideo/user/<user_id>', methods=['POST'])
def upload_video(user_id):
    form = VideoForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    if form.is_submitted():
        if ("video" in request.files):
            video = request.files["video"]
            video.filename = get_unique_filename(video.filename)
            upload = upload_file_to_s3(video)
            print(upload["url"], "What video url are ****************")
            if 'url' in upload:
                url = upload["url"]
            else:
                url = upload['errors']
        else:
            url = ""
        video = Video(
            user_id=form.data["user_id"],
            title=form.data["title"],
            description=form.data["description"],
            video_url=url,
            created_at=form.data["created_at"]
        )
        db.session.add(video)
        db.session.commit()
        return video.to_dict()
    return "did not go through", 401
