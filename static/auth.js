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
const auth = firebase.auth();
const database = firebase.database();

// Signup
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            database.ref('users/' + user.uid).set({
                email: email
            });
            alert('Signup successful!');
            window.location.href = 'login.html';
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Login successful!');
            window.location.href = 'manage.html';
        })
        .catch((error) => {
            alert(error.message);
        });
});
