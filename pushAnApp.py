from selenium.webdriver import ChromeOptions
from selenium.webdriver import Chrome
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from pathlib import Path
import os
import json
from time import sleep


class EfficientWayOfRegisteringYourApp(object):

    def __init__(self, internal_app_name, component_url, headless=False, speed=0):
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
        self.unique_app_name = internal_app_name
        self.component_url = component_url
        self.speed = speed

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

    def logging_in(self, url, login, password):
        self.browser.get(url)
        self.wait_until_css_element_object_found('#username')
        self.browser.find_element_by_css_selector('#username').send_keys(login)
        # self.browser.find_element_by_css_selector('#emailaddress').send_keys(login)
        self.browser.find_element_by_css_selector('#password').send_keys(password)
        self.browser.find_element_by_css_selector('.btn-yellow').submit()

    def go_to_developer_cockpit(self):
        self.wait_until_css_element_object_found('[title= "Developer Cockpit"]')
        self.highlight_background_by_css('[title= "Developer Cockpit"]')
        self.browser.find_element_by_css_selector('[title= "Developer Cockpit"]').click()

    def setting_up_registration_of_an_app(self, display_name, version, component_name, description=None):
        self.wait_until_css_element_object_found('#btn_crt_new_app')
        self.highlight_background_by_css('#btn_crt_new_app')
        self.browser.find_element_by_css_selector('#btn_crt_new_app').click()
        self.wait_until_css_element_object_found('#displayName')
        self.highlight_background_by_css('#displayName')
        self.browser.find_element_by_css_selector('#displayName').send_keys(display_name)
        self.wait_until_css_element_object_found('#appName')
        self.highlight_background_by_css('#appName')
        self.browser.find_element_by_css_selector('#appName').send_keys(self.unique_app_name)
        self.wait_until_css_element_object_found('#appVersion')
        self.highlight_background_by_css('#appVersion')
        self.browser.find_element_by_css_selector('#appVersion').send_keys(version)
        self.wait_until_css_element_object_found('#comp\.name\.0')
        self.highlight_background_by_id('comp.name.0')
        self.browser.find_element_by_css_selector('#comp\.name\.0').send_keys(component_name)
        self.wait_until_css_element_object_found('#comp\.url\.0')
        self.highlight_background_by_id('comp.url.0')
        self.browser.find_element_by_css_selector('#comp\.url\.0').send_keys(self.component_url)
        self.wait_until_css_element_object_found('#btnAddEndpoint')
        self.highlight_background_by_css('#btnAddEndpoint')
        self.browser.find_element_by_css_selector('#btnAddEndpoint').click()
        self.wait_until_css_element_object_found('#path')
        self.highlight_background_by_css('#path')
        self.browser.find_element_by_css_selector('#path').send_keys('/**')
        self.wait_until_css_element_object_found('#btnAddUpdateEndpoint')
        self.highlight_background_by_css('#btnAddUpdateEndpoint')
        self.browser.find_element_by_css_selector('#btnAddUpdateEndpoint').click()
        # input("Click on Edit icon and select a picture. Confirm the choice and THEN hit Enter here.")
        self.wait_until_css_element_object_found('#publishButton')
        self.highlight_background_by_css('#publishButton')
        self.browser.find_element_by_css_selector('#publishButton').click()
        self.wait_until_css_element_object_found('#btnGoToHome')
        sleep(self.speed)
        self.browser.find_element_by_css_selector('#btnGoToHome').click()

    def adding_roles_to_scope(self):
        self.wait_until_css_element_object_found('#li-security', 30)
        self.highlight_background_by_css('#li-security')
        self.browser.find_element_by_css_selector('#li-security').click()
        self.wait_until_css_element_object_found('input[placeholder="Filter"]')
        self.highlight_background_by_css('input[placeholder="Filter"]')
        self.browser.find_element_by_css_selector('input[placeholder="Filter"]').send_keys(self.unique_app_name + Keys.ENTER)
        sleep(5)
        # self.browser.find_element_by_css_selector('h4.panel-title')
        app_list = self.browser.find_elements_by_css_selector('h4.panel-title')
        which_index_has_app_name = None
        for index, each_el in enumerate(app_list):
            if each_el.text in self.unique_app_name:
                which_index_has_app_name = index
                break
        app_list[which_index_has_app_name].click()
        self.wait_until_css_element_object_found('#btnAddnewScope')
        self.highlight_background_by_css('#btnAddnewScope')
        self.browser.find_element_by_css_selector('#btnAddnewScope').click()
        self.wait_until_css_element_object_found('#propName')
        self.highlight_background_by_css('#propName')
        self.browser.find_element_by_css_selector('#propName').send_keys('all')
        self.browser.find_elements_by_css_selector('input[name="scope"]')[0].click()
        self.browser.find_elements_by_css_selector('input[name="scope"]')[1].click()
        self.browser.find_element_by_css_selector('#btncreateGRoupdSave').click()
        sleep(10)

    def register_your_app(self):
        self.wait_until_css_element_object_found('#li-apps')
        self.highlight_background_by_css('#li-apps')
        self.browser.find_element_by_css_selector('#li-apps').click()
        sleep(10)
        app_inventory = self.browser.find_elements_by_css_selector('h5')
        which_index_has_app_name = None
        for index, each_el in enumerate(app_inventory):
            if self.unique_app_name in each_el.text:
                which_index_has_app_name = index
                break
        app_inventory[which_index_has_app_name].click()
        self.wait_until_css_element_object_found('#saveButton')
        self.highlight_background_by_css('#saveButton')
        self.browser.find_element_by_css_selector('#saveButton').click()
        self.wait_until_css_element_object_found('#btnProceedInfo')
        self.highlight_background_by_css('#btnProceedInfo')
        self.browser.find_element_by_css_selector('#btnProceedInfo').click()
        self.wait_until_css_element_object_found('#_mdsp-homeLink')
        self.highlight_background_by_css('#_mdsp-homeLink')
        sleep(10)
        self.browser.find_element_by_css_selector('#_mdsp-homeLink').click()

    def add_role_to_user(self, user):
        self.wait_until_css_element_object_found('a[title="Settings"]')
        self.highlight_background_by_css('a[title="Settings"]')
        self.browser.find_element_by_css_selector('a[title="Settings"]').click()
        self.wait_until_css_element_object_found('input[placeholder="Filter"]', 30)
        self.highlight_background_by_css('input[placeholder="Filter"]')
        self.browser.find_element_by_css_selector('input[placeholder="Filter"]').send_keys(user, Keys.ENTER)
        sleep(5)
        self.highlight_background_by_css('a[title*="' + user + '"]')
        self.browser.find_element_by_css_selector('a[title*="' + user + '"]').click()
        self.highlight_background_by_css('button[data-mdsp-e2e="user-detail_buttonEditRoles"]')
        self.browser.find_element_by_css_selector('button[data-mdsp-e2e="user-detail_buttonEditRoles"]').click()
        self.highlight_background_by_css('input[placeholder="Filter"]')
        self.browser.find_element_by_css_selector('input[placeholder="Filter"]').send_keys(self.unique_app_name)
        sleep(5)
        self.browser.find_elements_by_css_selector('.checkboxWrapper')[1].click()
        self.highlight_background_by_css('button[data-mdsp-e2e="select-footer_approveButton"]')
        self.browser.find_element_by_css_selector('button[data-mdsp-e2e="select-footer_approveButton"]').click()
        self.highlight_background_by_css('button[data-mdsp-e2e="approve-footer_saveButton"]')
        self.browser.find_element_by_css_selector('button[data-mdsp-e2e="approve-footer_saveButton"]').click()
        self.highlight_background_by_css('button[data-mdsp-e2e="result-footer_closeButton"]')
        self.browser.find_element_by_css_selector('button[data-mdsp-e2e="result-footer_closeButton"]').click()
        self.highlight_background_by_css('#_mdsp-homeLink')
        self.browser.find_element_by_css_selector('#_mdsp-homeLink').click()

    def wait_until_css_element_object_found(self, css_param, wait_time=10):
        wait = WebDriverWait(self.browser, wait_time)
        wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, css_param)))


if __name__ == '__main__':
    credential_file = Path('hidden/credential.json')
    #Internal Name and URL
    pushing_my_app = EfficientWayOfRegisteringYourApp('tokensmc'.lower(), 'tokenapp-fantastic-ardvark.apps.eu1.mindsphere.io', speed=5)
    with open(credential_file, 'r') as reading_file:
        my_credentials = json.loads(reading_file.read())
    pushing_my_app.logging_in(my_credentials['host_list'][0], my_credentials['user_name'], my_credentials['password'])
    pushing_my_app.go_to_developer_cockpit()
    #DisplayName Version Component
    pushing_my_app.setting_up_registration_of_an_app('My Token App SMC', '1.0.0', 'mytokenapp')
    pushing_my_app.adding_roles_to_scope()
    pushing_my_app.register_your_app()
    pushing_my_app.add_role_to_user('SenhMo')


