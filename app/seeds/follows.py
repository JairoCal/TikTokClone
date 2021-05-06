from app.models import db, Follow


def seed_follows():
    follows1 = Follow(follower_id=1, uploader_id=2,)
    follows2 = Follow(follower_id=1, uploader_id=3,)

    db.session.add(follows1)
    db.session.add(follows2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()
