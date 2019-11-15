from selenium.webdriver import ChromeOptions
from selenium.webdriver import Chrome
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from pathlib import Path
import os
import json


class GettingMindSphereToken(object):

    def __init__(self, headless=False, brave=False):
        self.mindsphere_token = ''
        options = ChromeOptions()
        options.add_argument("disable-extensions")
        options.add_argument("incognito")
        if headless:
            options.add_argument("headless")
        if os.name == 'nt':
            # path_to_chrome = str(Path('./chromedriver.exe').relative_to('.'))
            path_to_chrome = str(Path('./chromedriver.exe').absolute())
        else:
            if brave:
                options.binary_location = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"
            path_to_chrome = str(Path('./chromedriver').absolute())
        self.browser = Chrome(path_to_chrome, options=options)

    def logging_in(self, url, login, password):
        self.browser.get(url)
        self.wait_until_css_element_object_found('#username')
        self.browser.find_element_by_css_selector('#username').send_keys(login)
        self.browser.find_element_by_css_selector('#password').send_keys(password)
        self.browser.find_element_by_css_selector('.btn-yellow').submit()

    def steal_token(self, token_app_name, token_json):
        self.wait_until_css_element_object_found('[title= "' + token_app_name + '"]')
        self.browser.find_element_by_css_selector('[title= "' + token_app_name + '"]').click()
        self.wait_until_css_element_object_found('#myInput')
        self.mindsphere_token = self.browser.find_element_by_css_selector('#myInput').text
        print(self.mindsphere_token)
        token_dict = {'auth_token': self.mindsphere_token}
        with open(token_json, 'w') as out:
            out.write(json.dumps(token_dict, indent=4) + '\n')
        self.browser.quit()

    def get_cookies_from_urls(self, urls, dest='cookies.json'):
        cookies = []
        for url in urls:
            self.browser.get(url)
            cookies = cookies + self.browser.get_cookies()

        with open(dest, 'w') as outfile:
            json.dump(cookies, outfile, indent=3)
        self.browser.quit()


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
    # fetching_token = GettingMindSphereToken(headless=True)
    fetching_token = GettingMindSphereToken()
    with open(credential_file, 'r') as reading_file:
        my_credentials = json.loads(reading_file.read())
    fetching_token.logging_in(my_credentials['host_list'][0], my_credentials['user_name'], my_credentials['password'])
    # fetching_token.steal_token('Token App', Path('hidden/token.json'))
