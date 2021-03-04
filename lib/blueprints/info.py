from flask import *


info_bp = Blueprint('info_blueprint', __name__,
                    url_prefix='/info')


@info_bp.route('/token/<string:format>', methods=['GET'])
def about_token(format: str):
    if format == 'json':
        return jsonify(
            {'token_rule': 'Token must be passed with "authorization" header, and must be formated in following way: "Bearer <token>"'}
        )
    else:
        return 'Token must be passed with "authorization" header, and must be formated in following way: "Bearer <token>"'


@info_bp.route('/developer/<string:format>', methods=['GET'])
def about_developer(format: str):
    if format == 'json':
        return jsonify({
            'Name': 'Ilya Nesterow',
            'email': 'j.nesterov1709@gmail.com',
            'github': 'https://github.com/IlyaNesterow'
        })
    else:
        return 'Ilya Nesterow\nj.nesterov1709@gmail.com\nhttps://github.com/IlyaNesterow'


@info_bp.route('/repo/<string:format>', methods=['GET'])
def repo(format: str):
    if format == 'json':
        return jsonify({
            'url': 'https://github.com/IlyaNesterow/colloidal_metals_server',
            'name': 'colloidal_metals_server'
        })
    else:
        return 'colloidal_metals_server\nhttps://github.com/IlyaNesterow/colloidal_metals_server'
