# %%
# Load the data
from matplotlib import pyplot as plt
import re
from sklearn.decomposition import PCA
import csv
import numpy as np
from pprint import pprint

with open("./data/food-survey.csv") as fin:
    reader = csv.reader(fin, delimiter=",")
    raw_data = list(reader)

    def convert(raw_data):
        return np.nan if raw_data == "" else int(raw_data)

    data = [[convert(rating) for rating in row]
            for row in [row[3:-2] for row in raw_data][1:]]
    mat = np.array(data).T

print(mat, mat.shape)

# %%
# Some fun stats
mean = np.nanmean(mat)
n_foods, n_people = mat.shape

print(f"Mean of nonzero entries: {mean}")
print(f"Count of nonzero entries: {np.count_nonzero(~np.isnan(data))}")

col_mean = np.nanmean(mat, axis=0)
inds = np.where(np.isnan(mat))
mat[inds] = np.take(col_mean, inds[1])

print(mat)

# %%
# Let's do some PCA!
pca = PCA(n_components=3)

principal_components = pca.fit_transform(mat)

# %%
# Get food labels

pattern = r".*?\[(.*)].*"
food_labels = [re.findall(pattern, header)[0] for header in raw_data[0][3:-2]]

# %%

print(principal_components.shape)

fig = plt.figure(figsize=(10, 10))
axes = fig.add_subplot(projection="3d")
axes.scatter(principal_components[:, 0],
             principal_components[:, 1], principal_components[:, 2])

# for food, coords in zip(food_labels, principal_components):
#     plt.annotate(food, coords)


plt.show()
