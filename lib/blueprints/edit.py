from flask import *

from lib.errors import *
from lib.handlers.change_credentials import change_content, change_pw, change_uname
from lib.helpers.decorators import check_for_json, verify_auth
from lib.helpers.other import attach_auth_cookie


edit_bp = Blueprint('edit_blueprint', __name__,
                    url_prefix='/edit')


@edit_bp.route('/password', methods=['PUT'])
@verify_auth
@check_for_json
def change_password():
    try:
        changed = change_pw(request.json)
        return jsonify({'changed': changed}), 201
    except (MissingCredentialsError, InvalidPasswordError) as er:
        return jsonify({'error': er.args[0] or 'Unknown'}), 400
    except Exception as ex:
        return jsonify({'error': ex.args[0] or 'Server error'}), 500


@edit_bp.route('/username', methods=['PUT'])
@verify_auth
@check_for_json
def change_username():
    try:
        username, token = change_uname(request.json)
        return attach_auth_cookie(token, {'username': username}), 201
    except (MissingCredentialsError, InvalidUsernameError) as er:
        return jsonify({'error': er.args[0] or 'Unknown'}), 400
    except Exception as ex:
        return jsonify({'error': ex.args[0] or 'Server error'}), 500


@edit_bp.route('/content', methods=['PUT'])
@verify_auth
@check_for_json
def set_new_content():
    try:
        succeded = change_content(request.json)
        return jsonify({'success': succeded}), 201
    except (MissingCredentialsError, InvalidUsernameError) as er:
        return jsonify({'error': er.args[0] or 'Unknown'}), 400
    except Exception as ex:
        return jsonify({'error': ex.args[0] or 'Server error'}), 500
