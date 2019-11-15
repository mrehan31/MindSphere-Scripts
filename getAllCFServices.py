import subprocess
from time import perf_counter
import re
import json
from pprint import pprint

original_target = subprocess.check_output("cf target", shell=True, universal_newlines=True)
original_space = re.sub(' +', ' ', original_target.split('\n')[4]).split(' ')[-1]
print(f'My Original Space is {original_space}')

get_raw_orgs = subprocess.check_output('cf spaces', shell=True, universal_newlines=True)
text_orgs = re.sub(r'.*\.\.\.\s*name', '', get_raw_orgs).strip()
orgs_list = text_orgs.split('\n')

service_tree = {}
def check_cf_services(space_name):
    subprocess.check_output(f'cf target -s {space_name}', shell=True, universal_newlines=True)
    service_output_raw =subprocess.check_output(f'cf services', shell=True, universal_newlines=True)
    service_list = []
    if len(service_output_raw.split('No services found')) < 2:
        raw_backing_string = re.sub(r'Getting.*[\n]*.*\n', '', service_output_raw).replace('\n','')
        raw_backing_string = re.sub(r' +', ' ', raw_backing_string)
        brackets = raw_backing_string.strip().split('\n')
        for each_row in brackets:
            service_list.append(each_row.split()[2])
    service_tree[space_name] = service_list

start = perf_counter()

list(map(lambda x: check_cf_services(x), orgs_list))

finish = perf_counter()
subprocess.check_output(f'cf target -s {original_space}', shell=True, universal_newlines=True)
pprint(service_tree)
print(f'Finished in {round(finish-start, 5)} second(s)')
with open('AppServicesTreeOwnership.json', 'w') as file:
    file.write(json.dumps(service_tree, indent=4, sort_keys=True))