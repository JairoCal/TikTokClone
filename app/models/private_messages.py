from .db import db


class PrivateMessage(db.Model):
    __tablename__ = 'private_messages'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    messages = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime)

    # since the table references the same foreign key twice we must specify what exactly we are
    # referencing to fix the error as shown below
    # backref allows us to avoid creating the relationship on the the other table as well (cutting the work in half)
    sender = db.relationship(
        'User', backref="sender_person", foreign_keys=[sender_id])
    receiver = db.relationship(
        'User', backref="receiver_person", foreign_keys=[receiver_id])

    def to_dict(self):
        return {
            'id': self.id,
            'messages': self.messages,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'created_at': self.created_at
        }
