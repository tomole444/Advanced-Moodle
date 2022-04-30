# Advanced-Moodle
Upgrade for the current FHWS Elearning. Added features: Mark new content, Autologin

Chrome/Edge extension

:exclamation::exclamation::exclamation: USE THIS EXTENSION AT YOUR OWN RISK. CREDENTIALS ARE STORED IN PLAIN TEXT IN THE DATABASE. COULD BE EXPLOITED IF YOUR PC WAS HACKED :exclamation::exclamation::exclamation:

# Install
## Chrome/Edge
1. Go to `chrome://extensions/` in your browser
2. Activate developer mode in extension settings

![Developermode][logo]


3. Download this repository, unpack the zip file in one folder (this folder needs to exist after the installation is complete, so put it somewhere you don't accidentally delete it), select this folder after hitting this button

![Load unpacked][logo2]


4. Copy the ID of the extension. (Unfortunately this ID is not the same accross all installations due to this extension not being officially released on the Chrome Web Store)

![Copy ID][logo3]

5. Change the ID in `browseractions/popup.html`

![Change ID][logo4]

5. Save the file an press the reload button. All Icons should now load correctly.

![Done][logo3]

[logo]: https://raw.githubusercontent.com/tomole444/Advanced-Moodle/main/screenshots/installation/activate%20developer%20mode.png "Developermode"
[logo2]: https://raw.githubusercontent.com/tomole444/Advanced-Moodle/main/screenshots/installation/load%20unpacked%20extension.png "Load unpacked"
[logo3]: https://raw.githubusercontent.com/tomole444/Advanced-Moodle/main/screenshots/installation/done.png "Copy ID"
[logo4]: https://raw.githubusercontent.com/tomole444/Advanced-Moodle/main/screenshots/installation/Alter%20ID.png "Alter ID"
# Usage
## Save Autologin credential
To save your credentials for autologin just insert your credentials and hit "Save Credentials"
## Handle new items in a course
New items in a course are displayed red:

![Red][usage1]

In addition to this, the number of new item will be displayed in the badgecount of the extension.

![Badgecount][usage2]

Once you clicked the green checkmark in the extensions menu all items the extension will interpret all new items on this site as checked. They will be display without a red backgground.
Sometimes the extension will not mark any new items on the site. To manually check for new item just hit the refreshing icon.
You can also clear the database so all items across all courses will be displayed as new. (This step irreversible so be careful)

![Menu][usage3]

[usage1]: https://raw.githubusercontent.com/tomole444/Advanced-Moodle/main/screenshots/usage/new%20items.png "Red items"
[usage2]: https://raw.githubusercontent.com/tomole444/Advanced-Moodle/main/screenshots/usage/badge%20count.png "Badge Count"
[usage3]: https://raw.githubusercontent.com/tomole444/Advanced-Moodle/main/screenshots/usage/menuitems.png "Menu"
