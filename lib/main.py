from flask import *
from werkzeug.exceptions import BadRequest
from lib.utils.auth import verify_auth_credentials, verify_auth
from lib.errors import InvalidPasswordError, InvalidUsernameError

app = Flask(__name__)

@app.route('/login', methods=['put'])
def login():
    try:
        token = verify_auth_credentials(request.json)
        resp = make_response(jsonify({'success': True}))
        resp.set_cookie('auth', token)
        return resp, 201
    except InvalidUsernameError:
        return jsonify({'error': 'Username is incorrect'}), 400
    except InvalidPasswordError:
        return jsonify({'error': 'Password is incorrect'}), 400
    except BadRequest:
        return jsonify({'error': 'The body is not a json'}), 400
    except ValueError as err:
        return jsonify({'error': err[0] or 'Server error'}), 500

   
@app.route('/')
def test():
    auth = verify_auth()
    return jsonify({'auth': auth})


app.run(port=3000, debug=True)