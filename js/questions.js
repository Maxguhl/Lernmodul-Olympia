// js/questions.js
// Fragen je Stufe. types: choice, truefalse, multiselect, match (inputMode: 'drag'|'click'),
// order (drag), speed (subtype: 'choice'|'truefalse', timeLimitMs)

(function(){
  const QUESTIONS = {
    // Stufe 1: Anspruchsvollere Fragen passend zur Antike/Moderne
    1: [
      { id:'s1-1', type:'choice',
        prompt:'Welche Funktion hatten die antiken Olympischen Spiele vor allem für die griechischen Stadtstaaten?',
        options:[
          'A) Ein religiöses Fest mit politischer und kultureller Bedeutung, das Gemeinschaft und Status stärkte',
          'B) Ein rein sportlicher Wettkampf ohne gesellschaftliche Bedeutung',
          'C) Eine jährliche Handelsmesse zur Vergabe von Ressourcen'
        ],
        answer:'A) Ein religiöses Fest mit politischer und kultureller Bedeutung, das Gemeinschaft und Status stärkte',
        explain:'Richtig: Die Spiele waren religiös (Zeus) und hatten zugleich politische und kulturelle Bedeutung – Prestige, Bündnisse und Ruhm.' },

      { id:'s1-2', type:'choice',
        prompt:'Welche Aussage zur Teilnahme an den antiken Spielen ist korrekt?',
        options:[
          'A) Alle freien und nichtfreien Einwohner Griechenlands durften antreten',
          'B) Teilnahme war ausschließlich freien griechischen Männern vorbehalten; Frauen, Sklaven und Fremde waren ausgeschlossen',
          'C) Nur Herrscherfamilien durften teilnehmen'
        ],
        answer:'B) Teilnahme war ausschließlich freien griechischen Männern vorbehalten; Frauen, Sklaven und Fremde waren ausgeschlossen',
        explain:'Richtig: Die Teilnahme war stark ethnisch-sozial beschränkt – kein Zugang für Frauen, Sklaven oder Ausländer.' },

      { id:'s1-3', type:'multiselect',
        prompt:'Welche fünf Disziplinen gehören historisch zum antiken Pentathlon (Fünfkampf)? (Mehrfachauswahl)',
        options:[
          'A) Stadionlauf (Kurzstrecke)',
          'B) Weitsprung',
          'C) Diskuswurf',
          'D) Speerwurf',
          'E) Ringen',
          'F) Schwimmen'
        ],
        answer:['A) Stadionlauf (Kurzstrecke)','B) Weitsprung','C) Diskuswurf','D) Speerwurf','E) Ringen'],
        explain:'Richtig: Pentathlon bestand aus Stadionlauf, Weitsprung, Diskus, Speer und Ringen; Schwimmen war nicht Bestandteil.' },

      { id:'s1-4', type:'choice',
        prompt:'Weshalb galt der Olivenkranz (kotinos) in der Antike als besonders erstrebenswerter Preis?',
        options:[
          'A) Er war teuer und konnte verkauft werden',
          'B) Er symbolisierte Ruhm, Ehrenstatus und religiöse Anerkennung, wichtiger als materielle Belohnung',
          'C) Er berechtigte zur Steuerbefreiung'
        ],
        answer:'B) Er symbolisierte Ruhm, Ehrenstatus und religiöse Anerkennung, wichtiger als materielle Belohnung',
        explain:'Richtig: Der Kranz war Sinnbild für Ehre und Ruhm; Geldpreise spielten keine Rolle.' },

      { id:'s1-5', type:'order', inputMode:'drag',
        prompt:'Ordne diese Phasen der olympischen Geschichte chronologisch:',
        items:[
          'Wiederbelebung der Spiele 1896 durch Pierre de Coubertin',
          'Ende/Verbot der antiken Spiele (spätrömische Zeit)',
          'Erste Olympischen Spiele der Antike (776 v. Chr.)',
          'Einführung der Olympischen Winterspiele in der Neuzeit'
        ],
        correctOrder:[
          'Erste Olympischen Spiele der Antike (776 v. Chr.)',
          'Ende/Verbot der antiken Spiele (spätrömische Zeit)',
          'Wiederbelebung der Spiele 1896 durch Pierre de Coubertin',
          'Einführung der Olympischen Winterspiele in der Neuzeit'
        ],
        explain:'Richtig: Antike → Verbot/Ende → Wiederbelebung 1896 → erste Winterspiele (20. Jh.).' },

      { id:'s1-6', type:'choice',
        prompt:'In welchem grundlegenden Punkt unterscheiden sich antikes und modernes olympisches Ideal heute am deutlichsten?',
        options:[
          'A) Antike fokussierte Ruhm einzelner Athleten; moderne Spiele betonen Gleichberechtigung, Fairness und internationale Verständigung',
          'B) Antike legte den Schwerpunkt auf Medienpräsenz; moderne Spiele sind primär religiös',
          'C) Beide Epochen hatten identische Werte und organisatorische Strukturen'
        ],
        answer:'A) Antike fokussierte Ruhm einzelner Athleten; moderne Spiele betonen Gleichberechtigung, Fairness und internationale Verständigung',
        explain:'Richtig: Während Ruhm im Vordergrund stand, sind moderne Ideale Gleichberechtigung, Fairness, Anti-Doping und internationale Verständigung.' }
    ],

    // Stufe 2: Doping — sachlich & ethisch anspruchsvoll
    2: [
      { id:'s2-1', type:'multiselect',
        prompt:'Welche Substanzen werden häufig beim Doping eingesetzt, um die Leistung zu steigern?',
        options:['A) Vitamine','B) Anabolika','C) Erythropoetin (EPO)','D) Mineralwasser'],
        answer:['B) Anabolika','C) Erythropoetin (EPO)'],
        explain:'Richtig: Anabolika fördern Muskelaufbau; EPO erhöht die Sauerstofftransportkapazität des Blutes.' },

      { id:'s2-2', type:'choice',
        prompt:'Was ist das Hauptziel der Anti-Doping-Maßnahmen?',
        options:['A) Geld sparen','B) Athletinnen und Athleten schützen und Fairness sichern','C) Mehr Medaillen verleihen','D) Zuschauer unterhalten'],
        answer:'B) Athletinnen und Athleten schützen und Fairness sichern',
        explain:'Richtig: Schutz der Gesundheit und Chancengleichheit sind Kernziele von WADA & Co.' },

      { id:'s2-3', type:'choice',
        prompt:'Welche Rolle spielt die WADA (Welt-Anti-Doping-Agentur)?',
        options:['A) Erfindung neuer Leistungsenhancer','B) Erstellung der Verbotsliste, Koordination von Tests und Sanktionen','C) Finanzierung von Sportlern'],
        answer:'B) Erstellung der Verbotsliste, Koordination von Tests und Sanktionen',
        explain:'Richtig: WADA erstellt die Prohibited List und koordiniert Anti-Doping-Maßnahmen international.' },

      { id:'s2-4', type:'truefalse',
        prompt:'Doping ist nur deshalb verboten, weil es unfair ist — gesundheitliche Folgen sind irrelevant.',
        answer:false,
        explain:'Falsch: Doping ist verboten wegen Unfairness und wegen erheblicher gesundheitlicher Risiken.' },

      { id:'s2-5', type:'choice',
        prompt:'Welches ethische Problem entsteht, wenn Trainer oder Ärzte Athleten zu Doping anstiften?',
        options:[
          'A) Keine, weil Sportler selbst entscheiden',
          'B) Ein Vertrauens- und Verantwortungsbruch gegenüber der Fürsorgepflicht',
          'C) Nur ein legales Problem'
        ],
        answer:'B) Ein Vertrauens- und Verantwortungsbruch gegenüber der Fürsorgepflicht',
        explain:'Richtig: Trainer/Ärzte verletzen ihre Fürsorgepflicht und gefährden Athleten aktiv.' },

      { id:'s2-6', type:'speed', subtype:'choice', timeLimitMs:6000,
        prompt:'Welche Methode gehört NICHT zu üblichen Anti-Doping-Tests?',
        options:['Urintest','Blutprobe','DNA-Sequenzierung auf Muskelstruktur'],
        answer:'DNA-Sequenzierung auf Muskelstruktur',
        explain:'Richtig: Urin- und Bluttests sind typisch; DNA-Sequenzierung wird nicht routinemäßig für Dopingtests genutzt.' }
    ],

    // Stufe 3: Politik, Kommerz, Inklusion — anspruchsvolle Fragestellungen
    3: [
      { id:'s3-1', type:'choice',
        prompt:'Warum gelten die Olympischen Spiele oft als politisch aufgeladen?',
        options:['A) Weil sie geografisch zentral stattfinden','B) Wegen Boykotten, Propaganda und nationaler Selbstdarstellung','C) Weil nur eine Sportart gezeigt wird'],
        answer:'B) Wegen Boykotten, Propaganda und nationaler Selbstdarstellung',
        explain:'Richtig: Historische Beispiele (1936, 1968, 1980) zeigen politische Nutzung der Spiele.' },

      { id:'s3-2', type:'choice',
        prompt:'Welches Problem entsteht durch starke Kommerzialisierung der Spiele?',
        options:[
          'A) Geringere Medienpräsenz',
          'B) Verschiebung des Fokus von sportlicher Fairness hin zu Profitinteressen',
          'C) Weniger Zuschauer'
        ],
        answer:'B) Verschiebung des Fokus von sportlicher Fairness hin zu Profitinteressen',
        explain:'Richtig: Sponsoring und TV-Rechte können sportliche Prioritäten verändern.' },

      { id:'s3-3', type:'multiselect',
        prompt:'Welche Maßnahmen fördern die Inklusion bei internationalen Spielen? (Mehrfachauswahl)',
        options:['A) Einführung von Paralympics','B) Einführung gemischter Wettbewerbe (Mixed)','C) Ausschluss kleiner Nationen','D) Barrierefreie Infrastruktur'],
        answer:['A) Einführung von Paralympics','B) Einführung gemischter Wettbewerbe (Mixed)','D) Barrierefreie Infrastruktur'],
        explain:'Richtig: Paralympics, Mixed-Events und barrierefreie Infrastruktur fördern Inklusion.' },

      { id:'s3-4', type:'order', inputMode:'drag',
        prompt:'Ordne die historischen Ereignisse nach ihrem Jahr (ältestes zuerst):',
        items:['Los Angeles (1984) – sowjetischer Boykott','Berlin (1936) – NS-Propaganda','Mexiko-Stadt (1968) – Black-Power-Protest','Moskau (1980) – US-Boykott'],
        correctOrder:['Berlin (1936) – NS-Propaganda','Mexiko-Stadt (1968) – Black-Power-Protest','Moskau (1980) – US-Boykott','Los Angeles (1984) – sowjetischer Boykott'],
        explain:'Richtig: 1936 → 1968 → 1980 → 1984.' },

      { id:'s3-5', type:'truefalse',
        prompt:'Technologische Neuerungen (Zeitmessung, Materialien) haben keinen Einfluss auf die Rekordentwicklung.',
        answer:false,
        explain:'Falsch: Technik führt zu besseren Bedingungen und häufig zu schnelleren/effizienteren Leistungen.' },

      { id:'s3-6', type:'speed', subtype:'truefalse', timeLimitMs:6000,
        prompt:'Olympische Spiele und Paralympics sind vollständig voneinander unabhängig und haben nie Einfluss aufeinander.',
        answer:false,
        explain:'Falsch: Paralympics und Olympische Spiele beeinflussen sich in Bereichen wie Infrastruktur, Öffentlichkeit und Inklusion.' }
    ]
  };

  const STAGE = /stufe(\d)\.html/i.test(location.pathname) ? Number(RegExp.$1) : 1;
  window.STAGE = STAGE;
  window.STAGE_QUESTIONS = QUESTIONS;
  window.stageQuestions = QUESTIONS[STAGE] || QUESTIONS[1];
})();
