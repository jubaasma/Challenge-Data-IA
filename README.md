Lien trello : https://trello.com/b/rwxY546S/data-challenge-car
Car prediction project
Ce projet a pour but de scraper les données de la Centrale, un site web qui propose des informations sur les formations et les métiers dans le domaine de l'ingénierie. Les données récupérées seront ensuite nettoyées, traitées et insérées dans une base de données. Une interface web sera également créée pour permettre aux utilisateurs de visualiser et d'analyser les données.

Etapes du projet
Le projet se décompose en plusieurs étapes :
Scrapping des données
Nettoyage des données
Traitement des données
Insertion des données dans une base de données
Création d'une interface web

Scrapping des données
L'étape de scrapping des données consiste à récupérer les données de la Centrale. Pour ce faire, on utilisera le framework BeautifullSoup.

Le code de scrapping des données est situé dans le répertoire code-scrapping dans le fichier scrapping-info-cars.

Nettoyage et Traitement des données
 L'étape de nettoyage des données consiste à supprimer les données erronées ou incomplètes. On utilisera également cette étape pour formater les données dans un format standard.
Le Traitement des données consiste à utiliser des techniques d'apprentissage automatique pour analyser les données. On utilisera cette étape pour identifier des tendances et des relations dans les données. On entrainera plusieurs algos de ML, on en choisira le plus préformant

Le code de nettoyage et de traitement des données des données est situé dans le répertoire code-eda-ia dans le fichier EDA&IA



Insertion des données dans une base de données
L'étape d'insertion des données dans une base de données consiste à stocker les données dans une base de données. On utilisera cette étape pour pouvoir accéder aux données de manière efficace. (Technologies : MongoDB + Pymongo)

Le code d'insertion des données dans une base de données est situé dans le répertoire insertion-data dans le fichier Insert data.

Backend pour l'API Cars
Interface-web/backend contient le code backend pour l'API Cars. L'API fournit une interface RESTful aux données des voitures. Les données sont stockées dans une base de données MongoDB.

Points de terminaison
L'API dispose des points de terminaison suivants :

/api/cars : Retourne une liste de toutes les voitures.
/api/correlation : Retourne la matrice de corrélation des données des voitures.
/api/year_distribution : Retourne la distribution des voitures par année.
/api/top10cars : Retourne le top 10 des voitures en termes de nombre
/api/enregy_distribution : Retourne la distribution des voitures par type d'énergie.
/api/regression : Effectue une régression sur les données des voitures et renvoie les résultats.
/api/regressionform : Effectue une prédiction du prix selon les informations retournées par l’utilisateur
Exigences
Pour exécuter le backend, vous aurez besoin de ce qui suit :
Python 3.6+
Flask
PyMongo
Pandas
Scikit-learn
Pickle
Exécution de l'API
Pour exécuter l'API, exécutez la commande suivante :
python app.py
L'API sera en cours d'exécution sur le port 5000. Vous pouvez y accéder à l'adresse http://localhost:5000/.

Front-end
Ce répertoire contient le code du front-end de l'application. Il est écrit en ReactJS et utilise la bibliothèque Plotly pour afficher les graphiques.

Installation
Pour installer le projet, exécutez la commande suivante dans le répertoire du projet :

npm install
Exécution
Pour exécuter le projet, exécutez la commande suivante dans le répertoire du projet :

npm start
Le projet sera exécuté sur http://localhost:3000.

Rôles des fichiers
index.js est le fichier d'entrée de l'application. Il charge l'application React et la rend dans la fenêtre du navigateur.
root.js est le composant racine de l'application. Il contient tous les autres composants de l'application.
app.js est le composant principal de l'application. Il affiche des statistiques sur le jeu de donnée
app2.js est le composant qui affiche la matrice de corrélations ainsi que le résultat du modèle de régression 
app3.js est le composant qui affiche un formulaire ou l’utilisateur peut introduire des caractéristiques d’une voiture et afficher la prédiction

