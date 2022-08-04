# Predict where people fall on the map based on their food preferences
import pickle
import numpy as np

with open("./pca_models/people_2d_model.pkl", "rb") as fin:
    pca_2d = pickle.load(fin)


def transform(prefs):
    mean = np.nanmean(prefs)
    for i in range(len(prefs)):
        if np.isnan(prefs[i]):
            prefs[i] = mean

    std = np.std(prefs)
    prefs = (prefs - mean) / std

    prefs = prefs.reshape(1, -1)

    return pca_2d.transform(prefs)


def get_point(spreadsheet_row):
    prefs = []
    parts = spreadsheet_row.split("\t")[3:-2][:50]

    for part in parts:
        prefs.append(np.nan if part == "" else float(part))

    prefs = np.array(prefs)
    return transform(prefs)

while True:
    col = input("\nRow: ")
    try:
        print(get_point(col))
    except:
        print("Error :(")
