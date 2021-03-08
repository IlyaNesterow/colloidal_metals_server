from flask import *

from lib.handlers.auth import verify_auth_credentials
from lib.errors import *
from lib.handlers.auth import get_username
from lib.helpers.decorators import check_for_json
from lib.helpers.other import attach_auth_cookie


auth_bp = Blueprint('auth_blueprint', __name__,
                    url_prefix='/auth')


@auth_bp.route('/login', methods=['PUT'])
@check_for_json
def login():
    try:
        token = verify_auth_credentials(request.json)
        return attach_auth_cookie(token, {'success': True}), 201
    except (InvalidUsernameError, InvalidPasswordError) as er:
        return jsonify({'error': er.args[0] or 'Unknown'}), 400
    except Exception as ex:
        return jsonify({'error': ex.args[0] or 'Server error'}), 500


@auth_bp.route('/whoami', methods=['GET'])
def get_uname():
    try:
        result = get_username()
        return jsonify(result), 200
    except AuthError as er:
        return jsonify({'error': er.args[0] or 'Unknown'}), 400
    except Exception as ex:
        return jsonify({'error': ex.args[0] or 'Server Error'}), 500


@auth_bp.route('/logout', methods=['GET'])
def logout():
    resp = make_response({'logout': True})
    resp.delete_cookie('auth')
    return resp, 201
