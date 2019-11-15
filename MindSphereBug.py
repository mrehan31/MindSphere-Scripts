from selenium.webdriver import ChromeOptions
from selenium.webdriver import Chrome
import os
from pathlib import Path
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.wait import WebDriverWait
from time import sleep
import json


class GTAC(object):

    def __init__(self, headless=False, speed=0):
        options = ChromeOptions()
        options.add_argument("disable-extensions")
        options.add_argument("incognito")
        if headless:
            options.add_argument("headless")
        if os.name == 'nt':
            path_to_chrome = str(Path('./chromedriver.exe').relative_to('.'))
        else:
            path_to_chrome = str(Path('./chromedriver').absolute())
        self.browser = Chrome(path_to_chrome, chrome_options=options)
        self.speed = speed

    def wait_until_css_element_object_found(self, css_param, wait_time=10):
        wait = WebDriverWait(self.browser, wait_time)
        wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, css_param)))

    def highlight_background_by_css(self, css_selector):
        self.browser.execute_script('window.document.querySelector(\''+css_selector+'\').style.backgroundColor= "yellow"')
        self.browser.execute_script('window.document.querySelector(\''+css_selector+'\').scrollIntoView')
        # input('Press Enter')
        el_object = self.browser.find_element_by_css_selector(css_selector)
        ActionChains(self.browser).move_to_element(el_object).perform()
        self.delay_of_game()

    def highlight_background_by_id(self, id_element):
        self.browser.execute_script('window.document.getElementById(\''+id_element+'\').style.backgroundColor= "yellow"')
        self.browser.execute_script('window.document.getElementById(\''+id_element+'\').scrollIntoView')
        # input('Press Enter')
        el_object = self.browser.find_element_by_id(id_element)
        ActionChains(self.browser).move_to_element(el_object).perform()
        self.delay_of_game()

    def delay_of_game(self):
        if self.speed == 0:
            pass
        elif self.speed == 1:
            input()
        else:
            sleep(self.speed)

    def logging_in(self, login, password):
        self.browser.get('https://webtac.industrysoftware.automation.siemens.com/qtac/index.php5')
        self.wait_until_css_element_object_found('#name')
        self.highlight_background_by_css('#name')
        self.browser.find_element_by_css_selector('#name').send_keys(login)
        self.highlight_background_by_css('#password')
        self.browser.find_element_by_css_selector('#password').send_keys(password)
        self.highlight_background_by_css('input[name="signIn"]')
        self.browser.find_element_by_css_selector('input[name="signIn"]').submit()

        sleep(10)
        self.browser.find_element_by_css_selector('#short_desc').send_keys('Short Description')
        self.browser.find_element_by_css_selector('#software_product').send_keys('MINDSPHERE')
        sleep(5)
        application_dict = {
            "api": "API",
            "app": "APP",
            "connectivity": "CONNECT_ASSET",
            "development": "DEVELOP",
            "mindaccess": "MINDACCESS"
        }
        self.browser.find_element_by_css_selector('#software_application').send_keys(application_dict['app'])
        self.browser.find_element_by_css_selector('#software_release').send_keys('V3.0')


if __name__ == '__main__':
    cf_instance = GTAC()
    credential_file = Path('./hidden/credential.json')
    with open(credential_file, 'r') as reading_file:
        my_credentials = json.loads(reading_file.read())
    cf_instance.logging_in(my_credentials['user_name'], my_credentials['webkey_password'])