from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class FollowForm(FlaskForm):
    follower_id = IntegerField("follower_id", validators=[DataRequired()])
    uploader_id = IntegerField("uploader_id", validators=[DataRequired()])
