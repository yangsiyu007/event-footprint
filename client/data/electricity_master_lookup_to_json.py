"""
Convert a CSV version of the Electricity Master Lookup table to a JSON
"""

import json

import pandas as pd


with open('electricity_master_lookup.csv') as f:
    csv_table = pd.read_csv(f, header=0)

print(csv_table.head(5))

json_table = {}  # "Electric Subregion" to "t CO2e / kWh"

for i, row in csv_table.iterrows():
    json_table[row['Electric Subregion']] = row['t CO2e / kWh']

assert json_table['United States - NWPP'] == 0.0002972
print(f'In JSON table, United States - NWPP is {json_table["United States - NWPP"]}')

with open('electricity_master_lookup.json', 'w') as f:
    json.dump(json_table, f, indent=2)
