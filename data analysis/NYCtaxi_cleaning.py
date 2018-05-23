#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri May  4 12:31:35 2018

@author: elenamatemugica
"""

import requests
import pandas as pd
from pandas.io.json import json_normalize
import numpy as np
import datetime
import time

#QUERYING NYC HEALTH FACILITIES
endpoint = "https://health.data.ny.gov/resource/7xgt-tyms.json?$limit=50000&$offset=0"
headers = {'content-type': 'application/json'}
params={"county":  'Kings', "description": 'Hospital'}
params1={"county":  'Bronx',"description": 'Hospital'}
params2={"county":  'Richmond',"description": 'Hospital'}
params3={"county":  'Queens',"description": 'Hospital'}
params4={"county":  'New York',"description": 'Hospital'}

nyhealth2 = requests.get(endpoint, params=params, headers=headers )
nyhealth3= requests.get(endpoint, params=params1,headers=headers )
nyhealth4 = requests.get(endpoint, params=params2,headers=headers )
nyhealth5 = requests.get(endpoint, params=params3,headers=headers )
nyhealth6 = requests.get(endpoint, params=params4,headers=headers )

nyhealth2 = json_normalize(nyhealth2.json())
nyhealth3 = json_normalize(nyhealth3.json())
nyhealth4 = json_normalize(nyhealth4.json())
nyhealth5 = json_normalize(nyhealth5.json())
nyhealth6 = json_normalize(nyhealth6.json())

nyhealth =nyhealth2.append(nyhealth3)
nyhealth =nyhealth.append(nyhealth4)
nyhealth =nyhealth.append(nyhealth5)
nyhealth =nyhealth.append(nyhealth6)

pd.options.display.max_columns = None
pd.options.display.max_rows = None
nyhealth
nyhealthclean= nyhealth.drop(nyhealth.columns[[0,2,3,4,5,6,7,10,11,13,14,15,16,17,21,22,23,24,25,26,27,28,29,30,31,32,33]], axis=1)

nyhealthclean= nyhealthclean.dropna(axis=0, how='any')
nyhealthclean.index = range(len(nyhealthclean))

facilities= nyhealthclean[['facility_name', 'fac_id','latitude','longitude']]
facilities.to_csv('facilities.csv')

#QUERYING TAXI TRIPS
endpoint = "https://data.cityofnewyork.us/resource/pqfs-mqru.json?$limit=50000&$offset=0"
endpoint2 = "https://data.cityofnewyork.us/resource/pqfs-mqru.json?$limit=50000&$offset=50000"
endpoint3 = "https://data.cityofnewyork.us/resource/pqfs-mqru.json?$limit=50000&$offset=100000"
endpoint4 = "https://data.cityofnewyork.us/resource/pqfs-mqru.json?$limit=50000&$offset=150000"
endpoint5 = "https://data.cityofnewyork.us/resource/pqfs-mqru.json?$limit=50000&$offset=200000"
endpoint6 = "https://data.cityofnewyork.us/resource/pqfs-mqru.json?$limit=50000&$offset=250000"

taxi_trips = requests.get(endpoint,headers=headers )
taxi_trips = json_normalize(taxi_trips.json())
taxi_trips2 = requests.get(endpoint2,headers=headers )
taxi_trips2 = json_normalize(taxi_trips2.json())
taxi_trips3 = requests.get(endpoint3,headers=headers )
taxi_trips3 = json_normalize(taxi_trips3.json())
taxi_trips4 = requests.get(endpoint4,headers=headers )
taxi_trips4 = json_normalize(taxi_trips4.json())
taxi_trips5 = requests.get(endpoint5,headers=headers )
taxi_trips5 = json_normalize(taxi_trips5.json())
taxi_trips6 = requests.get(endpoint6,headers=headers )
taxi_trips6 = json_normalize(taxi_trips6.json())

taxi_trips= taxi_trips.append(taxi_trips2)
taxi_trips= taxi_trips.append(taxi_trips3)
taxi_trips= taxi_trips.append(taxi_trips4)
taxi_trips= taxi_trips.append(taxi_trips5)
taxi_trips= taxi_trips.append(taxi_trips6)

taxi_clean = taxi_trips.drop(taxi_trips.columns[[2,3,4,7,8, 9, 12,13,14, 15, 16, 17, 18 , 19]], axis=1)
taxi_clean.index = range(len(taxi_clean))

#CREATING BUFFERS

from scipy.spatial import cKDTree
points = list([(taxi_clean[['dropoff_latitude']],taxi_clean[['dropoff_longitude']])])

latlong= taxi_clean[['dropoff_latitude', 'dropoff_longitude']]
latlong=list(latlong.itertuples(index=False))
latlong
points2compare = nyhealthclean[['latitude','longitude']]
points2compare=list(points2compare.itertuples(index=False))
#CODE TO FIND NEIGHBOURGS

tree = cKDTree(latlong)
tree2 = cKDTree(points2compare)
indices = tree2.query_ball_tree(tree, .0025)
x =0
prueba= []
test=[]
for i in indices:
    test2= indices[x]
    test = test + test2
    x= x+1
hospital_trips=taxi_clean.loc[test]
hospital_trips= hospital_trips.dropna(axis=0, how='any')


import  pandas
import  json
hospital_trips.dtypes
hospital_trips.head()
hospital_trips["lpep_dropoff_datetime"] =  pd.to_datetime(hospital_trips["lpep_dropoff_datetime"], format="%Y/%m/%dT%H:%M:%S")
hospital_trips["lpep_pickup_datetime"] =  pd.to_datetime(hospital_trips["lpep_dropoff_datetime"], format="%Y/%m/%dT%H:%M:%S")
hospital_trips["dropoff_latitude"] =  hospital_trips["dropoff_latitude"].astype('float')
hospital_trips["dropoff_longitude"] =  hospital_trips["dropoff_longitude"].astype('float')
hospital_trips["pickup_latitude"] =  hospital_trips["pickup_latitude"].astype('float')
hospital_trips["pickup_longitude"] =  hospital_trips["pickup_longitude"].astype('float')

hospital_trips.index = range(len(hospital_trips))

hospital_trips = hospital_trips.drop(hospital_trips.index[[208,1315,1864, 1902, 2429,3714, 7157, 7202, 7220, 11408 , 13166]])

#CONVERTING TO A GEOJSON
#read_shapefile

import shapefile
shape = shapefile.Reader("/Users/elenamatemugica/Desktop/UCL/Spatial Data Capture/shapefile/nyu_2451_34513/nyu_2451_34513.shp")
file = ogr.Open("/Users/elenamatemugica/Desktop/UCL/Spatial Data Capture/shapefile/nyu_2451_34513/nyu_2451_34513.shp")
shape = file.GetLayer(0)
#first feature of the shapefile
feature = shape.GetFeature(0)
first = feature.ExportToJson()



json_result_string = hospital_trips.to_json(
    orient='records', 
    double_precision=12,
    date_format='iso'
)
json_result = json.loads(json_result_string)

hospital_trips.head()
geojson = {
    'type': 'FeatureCollection',
    'features': []
}
for record in json_result:
    geojson['features'].append({
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [record["pickup_longitude"], record["pickup_latitude"]],
        },
        'properties': record,
    })
with open('/Users/elenamatemugica/Desktop/UCL/Spatial Data Capture/hospital_trips.json', 'w') as f:
    f.write(json.dumps(geojson, indent=2))    

# import the SQLAlchemy libraries
import sqlalchemy
from sqlalchemy import create_engine

# create the connection string to the MySQL database
# replace USERNAME and PASSWORD with your own credentials 
engine = create_engine('mysql+pymysql://ucfnssa:nohagepucu@dev.spatialdatacapture.org:3306/ucfnssa')
# make the connection to the database
conn = engine.raw_connection()

# change TABLENAME for the name of your newly created table
# don't worry about the warning if you get it 
hospital_trips.to_sql('hospital_trips', engine, flavor='sqlite', )
