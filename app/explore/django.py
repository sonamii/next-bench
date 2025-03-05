from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)

# Sample data for training the model
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([1, 3, 5, 7, 9])

# Train the model for next-ai
class SimpleLinearRegression:
    def __init__(self):
        self.coef_ = None
        self.intercept_ = None

    def fit(self, X, y):
        X_mean = np.mean(X)
        y_mean = np.mean(y)
        self.coef_ = np.sum((X - X_mean) * (y - y_mean)) / np.sum((X - X_mean) ** 2)
        self.intercept_ = y_mean - self.coef_ * X_mean

    def predict(self, X):
        return self.coef_ * X + self.intercept_

model = SimpleLinearRegression()
model.fit(X, y)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = np.array(data['features']).reshape(-1, 1)
    prediction = model.predict(features)
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)