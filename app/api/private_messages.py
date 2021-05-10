from flask import Blueprint, jsonify, request
from sqlalchemy import or_, and_
from app.models import User, db, PrivateMessage


private_messages_routes = Blueprint('private_messages', __name__)


@private_messages_routes.route('/<user_id>')
def private_messages_recipient_handler(user_id):
    private_messages = PrivateMessage.query.filter(or_(
        PrivateMessage.sender_id == user_id, PrivateMessage.receiver_id == user_id)).all()
    recipients = set()
    user_id = int(user_id)
    for private_message in private_messages:
        private_message = private_message.to_dict()
        if user_id != private_message['sender_id']:
            current_recipient = User.query.filter(
                User.id == private_message['sender_id']).first()
            recipients.add(current_recipient)
        elif user_id != private_message['receiver_id']:
            current_recipient = User.query.filter(
                User.id == private_message['receiver_id']).first()
            recipients.add(current_recipient)
    recipients_list = (list(recipients))
    final_recipients = list()
    for recipient in recipients_list:
        current_recipient = recipient.to_dict()
        if current_recipient['id'] != int(user_id):
            final_recipients.append(current_recipient)
    return {"recipients": final_recipients}
