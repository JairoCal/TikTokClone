from .db import db

# ----------------------Joint Table (VideoCategory)------------------------
video_category = db.Table(
  'video_category',
  db.Column("video_id", db.Integer, db.ForeignKey('videos.id'), nullable=False
  ),
  db.Column(
    "category_id", db.Integer, db.ForeignKey('categories.id'), nullable = False
  )
)

#------------------------ Video Class Table ---------------------------
class Video(db.Model):
  __tablename__ = 'videos'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
  title = db.Column(db.String(100), nullable = False)
  description = db.Column(db.String(255), nullable = False)
  video_url = db.Column(db.String(500), nullable = False)
  created_at = db.Column(db.Date)

  # Relations
  # category relation
  category__link = db.relationship('Category', back_populates='video_link')
  categories_video = db.relationship('Category',secondary=video_category, back_populates='users_video', lazy='dynamic')
  

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "title": self.title,
      "description": self.description,
      "video_url": self.video_url,
    }

