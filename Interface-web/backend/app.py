from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import numpy as np
import pickle
from flask import request


app = Flask(__name__)
CORS(app)

@app.route("/api/cars")
def get_cars():
    # Créer une connexion à votre base de données MongoDB
    client = MongoClient("mongodb+srv://juba:ipssi@cluster0.rw14g9s.mongodb.net/")
    db = client['Cars']
    collection = db['info']

    # Récupérer les données de la base de données
    cars_data = list(collection.find({}, {'_id': False})) # Exclude _id field

    # Retourner les données au format JSON
    return jsonify(cars_data)

@app.route("/api/correlation")
def get_correlation():
    client = MongoClient("mongodb+srv://juba:ipssi@cluster0.rw14g9s.mongodb.net/")
    db = client['Cars']
    collection = db['info']
    cars_data = list(collection.find({}, {'_id': False}))
    
    # Créer   un DataFrame avec les données
    df = pd.DataFrame(cars_data)
    
    df=df[['Prix', 'year','doors', 'critAir',
       'mileage_value', 'co2_value', 'powerDIN_value',
       'ratedHorsePower_value']]
    # Calculer la matrice de corrélation
    correlation_matrix = df.corr()
    
    # Convertir la matrice de corrélation en JSON
    correlation_json = correlation_matrix.to_json()
    
    # Retourner les données au format JSON
    return jsonify(correlation_json)

@app.route("/api/year_distribution")
def year_distribution():
    client = MongoClient("mongodb+srv://juba:ipssi@cluster0.rw14g9s.mongodb.net/")
    db = client['Cars']
    collection = db['info']
    cars_data = list(collection.find({}, {'_id': False}))
    
    # Créer   un DataFrame avec les données
    df = pd.DataFrame(cars_data)
    year_distribution = df['year'].value_counts().to_dict()
    return jsonify(year_distribution)

@app.route("/api/top10cars")
def top_10_cars():
    client = MongoClient("mongodb+srv://juba:ipssi@cluster0.rw14g9s.mongodb.net/")
    db = client['Cars']
    collection = db['infocar']
    cars_data = list(collection.find({}, {'_id': False}))

    # Créer un DataFrame avec les données
    df = pd.DataFrame(cars_data)

    # Assurez-vous que la colonne 'name' existe
    if 'name' not in df.columns:
        return jsonify({"error": "La colonne 'name' n'est pas présente dans les données."}), 400

    # Comptez le nombre d'occurrences pour chaque nom de voiture
    car_count = df['name'].value_counts()

    # Prenez le top 10
    top_10_cars = car_count.head(10).to_dict()

    return jsonify(top_10_cars)

@app.route("/api/enregy_distribution")
def energy_distribution():
    client = MongoClient("mongodb+srv://juba:ipssi@cluster0.rw14g9s.mongodb.net/")
    db = client['Cars']
    collection = db['infos']
    cars_data = list(collection.find({}, {'_id': False}))
    
    # Créer   un DataFrame avec les données
    df = pd.DataFrame(cars_data)
    energy_distribution = df['energy'].value_counts().to_dict()
    return jsonify(energy_distribution)

@app.route("/api/regression")
def regression():
    client = MongoClient("mongodb+srv://juba:ipssi@cluster0.rw14g9s.mongodb.net/")
    db = client['Cars']
    collection = db['info']
    cars_data = list(collection.find({}, {'_id': False}))
    
    # Créer   un DataFrame avec les données
    df = pd.DataFrame(cars_data)
    features = ['year', 'doors', 'mileage_value', 'co2_value', 'powerDIN_value', 'ratedHorsePower_value']
    target = 'Prix'
    
    # Séparation des données
    X = df[features]
    y = df[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Feature Scaling
    scaler = StandardScaler()
    X_train_normalized = scaler.fit_transform(X_train)
    X_test_normalized = scaler.transform(X_test)

    # Création et formation du modèle Random Forest
    rf_model = RandomForestRegressor(random_state=42)
    rf_model.fit(X_train_normalized, y_train)

    # Sauvegarder le modèle après l'entraînement
    with open('model.pkl', 'wb') as model_file:
        pickle.dump(rf_model, model_file)

    # Sauvegarder le scaler
    with open('scaler.pkl', 'wb') as scaler_file:
        pickle.dump(scaler, scaler_file)
    
    # Prédiction sur l'ensemble de test
    y_pred_rf = rf_model.predict(X_test_normalized)

    # Calcul des métriques
    mae_rf = mean_absolute_error(y_test, y_pred_rf)
    r2_rf = r2_score(y_test, y_pred_rf)

    # Retourne les résultats au format JSON
    result = {
        "mae": mae_rf,
        "r2": r2_rf,
        "predictions": y_pred_rf.tolist(),
        "y_test": y_test.tolist()
    }
    return jsonify(result)

@app.route("/api/regressionform", methods=['POST'])
def regression_form():
    # Charger le modèle et le scaler
    with open('model.pkl', 'rb') as model_file:
        model = pickle.load(model_file)
    with open('scaler.pkl', 'rb') as scaler_file:
        scaler_obj = pickle.load(scaler_file)

    data = request.get_json()
    input_data = pd.DataFrame([data['year'], data['doors'], data['mileage_value'], data['co2_value'], data['powerDIN_value'], data['ratedHorsePower_value']]).T
    features = ['year', 'doors', 'mileage_value', 'co2_value', 'powerDIN_value', 'ratedHorsePower_value']
    input_data.columns = features
    input_data_normalized = scaler_obj.transform(input_data)
    prediction = model.predict(input_data_normalized)

    return jsonify({"prediction": prediction.tolist()})

if __name__ == "__main__":
    app.run(debug=True)