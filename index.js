chrome.storage.local.get(["Autologin"], function(result) {
    var autolog_retr = result.Autologin;
    if(autolog_retr == null || autolog_retr == false){
        chrome.storage.local.set({Autologin: false}, function() {
            console.log('Autologin deactivated');
        });
        return null;
    }
    location.href = 'https://elearning.fhws.de/login/index.php';
});