"""
Setup for deployment to heroku
"""
from lib.app import app


if __name__ == '__main__':
    app.run()