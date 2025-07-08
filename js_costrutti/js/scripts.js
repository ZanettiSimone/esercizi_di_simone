let esercizioScelto = -1;
let verifica = 0;
let meseScelto; let meseSceltoTestuale; let stagione;

loop1: while (verifica = 1) {
    if (esercizioScelto == -1) {
        let input = prompt("Scegli un esercizio tra: \n 0) Attiva la Console \n 1) Scegli un mese dell'anno \n 2) Stampare 10 numeri in Console \n 3) Esercizio svolto in classe il 29-05-2025 \n 9) Per tornare alla pagina HTML");
        esercizioScelto = parseFloat(input);
    }
    if (!isNaN(esercizioScelto)) {
        switch (esercizioScelto) {
            case 0:
                document.location.reload();
            case 9:
                break loop1;
            case 1: // scelto esercizio mese dell'anno
                mesiAnno = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]
                meseScelto = prompt("Inserisci un mese in formato numerico (da 1 a 12): ");
                if (!isNaN(meseScelto)) {
                    if (meseScelto < 1 || meseScelto > 12) {
                        alert("Non hai inserito un numero valido - ti rimando alla scelta")
                    } else {
                        switch (meseScelto) {
                            case "12": case "1": case "2":
                                stagione = "Inverno";
                                break;
                            case "3": case "4": case "5":
                                stagione = "Primavera";
                                break;
                            case "6": case "7": case "8":
                                stagione = "Estate";
                                break;
                            case "9": case "10": case "11":
                                stagione = "Autunno";
                        }
                        meseSceltoTestuale = mesiAnno[meseScelto - 1]
                        console.log("Hai scelto " + meseSceltoTestuale + " come mese, che fa parte della seguente stagione: " + stagione);
                        esercizioScelto = -1
                    }
                } else {
                    alert("Non hai inserito un numero - ti rimando alla scelta")
                }
                break;
            case 2: // scelto esercizio stampa 10 numeri in console
                let numeriPari = 0; let stringaNumeri = ""
                do {
                    console.log("Questo è un numero pari: " + numeriPari);
                    numeriPari = numeriPari + 2;
                } while (numeriPari < 11);
                esercizioScelto = -1
                break;
            case 3: // scelto esercizio svolto in classe
                let input = prompt("Inserisci un numero da 1 a 12");
                let myNumber = parseFloat(input)
                if (!isNaN(myNumber)) {
                    if (myNumber <= 12) {
                        console.log("Hai inserito il seguente numero: " + myNumber);
                        esercizioScelto = -1
                    } else {
                        console.log("Hai inserito un numero ma volevo che fosse inferiore o uguale a 12");
                        esercizioScelto = -1
                    }
                } else {
                    console.log("Non hai inserito un numero")
                    esercizioScelto = -1
                }
                break;
            default:
                alert("Non hai inserito un numero valido - ti rimando alla scelta")
                esercizioScelto = -1
        }
    } else {
        if (confirm("Non hai inserito un numero - ti rimando alla scelta")) {
            esercizioScelto = -1
        }
    }
}
