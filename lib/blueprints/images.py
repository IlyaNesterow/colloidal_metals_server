from flask import *

from lib.errors import *
from lib.handlers.images import list_all_images, delete_img, presigned_url
from lib.helpers.decorators import check_for_json, verify_auth


images_bp = Blueprint('images_blueprint', __name__)


@images_bp.route('/images', methods=['GET'])
@verify_auth
def list_images():
    try: 
        images = list_all_images()
        return jsonify({'images': images}), 200
    except KeyError: 
        return jsonify({'error': 'Failed to list images'}), 500


@images_bp.route('/delete_image/<string:image>', methods=['DELETE'])
@verify_auth
def delete_image(image: str):
    try:
        delete_img(image)
        return jsonify({'deleted': True}), 201
    except Exception as ex:
        return jsonify({'error': ex.args[0] or 'Failed to delete image'}), 500
        

@images_bp.route('/get_presigned_url', methods=['PUT'])
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
