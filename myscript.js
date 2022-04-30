chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    switch(request.type) {
        case "clear":
            clear_database();
        break;
        default:
            //Alle "li" Elemente auf der Site erfassen
            var li_items = document.querySelectorAll("li");
            var badge_counter = 0;
            var course_id = li_items[0].baseURI.replace("https://elearning.fhws.de/course/view.php?id=", "");            
            //Speicher mit bereits gesehenen Elementen abrufen
            chrome.storage.local.get(["Database"], function(result) {
                // Bekannte Li-Items aus Database holen
                var Database_retr = result.Database;
                console.log("Current Course-ID: " + course_id);
                //Überprüfen, ob bereits Daten in der Datenbank vorhanden sind
                try{
                    Database_retr.length;
                }catch(e){
                    clear_database();
                    return null;
                }
                console.log("Li-Items in database: " + Database_retr.length);
                console.log("Li-Items on this page (navigation included): " + li_items.length);
                //Durch die Li-Items auf der Seite gehen
                for(var i=0; i < li_items.length; i++) {
                    // Nur alle relevanten Elemente aus dem E-Learningkurs betrachten (haben alle "module" in der id)
                    if(li_items[i].id.includes("module") == true){
                        // Id des Elements extrahieren und an lokale Version der Database anhängen
                        var cut_id = li_items[i].id.replace("module-","");
                        //Objekt aus Li-Element erstellen, das Kurs und li-id gespeichert hat
                        var id_dict = {
                            course_id: course_id,
                            li_id: cut_id
                        };
                        var found = false;
                        //Prüfen, ob das Li-Objekt schon in der Datenbank vorhanden ist
                        for(var j = 0; j < Database_retr.length; j++)
                        {
                            if(id_dict.course_id == Database_retr[j].course_id && id_dict.li_id == Database_retr[j].li_id){
                                found = true;
                            }
                        }
                        // Entweder der Liste, und später der Datenbank, anfügen oder betroffenes objekt einfärben
                        if (found == false && request.type == "update"){
                            Database_retr.push(id_dict);
                        }else if(found == false && request.type == "check"){
                            li_items[i].style.backgroundColor = request.color;
                            badge_counter = badge_counter + 1;
                        }
                    }
                }
                //Erfasste und alte "li" Items speichern oder badge nummer aktualisieren
                if(request.type == "update"){
                    chrome.storage.local.set({Database: Database_retr}, function() {
                        console.log('Values uploaded');
                    });
                    //Die Badge auf 0 setzen
                    set_badge("0");
                    location.reload();
                }else if(request.type == "check"){
                    //Badge auf Anzahl der Änderungen setzen
                    set_badge(badge_counter.toString(10));
                }
            });
        break;
    }
    sendResponse({dummy: "Dummy response"});
});

function clear_database(){
    var id_list = [];
    var id_empty = {
        course_id: "dummy",
        li_id: "dummy"
    };
    id_list.push(id_empty);
    chrome.storage.local.set({Database: id_list}, function() {
        console.log('Database empty');
    });
    set_badge("0");
    location.reload();
}
function set_badge(number_str){
    chrome.runtime.sendMessage({type: "badge", number: number_str 
    });
}