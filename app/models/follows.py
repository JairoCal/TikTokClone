from .db import db


class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    uploader_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)

    follower = db.relationship(
        'User', backref="follower_person", foreign_keys=[follower_id])
    uploader = db.relationship(
        'User', backref="uploader_person", foreign_keys=[uploader_id])

    def to_dict(self):
        return {
            'id': self.id,
            'follower_id': self.follower_id,
            'uploader_id': self.uploader_id
        }
