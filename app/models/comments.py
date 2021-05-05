from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(
        db.Integer, db.ForeignKey('videos.id'), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime)

    video_comment = db.relationship('Video', back_populates='comment_video')

    def to_dict(self):
        return {
            'id': self.id,
            'video_id': self.video_id,
            'message': self.message
        }
