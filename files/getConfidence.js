#
#
# main() will be run when you invoke this action
#
# @param Cloud Functions actions accept a single parameter, which must be a JSON object.
#
# @return The output of this action, which must be a JSON object.
#
#
import sys
import urllib3, requests, json

def main(dict):
    
    # Set up userid/password to connect to Watson Machine Learning instance
    url = 'https://us-south.ml.cloud.ibm.com'
    userid = "9fd69918-93eb-4509-9fd0-ffb9567722d5"
    password = "116443ac-f042-446b-9bba-709dd2fe8389"
    endpoint = 'https://us-south.ml.cloud.ibm.com/v3/wml_instances/dea6c8e3-12b0-405e-b6be-ddbaad66ccb6/deployments/cc6e9848-5558-4250-8723-907c01ff6d72/online'
    
    age = 30
    income = 20000
    if 'age' in dict:
        age = dict['age']
    if 'income' in dict:
        income = dict['age']
    
    wml_credentials={
    "url": url,
    "username": userid,
    "password": password
    }

    # Request token authorization
    headers = urllib3.util.make_headers(basic_auth='{username}:{password}'.format(username=wml_credentials['username'], password=wml_credentials['password']))
    url = '{}/v3/identity/token'.format(wml_credentials['url'])
    response = requests.get(url, headers=headers)
    mltoken = json.loads(response.text).get('token')
    header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mltoken}

    # Set array for scoring and the whole payload to ML API
    array_of_values_to_be_scored = [0,"M","",2,income,"Y",age,0,0,0,0,"","","",0,0]
    payload_scoring = {"fields": ["ID", "Gender", "Status", "Children", "Est Income", "Car Owner", "Age", "LongDistance", "International", "Local", "Dropped", "Paymethod", "LocalBilltype", "LongDistanceBilltype", "Usage", "RatePlan"], "values": [array_of_values_to_be_scored]}
    # Send POST scoring request
    response_scoring = requests.post(endpoint, json=payload_scoring, headers=header)
    
    # Scoring response
    print("Scoring response:")
    valuesArray = json.loads(response_scoring.text).get('values')
    numFields = len(payload_scoring.get('fields'))
    confidenceLevels = valuesArray[0][numFields+2]
    confidenceLabels = valuesArray[0][numFields+5]
    print(confidenceLevels)
    print(confidenceLabels)
    
    return { 'confidence': confidenceLevels[0] }
    #"Result: "+'{:.2f}'.format(confidenceLevels[0])+'. Age: '+str(age) }
