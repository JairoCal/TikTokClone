from app.models import db, PrivateMessage


def seed_private_messages():
    private_message1 = PrivateMessage(sender_id=1, receiver_id=1, messages="this is a test message1")
    private_message2 = PrivateMessage(sender_id=2, receiver_id=3, messages="this is a test message2")
    private_message3 = PrivateMessage(sender_id=2, receiver_id=1, messages="this is a test message3")
    private_message4 = PrivateMessage(sender_id=2, receiver_id=4, messages="this is a test message4")
    private_message5 = PrivateMessage(sender_id=4, receiver_id=1, messages="this is a test message5")
    private_message6 = PrivateMessage(sender_id=4, receiver_id=2, messages="this is a test message6")
    private_message7 = PrivateMessage(sender_id=1, receiver_id=4, messages="this is a test message7")

    db.session.add(private_message1)
    db.session.add(private_message2)
    db.session.add(private_message3)
    db.session.add(private_message4)
    db.session.add(private_message5)
    db.session.add(private_message6)
    db.session.add(private_message7)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_private_messages():
    db.session.execute('TRUNCATE private_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
