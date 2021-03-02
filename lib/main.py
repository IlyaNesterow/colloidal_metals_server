from flask import *
from lib.utils.auth import verify_auth_credentials, verify_auth
from lib.errors import *
from lib.handlers.change_credentials import change_content, change_pw, change_uname
from lib.handlers.images import list_all_images, delete_img, presigned_url
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


@app.route('/images', methods=['GET'])
@verify_auth
def list_images():
    try: 
        images = list_all_images()
        return jsonify({'images': images}), 200
    except KeyError: 
        return jsonify({'error': 'Failed to list images'}), 500


@app.route('/delete_image/<string:image>', methods=['DELETE'])
@verify_auth
def delete_image(image: str):
    try:
        delete_img(image)
        return jsonify({'deleted': True}), 201
    except Exception as ex:
        return jsonify({'error': ex.args[0] or 'Failed to delete image'}), 500
        

@app.route('/get_presigned_url', methods=['PUT'])
@verify_auth
@check_for_json
def get_presigned_url():
    try:
        url = presigned_url(request.json)
        return jsonify({'url': url}), 201
    except (MissingCredentialsError, FormatError)  as er:
        return jsonify({'error': er.args[0]}), 400
    except Exception as ex:
        return jsonify({'error': ex.args[0] or 'Failed to generate presigned url'}), 500


if __name__ == '__main__':
    app.run(port=3000, debug=True)