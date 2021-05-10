from app.models import db, Comment
from datetime import datetime


def seed_comments():
    comment1 = Comment(
        video_id=1, user_id=1, message="Looks like a great game!", created_at=datetime.now())
    comment2 = Comment(
        video_id=1, user_id=2, message="Wow!", created_at=datetime.now())

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
