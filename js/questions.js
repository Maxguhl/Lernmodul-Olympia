// js/questions.js
// Fragen je Stufe. types: choice, truefalse, multiselect, match (inputMode: 'drag'|'click'),
// order (drag), speed (subtype: 'choice'|'truefalse', timeLimitMs)

(function(){
    const QUESTIONS = {
      1: [
        { id:'s1-1', type:'choice',    prompt:'Wann fanden die ersten antiken Olympischen Spiele statt?', options:['A) 1896 n. Chr.','B) 776 v. Chr.','C) 500 v. Chr.'], answer:'B) 776 v. Chr.', explain:'Richtig: B) 776 v. Chr.' },
        { id:'s1-2', type:'choice', prompt:'Wo wurden die antiken Olympischen Spiele ausgetragen?',options:['A) In Athen','B) In Sparta','C) In Olympia']   ,answer:'C) In Olympia',  explain:'Richtig: C) In Olympia' },
        { id:'s1-3', type:'choice',     prompt:'Welche Sportarten gab es im antiken Griechenland?', options:['A) Fußball, Tennis und Schwimmen','B) Diskuswerfen, Ringen und Wagenrennen','C) Volleyball, Radfahren und Boxen'],answer:'B) Diskuswerfen, Ringen und Wagenrennen',  explain:'Richtig: B) Diskuswerfen, Ringen und Wagenrennen',
         },
        { id:'s1-4', type:'order',     inputMode:'drag', prompt:'Bringe die Ereignisse in Reihenfolge:',
          items:['Spiele der Antike beginnen','Verbot der antiken Spiele','Spiele der Moderne starten','Erste Winterspiele der Moderne'],
          correctOrder:['Spiele der Antike beginnen','Verbot der antiken Spiele','Spiele der Moderne starten','Erste Winterspiele der Moderne'],
          explain:'Antike → Verbot → Moderne → Winterspiele.' },
        { id:'s1-5', type:'speed',     subtype:'choice', timeLimitMs:7000,
          prompt:'Wie viele olympische Ringe?', options:['4','5','6'], answer:'5', explain:'Es sind fünf.' },
        { id:'s1-6', type:'choice', prompt:'Wer gilt als Gründer der modernen Olympischen Spiele?',
          options:['A) Alexander der Große','B) Pierre de Coubertin','C) Aristoteles'], answer:['B) Pierre de Coubertin'], explain:'Richtig: B) Pierre de Coubertin' }
      ],
  
      2: [
        { id:'s2-1', type:'multiselect', prompt:'Welche Substanzen werden beim Doping häufig verwendet?',
          options:['A) Vitamine','B) Anabolika','C) EPO','D) Mineralwasser'], answer:['B) Anabolika','C) EPO'], explain:'B) Anabolika C) EPO' },
        { id:'s2-2', type:'choice', prompt:'Was ist das Hauptziel der Anti-Doping-Maßnahmen?', options:["A) Geld sparen","B) Athleten schützen und Fairness sichern","C) Mehr Medaillen verleihen","D) Zuschauer unterhalten"],
          answer:["B) Athleten schützen und Fairness sichern"], explain:'Historische Zuordnungen (Beispiele).' },
        { id:'s2-3', type:'choice', prompt:'In welchen Sportarten treten Dopingfälle besonders häufig auf?',
          options:['A) Schach und Golf','B) Leichtathletik und Gewichtheben','C) Eishockey und Curling','D) Turnen und Tanzsport'],
          answer:['B) Leichtathletik und Gewichtheben '], explain:'B) Leichtathletik und Gewichtheben ' },
        { id:'s2-4', type:'truefalse', prompt:'Sind die IOC und WADA Organisationen, die doping verhindern wollen', answer:true, explain:'Ja' },
        { id:'s2-5', type:'choice', prompt:'Olympisches Motto bedeutet…',
          options:['Schneller, höher, stärker','Größer, weiter, fairer','Härter, schneller, länger'], answer:'Schneller, höher, stärker', explain:'Citius, Altius, Fortius.' },
        { id:'s2-6', type:'speed', subtype:'choice', timeLimitMs:6000, prompt:'Erste Winterspiele waren in…',
          options:['Chamonix','St. Moritz','Oslo'], answer:'Chamonix', explain:'1924 waren die ersten Winterspiele in Chamonix.' }
      ],
  
      3: [
        { id:'s3-1', type:'choice', prompt:'Wann wurden die Olympischen Spiele der Neuzeit erstmals politisch missbraucht?',
          options:["A) 1896","B) 1936","C) 1968",],answer:["D) 2000"],
          explain:'1936 wurden die Olympischen spiele erstmals von Hitler missbraucht' },
        { id:'s3-2', type:'choice', prompt:'Warum wurden die Spiele 1980 in Moskau boykottiert?',
          options:['A) Wegen eines Krieges in Afghanistan','B) Wegen Dopingfällen','C) Wegen Umweltproblemen'], answer:'A) Wegen eines Krieges in Afghanistan', explain:'A) Wegen eines Krieges in Afghanistan' },
        { id:'s3-3', type:'multiselect', prompt:'Welche Unternehmen sind offizielle Olympia-Partner? (Wähle alle richtigen)',
          options:['Coca-Cola','Samsung','Visa','Sparkasse Meißen'], answer:['Coca-Cola',"Samsung","Visa"], explain:'Nicht Sparkasse Meißen' },
        { id:'s3-4', type:'order', inputMode:'drag', prompt:'Ordne die Ereignisse in der richti gen Reihenfolge.',
          items:['Mexiko','Berlin','Los Angeles','Moskau'], correctOrder:['Berlin','Mexiko','Moskau','Los Angeles'], explain:'Berlin 1936 – NS-Propaganda;   Mexiko 1968 – Black-Power-Protest;   Moskau 1980 – Boykott der USA ;   Los Angeles 1984 – Boykott der Sowjetunion.' },
        { id:'s3-5', type:'truefalse', prompt:'Spiele wurden während der Weltkriege ausgesetzt.', answer:true, explain:'Mehrere Spiele fielen aus.' },
        { id:'s3-6', type:'speed', subtype:'truefalse', timeLimitMs:6000, prompt:'Ringen ist keine olympische Sportart.', answer:false, explain:'Ringen ist olympisch.' }
      ]
    };
  
    const STAGE = /stufe(\d)\.html/i.test(location.pathname) ? Number(RegExp.$1) : 1;
    window.STAGE = STAGE;
    window.STAGE_QUESTIONS = QUESTIONS;
    window.stageQuestions = QUESTIONS[STAGE] || QUESTIONS[1];
  })();

  
