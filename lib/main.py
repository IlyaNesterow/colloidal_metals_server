from flask import *
from werkzeug.exceptions import BadRequest
from lib.utils.auth import verify_auth_credentials, verify_auth
from lib.errors import *
from lib.handlers.change_credentials import change_content, change_pw, change_uname
from lib.utils.auth_jwt import get_username
from lib.helpers.check_for_json import check_for_json

app = Flask(__name__)


@app.route('/login', methods=['PUT'])
@check_for_json
def login():
    try:
        token = verify_auth_credentials(request.json)
        resp = make_response(jsonify({'success': True}))
        resp.set_cookie('auth', token)
        return resp, 201
    except (InvalidUsernameError, InvalidPasswordError) as er:
        return jsonify({'error': er.args[0] or 'Unknown'}), 400
    except Exception as ex:
        return jsonify({'error': ex.args[0] or 'Server error'}), 500


@app.route('/password', methods=['PUT'])
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


@app.route('/username', methods=['PUT'])
@verify_auth
@check_for_json
def change_username():
    try:
        username, token = change_uname(request.json)
        resp = make_response(jsonify({'username': username}))
        if token:
            resp.set_cookie('auth', token)
        return resp, 201
    except (MissingCredentialsError, InvalidUsernameError) as er:
        return jsonify({'error': er.args[0] or 'Unknown'}), 400   
    except Exception as ex:
        return jsonify({'error': ex.args[0] or 'Server error'}), 500 


@app.route('/content', methods=['PUT'])
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


@app.route('/whoami', methods=['GET'])
def get_uname():
    try:
        result = get_username()
        return jsonify(result), 200
    except AuthError as er:
        return jsonify({'error': er.args[0] or 'Unknown'}), 400
    except Exception as ex:
        return jsonify({'error': ex.args[0] or 'Server Error'}), 500


if __name__ == '__main__':
    app.run(port=3000, debug=True)