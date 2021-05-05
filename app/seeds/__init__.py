from flask.cli import AppGroup
from .users import seed_users_videos_categories, undo_users_videos_categories
from .follows import seed_follows, undo_follows

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users_videos_categories()
    seed_follows()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users_videos_categories()
    undo_follows()
    # Add other undo functions here
