import os
import logging
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from datetime import datetime


from .models import db, User, PrivateMessage
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.videos import video_routes
from .api.follows import follows_routes
from .api.category import category_routes
from .api.private_messages import private_messages_routes
from .api.comments import comments_routes
from .seeds import seed_commands
from .config import Config

logging.basicConfig()
logging.getLogger('sqlalchemy').setLevel(logging.ERROR)

app = Flask(__name__)

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://vid-hub.herokuapp.com",
        "https://vid-hub.herokuapp.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(app, cors_allowed_origins=origins)


# -----------------------WebSocket Private Messages --------------------
@socketio.on('private_message', namespace='/private')
def handlePrivateMessage(data):
    time = datetime.now()
    private_message = PrivateMessage(
        messages=data['messages'], sender_id=data['sender_id'], receiver_id=data['receiver_id'], created_at=time)
    db.session.add(private_message)
    db.session.commit()
    data['created_at'] = time.strftime("%d %b %y %H:%M:%S") + " GMT"
    emit('private_room', data, to=data['roomId'], namespace='/private')


@socketio.on('join_room', namespace='/private')
def handlePrivateJoinRoom(roomId):
    join_room(roomId['roomId'])
    return None


@socketio.on('leave_room', namespace='/private')
def handlePrivateLeaveRoom(roomId):
    leave_room(roomId)
    return None


@socketio.on('connect', namespace='/private')
def handlePrivateConnect():
    print(request, 'I have connected')


# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(video_routes, url_prefix='/api/videos')
app.register_blueprint(follows_routes, url_prefix='/api/follows')
app.register_blueprint(category_routes, url_prefix='/api/categories')
app.register_blueprint(comments_routes, url_prefix='/api/comments')
app.register_blueprint(private_messages_routes,
                       url_prefix='/api/private_messages')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


if __name__ == '__main__':
    socketio.run(app)
