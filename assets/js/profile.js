function toggleEditProfile(btnType){
    if(btnType == 'Edit'){
        document.getElementById('editProfileDiv').className = 'px-10 pt-4 pb-8 rounded-3xl shadow-xl';
        document.getElementById('viewProfileDiv').className = 'hidden px-10 pt-4 pb-8 rounded-3xl shadow-xl';
    }
    else if(btnType == 'Back'){
        document.getElementById('viewProfileDiv').className = 'px-10 pt-4 pb-8 rounded-3xl shadow-xl';
        document.getElementById('editProfileDiv').className = 'hidden px-10 pt-4 pb-8 rounded-3xl shadow-xl';
    }
}