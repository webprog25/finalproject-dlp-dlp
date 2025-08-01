[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19589077&assignment_repo_type=AssignmentRepo)
Final Project
====================

Project Title: Wochenarbeits- und Schulplaner für die Familie
Your Name: Duy Le Pham

Overview
--------
Es ist ein Planer, in dem man Einträge für den jeweiligen Tage eintragen kann. 
Im Wochenplaner stehen die Arbeitszeiten sowie die Schul- und Kindergartenzeiten, die wöchentlich variieren 
können. Zudem gibt es eine ToDo-Liste, die wichtige Erledigungen oder Arbeiten mit Fristen
erfassen soll. Die Terminliste listet außerdem einzelne Termine auf. 
Jede Person kann über ein Eingabeformular Beiträge eintragen, die dann entweder im Planer 
oder in den Listen gespeichert werden. Die Beiträge können im Nachhinein auch geändert oder 
gelöscht werden. Die Einträge in der Todo- und Terminliste können abgehakt werden, sobald sie erledigt sind
und können dann aus der Liste gelöscht werden.

Running
-------
<TODO: In general, I should be able to `npm install` and `npm start` your project. If there is anything else we need to know about running your project, please let us know here.>

Do I need to load data from init_db.mongodb? <TODO: Yes/No> Yes
Das Projekt läuft mit npm start und ist mit mongoDB verbunden. 
Meine Datenbank heißt eintraegeDB und hat vier Collections: eintraegs, wochenplans, termins und todos.


Features
--------
<TODO: This doesn't have to be a comprehensive list. But if there's anything I should definitely try or might miss, this is a good place to let me know about that.>

Collaboration and libraries
---------------------------
<TODO: Identify any sources you have consulted or libraries/external code you used. If your project overlaps with another project or coursework for another class, please describe the overlap and the parts specific to you/lecture here.>

Kalenderansicht von fullcalendar
Buttons von svgrepo.com

Meine Anmerkungen:
index.html
	Ich habe in index.html mit drei verschiedenen Formularen aufgebaut und Fullcalendar für die Kalenderansicht integriert. Diese index.html habe ich weitgehend selbstständig aufgebaut. Teilweise habe ich chatGPT benötigt – für die Integration von Fullcalendar sowie für den Editor für die Einträge im Wochenplan.
 
styles.css
	Die CSS-Datei habe ich ebenso selbstständig bearbeitet. Allerdings habe ich für bestimmte Einstellungen chatGPT zur Hilfestellung benutzt. Konkrete Hilfestellungen sind als Kommentare in der CSS-Datei vermerkt. 

index.js, termine.js, todo.js, wochenplan.js, db.js
So wie in der LV habe ich querySelector und getElementById verwendet, um mit DOM zu arbeiten. Der Aufbau der js-Dateien ist modular, d.h. die index.js ist die Hauptdatei. Termine.js, 
Todo.js und Wochenplan.js sind Untermodule. 
In Bezug auf .js hier habe ich öfters mit chatGPT gearbeitet, falls ich die Probleme nicht selbst lösen konnte. Am meisten habe ich chatGPT für den Wochenplan benötigt, um mit Fullcalendar korrekt einzubetten. Ebenso benötigte ich Hilfestellung für die fetch-Methoden zur Verknüpfung mit der Datenbank. Konkrete Hilfestellungen sind als Kommentare in der jeweiligen js-Datei vermerkt.
Den Code für db.js habe ich jedoch komplett von chatGPT übernommen. Da war ich überfordert, wie ich selbst die DB-Verbindung herstellen kann. Ich habe lediglich den DB-Namen angepasst.

initAPI
	Auch hier war ich komplett auf chatGPT angewiesen. Ich habe lediglich Anpassungen
bei den jeweiligen Stellen vorgenommen, um die korrekten Beziehungen herzustellen. Auch wenn ich den Code nicht selbst programmiert habe, habe ich den Code so belassen, um einen Einblick zu bekommen, wie man Verknüpfungen zu einer Datenbank herstellt. 
Zunächst habe ich mit json probiert, eine lokale Datenbankstruktur aufzubauen. Die Datenbearbeitung hat damit sehr gut funktioniert. Als nächsten Schritt habe ich dann die DB-Verknüpfung mit mongoDB aufgebaut. Deswegen habe ich in der initAPI-Datei die Funktionen/Methoden für json zur Sicherheit noch drinnen gelassen bzw. auskommentiert, für den Fall dass ich mit mongoDB nicht zurechtkomme. Glücklicherweise ist es mir gelungen, eine Verbindung zu mongoDB herzustellen, allerding mit viel Unterstützung von chatGPT.

Anmerkungen zu fehlenden Funktionen:
	Das Editieren und Löschen der Einträge funktioniert prinzipiell. Allerdings habe ich noch keine Funktionen eingebaut, um die editierten bzw. gelöschten Einträge in der Datenbank einzugeben bzw. abzurufen. Ich habe sie nicht eingebaut, weil ich sowieso chatGPT benötigt hätte, um die Codes korrekt zu programmieren.   





