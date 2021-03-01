from os import remove
from json import dump
from typing import ClassVar


class JSONfile:
    _name: ClassVar[str]

    def __init__(self, name: str) -> None:
        elems = name.split('.')
        if 'json' in elems:
            if len(elems) > 2:
                name = '.'.join(elems[:-1])
            else:
                name = elems[0]

        self._name = name

    def create(self, data: dict) -> None:
        with open(f'{self._name}.json', 'w') as f:
            dump(data, f, indent=4)

    def delete(self) -> None:
        remove(f'{self._name}.json')

    @property
    def name(self):
        return f'{self._name}.json'