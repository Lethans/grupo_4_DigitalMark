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

function googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}


function myValidation() {
    let validaciones;

    var userFullName = document.getElementById("userName").value;
    var userLastName = document.getElementById("userLastName").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userConfirmPassword = document.getElementById("userConfirmPassword").value;
    var avatar = document.getElementById("img").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if (checkUserFullNameValid == null || userLastName === "" || checkUserEmailValid == null || checkUserPasswordValid == null || userPassword != userConfirmPassword || userConfirmPassword === "" || avatar === "") {
        validaciones = false;
        checkUserName(), checkUserLastName(), checkUserEmail(), checkUserPassword(), checkUserConfirmPassword(), checkAvatar();
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
            document.getElementById("registerForm").style.display = "none";
            document.getElementById("loading").style.display = "flex";
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
            }, 5000)

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
        var card = document.getElementById('formCard');
        card.style.height = "620px";
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

    flag ? document.getElementById("userNameError").style.display = "block" : document.getElementById("userNameError").style.display = "none";

}

function checkAvatar() {
    var avatar = document.getElementById("img").value;
    var flag = false;
    if (avatar == '') {
        flag = true;
    }
    flag ? document.getElementById("avatarError").style.display = "block" : document.getElementById("avatarError").style.display = "none";

}

// xxxxxxxxxx User Surname Validation xxxxxxxxxx
function checkUserLastName() {
    var userSurname = document.getElementById("userLastName").value;
    var flag = false;
    if (userSurname === "") {
        flag = true;
    }
    flag ? document.getElementById("userLastNameError").style.display = "block" : document.getElementById("userLastNameError").style.display = "none";

}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail() {
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    userEmail.value.match(userEmailFormate) ? flag = false : flag = true;
    flag ? document.getElementById("userEmailError").style.display = "block" : document.getElementById("userEmailError").style.display = "none";

}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword() {
    var userPassword = document.getElementById("userPassword").value;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    var flag;
    userPassword.match(userPasswordFormate) ? flag = false : flag = true;
    flag ? document.getElementById("userPasswordError").style.display = "block" : document.getElementById("userPasswordError").style.display = "none";
}

function checkUserConfirmPassword() {
    var userPassword = document.getElementById("userPassword");
    var userConfirmPassword = document.getElementById("userConfirmPassword");
    var flag;
    var flag2;
    userConfirmPassword == "" ? flag = true : flag = false;
    userPassword.value === userConfirmPassword.value ? flag2 = false : flag2 = true;
    flag ? document.getElementById("userConfirmPasswordError").style.display = "block" : document.getElementById("userConfirmPasswordError").style.display = "none";
    flag2 ? document.getElementById("userConfirmPasswordError2").style.display = "block" : document.getElementById("userConfirmPasswordError2").style.display = "none";

}
// xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
function checkUserBio() {
    var userBio = document.getElementById("userBio").value;
    var flag = false;
    flag ? document.getElementById("userBioError").style.display = "block" : document.getElementById("userBioError").style.display = "none";

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
    userSIEmail.value.match(userSIEmailFormate) ? flag = false : flag = true;
    flag ? document.getElementById("userSIEmailError").style.display = "block" : document.getElementById("userSIEmailError").style.display = "none";

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

function onErrorName() {
    var text = document.getElementById('userName');
    var icon = document.getElementById('nameIcon');
    text.classList.add('error_text');
    icon.style.backgroundColor = "#ff6347";
    icon.children[0].classList.add('error_icon');
}

function onErrorLastName() {
    var text = document.getElementById('userLastName');
    var icon = document.getElementById('lastNameIcon');
    text.classList.add('error_text');
    icon.style.backgroundColor = "#ff6347";
    icon.children[0].classList.add('error_icon');
}

function onErrorEmail() {
    var text = document.getElementById('userEmail');
    var icon = document.getElementById('emailIcon');
    text.classList.add('error_text');
    icon.style.backgroundColor = "#ff6347";
    icon.children[0].classList.add('error_icon');
}

function onErrorPassword() {
    var text = document.getElementById('userPassword');
    var icon = document.getElementById('first_eye');
    text.classList.add('error_text');
    icon.style.backgroundColor = "#ff6347";
    icon.children[0].classList.add('error_icon');
}

function onErrorConfirmPassword() {
    var text = document.getElementById('userConfirmPassword');
    var icon = document.getElementById('second_eye');
    text.classList.add('error_text');
    icon.style.backgroundColor = "#ff6347";
    icon.children[0].classList.add('error_icon');
}