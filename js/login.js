let userLogin = () => {
    let elUserName = document.getElementById('username');
    let userNameValue = elUserName.value;
    let elPassword = document.getElementById('pwd');
    let passwordValue = elPassword.value;

    if (userNameValue !== 'x' || passwordValue !== 'x') alert('wrong password or username!')
    else (window.open("./game.html",'_self'))
}