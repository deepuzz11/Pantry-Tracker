from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("pantrypal-deepika-firebase-adminsdk-2tzja-7b6a883d8d.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load pantry data from Firestore
def load_pantry():
    pantry_ref = db.collection('pantry')
    docs = pantry_ref.stream()
    pantry = [{'id': doc.id, **doc.to_dict()} for doc in docs]
    return pantry

# Save pantry item to Firestore
def save_pantry_item(item, quantity):
    db.collection('pantry').add({'item': item, 'quantity': quantity})

# Delete pantry item from Firestore
def delete_pantry_item(item_id):
    db.collection('pantry').document(item_id).delete()

@app.route('/')
def index():
    pantry = load_pantry()
    return render_template('index.html', pantry=pantry)

@app.route('/add_item', methods=['POST'])
def add_item():
    item = request.form.get('item')
    quantity = request.form.get('quantity')
    
    save_pantry_item(item, quantity)
    
    return jsonify({'success': True})

@app.route('/delete_item', methods=['POST'])
def delete_item():
    item_id = request.form.get('item_id')
    
    delete_pantry_item(item_id)
    
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)