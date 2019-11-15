from selenium.webdriver import ChromeOptions
from selenium.webdriver import Chrome
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from pathlib import Path
import os
import json
from time import sleep


class OpenAir(object):

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
        self.browser.get('https://psa.industrysoftware.automation.siemens.com/dashboard.pl?action=paint;_api=673220;app=ma;uid=0C_784Rz6BGcckbUO344ug;r=CQipU0r8675')
        self.wait_until_css_element_object_found('#username')
        self.browser.find_element_by_css_selector('#username').send_keys(login)
        # self.browser.find_element_by_css_selector('#emailaddress').send_keys(login)
        self.browser.find_element_by_css_selector('#password').send_keys(password)
        self.browser.find_element_by_css_selector('.btn-yellow').submit()
        input("Enter your PKI card info and THEN hit Enter here => ")

    def create_new_time_sheet(self, send_date, project_dict):
        self.wait_until_css_element_object_found('#oa3_toolbox_create_new')
        self.browser.find_element_by_css_selector('#oa3_toolbox_create_new').click()
        self.wait_until_css_element_object_found('#oa3_global_create_new')
        self.browser.find_element_by_link_text('Timesheets: Timesheet, New').click()
        self.wait_until_css_element_object_found('select[name="range"]')
        self.browser.find_element_by_css_selector('select[name="range"]').send_keys('Other')
        self.browser.find_element_by_css_selector('#date').send_keys(send_date)
        self.browser.find_element_by_css_selector('input[name="save"]').click()
        error_list = self.browser.find_elements_by_css_selector('span.err_msg')
        if error_list:
            for each_text in error_list:
                print(each_text.text)
                self.browser.find_element_by_css_selector('.nav_active').click()
                self.wait_until_css_element_object_found('#list_data')
                sleep(3)
                for each_open_time_sheet in self.browser.find_elements_by_css_selector(
                        '#list_data .listCellContent_sheetname'):
                        if send_date in each_open_time_sheet.find_element_by_partial_link_text('Timesheet').text:
                            each_open_time_sheet.click()
                            self._selecting_projects_and_tasks2(project_dict)
                            break
        else:
            self._selecting_projects_and_tasks2(project_dict)

    def _selecting_projects_and_tasks2(self, project_task_week_hours_dict):
        for index_project, each_project in enumerate(project_task_week_hours_dict):
            self.wait_until_css_element_object_found('#ts_c1_r'+str(index_project+1))
            self.browser.find_element_by_css_selector('#ts_c1_r'+str(index_project+1)).send_keys(each_project)
            hours_worked = [0]*7
            for each_task in project_task_week_hours_dict[each_project]:
                self.browser.find_element_by_css_selector('#ts_c2_r'+str(index_project+1)).send_keys(each_task)
                self.browser.find_element_by_css_selector('#ts_pte_'+str(index_project+1)).send_keys('0.00')
                for each_date in project_task_week_hours_dict[each_project][each_task]:
                    if 'Mon' in each_date:
                        hours_worked[0] = project_task_week_hours_dict[each_project][each_task][each_date]
                    elif 'Tue' in each_date:
                        hours_worked[1] = project_task_week_hours_dict[each_project][each_task][each_date]
                    elif 'Wed' in each_date:
                        hours_worked[2] = project_task_week_hours_dict[each_project][each_task][each_date]
                    elif 'Thur' in each_date:
                        hours_worked[3] = project_task_week_hours_dict[each_project][each_task][each_date]
                    elif 'Fri' in each_date:
                        hours_worked[4] = project_task_week_hours_dict[each_project][each_task][each_date]
                    elif 'Sat' in each_date:
                        hours_worked[5] = project_task_week_hours_dict[each_project][each_task][each_date]
                    elif 'Sun' in each_date:
                        hours_worked[6] = project_task_week_hours_dict[each_project][each_task][each_date]
            for index_day, each_day in enumerate(hours_worked):
                self.browser.find_element_by_css_selector('#ts_c'+str(index_day+3)+'_r'+str(index_project+1)).send_keys(each_day)
        self.browser.find_element_by_css_selector('#timesheet_savebutton').click()
        # self._submit_time_sheet()

    def find_all_projects(self, project_file_name_to_save):
        project_structure = {}
        self.wait_until_css_element_object_found('#ts_c1_r1 option')
        for each_project in self.browser.find_elements_by_css_selector('#ts_c1_r1 option'):
            project_name = each_project.text
            if project_name:
                self.browser.find_element_by_css_selector('#ts_c1_r1').send_keys(project_name)
                tasks_esx = self.browser.find_elements_by_css_selector('#ts_c2_r1 option')
                tasks_list = []
                for each_task in tasks_esx:
                    if each_task:
                        tasks_list.append(each_task.text)
                project_structure[project_name] = tasks_list
        with open(project_file_name_to_save, 'w') as out:
            out.write(json.dumps(project_structure, indent=4) + '\n')
        self.browser.quit()

    def selecting_projects_and_tasks(self):
        self.browser.find_element_by_css_selector('#ts_c2_r1').send_keys('Siemens PLM Internal : Utilized Internal')
        self.browser.find_element_by_css_selector('#ts_c2_r1').send_keys('3')
        self.browser.find_element_by_css_selector('#ts_pte_1').send_keys('0.00')
        # Mon to Fri
        hours_worked = [8, 8, 8, 8, 8, 0, 0]
        for index_day, each_day in enumerate(hours_worked):
            self.browser.find_element_by_css_selector('#ts_c'+str(index_day+3)+'_r1').send_keys(each_day)
        # self.browser.find_element_by_css_selector('#timesheet_savebutton').click()

    def _go_to_existing_time_sheet(self):
        self.wait_until_css_element_object_found('div.dash_portlet-content')
        self.browser.find_element_by_partial_link_text('Open Timesheet').click()

    def _get_all_open_time_sheets(self, open_time_sheet_location_to_save):
        unsubmitted_time_sheets = []
        self.wait_until_css_element_object_found('#list_data')
        for each_open_time_sheet in self.browser.find_element_by_css_selector('#list_data').find_elements_by_css_selector('.listCellContent_sheetname'):
            unsubmitted_time_sheets.append(each_open_time_sheet.find_element_by_partial_link_text('Timesheet').text)
        with open(open_time_sheet_location_to_save, 'w') as out:
            out.write(json.dumps(unsubmitted_time_sheets, indent=4) + '\n')
        for index, each_unsubmit_time_sheet in enumerate(unsubmitted_time_sheets):
            print('{}.) {}'.format(index, each_open_time_sheet.text))
        which_time_sheet = input('Choose a number that you want to update?=> ')
        self.browser.find_element_by_css_selector('#list_data').find_elements_by_css_selector(
            '.listCellContent_sheetname')[int(which_time_sheet)].click()

    def _select_from_open_time_sheets(self):
        my_test = 'Timesheet for 04/01/19 to 04/07/19'
        for each_open_time_sheet in self.browser.find_element_by_css_selector('#list_data').find_elements_by_css_selector('.listCellContent_sheetname'):
            if each_open_time_sheet.find_element_by_partial_link_text('Timesheet').text == my_test:
                each_open_time_sheet.find_element_by_partial_link_text('Timesheet').click()
                break

    def _submit_time_sheet(self):
        self.wait_until_css_element_object_found('td.nav_item_options a')
        self.browser.find_elements_by_css_selector('td.nav_item_options a')[3].click()
        self.wait_until_css_element_object_found('#formButtonsBottom input')
        self.browser.find_elements_by_css_selector('#formButtonsBottom input')[1].click()
        self.browser.quit()

    def wait_until_css_element_object_found(self, css_param, wait_time=10):
        wait = WebDriverWait(self.browser, wait_time)
        wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, css_param)))


if __name__ == '__main__':
    open_air_instance = OpenAir()

    #Creating New Timesheet
    # open_air_instance.logging_in()
    # open_air_instance.create_new_time_sheet('04/08/19')

    #Getting All Project/Task from Existing Timesheets
    # open_air_instance.logging_in()
    # open_air_instance._go_to_existing_time_sheet()
    # open_air_instance._get_all_open_time_sheets(Path('OpenTimeSheets/ExistingTimeSheets.json'))
    # open_air_instance.find_all_projects(Path('OpenTimeSheets/MyProjectStructure.json'))

    #Finishing Up Existing TimeSheets
    credential_file = Path('hidden/credential.json')
    with open(credential_file, 'r') as reading_file:
        my_credentials = json.loads(reading_file.read())

    with open(Path('OpenTimeSheets/SubmitSchedule.json'), 'r') as reading_file:
        submit_time_sheets_dict = json.loads(reading_file.read())
    open_air_instance.logging_in(my_credentials['user_name'], my_credentials['password'])
    for each_date2 in submit_time_sheets_dict:
        print(each_date2)
        open_air_instance.create_new_time_sheet(each_date2, submit_time_sheets_dict[each_date2])




