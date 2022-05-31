# Heart Disease Prediction API

![Python](https://badgen.net/badge/Python/3.7/orange)
![License](https://badgen.net/badge/license/MIT/blue)

Flask REST API which predicts probability of Coronary Heart Disease in a patient taking 9 parameters based on patient's history as input.

The API uses a Logistic Regression Model from scikit-learn trained on the [Framingham Heart Study Dataset](https://www.kaggle.com/amanajmera1/framingham-heart-study-dataset) from Kaggle.

The model achieved a test accuracy of around 88%.

It is deployed on Heroku [here](https://heartapi.herokuapp.com).

View the Jupyter notebook
[here](https://github.com/agoel00/HeartDiseasePredictionAPI/blob/master/model/HeartDisease.ipynb)

## /predict endpoint

- Takes 9 paramteres as input
- Returns a binary prediction (0 or 1) and probability as well.

	### Sample query
    	https://heartapi.herokuapp.com/predict?age=31&sex=1&cigs=5&chol=230&sBP=280&dia=0&dBP=90&gluc=87&hRate=84

	### Sample output

      {
         "data":{
            "age":"31",
            "cigsPerDay":"5",
            "diaBP":"90",
            "diabetes":"0",
            "glucose":"87",
            "heartRate":"84",
            "sex":"1",
            "sysBP":"280",
            "totChol":"230"
         },
         "prediction":[
            1
         ],
         "probability":[
            [
               0.4587093009776524,
               0.5412906990223476
            ]
         ]
      }


## /model endpoint
- Returns the model details such as intercept and coefficients.

		https://heartapi.herokuapp.com/model

## Running locally

1. Clone the repository

   ```bash
	   git clone https://github.com/agoel00/HeartDiseasePredictionAPI.git
	
      cd HeartDiseasePredictionAPI
   ```
2. Install dependencies
   ```bash
	   pip install requirements.txt
   ```
	
3. Start the Flask server
   ```bash
	   python3 app.py
   ```

### A PWA which communicates with this API is deployed [here](https://heartify.netlify.com)

![status](https://badgen.net/uptime-robot/status/m781547257-02e85bf091a6cde871b002fe)

## License
MIT
