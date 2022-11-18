# PCA food map

Runs [principal component analysis](https://en.wikipedia.org/wiki/Principal_component_analysis) on people's food preferences to see patterns in food. Part of my [Canada/USA Mathcamp 2022](https://www.mathcamp.org/) project.

## Project structure

### Analysis (`./analysis`)

This part is in Python and actually runs the PCA.

#### Setup

Create a folder called `data` in `./analysis` and download the survey data (from the Google Forms responses) as `data/food-survey.csv` (no preprocessing needed).

To get cool plots, run `./analysis/food_pca.ipynb` and `./analysis/people_pca.ipynb` with whatever Jupyter notebook tools you use.

#### Requirements

- The ability to run Jupyter notebooks
- Libraries: [numpy](https://numpy.org/), [scikit-learn](https://scikit-learn.org/), and [matplotlib](https://matplotlib.org/)

### Visualization (`./visualization`)

3D visualization available at https://womogenes.github.io/pca-food-map/visualization, rendered with p5.js.
