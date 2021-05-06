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
    demo2 = User(username='Demo2', email='demo2@gmail.com', password='password', firstName='Demo2', lastName='User2', about='Just another user',
                 profile_image='https://avatarfiles.alphacoders.com/128/thumb-128984.png', created_at=datetime.now())
    demo3 = User(username='demo3Cal', email='demo3@gmail.com', password='password', firstName='demo3', lastName='User3', about='Just another user',
                 profile_image='https://avatarfiles.alphacoders.com/128/thumb-128984.png', created_at=datetime.now())

    # Third append Users to Categories and commit
    demo.categories.append(gaming)
    jairo.categories.append(gaming)
    jairo.categories.append(comedy)
    jairo.categories.append(crypto)
    jairo.categories.append(sports)
    jairo.categories.append(science)
    demo2.categories.append(science)

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(jairo)

    # ------------------Videos----------------------------------
    hp_trailer = Video(user_id=2, title='Hogwarts Legacy Trailer',
                       description='Experience a new story set at #Hogwarts​ in the 1800s. Your character is a student who holds the key to an ancient secret that threatens to tear the wizarding world apart. Make allies, battle Dark wizards and decide the fate of the wizarding world.', video_url='https://www.youtube.com/watch?v=1O6Qstncpnc&t=5s', created_at=datetime.now())
    same_trailer = Video(user_id=3, title='Hogwarts Legacy Trailer', description='Experience a new story set at #Hogwarts​ in the 1800s. Your character is a student who holds the key to an ancient secret that threatens to tear the wizarding world apart. Make allies, battle Dark wizards and decide the fate of the wizarding world.', video_url='https://www.youtube.com/watch?v=1O6Qstncpnc&t=5s', created_at=datetime.now())
    hp_trailer.categories_video.append(gaming)
    same_trailer.categories_video.append(gaming)

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
