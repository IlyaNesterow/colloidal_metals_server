from flask import Flask
from dotenv import find_dotenv, load_dotenv

from lib.helpers.error_handlers import *
from lib.blueprints.auth import auth_bp
from lib.blueprints.edit import edit_bp
from lib.blueprints.images import images_bp

app = Flask(__name__)

load_dotenv(find_dotenv())

def default_route():
    return 'This is a rest-api server'

app.register_blueprint(auth_bp)
app.register_blueprint(edit_bp)
app.register_blueprint(images_bp)

app.add_url_rule('/', 'index', default_route)

app.register_error_handler(400, bad_request)
app.register_error_handler(403, forbidden)
app.register_error_handler(404, page_not_found)
app.register_error_handler(405, method_not_allowed)
app.register_error_handler(500, server_error)