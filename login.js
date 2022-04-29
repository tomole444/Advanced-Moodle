var login_token = document.getElementsByName('logintoken')[0].getAttribute('value');
chrome.storage.local.get(["Autologin"], function(result) {
    var autolog_retr = result.Autologin;
    //Prüfung, ob Autologin erwünscht ist
    if(autolog_retr == null || autolog_retr == false){
        chrome.storage.local.set({Autologin: false}, function() {
            console.log('Autologin deactivated');
        });
        return null;
    }
    //Autologin ist auf true gesetzt
    console.log('Autologin activated');
    chrome.storage.local.get(["Credentials"], function(result) {
        // Bekannte Einlogdaten aus 'Credentials' holen
        var Cred_retr = result.Credentials;
        if(Cred_retr == null){
            alert('No Autologin credentials are saved in database')
            console.log('No Autologin credentials are saved in database!')
            return null;
        }
        //HEader setzen
        var xhr = new XMLHttpRequest();
        xhr.open('POST','https://elearning.fhws.de/login/index.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded',
        "Connection", "keep-alive",
        "Content-Length", "80",
        "Cache-Control", "max-age=0",
        "Upgrade-Insecure-Requests", "1",
        "Origin", "https://elearning.fhws.de",
        "Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Sec-Fetch-Mode", "navigate",
        "Sec-Fetch-User", "?1",
        "Sec-Fetch-Dest", "document");
        //sobald eingeloggt, auf Dashboard navigieren
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4){
                console.log('Ready State of the login request is 4 (completly loaded)');
                //Prüfen, ob Logindaten richtig waren
                if(xhr.responseURL == 'https://elearning.fhws.de/login/index.php'){
                    alert('Error! Either your Autologin credentials are wrong or the session is corrupted! If your credentials are correct, please restart your browser and try again!');
                    console.log('Error! Either your Autologin credentials are wrong or the session is corrupted! If your credentials are correct, please restart your browser and try again!');
                }else{
                    location.href = "https://elearning.fhws.de/my";
                }
            }
        }
        xhr.send('anchor=&username=' + Cred_retr.username + '&password=' + Cred_retr.password + '&logintoken=' + login_token);
    });    
});

