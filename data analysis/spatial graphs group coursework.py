import matplotlib.pyplot as plt
import numpy as np
from matplotlib import colors
import pandas as pd
from pandas.tools.plotting import scatter_matrix

spatialgraphs = pd.read_csv('C:/Users/HP/Documents/spatialgraphs.csv')


spatialgraphs.head()

del spatialgraphs['Unnamed: 0']

sg = spatialgraphs.set_index('facility_name')
spatialgraphs


#scatter plots
output = pd.scatter_matrix(spatialgraphs, alpha=0.2, figsize=(12, 12), diagonal='kde')

outputnew = pd.scatter_matrix(spatialgraphs, alpha=0.2, figsize=(6, 6), diagonal='hist')



spatialgraphs.plot.bar(stacked=True)


df2 = pd.DataFrame(sg, columns=['per_white', 'per_black'])
df2.plot.bar()







# initial analysis of data- turn these into tables
a= spatialgraphs.describe()
a

b= spatialgraphs.corr()

#are they any null valuces
spatialgraphs.isnull().values.any()
spatialgraphs.dtypes

output_hist=pd.scatter_matrix(spatialgraphs, alpha=0.2, figsize=(12, 12), diagonal='hist')

spatialgraphs.head()
spatialgraphs







#### log total costs and total charges within a pandas dataframe



np.log(df.price).diff()
spatialgraphs.log('total_costs')

plt.scatter(spatialgraphs['per_white'],spatialgraphs['per_70 or Older'],color='red')


from sklearn.linear_model import LinearRegression

#medicaid and 18-29 
#Medicaid  and white people


spatial_prediction= spatialgraphs[['per_private','per_white']]

y =spatial_prediction ['per_white'].values.reshape(len(spatial_prediction['per_white']), 1)
X =spatial_prediction ['per_private'].values.reshape(len(spatial_prediction['per_private']), 1) # add attribute names
lr = LinearRegression()
lr.fit(X,y)
lr.fit(X,y).intercept_
lr.fit(X,y).coef_


lr.score(X,y)



plt.figure(figsize=(12, 8))
plt.scatter(X, y, color='black', alpha=0.2, label='Real')
plt.plot(X, lr.predict(X), color='blue', label='LR')
plt.xlabel('per_medicare')
plt.ylabel('per_hispanic')
plt.legend()
plt.show()












from sklearn.cluster import DBSCAN



plt.hist(spatialgraphs, total_charges, bins='auto')
plt.show()

sa=spatialgraphs[['total_costs','per_hispanic']]
sa

import sklearn.preprocessing as preprocessing
scaled = preprocessing.scale(sa) 
scaled

dbscan = DBSCAN(eps=0.3, min_samples=10) # create DBSCAN cluster object
dbscan = DBSCAN(eps=0.3, min_samples=10) # run the .fit() function on the scaled dataset


dbscan_labels = dbscan.labels_

from sklearn import metrics
metrics.silhouette_score(scaled, dbscan_labels)



sa.plot.scatter(x='total_costs', y='per_hispanic')

log('total_costs')










