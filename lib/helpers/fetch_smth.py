from http.client import HTTPSConnection
from json.decoder import JSONDecodeError
from json import loads
from socket import gaierror


def fetch_json(hostname: str, route: str) -> dict or None:
    try:
        conn = HTTPSConnection(hostname)
        conn.request('GET', f'/{route}')
        return loads(conn.getresponse().read().decode('utf-8'))
    except (JSONDecodeError, gaierror):
        return None