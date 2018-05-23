
#review which columns have been changed -inded
import requests
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

pd.set_option('display.max_rows', 300) # specifies number of rows to show
pd.options.display.float_format = '{:40,.4f}'.format # specifies default number format to 4 decimal places
plt.style.use('ggplot') # specifies that graphs should use ggplot styling
#%matplotlib inline 

from pandas.io.json import json_normalize

list = ['1178','1164', '1286','1288', '1175','1294','1626','1628','1445','1486','1447', '1309','1165','1629','1301','1315','9700', '1450','1172','1638','1630','1305','1453','1454','3058','1169','1185','1168','1439',
'1324','1456','1639','1469','1466','9753','1304','1463','1446','1293','1460','3975','1464','1458','1437',
'1306','1637','1186','1633','1473','1738','1465','1176','1635','1740','1737','1320','1692','1318']




endpoint = "https://health.data.ny.gov/resource/y93g-4rqn.json?$limit=20000&$offset=0"
params = {"health_service_area":"New York City", 'facility_id': '1438'}
nycdis2=requests.get(endpoint, params = params)
nycdis2 = json_normalize(nycdis2.json())

for element in list: 
    params = {"health_service_area":"New York City", 'facility_id': element}
    nycdis = requests.get(endpoint, params = params)
    nycdis = json_normalize(nycdis.json())
    nycdis2 = nycdis2.append(nycdis)
  #  
test2=nycdis2['facility_id'].value_counts()
#0,2,3,4,5,6, 8, 10, 11, 12,13,14, 15,16,17,22, 25, 26,27,28, 30,31

nyc_clean= nycdis2.drop(nycdis2.columns[[0,2,3,4,5,6, 8, 10, 11, 12,13,14, 15,16,17,22, 25,26,27,28,30,31]], axis=1)

# make dataframe go from 1 to last result not 1 to 20,000 each time
nyc_clean= nyc_clean.dropna(axis=0, how='any')
nyc_clean.index = range(len(nyc_clean))

nyc_clean.head()

a = nyc_clean["facility_name"].value_counts()
a

nyc_clean["facility_id"].value_counts()


nyc_clean.isnull().values.any()
nyc_clean.isnull().sum().sum()
nyc_clean= nyc_clean.dropna(axis=0,how='any')
nyc_clean.isnull().sum().sum()

nyc_clean.dtypes
nyc_clean.head()
#facility_name- how many
test1=nyc_clean["facility_name"].value_counts()
test1

nyc_clean["facility_id"] = nyc_clean["facility_id"].astype('object')

nyc_clean["total_costs"] = nyc_clean["total_costs"].astype('float')
nyc_clean["total_charges"] = nyc_clean["total_charges"].astype('float')

nyc_clean.dtypes



