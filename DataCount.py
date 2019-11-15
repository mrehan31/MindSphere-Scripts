from pathlib import Path
import json


def counting_response(table):
    print(len(table))
    data_points = 0
    for each_record in table:
        variable = list(filter(lambda x: '_time' not in x, each_record))
        variable = list(filter(lambda x: 'qc' not in x.split('_')[-1], variable))
        data_points += len(variable)
    print(data_points)


file_loc = str(Path('./Responses/TimeSeries.json').relative_to('.'))

print(file_loc)
with open(file_loc) as response:
    json_response = json.loads(response.read())
if 'records' in json_response:
    counting_response(json_response['records'])
else:
    counting_response(json_response)