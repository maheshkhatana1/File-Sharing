// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC6yVfaHa9giRALV299OeFzkrgeQhUw3Js",
  authDomain: "filesharelogin-3710e.firebaseapp.com",
  projectId: "filesharelogin-3710e",
  storageBucket: "filesharelogin-3710e.firebasestorage.app",
  messagingSenderId: "30059816216",
  appId: "1:30059816216:web:0ee475b5eed792c0bcaa6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Elements
const signInBtn = document.getElementById('signInBtn');
const loginForm = document.getElementById('loginForm');
const closeLogin = document.getElementById('closeLogin');
const closeRegister = document.getElementById('closeRegister');
const toggleLink = document.getElementById('toggleLink');
const signInForm = document.getElementById('signInForm');
const registerForm = document.getElementById('registerForm');

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.getElementById('signInBtn');
    const loginForm = document.getElementById('loginForm');
    const closeLogin = document.getElementById('closeLogin');
    const closeRegister = document.getElementById('closeRegister');
    const toggleLink = document.getElementById('toggleLink'); // Main toggle link text
    const signInForm = document.getElementById('signInForm');
    const registerForm = document.getElementById('registerForm');
    const backToSignIn = document.getElementById('backToSignIn'); // Link to go back to Sign In

    // Open the login modal
    signInBtn.addEventListener('click', () => {
        loginForm.classList.remove('hidden');
    });

    // Close the login modal
    closeLogin.addEventListener('click', () => {
        loginForm.classList.add('hidden');
    });

    // Close the register form
    closeRegister.addEventListener('click', () => {
        loginForm.classList.add('hidden');
    });

    // Switch to the register form
    toggleLink.addEventListener('click', () => {
        signInForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        toggleLink.textContent = "Already have an account? Sign In"; // Change text of the main link
    });

    // Switch to the sign-in form when the "Already have an account? Sign In" link is clicked
    backToSignIn.addEventListener('click', () => {
        registerForm.classList.add('hidden');
        signInForm.classList.remove('hidden');
        toggleLink.textContent = "Don't have an account? Register"; // Change text of the main link back to Register
    });
});


// Handle sign-in
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic form validation
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
        window.location.href = '/'; // Redirect after sign-in
    } catch (error) {
        console.error('Error signing in:', error.message);
        alert('Error signing in: ' + error.message);
    }
});

// Handle registration
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form from submitting and reloading the page
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const fullName = document.getElementById('regName').value;

    // Basic validation
    if (!email || !password || !confirmPassword || !fullName) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User registered:', user);

        // Save user data in Firebase Realtime Database
        await set(ref(db, 'users/' + user.uid), {
            username: fullName,
            email: email
        });

        console.log('User data saved to Firebase');

        // After registration, redirect to login page (or any desired page)
        window.location.href = '/login'; // Optional: Redirect after registration
    } catch (error) {
        console.error('Error registering user:', error.message);
        alert('Error registering user: ' + error.message);
    }
});