p = nyc_clean.groupby(['facility_id']['facility_id']


#nyc_clean.groupby('facility_id').value_counts()

#nyc_clean.groupby('facility_id')['total_costs']

#nyc_clean.groupby('facility_id')[''].value_counts()




#add unstack doe to each graph line
# join together each dataframe into one data frame - done
# for each hospital have each ofthe important variable we want want exAMINE IN DATA VISULATATION
# for total patients to each hospital - done
# percentages of people by race visitng a hospital for example
# 


g = nyc_clean.groupby('facility_name')['total_costs'].mean()
graph = g.to_frame(name=None)


# how one each race went to each hospital
graph1 = nyc_clean.groupby('facility_name')['race'].value_counts().unstack(fill_value=0)


graph2 = nyc_clean.groupby('facility_name')['payment_typology_1'].value_counts().unstack(fill_value=0)
graph2

g3 = nyc_clean.groupby('facility_name')['total_charges'].mean()
graph3 = g3.to_frame(name=None)



graph4 = nyc_clean.groupby('facility_name')['gender'].value_counts().unstack(fill_value=0)

graph5 = nyc_clean.groupby('facility_name')['ethnicity'].value_counts().unstack(fill_value=0)


graph6 = nyc_clean.groupby('facility_name')['age_group'].value_counts().unstack(fill_value=0)


graph7 = nyc_clean.groupby('facility_name')['apr_risk_of_mortality'].value_counts().unstack(fill_value=0)


graph8 = nyc_clean.groupby('facility_name')['apr_severity_of_illness_description'].value_counts().unstack(fill_value=0)

#facilityid






#we10 = graph9.to_frame(name=None)
#we10.head()
graph10 = nyc_clean.groupby('facility_name')['type_of_admission'].value_counts().unstack(fill_value=0)

##########gives how many patients visited each hiospital overal # ADD T1 to 
test1=nyc_clean["facility_name"].value_counts()
test1
t1 = test1.to_frame(name=None)



#merge everything into one data frame
yu = pd.merge(graph1, graph2, right_index=True, left_index=True)
yu1 = pd.merge(graph3, graph4, right_index=True, left_index=True)
yu2 = pd.merge(graph5, graph6, right_index=True, left_index=True)
yu3 = pd.merge(graph7, graph8, right_index=True, left_index=True)


yu5 = pd.merge(yu, yu1, right_index=True, left_index=True)
yu6 = pd.merge(yu2, yu3, right_index=True, left_index=True)


final = pd.merge(yu6, yu5, right_index=True, left_index=True)
finala = pd.merge(final, graph10, right_index=True, left_index=True)



final2 = pd.merge(finala,graph,right_index=True, left_index=True )
final3 =  pd.merge(final2,t1,right_index=True, left_index=True )


#renaming columns
final3.rename(columns={'Extreme_x': 'Extreme risk', 'Major_x': 'Major risk'}, inplace=True)
final3.rename(columns={'Minor_x': 'Minor risk','Moderate_x': 'Moderate risk'}, inplace=True)
final3.rename(columns={'Extreme_y': 'Extreme severity', 'Major_y': 'Major severity'}, inplace=True)
final3.rename(columns={'Minor_y': 'Minor severity','Moderate_y': 'Moderate severity'}, inplace=True)
final3.rename(columns={'Unknown_x': 'Unknown ethnicity','Unknown_y': 'Unknown payment'}, inplace=True)

# add pateints by race as percenatges - we only want things as percentages
final3['per_hispanic']=(final3['Spanish/Hispanic']/final3['facility_name']*100)
final3['per_nonHispanic']=(final3['Not Span/Hispanic']/final3['facility_name']*100)
final3['per_Multi-ethnic']=(final3['Multi-ethnic']/final3['facility_name']*100)
final3['per_Unknownethnicity']=(final3['Unknown ethnicity']/final3['facility_name']*100)
final3['per_0-17']=(final3['0 to 17']/final3['facility_name']*100)
final3['per_18-29']=(final3['18 to 29']/final3['facility_name']*100)
final3['per_30-49']=(final3['30 to 49']/final3['facility_name']*100)
final3['per_50-69']=(final3['50 to 69']/final3['facility_name']*100)
final3['per_70 or Older']=(final3['70 or Older']/final3['facility_name']*100)
final3['per_extremerisk']=(final3['Extreme risk']/final3['facility_name']*100)
final3['per_majorrisk']=(final3['Major risk']/final3['facility_name']*100)
final3['per_minorrisk']=(final3['Minor risk']/final3['facility_name']*100)
final3['per_moderaterisk']=(final3['Moderate risk']/final3['facility_name']*100)
final3['per_extremeseverity']=(final3['Extreme severity']/final3['facility_name']*100)
final3['per_majorseverity']=(final3['Major severity']/final3['facility_name']*100)
final3['per_minorsevrity']=(final3['Minor severity']/final3['facility_name']*100)
final3['per_moderateseverity']=(final3['Moderate severity']/final3['facility_name']*100)
final3['per_black']=(final3['Black/African American']/final3['facility_name']*100)
final3['per_multiracial']=(final3['Multi-racial']/final3['facility_name']*100)
final3['per_otherrace']=(final3['Other Race']/final3['facility_name']*100)
final3['per_white']=(final3['White']/final3['facility_name']*100)
final3['per_bluecross/blueshield']=(final3['Blue Cross/Blue Shield']/final3['facility_name']*100)
final3['per_depofcorrections']=(final3['Department of Corrections']/final3['facility_name']*100)
final3['per_Federal/State/Local/VA']=(final3['Federal/State/Local/VA']/final3['facility_name']*100)
final3['per_managedcare']=(final3['Managed Care, Unspecified']/final3['facility_name']*100)
final3['per_medicaid']=(final3['Medicaid']/final3['facility_name']*100)
final3['per_medicare']=(final3['Medicare']/final3['facility_name']*100)
final3['per_miscpayment']=(final3['Miscellaneous/Other']/final3['facility_name']*100)

#renaming columns to make them clearer 
final3['Number of patients at hospital']=final3['facility_name']
del final3['facility_name']



#   


#Self-Pay  Unknown


final3.head()


# Deleting irrelevant columns
del final3['U']
del final3['Not Available']
del final3['Multi-ethnic']
del final3['Spanish/Hispanic']
del final3['Not Span/Hispanic']

del final3['0 to 17']
del final3['18 to 29']
del final3['30 to 49']
del final3['50 to 69']
del final3['70 or Older']
del final3['Extreme risk']
del final3['Major risk']
del final3['Minor risk']
del final3['Moderate risk']
del final3['Extreme severity']
del final3['Major severity']
del final3['Minor severity']
del final3['Moderate severity']
del final3['Black/African American']
del final3['Multi-racial']
del final3['Other Race']
del final3['White']
del final3['Blue Cross/Blue Shield']
del final3['Department of Corrections']
del final3['Federal/State/Local/VA']
del final3['Managed Care, Unspecified']
del final3['Medicaid']
del final3['Medicare']
del final3['Miscellaneous/Other']
del final3['Elective']
del final3['Emergency']
del final3['Newborn']
del final3['Trauma']
del final3['Urgent']

del final3['Unknown ethnicity']
del final3['M']
del final3['F']
del final3['Unknown payment']
del final3['Private Health Insurance']
del final3['Self-Pay']


#del final3['patients']




#p


final3.head()


graphss= pd.read_csv('spatialgraphs.csv')

#,


              

# mount sinai is mount sinai west is rooselvet
blocks = pd.read_csv('C:/Users/HP/Documents/facilities1.csv')

total1 = blocks.merge(final3,how='left',right_index=True,left_on='facility_name')



total1.to_csv('graphs.csv', sep='\t')


total1.to_csv('C:/Users/HP/Documents/spatialgraphs.csv')
#BronxCare Hospital Center
#Bronx-Lebanon Hospital Center - Concourse Division


import sqlalchemy
from sqlalchemy import create_engine

# create the connection string to the MySQL database
# replace USERNAME and PASSWORD with your own credentials 
engine = create_engine('mysql+pymysql://ucfnssa:nohagepucu@dev.spatialdatacapture.org:3306/ucfnssa')
# make the connection to the database
conn = engine.raw_connection()

# change TABLENAME for the name of your newly created table
# don't worry about the warning if you get it 
spatialgraphs.to_sql('spatialgraphs', engine, flavor='sqlite')















final2.head()
graph9 = pd.DataFrame(List2)
graph9.columns = ['facilityid']
graph9.head()


List2 = ['1164', '1165', '1168','1169','1172', '1175', '1176', '1178','1186','1286','1288', '1293','1294', '1301','1304','1305','1306','1309', '1315','1318','1320',                                
'1324','1437','1438','1439','1445','1446','1447','1450','1453','1454','1456','1458','1460','1463','1464','1466','1469','1473','1486','1626','1628','1629','1630','1633','1635','1637','1638','1639','1692','1737','1738','1740','3058' ,'3975']                             

#1438







# drop regions, drop unknowns, add facility idd 

ab = nyc_clean.groupby('facility_name').value_counts()
#we10 = graph9.to_frame(name=None)
#we10.head()


#insurance, gendr, payment things- merge all together into one dataframe
# create 
#from collections import defaultdict













# split each string in the series into a list of individual characters
c = [list(x) for x in b]
# save it as a dataframe
df = pd.DataFrame(c)

#gives dataframe
g1 = nyc_clean.groupby( [ "facility_name", "total_costs"] ).mean()



g4=g1.as_matrix
g4

#gives series
g1 = nyc_clean.groupby('facility_name')['total_costs'].mean()


#df = pd.DataFrame([g1])
#print (df)








import matplotlib.pyplot as plt








plt.scatter('gender','total_charges')
plt.show()


output = pd.scatter_matrix(nyc_clean, alpha=0.2, figsize=(12, 12), diagonal='kde')

nyc_clean.corr()

from sklearn.preprocessing import LabelEncoder

lb_make = LabelEncoder()
nyc_clean["eth code"] = lb_make.fit_transform(nyc_clean["ethnicity"])
nyc_clean[["ethnicity", "eth code"]].head(11)

from sklearn.preprocessing import LabelBinarizer

lb_style = LabelBinarizer()
lb_results = lb_style.fit_transform(nyc_clean["ethnicity"])
pd.DataFrame(lb_results, columns=lb_style.classes_).head()


b = [str(x) for x in lb_results]
print(b)

nyc_clean['Multi-ethnic']=lb_results[:,0]
nyc_clean['Not Span/Hispanic']=lb_results[:,1]
nyc_clean['Spanish/Hispanic']=lb_results[:,2]
nyc_clean['Unknown']=lb_results[:,3]

nyc_clean['facility_id']
test = nyc_clean.groupby('facility_name')
test
###this works
graph5 = nyc_clean.groupby('facility_name') ['ethnicity'].value_counts().unstack(fill_value=0)
we6 = graph5.to_frame(name=None)
we6.head()







nyc_clean['Hispanic'].value_counts()

import statsmodels.formula.api as smf
import scipy.stats as scipystats
import statsmodels.api as sm
import statsmodels.stats.stattools as stools
import statsmodels.stats as stats
from statsmodels.graphics.regressionplots import *
import matplotlib.pyplot as plt
import seaborn as sns

value = nyc_clean.iloc[1:,11 ]
values_x=nyc_clean.iloc[1:,16:]


X_values=sm.add_constant(values_x)
reg = sm.OLS(np.log(value), X_values)
reg2=reg.fit()
reg2.summary()

nyc_clean.corr()

plt.hist(np.log(value), bins='auto')
plt.show()

plt.hist(apr_risk_of_mortality, bins='auto')
plt.show()





plt.hist(, bins='auto')
plt.show()




from sklearn.cluster import DBSCAN
lok=nyc_clean[['ethnicity','hospital_county']]

output = pd.scatter_matrix(nyc_clean, alpha=0.2, figsize=(12, 12), diagonal='kde')


lb_style = LabelBinarizer()
lb_results1 = lb_style.fit_transform(nyc_clean["apr_risk_of_mortality"])
pd.DataFrame(lb_results1, columns=lb_style.classes_).head()
nyc_clean['Minor', 'Moderate', 'Major', 'Extreme']=lb_results1[:,0,1,2,3]


groupby_regiment = nyc_clean['facility_id'].groupby(nyc_clean['total_costs'])
groupby_regiment


## severity vs total costs(log)
# label binarizer for all relevant
# summriseing lb labels into one line
# 

# plot categorica data- logistic regression 
# 
#percentage pandas express columns as percentages
#test2 = nyc_clean.groupby('facility_name')['race'].value_counts().unstack(fill_value=0)
#t2 = test2.to_frame(name=None)
#test3 = nyc_clean.groupby('facility_name')['race'].value_counts().unstack(fill_value=0)
#t3= nyc_clean.groupby('facility_name').size() / nyc_clean.groupby('facility_name').size().sum()
#t3 = test3.to_frame(name=None)

#t9= nyc_clean.groupby('facility_name')['race'].size() / nyc_clean.groupby('facility_name')['race'].size().sum()

#t10= nyc_clean.groupby('facility_name')['race'].size().unstack(fill_value=0) / nyc_clean.groupby('facility_name')['race'].size().sum().unstack(fill_value=0)

#t0= nyc_clean.groupby('facility_name').size() / nyc_clean.groupby('facility_name').size().sum()


t#3 = test3.to_frame(name=None)

#t11 = nyc_clean.groupby('facility_name')['race'].size().apply(lambda x: float(x) / nyc_clean.groupby('facility_name')['race'].size().sum()*100)


#nyc_clean[test3] = nyc_clean[test3].div(nyc_clean[test3].sum(axis=1), axis=0).multiply(100)






