import subprocess
import re
from pprint import pprint
import json
from time import perf_counter

start = perf_counter()
original_target = subprocess.check_output("cf target", shell=True, universal_newlines=True)
original_space = re.sub(' +', ' ', original_target.split('\n')[4]).split(' ')[-1]
print(f'My Original Space is {original_space}')

get_raw_orgs = subprocess.check_output('cf spaces', shell=True, universal_newlines=True)
text_orgs = re.sub(r'.*\.\.\.\s*name', '', get_raw_orgs).strip()
orgs_list = text_orgs.split('\n')

big_tree = {}
app_url_list = []

for each_org in orgs_list:
    subprocess.check_output(f'cf target -s {each_org}', shell=True, universal_newlines=True)
    get_apps_from_org = subprocess.check_output(f'cf apps', shell=True, universal_newlines=True)
    if len(get_apps_from_org.split('No apps found')) >= 2:
        big_tree[each_org] = None
    else:
        my_output =re.sub(r' +', ' ', get_apps_from_org)

        big_tree[each_org] = {}

        body_part = re.sub(r'Getting.*\nOK\n+name.*urls\n', '', my_output)
        body_part_stripped = re.sub(r' +', ' ', body_part).split('\n')
        for each_line in body_part_stripped[:-1]:
            args_in_line = each_line.split(' ')
            big_tree[each_org][args_in_line[-1]] = args_in_line[0]
            app_url_list.append(args_in_line[-1])

pprint(big_tree)
with open('AppTreeOwnership.json', 'w') as file:
    file.write(json.dumps(big_tree, indent=4, sort_keys=True))
with open('AppURLInCF.json', 'w') as file:
    file.write(json.dumps(app_url_list, indent=4, sort_keys=True))

subprocess.check_output(f'cf target -s {original_space}', shell=True, universal_newlines=True)

finish = perf_counter()
print(f'Script took {round(finish-start,2)} second(s) to execute')
