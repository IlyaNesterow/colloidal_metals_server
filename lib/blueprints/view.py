from flask import *


view_bp = Blueprint('view_blueprint', __name__,
                    static_url_path='/',
                    static_folder='../../static/build',
                    template_folder='../../static/build')


@view_bp.route('/', methods=['GET'])
@view_bp.route('/login', methods=['GET'])
@view_bp.route('/content', methods=['GET'])
@view_bp.route('/pictures', methods=['GET'])
def home():
    try:
        if request.method != 'GET':
            return abort(405, 'Only get method is allowed for this endpoint')
        return render_template('index.html')
    except Exception:
        return 'The webpage is temporarily unavailable', 500
