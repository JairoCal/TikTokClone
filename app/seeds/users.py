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
    demo.categories.append(comedy)
    demo.categories.append(crypto)
    demo.categories.append(sports)
    demo.categories.append(science)
    demo2.categories.append(comedy)
    demo2.categories.append(crypto)
    demo2.categories.append(sports)
    demo2.categories.append(science)
    demo2.categories.append(science)
    demo3.categories.append(comedy)
    demo3.categories.append(crypto)
    demo3.categories.append(sports)
    demo3.categories.append(science)
    demo3.categories.append(science)

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
    trailer_2 = Video(user_id=1, title='Upgrade Stroller', description='Upgraded sisters stroller',
                     video_url='https://tiktokclonejairo.s3.amazonaws.com/ec0b9e3fb730437cb0d3d85b278732f3.mp4', created_at=datetime.now())
    trailer_3 = Video(user_id=1, title='Substitute Teacher', description='Small skit from comedy central (do not own the rights)',
                     video_url='https://tiktokclonejairo.s3.amazonaws.com/dd9ebb37edc64550a38f5cd385da79b7.mp4', created_at=datetime.now())

    trailer1 = Video(user_id=3, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                     video_url='https://tiktokclonejairo.s3.amazonaws.com/ca7a9c362a184601b313184007420d15.mp4', created_at=datetime.now())
    trailer2 = Video(user_id=2, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                     video_url='https://tiktokclonejairo.s3.amazonaws.com/14c635c302cd4135b7fefc6d32898601.mp4', created_at=datetime.now())
    trailer3 = Video(user_id=1, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                     video_url='https://tiktokclonejairo.s3.amazonaws.com/da60db231ba34a47b90a06dccfeb9c24.mp4', created_at=datetime.now())
    trailer4 = Video(user_id=2, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                     video_url='https://tiktokclonejairo.s3.amazonaws.com/a4a5a3d634cd42f288ea923a5945c264.mp4', created_at=datetime.now())
    trailer5 = Video(user_id=2, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                     video_url='https://tiktokclonejairo.s3.amazonaws.com/d986f461f0884175bb5b3c469f96c2bc.mp4', created_at=datetime.now())
    trailer6 = Video(user_id=3, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                     video_url='https://tiktokclonejairo.s3.amazonaws.com/4b7c9e627672466fabc50324c8f690a2.mp4', created_at=datetime.now())
    trailer7 = Video(user_id=2, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                     video_url='https://tiktokclonejairo.s3.amazonaws.com/5c3851131e1344328e46d93793cdcf0e.mp4', created_at=datetime.now())
    trailer8 = Video(user_id=4, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                     video_url='https://tiktokclonejairo.s3.amazonaws.com/d87b2717df0843cdb26c5f17122c5a78.mp4', created_at=datetime.now())
    trailer9 = Video(user_id=5, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                     video_url='https://tiktokclonejairo.s3.amazonaws.com/286b9bced69b4954bcf2f2c2a5a33378.mp4', created_at=datetime.now())
    trailer10 = Video(user_id=2, title=fake.paragraph(nb_sentences=random.randint(1,1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                     video_url='https://tiktokclonejairo.s3.amazonaws.com/03860bb9cfc341b39bd83e2579ee7496.mp4', created_at=datetime.now())
    trailer11 = Video(user_id=3, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/bd36a78c359f4a7e9fc925cd64c8dc5b.mp4', created_at=datetime.now())
    trailer12 = Video(user_id=2, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/42b5371af56149ef9c5b87e42ac06192.mp4', created_at=datetime.now())
    trailer13 = Video(user_id=1, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/84d3e656849f455280a14ed1c966a442.mp4', created_at=datetime.now())
    trailer14 = Video(user_id=1, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/506a0bd55d79470ea70cf01ac91477d0.mp4', created_at=datetime.now())
    trailer15 = Video(user_id=2, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/f8c53a19288448209c1b1ea612fa3a8b.mp4', created_at=datetime.now())
    trailer16 = Video(user_id=2, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/c7c52b4f6ba341c08c46a4d10949f07e.mp4', created_at=datetime.now())
    trailer17 = Video(user_id=6, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/8eeed8188fac4e4b84d529583ef3434e.mp4', created_at=datetime.now())
    trailer18 = Video(user_id=7, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/11d9ceb9eb584e72ba0cecef9d540654.mp4', created_at=datetime.now())
    trailer19 = Video(user_id=3, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/a8d9be88d1a745468fa2e20b96ec867b.mp4', created_at=datetime.now())
    trailer20 = Video(user_id=1, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/d860411a0e044deab3b4a0e047f02ac3.mp4', created_at=datetime.now())
    trailer21 = Video(user_id=2, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/98063356779c4002911c2453433bcef2.mp4', created_at=datetime.now())
    trailer22 = Video(user_id=2, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/4b71567f00b3476da1727e784594fd3d.mp4', created_at=datetime.now())
    trailer23 = Video(user_id=3, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/e2e87f5768984c30bbf5308a8c8d87e0.mp4', created_at=datetime.now())
    trailer24 = Video(user_id=2, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/f5cc3188e9bb47ca86eb51abe71b0ceb.mp4', created_at=datetime.now())
    trailer25 = Video(user_id=20, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/881474b518c04429a57a7ce4d780f816.mp4', created_at=datetime.now())
    trailer26 = Video(user_id=2, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/70f96a9ed24f4b53a6b49feef893e820.mp4', created_at=datetime.now())
    trailer27 = Video(user_id=25, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/eb35c08cadab40f6a2c12e3913069542.mp4', created_at=datetime.now())
    trailer28 = Video(user_id=2, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/5b7e9fcbb06741b384eb4c4ff655f0ec.mp4', created_at=datetime.now())
    trailer29 = Video(user_id=23, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/0574711e829f4bb0a25788ae94c7d9bc.mp4', created_at=datetime.now())
    trailer30 = Video(user_id=1, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/76088c71694b45eeb689d44aa1f993c9.mp4', created_at=datetime.now())
    trailer31 = Video(user_id=2, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/7eb97ccde5dd4d6590e10c8204902824.mp4', created_at=datetime.now())
    trailer32 = Video(user_id=1, title=fake.paragraph(nb_sentences=random.randint(1, 1)), description=fake.paragraph(nb_sentences=random.randint(2, 3)),
                      video_url='https://tiktokclonejairo.s3.amazonaws.com/ca4c97e0802042d1af1125970b06263a.mp4', created_at=datetime.now())

    trailer.categories_video.append(gaming)
    trailer_2.categories_video.append(comedy)
    trailer_3.categories_video.append(gaming)

    trailer1.categories_video.append(comedy)
    trailer2.categories_video.append(advice)
    trailer3.categories_video.append(cooking)
    trailer4.categories_video.append(sports)
    trailer5.categories_video.append(comedy)
    trailer6.categories_video.append(sports)
    trailer7.categories_video.append(dancing)
    trailer8.categories_video.append(comedy)
    trailer9.categories_video.append(comedy)
    trailer10.categories_video.append(dancing)
    trailer11.categories_video.append(crypto)
    trailer12.categories_video.append(crypto)
    trailer13.categories_video.append(comedy)
    trailer14.categories_video.append(gaming)
    trailer15.categories_video.append(science)
    trailer16.categories_video.append(comedy)
    trailer17.categories_video.append(science)
    trailer18.categories_video.append(sports)
    trailer19.categories_video.append(comedy)
    trailer20.categories_video.append(comedy)
    trailer21.categories_video.append(cooking)
    trailer22.categories_video.append(gaming)
    trailer23.categories_video.append(comedy)
    trailer24.categories_video.append(sports)
    trailer25.categories_video.append(advice)
    trailer26.categories_video.append(cooking)
    trailer27.categories_video.append(cooking)
    trailer28.categories_video.append(science)
    trailer29.categories_video.append(comedy)
    trailer30.categories_video.append(comedy)
    trailer31.categories_video.append(comedy)
    trailer32.categories_video.append(comedy)

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
