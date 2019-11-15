import subprocess
from selenium.webdriver import ChromeOptions
from selenium.webdriver import Chrome
import os
from pathlib import Path
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import json
from time import sleep

class CloudFoundry(object):

    def __init__(self, headless=False):
        options = ChromeOptions()
        options.add_argument("disable-extensions")
        options.add_argument("incognito")
        if headless:
            options.add_argument("headless")
        if os.name == 'nt':
            path_to_chrome = str(Path('./chromedriver.exe').relative_to('.'))
        else:
            path_to_chrome = str(Path('./chromedriver').absolute())
        self.browser = Chrome(path_to_chrome, options=options)

    def logging_in(self, login, password):
        self.browser.get('https://login.cf.eu1.mindsphere.io/passcode')
        # self.browser.get('https://academy2.eu1.mindsphere.io')
        # self.browser.get('https://eo3codev.eu1.mindsphere.io')
        # self.browser.get('https://svcusr.cn1.mindsphere-in.cn')
        # self.browser.get('https://svcdev.cn1.mindsphere-in.cn/')
        # self.browser.get('https://svcuopt.cn1.mindsphere-in.cn')
        # self.browser.get('https://kosfprod.eu1.mindsphere.io/')
        self.wait_until_css_element_object_found('#username')
        self.browser.find_element_by_css_selector('#username').send_keys(login)
        # self.browser.find_element_by_css_selector('#emailaddress').send_keys(login)
        self.browser.find_element_by_css_selector('#password').send_keys(password)
        self.browser.find_element_by_css_selector('.btn-yellow').submit()

    def get_temporary_passcode(self):
        self.wait_until_css_element_object_found('h2')
        self.temporary_passcode = self.browser.find_element_by_css_selector('h2').text
        self.browser.quit()

    def highlight_background_by_css(self, css_selector):
        self.browser.execute_script('window.document.querySelector(\''+css_selector+'\').style.backgroundColor= "yellow"')
        self.browser.execute_script('window.document.querySelector(\''+css_selector+'\').scrollIntoView')
        # input('Press Enter')
        el_object = self.browser.find_element_by_css_selector(css_selector)
        ActionChains(self.browser).move_to_element(el_object).perform()
        sleep(1)

    def highlight_background_by_id(self, id_element):
        self.browser.execute_script('window.document.getElementById(\''+id_element+'\').style.backgroundColor= "yellow"')
        self.browser.execute_script('window.document.getElementById(\''+id_element+'\').scrollIntoView')
        # input('Press Enter')
        el_object = self.browser.find_element_by_id(id)
        ActionChains(self.browser).move_to_element(el_object).perform()
        sleep(1)

    def wait_until_css_element_object_found(self, css_param, wait_time=10):
        wait = WebDriverWait(self.browser, wait_time)
        wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, css_param)))

if __name__ == '__main__':
    cf_instance = CloudFoundry()
    credential_file = Path('./hidden/credential.json')
    with open(credential_file, 'r') as reading_file:
        my_credentials = json.loads(reading_file.read())
    cf_instance.logging_in(my_credentials['user_name'], my_credentials['password'])
    cf_instance.get_temporary_passcode()
    print(cf_instance.temporary_passcode)
    subprocess.check_output("cf api https://api.cf.eu1.mindsphere.io", shell=True, universal_newlines=True)
    output_string = subprocess.check_output(f"cf login -o academy2 -s senhmo --sso-passcode {cf_instance.temporary_passcode}", shell=True, universal_newlines=True)
    print(output_string)
