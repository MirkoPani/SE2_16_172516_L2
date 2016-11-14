//Modello. Contiene e modifica tutti i valori
var M = {
    limit: 30,
    table: document.getElementById("table"),
    valori: [],
    //Funzione che ottiene i valori dalla tabella e li salva come oggetti chiave:valore
    ottieniValori: function() {
        this.valori = [];
        for (i = 0; i < this.table.rows[0].cells.length; i++) {
            var tmp = {};
            tmp[this.table.rows[0].cells[i].innerHTML] = this.table.rows[1].cells[i].innerHTML;
            this.valori.push(tmp);
        }
    },
    //Funzione che controlla il nuovo item: se è effettivamente nuovo lo inserisce nei dati, altrimenti aggiorna l'oggetto già esistente
    aggiornaValori: function(name, quantity) {
        var newItem = true;
        for (var i = 0; i < this.valori.length; i++) {
            //L'oggetto esiste già: Dobbiamo aggiornare la quantità
            if (this.valori[i].hasOwnProperty(name) === true) {
                newItem = false;
                this.valori[i][name] = quantity;
            }
        }
        //E' un nuovo item, lo aggiungo all'array dei valori
        if (newItem === true) {
            var tmp = {};
            tmp[name] = quantity;
            this.valori.push(tmp);
        }

    },
    //funzione che setta il nuovo limite, se non e' un numero setta di default 30
    setNewLimit: function(newLimit) {
        if (isNaN(newLimit) === true) {
            this.limit = 30;
        } else {
            this.limit = newLimit;
        }
    },
    //funzione che restituisce il totale degli item
    getItemAmount: function() {
        var amount = 0;
        for (var i = 0; i < this.valori.length; i++) {
            for (var name in this.valori[i]) {
                if (this.valori[i].hasOwnProperty(name)) {
                    amount += parseInt(this.valori[i][name]);
                }
            }
        }
        return amount;
    }

};
//View. Si occupa di aggiornare la view.
var V = {
    displayMenu: function() {
        document.getElementById('insertDiv').style.display = "block";
        document.getElementById('btnMenu').style.display = "none";

    },
    hideMenu: function() {
        document.getElementById('insertDiv').style.display = "none";
        document.getElementById('btnMenu').style.display = "block";
        document.getElementById('itemNameTxt').value = "";
        document.getElementById('itemQuantityTxt').value = "";
    },
    updateTable: function() {
        M.table.innerHTML = "";
        var col1 = M.table.insertRow(0);
        var col2 = M.table.insertRow(1);
        for (var i = 0; i < M.valori.length; i++) {
            var nameCell = M.table.rows[0].insertCell(-1);
            var valueCell = M.table.rows[1].insertCell(-1);
            for (var propertyName in M.valori[i]) {
                nameCell.innerHTML = propertyName;
                valueCell.innerHTML = M.valori[i][propertyName];
            }
        }
    },
    updateLimitView: function() {
        document.getElementById('limitP').innerHTML = M.limit;
    }
};

//Controllore. Contiene la logica del programma
var C = {
    showMenu: function() {
        V.displayMenu();
    },
    //Funzione usata per inserire un nuovo item nella tabella
    insertItem: function() {
        M.ottieniValori();
        var itemName = document.getElementById("itemNameTxt").value;
        var itemQuantity = document.getElementById("itemQuantityTxt").value;
        if (itemName === "" || itemQuantity === "") {
            alert("Non hai inserito correttamente i dati.");
        } else {
            M.aggiornaValori(itemName, itemQuantity);
            V.updateTable();
            V.hideMenu();

            var itemAmount = M.getItemAmount();
            if (itemAmount > M.limit) {
                this.showLimitAlert();
            }
        }
    },
    //Chiamata per aggiornare il limite
    updateLimit: function() {
        M.setNewLimit(document.getElementById("itemLimitTxt").value);
        V.updateLimitView();
        var itemAmount = M.getItemAmount();
        if (itemAmount > M.limit) {
            this.showLimitAlert();
        }
    },
    showLimitAlert: function() {
        alert("La quantita' di item supera il limite.");
    }
};
