from flask import Flask, request, jsonify
import numpy as np
from typing import List, Tuple

app = Flask(__name__)

# Sample data for training the model
X: np.ndarray = np.array([[1], [2], [3], [4], [5]])
y: np.ndarray = np.array([1, 3, 5, 7, 9])

# Train the model for next-ai
class SimpleLinearRegression:
    def __init__(self):
        self.coef_: float = None
        self.intercept_: float = None

    def fit(self, X: np.ndarray, y: np.ndarray) -> None:
        X_mean: float = np.mean(X)
        y_mean: float = np.mean(y)
        self.coef_ = np.sum((X - X_mean) * (y - y_mean)) / np.sum((X - X_mean) ** 2)
        self.intercept_ = y_mean - self.coef_ * X_mean

    def predict(self, X: np.ndarray) -> np.ndarray:
        return self.coef_ * X + self.intercept_

model = SimpleLinearRegression()
model.fit(X, y)

@app.route('/predict', methods=['POST'])
def predict() -> Tuple[dict, int]:
    data = request.get_json()
    features: np.ndarray = np.array(data['features']).reshape(-1, 1)
    prediction: np.ndarray = model.predict(features)
    return jsonify({'prediction': prediction.tolist()}), 200

if __name__ == '__main__':
    app.run(debug=True)
    
    
    
    
    
