from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, DateField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Video
from datetime import datetime


class VideoForm(FlaskForm):
    user_id = IntegerField('user_id')
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    video_url = StringField('video_url', validators=[DataRequired()])
    created_at = DateField('created_at', default=datetime.now())
