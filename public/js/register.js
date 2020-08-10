window.addEventListener('load', function () {
    let password = document.querySelector('.first_password');
    let eye = document.getElementById('first_eye');

    let confirmPassword = document.querySelector('.second_password');
    let confirmEye = document.getElementById('second_eye');

    eye.addEventListener('click', function () {
        if (password.getAttribute('type') == 'password') {
            password.setAttribute('type', 'text');
            eye.children[0].classList.remove('fa-eye-slash');
            eye.children[0].classList.add('fa-eye');
        } else {
            password.setAttribute('type', 'password');
            eye.children[0].classList.remove('fa-eye');
            eye.children[0].classList.add('fa-eye-slash');
        }
    });

    confirmEye.addEventListener('click', function () {
        if (confirmPassword.getAttribute('type') == 'password') {
            confirmPassword.setAttribute('type', 'text');
            confirmEye.children[0].classList.remove('fa-eye-slash');
            confirmEye.children[0].classList.add('fa-eye');
        } else {
            confirmPassword.setAttribute('type', 'password');
            confirmEye.children[0].classList.remove('fa-eye');
            confirmEye.children[0].classList.add('fa-eye-slash');
        }
    });



});




// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx

const {
    decodeBase64
} = require("bcryptjs");

function myValidation() {
    let validaciones;

    var userFullName = document.getElementById("userName").value;
    var userLastName = document.getElementById("userLastName").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userConfirmPassword = document.getElementById("userConfirmPassword").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if (checkUserFullNameValid == null || userLastName === "" || checkUserEmailValid == null || checkUserPasswordValid == null || userPassword !== userConfirmPassword || userConfirmPassword === "") {
        validaciones = false;
        checkUserName(), checkUserLastName(), checkUserEmail(), checkUserPassword(), checkUserConfirmPassword();
    } else {
        validaciones = true;
        document.getElementById("userNameError").style.display = "none";
        document.getElementById("userLastNameError").style.display = "none";
        document.getElementById("userEmailError").style.display = "none";
        document.getElementById("userPasswordError").style.display = "none";
        document.getElementById("userConfirmPasswordError").style.display = "none";
    }

    if (validaciones) {
        var userEmail = document.getElementById("userEmail").value;
        var userPassword = document.getElementById("userPassword").value;



        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            document.getElementById("loading").style.display = "block";
            document.getElementById("registerForm").style.display = "none";
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }

            var userData = {
                name: document.getElementById("userName").value,
                lastName: document.getElementById("userLastName").value,
                userEmail: userEmail,
                userPassword: userPassword,
                date: firebase.firestore.Timestamp.fromDate(new Date())
            }
            var db = firebase.firestore();
            db.collection('users').doc(uid).set(userData);

            //return formulario.submit();
            setTimeout(function () {
                proceed();
            }, 1000)

        }).catch((error) => {
            // Handle Errors here.

            var errorCode = error.code;
            var errorMessage = error.message;
            document.getElementById("loading").style.display = "none";
            document.getElementById("registerForm").style.display = "block";
            alert(errorMessage);
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });

    } else {
        alert("Oops! Validation failed!");
        return;
    }
}

// xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkUserName() {
    var userSurname = document.getElementById("userName").value;
    var flag = false;
    if (userSurname === "") {
        flag = true;
    }
    if (flag) {
        document.getElementById("userNameError").style.display = "block";
    } else {
        document.getElementById("userNameError").style.display = "none";
    }
}
// xxxxxxxxxx User Surname Validation xxxxxxxxxx
function checkUserLastName() {
    var userSurname = document.getElementById("userLastName").value;
    var flag = false;
    if (userSurname === "") {
        flag = true;
    }
    if (flag) {
        document.getElementById("userLastNameError").style.display = "block";
    } else {
        document.getElementById("userLastNameError").style.display = "none";
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail() {
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userEmail.value.match(userEmailFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userEmailError").style.display = "block";
    } else {
        document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword() {
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userPassword.value.match(userPasswordFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userPasswordError").style.display = "block";
    } else {

        document.getElementById("userPasswordError").style.display = "none";
    }
}

function checkUserConfirmPassword() {
    var userPassword = document.getElementById("userPassword");
    var userConfirmPassword = document.getElementById("userConfirmPassword");
    var flag;
    var flag2;
    if (userConfirmPassword === "") {
        flag = false;
    } else {
        flag = true;
    }
    if (userPassword.value === userConfirmPassword.value) {
        flag2 = false;
    } else {
        flag2 = true;
    }
    if (flag) {
        document.getElementById("userConfirmPasswordError").style.display = "block";
    } else {
        document.getElementById("userConfirmPasswordError").style.display = "none";
    }
    if (flag2) {
        document.getElementById("userConfirmPasswordError2").style.display = "block";
    } else {
        document.getElementById("userConfirmPasswordError2").style.display = "none";
    }
}
// xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
function checkUserBio() {
    var userBio = document.getElementById("userBio").value;
    var flag = false;
    if (flag) {
        document.getElementById("userBioError").style.display = "block";
    } else {
        document.getElementById("userBioError").style.display = "none";
    }
}

function proceed() {
    let formulario = document.getElementById('registerForm');
    document.getElementById("loading").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    return formulario.submit();
}
//}
// xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkUserSIEmail() {
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userSIEmail.value.match(userSIEmailFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userSIEmailError").style.display = "block";
    } else {
        document.getElementById("userSIEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword() {
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userSIPassword.value.match(userSIPasswordFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userSIPasswordError").style.display = "block";
    } else {
        document.getElementById("userSIPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx    
function signIn() {
    var userSIEmail = document.getElementById("userSIEmail").value;
    var userSIPassword = document.getElementById("userSIPassword").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if (checkUserEmailValid == null) {
        return checkUserSIEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserSIPassword();
    } else {
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
            swal({
                type: 'successfull',
                title: 'Succesfully signed in',
            }).then((value) => {
                setTimeout(function () {
                    window.location.replace("./pages/profile.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}
// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //   User is signed in.
        let user = firebase.auth().currentUser;
        let uid
        if (user != null) {
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on('value', (dataSnapShot) => {
            document.getElementById("userPfFullName").innerHTML = dataSnapShot.val().userFullName;
            document.getElementById("userPfSurname").innerHTML = dataSnapShot.val().userSurname;
            // userEmail = dataSnapShot.val().userEmail;
            // userPassword = dataSnapShot.val().userPassword;
            document.getElementById("userPfFb").setAttribute('href', dataSnapShot.val().userFb);
            document.getElementById("userPfTw").setAttribute('href', dataSnapShot.val().userTw);
            document.getElementById("userPfGp").setAttribute('href', dataSnapShot.val().userGp);
            document.getElementById("userPfBio").innerHTML = dataSnapShot.val().userBio;
        })
    } else {
        //   No user is signed in.
    }
});
// xxxxxxxxxx Show edit profile form with detail xxxxxxxxxx
function showEditProfileForm() {
    document.getElementById("profileSection").style.display = "none"
    document.getElementById("editProfileForm").style.display = "block"
    var userPfFullName = document.getElementById("userPfFullName").innerHTML;
    var userPfSurname = document.getElementById("userPfSurname").innerHTML;
    var userPfFb = document.getElementById("userPfFb").getAttribute("href");
    var userPfTw = document.getElementById("userPfTw").getAttribute("href");
    var userPfGp = document.getElementById("userPfGp").getAttribute("href");
    var userPfBio = document.getElementById("userPfBio").innerHTML;
    document.getElementById("userFullName").value = userPfFullName;
    document.getElementById("userSurname").value = userPfSurname;
    document.getElementById("userFacebook").value = userPfFb;
    document.getElementById("userTwitter").value = userPfTw;
    document.getElementById("userGooglePlus").value = userPfGp;
    document.getElementById("userBio").value = userPfBio;
}
// xxxxxxxxxx Hide edit profile form xxxxxxxxxx
function hideEditProfileForm() {
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("editProfileForm").style.display = "none";
}
// xxxxxxxxxx Save profile and update database xxxxxxxxxx
function saveProfile() {
    let userFullName = document.getElementById("userFullName").value
    let userSurname = document.getElementById("userSurname").value
    let userFacebook = document.getElementById("userFacebook").value
    let userTwitter = document.getElementById("userTwitter").value
    let userGooglePlus = document.getElementById("userGooglePlus").value
    let userBio = document.getElementById("userBio").value
    var userFullNameFormate = /^([A-Za-z.\s_-])/;
    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    if (checkUserFullNameValid == null) {
        return checkUserFullName();
    } else if (userSurname === "") {
        return checkUserSurname();
    } else {
        let user = firebase.auth().currentUser;
        let uid;
        if (user != null) {
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref();
        var userData = {
            userFullName: userFullName,
            userSurname: userSurname,
            userFb: userFacebook,
            userTw: userTwitter,
            userGp: userGooglePlus,
            userBio: userBio,
        }
        firebaseRef.child(uid).set(userData);
        swal({
            type: 'successfull',
            title: 'Update successfull',
            text: 'Profile updated.',
        }).then((value) => {
            setTimeout(function () {
                document.getElementById("profileSection").style.display = "block";

                document.getElementById("editProfileForm").style.display = "none";
            }, 1000)
        });
    }
}
// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        swal({
            type: 'successfull',
            title: 'Signed Out',
        }).then((value) => {
            setTimeout(function () {
                window.location.replace("../index.html");
            }, 1000)
        });
    }).catch(function (error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: "Error",
        })
    });
}