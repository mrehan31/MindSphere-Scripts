from selenium.webdriver import ChromeOptions
from selenium.webdriver import Chrome
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from pathlib import Path
import time
import os
import json
import asyncio

with open('AppIdInTenant.json', 'r') as file:
    app_list = json.loads(file.read())

credential_file = Path('hidden/credential.json')
with open(credential_file, 'r') as reading_file:
        my_credentials = json.loads(reading_file.read())
task_dict = {}
corresponding_url_dict = {}
start = time.perf_counter()

options = ChromeOptions()
options.add_argument("disable-extensions")
options.add_argument("incognito")
if False:
    options.add_argument("headless")
if os.name == 'nt':
    path_to_chrome = str(Path('./chromedriver.exe').relative_to('.'))
else:
    path_to_chrome = str(Path('./chromedriver').absolute())
browser = Chrome(path_to_chrome, options=options)
browser.get('https://academy2.eu1.mindsphere.io')
# wait_until_css_element_object_found('#login-button')
browser.find_element_by_css_selector('#emailAddress').send_keys(my_credentials['user_name'])
browser.find_element_by_css_selector('#passLogin').send_keys(my_credentials['password'])
browser.find_element_by_css_selector('#login-button').submit()

from time import sleep

def appIdToURL(appid):
    browser.get(appid)
    sleep(3)
    wait = WebDriverWait(browser, 10)
    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'input[placeholder="app.example.com"')))
    if len(browser.find_elements_by_css_selector('#comp\.url\.1')) == 1:
        corresponding_url_dict[appid] = [browser.find_element_by_css_selector('#comp\.url\.0').get_attribute('value'),
                                        browser.find_element_by_css_selector('#comp\.url\.1').get_attribute('value')]
    else:
        corresponding_url_dict[appid] = [browser.find_element_by_css_selector('#comp\.url\.0').get_attribute('value')]

[appIdToURL(app) for app in app_list]
browser.quit()

with open('AppUniqueURL.json', 'w') as file:
    file.write(json.dumps(corresponding_url_dict, indent=4, sort_keys=True))

finish = time.perf_counter()
print(f"Tasks Completed in {round(finish-start, 2)} second(s)")
