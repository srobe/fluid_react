import json
from typing import Dict, List, Any, Optional

# _get_fields(self, field: str) -> Dict[str, Any]:
def dump_json(obj: Any, indent_level: int = 0, indent: int = 2) -> str:
    """
    Recursively serialize a Python object into a JSON-formatted string,
    handling lists and dictionaries with custom formatting.

    Args:
        obj: The Python object to serialize.
        indent (int): The amount of spaces for each indent 
        indent_level (int): The current indentation level.

    Returns:
        str: A JSON-formatted string.
    """
    indent_space = ' ' * indent  # Length of each indent space
    current_indent = indent_space * indent_level
    next_indent = indent_space * (indent_level + 1)

    if isinstance(obj, dict):
        items = []
        for k, v in obj.items():
            key = json.dumps(k)
            value = dump_json(v, indent_level + 1)
            items.append(f'{next_indent}{key}: {value}')
        return '{\n' + ',\n'.join(items) + f'\n{current_indent}}}'
    elif isinstance(obj, list):
        if all(isinstance(el, (str, int, float, bool, type(None))) for el in obj):
            # List of simple types: keep on one line
            simple_list = ', '.join(json.dumps(el) for el in obj)
            return f'[{simple_list}]'
        else:
            # List contains complex types: format with indentation
            items = [dump_json(el, indent_level + 1) for el in obj]
            return f'[\n{next_indent}' + f',\n{next_indent}'.join(items) + f'\n{current_indent}]'
    else:
        return json.dumps(obj)


class FrontendHelper:
    """
    A helper class to manage and retrieve frontend configuration for a weather application.

    Attributes:
        wx (Any): Configuration object containing application settings.
        theme (str): The current theme to use for retrieving configurations.
        fields (Dict[str, Any]): Field configuration for the frontend.
        levels (Dict[str, Any]): Level configuration for the frontend.
        regions (Dict[str, Any]): Region configuration for the frontend.
        tracks (Dict[str, Any]): Storm track configuration for the frontend.
    """

    def __init__(self, wx: Any):
        """
        Initialize the FrontendHelper with a weather configuration object.

        Args:
            wx (Any): A weather configuration object containing various settings.
        """
        self.wx: Any = wx
        self.theme: str = wx.config.get('theme_', 'theme')
        self.fields: Dict[str, Any] = {}
        self.levels: Dict[str, Any] = {}
        self.regions: Dict[str, Any] = {}
        self.tracks: Dict[str, Any] = {}

        # Populate configurations
        self.getFields()
        self.getLevels()
        self.getRegions()
        self.getTracks()

    def getFields(self) -> None:
        """
        Retrieve and structure the 'fields' configuration for the frontend.
        """
        field_interface: Dict[str, Any] = self.wx.config[self.theme]['interface']['field']
        self.fields = {
            'label': 'Fields',
            'type': 'DropdownWithSearch',
            'selected': self.wx.config['default'].get('field', ''),
            'all': []
        }

        for group in field_interface.get('groups', []):
            items: List[str] = field_interface[group].get('items', [])
            self.fields['all'].extend(self._get_fields(item) for item in items)

    def getLevels(self) -> None:
        """
        Retrieve and structure the 'levels' configuration for the frontend.
        """
        if not self.fields:  # Ensure fields are initialized
            self.getFields()

        selected_field: str = self.fields['selected']
        levels: List[str] = next(
            (field['levels'] for field in self.fields['all'] if field['var'] == selected_field),
            ["0"]
        )

        self.levels = {
            'label': 'Levels',
            'type': 'ButtonGroup',
            'selected': self.wx.config['default'].get('level', '0'),
            'all': levels
        }

    def getRegions(self) -> None:
        """
        Retrieve and structure the 'regions' configuration for the frontend.
        """
        self.regions = {
            'label': 'Regions',
            'selected': self.wx.config['default'].get('region', ''),
            'type': 'DropdownWithSearch',
            'all': [
                {"label": region['long_name'], "var": key}
                for key, region in self.wx.config.get('region', {}).items()
            ]
        }

    def getTracks(self) -> None:
        """
        Retrieve and structure the 'tracks' configuration for the frontend.
        """
        self.tracks = {
            'label': 'Storm Tracks',
            'all': ['tropical'],
            'selected': '',
            'type': 'Toggle'
        }

    def _get_fields(self, field: str) -> Dict[str, Any]:
        """
        Helper method to retrieve individual field configurations.

        Args:
            field (str): The field name to retrieve configuration for.

        Returns:
            Dict[str, Any]: A dictionary containing field configuration.
        """
        field_config: Dict[str, Any] = self.wx.config[self.theme]['plot'].get(field, {})
        levels: List[str] = [str(level) for level in field_config.get('levels', [])]
        return {
            'label': field_config.get('long_name', ''),
            'var': field,
            'levels': levels
        }
