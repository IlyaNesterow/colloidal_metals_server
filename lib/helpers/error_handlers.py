from flask import jsonify, redirect


def bad_request(e):
    return jsonify({'error': str(e)}), 400


def forbidden(e):
    return jsonify({'error': str(e)}), 403


def page_not_found(e):
    return redirect('/')


def method_not_allowed(e):
    return jsonify({'error': 'Method not allowed'}), 405


def server_error(e):
    return jsonify({'error': str(e)}), 500
