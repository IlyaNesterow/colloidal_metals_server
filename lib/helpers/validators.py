from typing import Union
from lib.errors import MissingCredentialsError
from validators import url, between, length

def validate_content(pages: dict) -> None:
    if not pages:
        raise MissingCredentialsError('No pages section')

    if not pages.get('silver') or not pages.get('copper') or not pages.get('platinum') or not pages.get('gold'):
        raise MissingCredentialsError('Lacking some pages')

    for key, item in pages.items():
        validate_page(key, item)


def validate_page(key: str, page: dict):
    validate_introduction(key, page.get('introduction'))
    validate_info(key, page.get('info'))
    validete_synthesys(key, page.get('howProduced'))
    validate_sellers(key, page.get('sellers'))
    validate_other_resources(key, page.get('otherSources'))


def validate_introduction(key: str, intro: Union[dict, None]):
    if not intro:
        raise MissingCredentialsError(f"No introduction found in {key}'s intro section")

    validate_bg_image(intro.get('bgImage'), True, key, 'intro')
    validate_text(intro.get('text'), True, key, 'intro')
    validate_section_name(intro.get('sectionName'), key, 'intro')
    validate_title(intro.get('title'), True, key, 'intro')
    
    if intro.get('videos'):
        for video in intro['videos']:
            validate_video(video, key)


def validate_video(video: Union[dict, None], key: str):
    if not video.get('url') or not url(video['url']):
        raise MissingCredentialsError(f"Wrong video url in {key}' intro section")
    if not video.get('description') or not length(video['description'], min=5, max= 100):
        raise MissingCredentialsError(f"Wrong video description in {key}' intro section")


def validate_info(key: str, info: Union[dict, None]):
    if not info:
        raise MissingCredentialsError('No info section found')

    validate_bg_image(info.get('bgImage'), True, key, 'info')
    validate_bg_image_height(info.get('bgImageHeight'), key, 'info')
    validate_bg_image_width(info.get('bgImageWidth'), key, 'info')
    validate_text(info.get('summary'), True, key, 'info')
    validate_section_name(info.get('sectionName'), key, 'info')

    if info.get('subSections') and type(info['subSections']) == list:
        for section in info['subSections']:
            validate_subsection(key, 'info', section)

    if info.get('pdfFile'):
        validate_pdf_file(info['pdfFile'], key)


def validete_synthesys(key: str, synthesys: Union[dict, None]):
    if not synthesys:
        return
    
    validate_bg_image(synthesys.get('bgImage'), True, key, 'synthesys')
    validate_section_name(synthesys.get('sectionName'), key, 'synthesys')
    validate_text(synthesys.get('text'), True, key, 'synthesys')


def validate_sellers(key: str, sellers: Union[dict, None]):
    if not sellers:
        raise MissingCredentialsError('No sellers section found')

    validate_section_name(sellers.get('sectionName'), key, 'sellers')
    validate_bg_image_height(sellers.get('bgImageHeight'), key, 'sellers')
    validate_bg_image_width(sellers.get('bgImageWidth'), key, 'sellers')

    if not sellers.get('sellers') or type(sellers['sellers']) != list:
        raise MissingCredentialsError("No sellers list found in {key}'s sellers section")

    for seller in sellers['sellers']:
        validate_url_resource(key, 'sellers', seller)


def validate_other_resources(key: str, other: Union[dict, None]): 
    if not other:
        return

    validate_title(other.get('title'), True, key, 'other')
    validate_section_name(other.get('sectionName'), key, 'other')

    if not other.get('urls') or type(other['urls']) != list:
        raise MissingCredentialsError("No url list found in {key}'s other resources section")

    for url in other['urls']:
        validate_url_resource(key, 'urls', url)
    

def validate_url_resource(key: str, section: str, data: Union[dict, None]):
    print(data.get('_name'))
    validate_title(data.get('_name'), True, key, 'sellers')
    if not data.get('url') and not url(data['url']):
        raise MissingCredentialsError(f"Incorrect url in {key}'s {section} section")


def validate_pdf_file(data: dict, key: str):
    validate_text(data.get('description'), True, key, 'pdf file')
    if not data.get('url') and not url(data['url']):
        raise MissingCredentialsError(f"Incorrect pdf url in {key}'s pdf file section")

    
def validate_subsection(key: str, section: str, data: dict): 
    validate_bg_image(data.get('bgImage'), True, key, section)
    validate_bg_image_height(data.get('bgImageHeight'), key, section)
    validate_bg_image_width(data.get('bgImageWidth'), key, section)
    validate_section_name(data.get('sectionName'), key, section)
    validate_title(data.get('title'), True, key, section)


def validate_bg_image(img: Union[str, None], required: bool, key: str, section: str):
    if (required and not img) or (required and not url(img)):
        raise MissingCredentialsError(f"Wrong background image in {key}'s {section} section")


def validate_bg_image_height(height: Union[float, None], key: str, section: str):
    if height and not between(height, min=30, max=100.1):
        raise MissingCredentialsError(f"Wrong background image height in {key}'s {section} section")


def validate_bg_image_width(width: Union[float, None], key: str, section: str):
    if width and not between(width, min=40, max=100.1):
        raise MissingCredentialsError(f"Wrong background image width in {key}'s {section} section")


def validate_title(title: Union[str, None], required: bool, key: str, section: str):
    if required and (not title or not length(title, min=3, max=45)):
        raise MissingCredentialsError(f"No title found in {key}'s {section} section")


def validate_text(text: Union[str, None], required: bool, key: str, section: str):
    if required and (not text or not length(text, min=30)):
        raise MissingCredentialsError(f"No text found in {key}'s {section} section")


def validate_section_name(name: Union[str, None], key: str, section: str):
    if not name or not length(name, min=3, max=25):
        raise MissingCredentialsError(f"Section name is incorrect in {key}'s {section} section")
