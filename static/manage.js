// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAekx_xqO2z0UsnLwpx2BbQoh5FZKrwSz8",
    authDomain: "pantrypal-deepika.firebaseapp.com",
    projectId: "pantrypal-deepika",
    storageBucket: "pantrypal-deepika.appspot.com",
    messagingSenderId: "249817314169",
    appId: "1:249817314169:web:0e86f2a21eb6ed398d35a8",
    measurementId: "G-GMN6PRPM4Q"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

// Check if user is authenticated
auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = 'login.html';
    }
});

document.getElementById('pantry-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const itemName = document.getElementById('item-name').value;
    const itemQuantity = document.getElementById('item-quantity').value;
    
    if (itemName && itemQuantity) {
        const itemRef = database.ref('pantry/' + itemName);
        itemRef.set({
            name: itemName,
            quantity: itemQuantity
        });
    }
});

const pantryList = document.getElementById('pantry-list');
const pantryRef = database.ref('pantry');

pantryRef.on('value', (snapshot) => {
    const pantry = snapshot.val();
    pantryList.innerHTML = '';
    for (let item in pantry) {
        const li = document.createElement('li');
        li.textContent = `${pantry[item].name}: ${pantry[item].quantity}`;
        pantryList.appendChild(li);
    }
});