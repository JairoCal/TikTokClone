from app.models import db, Comment
from datetime import datetime
from faker import Faker
import random
fake = Faker()


def seed_comments():
    def auto_seed(count):
        for i in range(count):
            video_id = random.randint(1, 35)
            user_id = random.randint(1, 79)
            message = fake.paragraph(nb_sentences=random.randint(2, 4))
            created_at = datetime.now()

            seed_comment = Comment(
                video_id=video_id, user_id=user_id, message=message, created_at=created_at)

            db.session.add(seed_comment)

    auto_seed(250)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
