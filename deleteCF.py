import subprocess
from time import perf_counter
import concurrent.futures

cf_apps_response = subprocess.check_output('cf apps', shell=True)
apps_raw_list = cf_apps_response.decode().split('\n')[4:]
apps_list = list(map(lambda app_name: app_name.split(' ')[0], apps_raw_list))[:-1]

def delete_apps(app_name):
    subprocess.check_output(f'cf delete {app_name} -f', shell=True)

start = perf_counter()

with concurrent.futures.ThreadPoolExecutor() as executor:
    results = executor.map(delete_apps, apps_list)

finish = perf_counter()

print(f'Finished in {round(finish-start, 5)} second(s)')