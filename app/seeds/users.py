# from werkzeug.security import generate_password_hash
from app.models import db, User, user_category, Category, video_category, Video
from datetime import datetime
from faker import Faker
import random
fake = Faker()


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

    def auto_seed(count):
        for i in range(count):
            username = fake.user_name()
            email = fake.email()
            password = "password"
            firstName = fake.first_name()
            lastName = fake.last_name()
            about = fake.paragraph(nb_sentences=random.randint(2, 4))
            profile_image = f"https://source.unsplash.com/random?selfie={random.randint(0,500)}/1920x1080"
            created_at = datetime.now()

            seed_user = User(username=username, email=email, password=password, firstName=firstName,
                             lastName=lastName, about=about, profile_image=profile_image, created_at=created_at)

            seed_user.categories.append(gaming)
            seed_user.categories.append(sports)
            seed_user.categories.append(comedy)
            db.session.add(seed_user)

    auto_seed(75)

    # ------------------Videos----------------------------------
    trailer = Video(user_id=3, title='Dancing Dog',
                    description='Happy Dog', video_url='https://tiktokclonejairo.s3.amazonaws.com/c0c9fea8e0cd4d66b1b6875d04970489.mp4', created_at=datetime.now())
    same_trailer = Video(user_id=1, title='Upgrade Stroller', description='Upgraded sisters stroller',
                         video_url='https://tiktokclonejairo.s3.amazonaws.com/ec0b9e3fb730437cb0d3d85b278732f3.mp4', created_at=datetime.now())
    trailer3 = Video(user_id=1, title='Substitute Teacher', description='Small skit from comedy central (do not own the rights)',
                     video_url='https://tiktokclonejairo.s3.amazonaws.com/dd9ebb37edc64550a38f5cd385da79b7.mp4', created_at=datetime.now())

    trailer.categories_video.append(gaming)
    same_trailer.categories_video.append(comedy)
    trailer3.categories_video.append(gaming)

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
