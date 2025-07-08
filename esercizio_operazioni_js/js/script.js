
function eseguiOperazione() {
    // Verifico che le caselle contengano dei numeri
    let primoNumero = controllaNumero(document.getElementById("firstNumber"));
    let secondoNumero = controllaNumero(document.getElementById("secondNumber"));
    if (primoNumero == false || secondoNumero == false) {
        document.getElementById("textArea").innerText = "Non hai inserito un numero valido in entrambe le caselle"
        document.getElementById("textArea").style.backgroundColor = "red"
        document.getElementById("textArea").style.color = "white"
    } else {
        // eseguo l'operazione scelta
        // trovo quale operazione devo fare
        let tipoOperazioneSelezionata = document.querySelector('input[name="tipoOperazione"]:checked').id;
        let risultatoOperazione
        switch (tipoOperazioneSelezionata) {
            case 'addizione':
                risultatoOperazione = primoNumero + secondoNumero;
                break;
            case 'sottrazione':
                risultatoOperazione = primoNumero - secondoNumero;
                break;
            case 'moltiplicazione':
                risultatoOperazione = primoNumero * secondoNumero;
                break;
            case 'divisione':
                risultatoOperazione = primoNumero / secondoNumero;
        }
        document.getElementById("textArea").innerText = "Il risultato dell' operazione è: " + risultatoOperazione
        document.getElementById("textArea").style.backgroundColor = ""
        document.getElementById("textArea").style.color = "black"
    }
}

function controllaNumero(casella) {
    numero = casella.value
    numero = parseFloat(numero)
    if (!isNaN(numero)) {
        return numero;
    } else {
        return false;
    }
}