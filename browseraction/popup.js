// popup.js
window.onload = function() {
    //Alle Änderungen wurden wahrgenommen und betreffende Elemente kommen in die Datenbank
    document.getElementById("update").onclick = function() {
        //Animation starten
        document.getElementById("update").classList.remove("scale-down-center");
        document.getElementById("update").offsetWidth;
        document.getElementById("update").classList.add("scale-down-center");

        //Eigentliche Funktion
        chrome.extension.sendMessage({
            type: "update"
        });
    }
    //Datenbank wird geleert
    document.getElementById("clear").onclick = function() {
        //Animation starten
        document.getElementById("clear").classList.remove("scale-down-center");
        document.getElementById("clear").offsetWidth;
        document.getElementById("clear").classList.add("scale-down-center");

        //Eigentliche Funktion
        chrome.extension.sendMessage({
            type: "clear"
        });
    }
    //Manuell die Seite auf unstimmigkeiten in bezug auf die Datenbank prüfen
    document.getElementById("check").onclick = function() {
        //Animation starten
        document.getElementById("check").classList.remove("rotate-center");
        document.getElementById("check").offsetWidth;
        document.getElementById("check").classList.add("rotate-center");
        
        //Checkroutine initieren
        chrome.extension.sendMessage({
            type: "check"
        });
    }
    //Prüfen, ob ZUgangsdaten in der Datenbank liegen
    chrome.storage.local.get(["Credentials"], function(result) {
        var Cred_retr = result.Credentials;
        if(Cred_retr == null){
            console.log('No AutoLogin-Credentials in database!')
            return null;
        }else if(autolog_retr = true){
            document.getElementById('username').value = Cred_retr.username;
            document.getElementById('password').value = '***';
        }
    });
    //Neue Zugangsdaten speichern
    document.getElementById("cred-refresh").onclick = function() {
        var username = document.getElementsByName('username')[0].value;
        var password = document.getElementsByName('password')[0].value;
        if(username != '' && password != ''){
            var creds = {
                username: username,
                password: password
            };
            chrome.storage.local.set({Credentials: creds}, function() {
                console.log('New saved credentials:');
                console.log(creds);
            });
        }else{
            console.log('Save attempt without data');
            alert('Please fill in both fields');
        }
    }
    //Falls Autologin Checkbox gedrückt wird
    document.getElementById("autologin").onclick = function() {
        var autologin = document.getElementById('autologin').checked;
        console.log(autologin);
        chrome.storage.local.set({Autologin: autologin}, function() {
            console.log('Autologin updated:');
            console.log(autologin);
        });
    }
    //Synchronisieren von Autologin Checkbox mit Datenbank
    chrome.storage.local.get(["Autologin"], function(result) {
        var autolog_retr = result.Autologin;
        if(autolog_retr == null || autolog_retr == false){
            if(autolog_retr == null){
                chrome.storage.local.set({Autologin: false}, function() {
                    console.log('Autologin updated:');
                    console.log(false);
                });
            }
            document.getElementById('autologin').checked = false;
            return null;
        }else if(autolog_retr = true){
            document.getElementById('autologin').checked = true;
        }
    });
}