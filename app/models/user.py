from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# ----------------------Joint Table (UserCategory)------------------------
user_category = db.Table(
    'user_category',
    db.Column("category_id", db.Integer, db.ForeignKey('users.id'), nullable=False
              ),
    db.Column(
        "server_id", db.Integer, db.ForeignKey('categories.id'), nullable=False
    )
)

# ------------------------ User Class Table ---------------------------


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
    category_link = db.relationship('Category', back_populates='user_link')
    categories = db.relationship(
        'Category', secondary=user_category, back_populates='users', lazy='dynamic')

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
            "about": self.about
        }

# ----------------------Category Class Table -----------------------------


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    # we only want each genre definedonce
    genre = db.Column(db.String(255), nullable=False, unique=True)

    # Relations
    # User relation
    user_link = db.relationship('User', back_populates='category_link')
    users = db.relationship('User', secondary=user_category,
                            back_populates='categories', lazy='dynamic')
    # Video relation
    # video_link = db.relationship('Video', back_populates='category_link')
    # users_video = db.relationship('Video', secondary=video_category, back_populates='categories_video')

    def to_dict(self):
        return {
            "id": self.id,
            "genre": self.genre
        }
