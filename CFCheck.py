from CloudFoundry import *
from pprint import pprint

credential_file = Path('./hidden/credential.json')
with open(credential_file, 'r') as reading_file:
    my_credentials = json.loads(reading_file.read())
user_list = [f"{my_credentials['pre_screenname']}{acc_num}{my_credentials['post_screenname']}" for acc_num in range(51,61)]
print(user_list)
temporary_passcode_dict = {}
for each_user in user_list:
    print(each_user)
    cf_instance = CloudFoundry(headless=False)
    cf_instance.logging_in(each_user, my_credentials['mdsp_password'])
    cf_instance.get_temporary_passcode()
    print(cf_instance.temporary_passcode)
    temporary_passcode_dict[each_user] = cf_instance.temporary_passcode
pprint(temporary_passcode_dict)
