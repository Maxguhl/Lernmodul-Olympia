// js/questions.js
// Fragen je Stufe. types: choice, truefalse, multiselect, match (inputMode: 'drag'|'click'),
// order (drag), speed (subtype: 'choice'|'truefalse', timeLimitMs)

(function(){
  const QUESTIONS = {
    1: [
      { id:'s1-1', type:'choice', 
        prompt:'Welche Bedeutung hatten die antiken Olympischen Spiele ursprünglich?', 
        options:[
          'A) Ein friedlicher Wettstreit zu Ehren des Gottes Zeus',
          'B) Ein militärisches Training der Stadtstaaten',
          'C) Eine Feier zu Ehren von Alexander dem Großen'
        ],
        answer:'A) Ein friedlicher Wettstreit zu Ehren des Gottes Zeus',
        explain:'Richtig: Die Spiele waren ein religiöses Fest zu Ehren von Zeus, dem höchsten griechischen Gott.' },

      { id:'s1-2', type:'choice', 
        prompt:'Wer durfte im antiken Griechenland an den Olympischen Spielen teilnehmen?', 
        options:[
          'A) Alle Männer und Frauen Griechenlands',
          'B) Nur freie griechische Männer',
          'C) Auch Sklaven und Ausländer, wenn sie trainiert waren'
        ],
        answer:'B) Nur freie griechische Männer',
        explain:'Richtig: Frauen, Sklaven und Ausländer waren ausgeschlossen – teilnehmen durften nur freie griechische Männer.' },

      { id:'s1-3', type:'multiselect', 
        prompt:'Welche Disziplinen gehörten zu den antiken Olympischen Spielen? (Mehrfachauswahl)', 
        options:[
          'A) Diskuswerfen',
          'B) Speerwerfen',
          'C) Wagenrennen',
          'D) Schwimmen'
        ],
        answer:['A) Diskuswerfen','B) Speerwerfen','C) Wagenrennen'],
        explain:'Richtig: Diskuswerfen, Speerwerfen und Wagenrennen gehörten zu den Disziplinen der Antike – Schwimmen nicht.' },

      { id:'s1-4', type:'choice', 
        prompt:'Was erhielten die Sieger der antiken Olympischen Spiele als Preis?', 
        options:[
          'A) Einen Olivenkranz und Ehre',
          'B) Eine Goldmedaille',
          'C) Eine Statue aus Bronze'
        ],
        answer:'A) Einen Olivenkranz und Ehre',
        explain:'Richtig: Geld- oder Sachpreise gab es nicht – Ruhm und ein Olivenkranz galten als höchste Auszeichnung.' },

      { id:'s1-5', type:'order', inputMode:'drag', 
        prompt:'Bringe die Ereignisse in die richtige zeitliche Reihenfolge:',
        items:[
          'Verbot der antiken Spiele durch das Römische Reich',
          'Erste Olympische Spiele der Antike',
          'Wiederbelebung der Spiele durch Pierre de Coubertin',
          'Erste Olympische Winterspiele'
        ],
        correctOrder:[
          'Erste Olympische Spiele der Antike',
          'Verbot der antiken Spiele durch das Römische Reich',
          'Wiederbelebung der Spiele durch Pierre de Coubertin',
          'Erste Olympische Winterspiele'
        ],
        explain:'Reihenfolge: Antike → Verbot → Moderne Wiederbelebung → Winterspiele.' },

      { id:'s1-6', type:'choice', 
        prompt:'Wie unterschied sich das olympische Ideal der Antike vom Ideal der Moderne?', 
        options:[
          'A) In der Antike ging es um Ruhm und Ehre, heute um Fairness und Frieden.',
          'B) In der Antike ging es um Geld, heute um Religion.',
          'C) Beide verfolgten dasselbe Ziel: politische Macht.'
        ],
        answer:'A) In der Antike ging es um Ruhm und Ehre, heute um Fairness und Frieden.',
        explain:'Richtig: Der Fokus verlagerte sich – vom persönlichen Ruhm hin zu internationaler Verständigung und Fairness.' }
    ],

    2: [
      { id:'s2-1', type:'multiselect', 
        prompt:'Welche Substanzen werden häufig beim Doping eingesetzt, um die Leistung zu steigern?', 
        options:['A) Vitamine','B) Anabolika','C) Erythropoetin (EPO)','D) Mineralwasser'], 
        answer:['B) Anabolika','C) Erythropoetin (EPO)'], 
        explain:'Richtig: B) Anabolika fördern den Muskelaufbau, C) EPO steigert die Sauerstoffaufnahme des Blutes.' },

      { id:'s2-2', type:'choice', 
        prompt:'Was ist das Hauptziel der Anti-Doping-Maßnahmen?', 
        options:['A) Geld sparen','B) Athletinnen und Athleten schützen und Fairness sichern','C) Mehr Medaillen verleihen','D) Zuschauer unterhalten'],
        answer:'B) Athletinnen und Athleten schützen und Fairness sichern', 
        explain:'Richtig: Anti-Doping-Maßnahmen sollen Gesundheit und Chancengleichheit gewährleisten.' },

      { id:'s2-3', type:'choice', 
        prompt:'In welchen Sportarten treten Dopingfälle besonders häufig auf?', 
        options:['A) Schach und Golf','B) Leichtathletik und Gewichtheben','C) Eishockey und Curling','D) Turnen und Tanzsport'],
        answer:'B) Leichtathletik und Gewichtheben', 
        explain:'Richtig: B) Leichtathletik und Gewichtheben – hier wurden viele Dopingfälle dokumentiert.' },

      { id:'s2-4', type:'truefalse', 
        prompt:'Sind das Internationale Olympische Komitee (IOC) und die Welt-Anti-Doping-Agentur (WADA) Organisationen, die Doping bekämpfen?', 
        answer:true, 
        explain:'Ja, beide setzen sich für sauberen Sport und gegen Doping ein.' },

      { id:'s2-5', type:'choice', 
        prompt:'Was bedeutet das olympische Motto „Citius, Altius, Fortius“?', 
        options:['A) Schneller, höher, stärker','B) Größer, weiter, fairer','C) Härter, schneller, länger'], 
        answer:'A) Schneller, höher, stärker', 
        explain:'Richtig: „Citius, Altius, Fortius“ ist Latein für „Schneller, höher, stärker“.' },

      { id:'s2-6', type:'speed', subtype:'choice', timeLimitMs:6000, 
        prompt:'Wo fanden 1924 die ersten Olympischen Winterspiele statt?', 
        options:['Chamonix','St. Moritz','Oslo'], 
        answer:'Chamonix', 
        explain:'Richtig: 1924 in Chamonix (Frankreich).' }
    ],

    3: [
      { id:'s3-1', type:'choice', 
        prompt:'Wann wurden die Olympischen Spiele erstmals politisch missbraucht?', 
        options:['A) 1896','B) 1936','C) 1968','D) 2000'], 
        answer:'B) 1936', 
        explain:'Richtig: 1936 – die Spiele in Berlin wurden von der NS-Diktatur für Propagandazwecke missbraucht.' },

      { id:'s3-2', type:'choice', 
        prompt:'Warum boykottierten viele Staaten die Olympischen Spiele 1980 in Moskau?', 
        options:['A) Wegen des sowjetischen Einmarschs in Afghanistan','B) Wegen zahlreicher Dopingfälle','C) Wegen Umweltproblemen'], 
        answer:'A) Wegen des sowjetischen Einmarschs in Afghanistan', 
        explain:'Richtig: A) Der Boykott war eine Reaktion auf den sowjetischen Angriff auf Afghanistan.' },

      { id:'s3-3', type:'multiselect', 
        prompt:'Welche Unternehmen gehören zu den offiziellen weltweiten Olympia-Partnern?', 
        options:['Coca-Cola','Samsung','Visa','Sparkasse Meißen'], 
        answer:['Coca-Cola','Samsung','Visa'], 
        explain:'Richtig: Große internationale Marken wie Coca-Cola, Samsung und Visa sind Partner des IOC.' },

      { id:'s3-4', type:'order', inputMode:'drag', 
        prompt:'Ordne die Austragungsorte dieser Olympischen Spiele in die richtige chronologische Reihenfolge:', 
        items:['Mexiko-Stadt','Berlin','Los Angeles','Moskau'], 
        correctOrder:['Berlin','Mexiko-Stadt','Moskau','Los Angeles'], 
        explain:'Berlin 1936 – NS-Propaganda; Mexiko-Stadt 1968 – Black-Power-Protest; Moskau 1980 – Boykott der USA; Los Angeles 1984 – Boykott der Sowjetunion.' },

      { id:'s3-5', type:'truefalse', 
        prompt:'Wurden Olympische Spiele während der Weltkriege ausgesetzt?', 
        answer:true, 
        explain:'Ja, während beider Weltkriege fanden keine Olympischen Spiele statt.' },

      { id:'s3-6', type:'speed', subtype:'truefalse', timeLimitMs:6000, 
        prompt:'Ringen ist keine olympische Sportart.', 
        answer:false, 
        explain:'Falsch – Ringen ist eine der ältesten olympischen Disziplinen.' }
    ]
  };

  const STAGE = /stufe(\d)\.html/i.test(location.pathname) ? Number(RegExp.$1) : 1;
  window.STAGE = STAGE;
  window.STAGE_QUESTIONS = QUESTIONS;
  window.stageQuestions = QUESTIONS[STAGE] || QUESTIONS[1];
})();
