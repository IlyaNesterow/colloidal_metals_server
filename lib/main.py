from flask import *
from werkzeug.exceptions import BadRequest
from lib.utils.auth import verify_auth_credentials, verify_auth
from lib.errors import *
from lib.utils.change_credentials import change_pw


app = Flask(__name__)


@app.route('/login', methods=['PUT'])
def login():
    try:
        token = verify_auth_credentials(request.json)
        resp = make_response(jsonify({'success': True}))
        resp.set_cookie('auth', token)
        return resp, 201
    except (InvalidUsernameError, InvalidPasswordError) as er:
        return jsonify({'error': er.args[0] or 'Unknown'}), 400
    except BadRequest:
        return jsonify({'error': 'The body is not a json'}), 400
    except ValueError as err:
        return jsonify({'error': err[0] or 'Server error'}), 500

   
@app.route('/password', methods=['PUT'])
def change_password():
    auth = verify_auth()
    if not auth:
        return jsonify({'error': 'Not authenticated'}), 400
    else:
        try:
            changed = change_pw(request.json)
            return jsonify({'changed': changed}), 201
        except (MissingCredentialsError, InvalidPasswordError) as er:
            return jsonify({'error': er.args[0] or 'Unknown'}), 400     
        except BadRequest:
            return jsonify({'error': 'The body is not a json'}), 400 
        except Exception as ex:
            return jsonify({'error': ex.args[0] or 'Server error'}), 500 

app.run(port=3000, debug=True)