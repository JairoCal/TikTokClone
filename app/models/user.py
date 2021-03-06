from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# ----------------------Joint Table (UserCategory)------------------------
user_category = db.Table(
    'user_category',
    db.Column("category_id", db.Integer, db.ForeignKey('categories.id'), nullable=False
              ),
    db.Column(
        "user_id", db.Integer, db.ForeignKey('users.id'), nullable=False
    )
)

# ----------------------Joint Table (VideoCategory)------------------------
video_category = db.Table(
    'video_category',
    db.Column("video_id", db.Integer, db.ForeignKey('videos.id'), nullable=False
              ),
    db.Column(
        "category_id", db.Integer, db.ForeignKey('categories.id'), nullable=False
    )
)

# ------------------------ User Class Table -------------------------------


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    firstName = db.Column(db.String(255), nullable=False)
    lastName = db.Column(db.String(255), nullable=False)
    about = db.Column(db.String(255))
    profile_image = db.Column(db.String(500))
    created_at = db.Column(db.Date)

    # relations
    # Video relation
    videos = db.relationship('Video', back_populates='users')
    # Category relation
    categories = db.relationship(
        'Category', secondary=user_category, back_populates='users', lazy='dynamic')
    # Comment relation
    comment_user = db.relationship(
        'Comment', back_populates='users_comment')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "profile_image": self.profile_image,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "about": self.about,
            "categories": [category.to_dict() for category in self.categories],
        }

# ----------------------Category Class Table -----------------------------


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    genre = db.Column(db.String(255), nullable=False, unique=True)

    # Relations
    # User relation
    users = db.relationship('User', secondary=user_category,
                            back_populates='categories', lazy='dynamic')
    # Video relation
    # video_link = db.relationship('Video', back_populates='category_link')
    users_video = db.relationship(
        'Video', secondary=video_category, back_populates='categories_video', lazy='dynamic')

    def to_dict(self):
        return {
            "id": self.id,
            "genre": self.genre
        }

# ------------------------ Video Class Table ---------------------------


class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    video_url = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.Date)
    # Relations
    # User relation
    users = db.relationship('User', back_populates='videos')
    # Category relation
    categories_video = db.relationship(
        'Category', secondary=video_category, back_populates='users_video', lazy='dynamic')
    # comments relation
    comment_video = db.relationship('Comment', back_populates='video_comment')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "video_url": self.video_url,
            "categories": [category.to_dict() for category in self.categories_video],
            "comments": [comment.to_dict() for comment in self.comment_video],
            "user": [self.users.to_dict()]
        }
