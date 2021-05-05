# from werkzeug.security import generate_password_hash
from app.models import db, User, user_category, Category, video_category, Video
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users_videos_categories():
    # First the Categories (note users and videos will not have the ability
    # to create categories so what is defined here is all there will be)
    gaming = Category(genre="Gaming")
    dancing = Category(genre="Dancing")
    cooking = Category(genre="Cooking")
    comedy = Category(genre="Comedy")
    science = Category(genre="Science")
    advice = Category(genre="Advice")
    sports = Category(genre="Sports")
    crypto = Category(genre="Crypto")

    db.session.add(gaming)
    db.session.add(dancing)
    db.session.add(cooking)
    db.session.add(comedy)
    db.session.add(science)
    db.session.add(advice)
    db.session.add(sports)
    db.session.add(crypto)

    # Second the User
    demo = User(username='Demo', email='demo@aa.io', password='password', firstName='Demo', lastName='User', about='I am a demo user',
                profile_image='https://bellfund.ca/wp-content/uploads/2018/03/demo-user.jpg', created_at=datetime.now())
    jairo = User(username='JairoCal', email='jairo@gmail.com', password='password', firstName='Jairo', lastName='Calderon', about='Just another user',
                 profile_image='https://avatarfiles.alphacoders.com/128/thumb-128984.png', created_at=datetime.now())

    # Third append Users to Categories and commit
    demo.categories.append(gaming)
    jairo.categories.append(gaming)
    jairo.categories.append(comedy)
    jairo.categories.append(crypto)
    jairo.categories.append(sports)
    jairo.categories.append(science)

    db.session.add(demo)
    db.session.add(jairo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users_videos_categories():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE videos RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE video_category RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE user_category RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
