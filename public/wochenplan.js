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

    // Hilfestellung chatGPT: Zugriff auf die FullCalendar-Variablen
    Wochenkalender = new FullCalendar.Calendar(wochenKalender, { 
            initialView: 'timeGridWeek',
            hiddenDays: [0, 6], // Samstag, Sonntag ausblenden
            slotMinTime: '07:00:00',
            slotMaxTime: '24:00:00',
            locale: 'de',
            firstDay: 1,
            allDaySlot: false,
            expandRows: true,
            headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
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
        console.log('FullCalendar wurde gerendert');
        
        // Hilfestellung chatGPT: Delay einbauen, um Kalender korrekt anzuzeigen.
        setTimeout(() => {
            Wochenkalender.render();
        }, 50);

        wochenFormular.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const wochenEintrag = {
                typ: 'Wochenplan',
                name: Name.value,
                datum: wochenDatum.value,
                beginn: wochenUhrzeitbeginn.value,
                ende: wochenUhrzeitende.value,
                inhalt: wochenInhalt.value,
                farbe: wochenFarbe.value
            };
            
            // Hilfestellung chatGPT: fetch-Funktion für DB-Verknüpfung
            try {
            const res = await fetch('/api/wochenplan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(wochenEintrag)
            });

            if (!res.ok) throw new Error('Fehler beim Speichern');

            wochenplanAnzeigen(wochenEintrag);
            wochenFormular.reset();   // Formular leeren
            } catch (err) {
                console.error('Fehler beim Speichern:', err);
            }
        });

        // Wocheneintrag Edit speichern 
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

        // Wocheneintrag löschen 
        document.getElementById('deleteEntry').addEventListener('click', function () {
            const event = Wochenkalender.getEventById(currentEventId);
            if (event) {
                event.remove();
            }
            document.getElementById('editorFenster').classList.add('hidden');
        });

        // Editor schließen 
        document.getElementById('closeEditor').addEventListener('click', function() {
            document.getElementById('editorFenster').classList.add('hidden');
        });

        //Methoden:
        // Funktion zum Anzeigen der erzeugten Wocheneinträge im Kalender
        function wochenplanAnzeigen(wochenEintrag) {
            const Terminbeginn = new Date(wochenEintrag.datum + 'T' + wochenEintrag.beginn);
            const Terminende = new Date(wochenEintrag.datum + 'T' + wochenEintrag.ende);
        
            let wochenBackground;
            switch(wochenEintrag.farbe) {
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
            title: `${wochenEintrag.name}: ${wochenEintrag.inhalt}`,
            start: Terminbeginn,
            end: Terminende,
            backgroundColor: wochenBackground,
            textColor: '#000000',
            });
        };

        async function wochenplanLaden() {
        try {
            const res = await fetch('/api/eintraege');
            if (!res.ok) throw new Error('Fehler beim Laden');

            const daten = await res.json();
            const wochenplaneinträge = daten.wocheneintraege.filter(e => e.typ === 'Wochenplan');

            wochenplaneinträge.forEach(wochenplanAnzeigen);
        } catch (err) {
            console.error('Fehler beim Laden der Termine:', err);
        }
    }

        wochenplanLaden(); // Alle Todos laden bei Seitenaufruf bzw. -aktualisierung
};

