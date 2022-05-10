
chrome.storage.local.get(["Autologin"], function(result) {
    var autolog_retr = result.Autologin;
    //Prüfung, ob Autologin erwünscht ist
    if(autolog_retr == null || autolog_retr == false){
        chrome.storage.local.set({Autologin: false}, function() {
            console.log('Autologin deactivated');
        });
        return null;
    }else if( document.getElementsByName("ajax-token").length == 0){
        console.log("Already logged in");
        return null;
    }
    //Autologin ist auf true gesetzt
    console.log('Autologin activated');
    var ajax_token = document.getElementsByName('ajax-token')[0].getAttribute('value');
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
        xhr.open('POST','https://campusportal.fhws.de:443/qisserver/rds?state=user&type=1&category=auth.login');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded',
        "Connection", "keep-alive",
        //"Content-Length", "80",
        "Cache-Control", "max-age=0",
        "Upgrade-Insecure-Requests", "1",
        "Origin", "https://elearning.fhws.de",
        "Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Sec-Fetch-Mode", "navigate",
        "Sec-Fetch-User", "?1",
        "Sec-Fetch-Dest", "document");
        //sobald eingeloggt, auf Dashboard navigieren
        
        xhr.onreadystatechange = function() {
            console.log(xhr.readyState);
            if(xhr.readyState == 4){
                console.log('Ready State of the login request is 4 (completly loaded)');
                location.href = "https://campusportal.fhws.de/qisserver/pages/cs/sys/portal/hisinoneStartPage.faces";
            }
        }
        xhr.send('userInfo=&ajax-token=' + ajax_token +'&asdf=' + Cred_retr.username + '&fdsa=' + Cred_retr.password + '&submit=');
    });    
});
