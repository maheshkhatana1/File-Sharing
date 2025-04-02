// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
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
document.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.getElementById('signInBtn');
    const loginForm = document.getElementById('loginForm');
    const closeLogin = document.getElementById('closeLogin');
    const closeRegister = document.getElementById('closeRegister');
    const toggleLink = document.getElementById('toggleLink');
    const backToSignIn = document.getElementById('backToSignIn'); 
    const signInForm = document.getElementById('signInForm');
    const registerForm = document.getElementById('registerForm');

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
        console.log("Toggling to Register Form");

        signInForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        toggleLink.classList.add('hidden');
        backToSignIn.classList.remove('hidden');
    });

    // Switch to the sign-in form when the "Already have an account? Sign In" link is clicked
    if (backToSignIn) {
        backToSignIn.addEventListener('click', () => {
            console.log("Toggling to Sign In Form");

            registerForm.classList.add('hidden');
            signInForm.classList.remove('hidden');
            backToSignIn.classList.add('hidden');
            toggleLink.classList.remove('hidden');
        });
    }
});

// Handle sign-in
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
        window.location.href = '/Login.html'; // Redirect after sign-in
    } catch (error) {
        console.error('Error signing in:', error.message);
        alert('Error signing in: ' + error.message);
    }
});

// Handle registration
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (!email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        // Register user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User registered:', user);

        // Save user data in Firebase Realtime Database
        await set(ref(db, 'users/' + user.uid), {
            username: email,
            email: email
        });

        console.log('User data saved to Firebase');
        updateSignInButton(user);

        // Redirect after registration and login
        window.location.replace('/Login.html');
    } catch (error) {
        console.error('Error registering user:', error.message);
        alert('Error registering user: ' + error.message);
    }
});

// Listen for changes in the authentication state
// onAuthStateChanged(auth, (user) => {
//     const signInBtn = document.getElementById('signInBtn'); 

//     if (user) {
//         signInBtn.textContent = 'Logged In';
//         signInBtn.disabled = true;
//         signInBtn.style.backgroundColor = '#4CAF50'; // Green color for logged-in state
//     } else {
//         signInBtn.textContent = 'Sign In';
//         signInBtn.disabled = false;
//         signInBtn.style.backgroundColor = '#007bff'; // Default color for the Sign In button
//     }
// });


function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add event listener to the "Upgrade" link
document.getElementById('upgradeLink').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default anchor click behavior
    smoothScrollTo('Pricing-div'); // Scroll to the Pricing-div
});

            // Get elements
            const uploadButton = document.getElementById('uploadButton');
            const uploadButton1 = document.getElementById('uploadButton1');
            const fileInput = document.getElementById('fileInput');
            const fileInput1 = document.getElementById('fileInput1');
            const fileInfoDiv = document.getElementById('fileInfo');
            const fileNameElement = document.getElementById('fileName');
            const fileSizeElement = document.getElementById('fileSize');
            const uploadTimeElement = document.getElementById('uploadTime');
            const expirationTimeElement = document.getElementById('expirationTime');
            const qrCodeElement = document.getElementById('qrCode');
            const saveQRButton = document.getElementById('saveQR');
            const sharePageButton = document.getElementById('sharePage');
            const downloadLinkElement = document.getElementById('downloadLink');
        
            // Simulated file upload function
            const uploadFile = (file) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        // Simulating file upload and generating a shareable URL
                        const fileURL = `https://fliqr.codes/file/${generateRandomString()}`;
                        resolve(fileURL);
                    }, 1000); // Simulate upload time
                });
            };
        
            // Generate a random string for the file URL (simulating a unique identifier)
            const generateRandomString = () => {
                return Math.random().toString(36).substring(2, 15); // Random string generator
            };
        
            // Format the file size
            const formatFileSize = (bytes) => {
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (bytes === 0) return '0 Byte';
                const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
            };
        
            // When the Upload File button is clicked, trigger the file input
            uploadButton.addEventListener('click', () => {
                fileInput.click();
            });
        
            // When the file is selected
            fileInput.addEventListener('change', async () => {
                const file = fileInput.files[0];
                if (file) {
                    // Upload the file and generate a URL
                    const fileURL = await uploadFile(file);
        
                    // Get current date and expiration date
                    const currentDate = new Date();
                    const expirationDate = new Date(currentDate);
                    expirationDate.setDate(currentDate.getDate() + 1); // Set expiration to 1 day later
        
                    // Display file info
                    fileNameElement.textContent = `Name: ${file.name}`;
                    fileSizeElement.textContent = `Size: ${formatFileSize(file.size)}`;
                    uploadTimeElement.textContent = `Uploaded: ${currentDate.toLocaleString()}`;
                    expirationTimeElement.textContent = `Expires: ${expirationDate.toLocaleString()}`;
        
                    // Generate the QR code for the file URL
                    QRCode.toCanvas(qrCodeElement, fileURL, (error) => {
                        if (error) console.error(error);
                    });
        
                    // Display the file info section
                    fileInfoDiv.classList.remove('hidden');
        
                    // Provide the shareable links
                    downloadLinkElement.href = fileURL;
                    downloadLinkElement.textContent = 'Direct download link';
                    sharePageButton.onclick = () => {
                        // Open the file URL in a new tab for sharing
                        window.open(fileURL, '_blank');
                    };
                }
            });



            uploadButton1.addEventListener('click', () => {
                fileInput1.click();
            });
            
            // When the file is selected
            fileInput1.addEventListener('change', async () => {
                const file = fileInput1.files[0];
                if (file) {
                    // Upload the file and generate a URL
                    const fileURL = await uploadFile(file);
            
                    // Get current date and expiration date
                    const currentDate = new Date();
                    const expirationDate = new Date(currentDate);
                    expirationDate.setDate(currentDate.getDate() + 1); // Set expiration to 1 day later
            
                    // Display file info
                    fileNameElement.textContent = `Name: ${file.name}`;
                    fileSizeElement.textContent = `Size: ${formatFileSize(file.size)}`;
                    uploadTimeElement.textContent = `Uploaded: ${currentDate.toLocaleString()}`;
                    expirationTimeElement.textContent = `Expires: ${expirationDate.toLocaleString()}`;
            
                    // Generate the QR code for the file URL
                    QRCode.toCanvas(qrCodeElement, fileURL, (error) => {
                        if (error) console.error(error);
                    });
            
                    // Display the file info section
                    fileInfoDiv.classList.remove('hidden');
            
                    // Provide the shareable links
                    downloadLinkElement.href = fileURL;
                    downloadLinkElement.textContent = 'Direct download link';
                    sharePageButton.onclick = () => {
                        // Open the file URL in a new tab for sharing
                        window.open(fileURL, '_blank');
                    };
            
                    // Scroll to the top of the page
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth' // Smooth scrolling
                    });
                }
            });
            
            // Save the QR Code (you can implement QR saving functionality as needed)
            saveQRButton.addEventListener('click', () => {
                const canvas = qrCodeElement.querySelector('canvas');
                if (canvas) {
                    const dataURL = canvas.toDataURL(); // Get the QR code image as a Data URL
                    const link = document.createElement('a');
                    link.href = dataURL;
                    link.download = 'qr-code.png'; // Set the file name for downloading
                    link.click(); // Trigger download
                }
            });
        