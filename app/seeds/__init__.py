from flask.cli import AppGroup
from .users import seed_users_videos_categories, undo_users_videos_categories
from .follows import seed_follows, undo_follows
from .comments import seed_comments, undo_comments
from .privatemessages import seed_private_messages, undo_private_messages

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users_videos_categories()
    seed_follows()
    seed_comments()
    seed_private_messages()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users_videos_categories()
    undo_follows()
    undo_comments()
    undo_private_messages()
    # Add other undo functions here
