export function wochenplan(Name) {
    let Wochenkalender;
    
    // Hilfestellung chatGPT: Laufnummer für Wocheneinträge
    let currentEventId = null;

    const wochenKalender = document.getElementById('wochenKalender');
    const wochenFormular = document.querySelector('#wochenFormular');
    const wochenInhalt = document.getElementById('wochenInhalt');
    const wochenDatum = document.getElementById('wochenDatum');
    const wochenUhrzeitbeginn = document.getElementById('wochenUhrzeitbeginn');
    const wochenUhrzeitende = document.getElementById('wochenUhrzeitende');
    const wochenFarbe = document.getElementById('wochenFarbe');

    Wochenkalender = new FullCalendar.Calendar(wochenKalender, { 
            initialView: 'timeGridWeek',
            locale: 'de',
            firstDay: 1,
            allDaySlot: false,
            expandRows: true,
            headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
        
            
            //Hilfestellung chatGPT: Wocheneintrag im Fullcalendar editierbar machen.
            events: [],
            eventClick: function(info) {
            currentEventId = info.event.id;

            const parts = info.event.title.split(':');
            document.getElementById('editName').value = parts[0].trim();
            document.getElementById('editInhalt').value = parts.slice(1).join(':').trim();
            document.getElementById('editDatum').value = info.event.start.toISOString().substring(0, 10);
            document.getElementById('editStart').value = info.event.start.toTimeString().substring(0,5);
            document.getElementById('editEnde').value = info.event.end.toTimeString().substring(0,5);
            document.getElementById('editorFenster').classList.remove('hidden');
            }
        });

        Wochenkalender.render();

        wochenFormular.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const wochenTerminbeginn = new Date(wochenDatum.value + 'T' + wochenUhrzeitbeginn.value);
            const wochenTerminende = new Date(wochenDatum.value + 'T' + wochenUhrzeitende.value);
        
            let wochenBackground;
            switch(wochenFarbe.value) {
                case "Rot":
                        wochenBackground = '#F4A6A6';
                    break;

                case "Gelb":
                        wochenBackground = '#FFFACD';
                    break;

                case "Grün":
                        wochenBackground = '#BFD8B8';
                    break;

                case "Blau":
                        wochenBackground = '#AEC6CF';
                    break;

                default: 
                    break;
            }

            Wochenkalender.addEvent({
            // Hilfestellung chatGPT: Laufnummer für Wocheneinträge
            id: 'id_' + Date.now(),
            title: `${Name.value}: ${wochenInhalt.value}`,
            start: wochenTerminbeginn,
            end: wochenTerminende,
            backgroundColor: wochenBackground,
            textColor: '#000000',
            });
        });

        // Speichern Editieren Wocheneintrag
        // Hilfestellung chatGPT: das Editieren erfolgt in einem eigenen Fenster, nachdem man auf den Wocheneintrag klickt
        document.getElementById('saveEdit').addEventListener('click', function() {
            const event = Wochenkalender.getEventById(currentEventId);
            if (event) {
                const neuerInhalt = `${document.getElementById('editName').value}: ${document.getElementById('editInhalt').value}`;
                const neuerStart = new Date(document.getElementById('editDatum').value + 'T' + document.getElementById('editStart').value);
                const neuerEnde = new Date(document.getElementById('editDatum').value + 'T' + document.getElementById('editEnde').value);

                event.setProp('title', neuerInhalt);
                event.setStart(neuerStart);
                event.setEnd(neuerEnde);
            }
            document.getElementById('editorFenster').classList.add('hidden');
        });

        // Löschen Wocheneintrag
        document.getElementById('deleteEntry').addEventListener('click', function () {
            const event = Wochenkalender.getEventById(currentEventId);
            if (event) {
                event.remove();
            }
            document.getElementById('editorFenster').classList.add('hidden');
        });

        // Schließen Texteditor
        document.getElementById('closeEditor').addEventListener('click', function() {
            document.getElementById('editorFenster').classList.add('hidden');
        });

}

