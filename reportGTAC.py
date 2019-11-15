from selenium.webdriver import ChromeOptions
from selenium.webdriver import Chrome
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from pathlib import Path
import os
import json
from time import sleep


class SubmitTicket(object):

    def __init__(self, headless=False):
        self.mindsphere_token = ''
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

    def signing_into_qtac_with_web_key(self, login, password):
        self.browser.get('https://webtac.industrysoftware.automation.siemens.com/qtac/index.php5')
        self.wait_until_css_element_object_found('[name="signIn"]')
        self.browser.find_element_by_css_selector('#name').send_keys(login)
        self.browser.find_element_by_css_selector('#password').send_keys(password)
        self.browser.find_element_by_css_selector('[name="signIn"]').submit()

    def fill_out_qtac(self):
        self.wait_until_css_element_object_found('#CREA_01_buttonLabel_save')
        # self.browser.find_element_by_css_selector('#short_desc').send_keys('Short Description')
        self.browser.find_element_by_css_selector('#software_product').send_keys('MINDSPHERE'+Keys.TAB)
        sleep(5)
        self.browser.find_element_by_css_selector('#software_application').send_keys('API')
        sleep(5)
        self.browser.find_element_by_css_selector('#software_release').send_keys('V3.0')
        self.browser.find_element_by_css_selector('#hardware_platform').send_keys('AWS')
        # self.browser.find_element_by_css_selector('#priority').send_keys('1 - Critical'+Keys.TAB+'asdfasdf')
        sleep(5)
        self.browser.find_element_by_css_selector('#textFrame').send_keys(Keys.TAB)
        sleep(4)
        self.browser.find_element_by_css_selector('#textFrame').send_keys(Keys.TAB)
        sleep(3)
        self.browser.find_element_by_css_selector('#textFrame').send_keys(Keys.ENTER)
        sleep(2)
        self.browser.find_element_by_css_selector('#textFrame').send_keys(Keys.ENTER + 'asdfasdf')
        sleep(5)
        print(5)

    def wait_until_css_element_object_found(self, css_param, wait_time=10):
        wait = WebDriverWait(self.browser, wait_time)
        wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, css_param)))

    def scroll_down_one_page(self, browser_object, lines_down):
        browser_object.execute_script("window.scrollTo(0, " + str(lines_down) + ")")

    def drag_and_drop(self, browser_object, source_element_object, destination_element_object):
        ActionChains(browser_object).drag_and_drop(source_element_object, destination_element_object).perform()

    def hover_over(self, browser_object, element_object):
        ActionChains(browser_object).move_to_element(element_object).perform()

    def is_present(self, element_object):
        try:
            # browser.find_element_by_css_selector("div")
            if element_object.is_displayed():
                return True
        except:
            return False

    def update_browser(self, browser_object):
        for handle in browser_object.window_handles:
            browser_object.switch_to.window(handle)

    def wait_until_name_element_object_found(self, browser_object, name_param, wait_time=10):
        wait = WebDriverWait(browser_object, wait_time)
        wait.until(EC.visibility_of_element_located((By.NAME, name_param)))
        # sleep(1)

    def wait_until_partial_link_text_element_object_found(self, browser_object, partial_link_text, wait_time=10):
        wait = WebDriverWait(browser_object, wait_time)
        wait.until(EC.visibility_of_element_located((By.PARTIAL_LINK_TEXT, partial_link_text)))
        # sleep(1)

    def wait_until_class_name_element_object_found(self, browser_object, class_name, wait_time=10):
        wait = WebDriverWait(browser_object, wait_time)
        wait.until(EC.visibility_of_element_located((By.CLASS_NAME, class_name)))
        # sleep(1)

    def wait_until_id_element_object_found(self, browser_object, id_object, wait_time=10):
        wait = WebDriverWait(browser_object, wait_time)
        wait.until(EC.visibility_of_element_located((By.ID, id_object)))
        # sleep(1)

    def wait_until_partial_link_text_object_found(self, browser_object, id_object, wait_time=10):
        wait = WebDriverWait(browser_object, wait_time)
        wait.until(EC.visibility_of_element_located((By.PARTIAL_LINK_TEXT, id_object)))
        # sleep(1)

    def multi_select_in_list(self, element_objects, labels):
        for option in element_objects:
            if option.text in labels:
                option.click()

    def select_in_list(self, element_objects, labels):
        for option in element_objects:
            if option.text in labels:
                option.click()
                break

if __name__ == '__main__':
    credential_file = Path('hidden/credential.json')
    submit_ticket_instance = SubmitTicket()
    with open(credential_file, 'r') as reading_file:
        my_credentials = json.loads(reading_file.read())
    submit_ticket_instance.signing_into_qtac_with_web_key(my_credentials['user_name'], my_credentials['password'])
    submit_ticket_instance.fill_out_qtac()
