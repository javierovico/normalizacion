
var oFileIn;
var filaTitulos = ['esperando','valores','para','procesar'];
var arrayR = [['...','...','...','...']];
var indiceActual = 0;
const mostrar = 4;
var rangeGeneral = null;
var sheetGeneral = null;

const prefijos = ['21','32','38','39','41','44','46','47','48','61','71','72','73','81','83','224','225','226','228','271','275','291','292','293','294','295','318','331','336','337','342','343','345','347','351','418','424','425','431','432','451','453','464','471','491','492','493','494','497','510','511','512','513','514','515','516','517','518','519','520','521','522','523','524','525','526','527','528','529','530','531','532','533','534','535','536','537','538','539','540','541','542','543','544','545','546','547','548','549','550','552','553','554','631','632','633','644','671','672','673','674','676','677','678','717','740','741','742','743','744','762','763','764','765','767','768','775','780','781','782','783','784','785','786','787','788','858'];
const cabezeraCeliter ="codecliente;" +
    "nro_doc;" +
    "apellido;" +
    "nombre;" +
    "estado_civil;" +
    "sexo;" +
    "fecha_nac;" +
    "edad;" +
    "profesion;" +
    "segmento;" +
    "shot;" +
    "tarjeta;" +
    "nro_tarjeta;" +
    "vto_tarjeta;" +
    "calle;" +
    "nro_casa;" +
    "piso;" +
    "depto;" +
    "localidad;" +
    "ciudad;" +
    "barrio;" +
    "cod_postal;" +
    "provincia;" +
    "prefijo_tel_1;" +
    "telefono_1;" +
    "prefijo_tel_2;" +
    "telefono_2;" +
    "prefijo_tel_3;" +
    "telefono_3;" +
    "prefijo_tel_4;" +
    "telefono_4;" +
    "prefijo_tel_5;" +
    "telefono_5;" +
    "prefijo_tel_6;" +
    "telefono_6;" +
    "correo1;" +
    "correo2;" +
    "obs_cuenta;" +
    "id_tramo;" +
    "moneda;" +
    "deuda_total;" +
    "meses;" +
    "code_producto;" +
    "fec_ult_pag;" +
    "vencimiento_deuda;" +
    "descuento;" +
    "id_fraccion;" +
    "id_manzana;" +
    "id_lote;" +
    "tipo_fraccion;" +
    "zona;" +
    "monto_a_vencer;" +
    "monto_mora;" +
    "obs1_num_serv;" +
    "obs2_cod;" +
    "obs3_ciclo;" +
    "obs4_cartera;" +
    "fecha_alta\n";
var fecha_alta_input = new Date().toLocaleDateString('es-ES',{year: 'numeric'})+'/'+new Date().toLocaleDateString('es-ES',{month: '2-digit'})+'/'+new Date().toLocaleDateString('es-ES',{day: '2-digit'});
var tituloVue;
$(document).ready(function () {
    tituloVue = new Vue({
        el: '#titulos-tr',
        data: {
            titulos: filaTitulos,
            filas: arrayR
        }
    });
});

$(function() {
    oFileIn = document.getElementById('input-file');
    if(oFileIn.addEventListener) {
        oFileIn.addEventListener('change', filePicked, false);
    }
});
function filePicked(oEvent) {
    tituloVue.titulos = ['CARGANDO','POR FAVOR','ESPERE UN RATO']; //limpia el titulo
    fecha_alta_input = window.prompt("Introduci la fecha de alta (fecha_alta)",fecha_alta_input);
    if(fecha_alta_input == null){
        tituloVue.titulos = ['OPERACION CANCELADA']; //limpia el titulo
        return;
    }
    var oFile = oEvent.target.files[0];
    getReader(oFile,function (sheet,range) {
        rangeGeneral = range;
        sheetGeneral = sheet;
        // imprimirTitulos();
        // imprimirSegmento(rangeGeneral.s.r,rangeGeneral.s.r+mostrar);
        generarCSVRapido();
    });
}

function generarFilaCsv(arrayCabeza) {
    var csv = '';
    for(let i=0;i<arrayCabeza.length;i++){
        csv += arrayCabeza[i].replace(';',',');
        if(i<(arrayCabeza.length-1)){
            csv +=";";
        }
    }
    csv += '\n';
    return csv;
}

function descargarCsv(csv,nombre) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = nombre+'.csv';
    hiddenElement.click();
}

function generarArrayCeliter(registros, numeros) {
    let arrayResultante = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''];
    arrayResultante[0] = registros[0];
    arrayResultante[1] = (typeof registros[16] === 'undefined' || registros[16]<3)?(registros[17]):(registros[16]);
    arrayResultante[3] = registros[14];
    arrayResultante[9] = registros[36].toUpperCase() + '_' + new Date().toLocaleDateString('es-ES',{month: 'long'}).toUpperCase() + '_' + new Date().toLocaleDateString('es-ES',{year: 'numeric'}).toUpperCase();
    arrayResultante[14] = registros[21];
    arrayResultante[19] = registros[19];
    arrayResultante[20] = registros[20];
    arrayResultante[24] = (typeof numeros[0] !== 'undefined')? numeros[0]:"";
    arrayResultante[26] = (typeof numeros[1] !== 'undefined')? numeros[1]:"";
    arrayResultante[28] = (typeof numeros[2] !== 'undefined')? numeros[2]:"";
    arrayResultante[40] = registros[7];
    arrayResultante[42] = registros[1];
    arrayResultante[43] = registros[4];
    arrayResultante[44] = registros[5];
    arrayResultante[53] = registros[12];
    arrayResultante[54] = registros[30];
    arrayResultante[55] = registros[37];
    arrayResultante[56] = registros[36].toUpperCase() + '_' + new Date().toLocaleDateString('es-ES',{month: 'long'}).toUpperCase() + '_' + new Date().toLocaleDateString('es-ES',{year: 'numeric'}).toUpperCase();
    arrayResultante[57] = fecha_alta_input;
    return arrayResultante;
}

function generarArrayInconcert(registrosCeliter) {
    registrosCeliter[0] = registrosCeliter[1];  //en codecliente tien que estar el numero de cedula (?
    registrosCeliter[24] = '00595'+registrosCeliter[24];
    registrosCeliter[26] = (typeof registrosCeliter[26] === 'undefined' || registrosCeliter[26].length <3)?'':('00595'+registrosCeliter[26]);
    registrosCeliter[28] = (typeof registrosCeliter[28] === 'undefined' || registrosCeliter[28].length <3)?'':('00595'+registrosCeliter[28]);
    return registrosCeliter;
}

function generarArchivoCsvInconcert(registrosInconcer) {
    let csvCeliter = cabezeraCeliter;
    registrosInconcer.forEach(function (e) {
        csvCeliter += generarFilaCsv(e);
    });
    return csvCeliter;
}

function noRepetido(filaInconcert, registrosInconcer) {
    for(let i=0;i<registrosInconcer.length;i++){
        if(registrosInconcer[i][3] === filaInconcert[3]){
            return false;
        }
    }
    return true;
}

function generarCSVRapido() {
    let cantidadRegistrosFallo = 0;
    let cantidadRegistrosExito = 0;
    let cabezeraError = obtenerFila(0);
    cabezeraError.push('motivo_error');
    let csvError = generarFilaCsv(cabezeraError);
    let csvCeliter = cabezeraCeliter;
    let registrosInconcer = [];
    for(let fila = rangeGeneral.s.r+1; fila<rangeGeneral.e.r;fila++){
        let registros = obtenerFila(fila);
        const numeros = getNumerosValidos(registros);
        if(numeros.length === 0){//no tuvo ningun numero, se descarta
            cantidadRegistrosFallo++;
            registros.push('Descartado por falta de al menos un numero de telefono');
            csvError += generarFilaCsv(registros);
        }else{
            cantidadRegistrosExito++;
            const filaCeliter = generarArrayCeliter(registros,numeros);
            csvCeliter += generarFilaCsv(filaCeliter);
            const filaInconcert = generarArrayInconcert(filaCeliter);
            if(filaInconcert && noRepetido(filaInconcert,registrosInconcer)){
                registrosInconcer.push(filaInconcert);
            }
        }
    }
    const csvInconcert = generarArchivoCsvInconcert(registrosInconcer);
    alert(`Registros Fallidos: ${cantidadRegistrosFallo}\nRegistros Exitosos: ${cantidadRegistrosExito}`)
    descargarCsv(csvError,'errores_subida');
    descargarCsv(csvCeliter,'celiter_generado');
    descargarCsv(csvInconcert,'importe_para_celiter');
    tituloVue.titulos = ['OPERACION FINALIZADA']; //limpia el titulo
}

function getNumerosValidos(registro) {
    var numeros = [];   //contendre los numeros validos
    for(let col = 22; col<=28; col++){   //recorrer todos los numeros
        const numero = validarNumero(registro[col]);
        if(numero){
            numeros.push(numero);
        }
    }
    if(numeros.length===0 && registro[37].toLowerCase() === 'Prejudicial'){ //si no existio ningun numero, entonces no es valida la fila
        const numero = validarNumero(registro[37]);
        if(numero){
            numeros.push(numero)
        }
    }
    if(numeros.length>1){
        for(let i=0;i<numeros.length;i++){
            for(let j=0;j<numeros.length;j++){
                if(i!==j && numeros[i]===numeros[j]){
                    numeros.splice(i,1);
                }
            }
        }
    }
    if(typeof registro[14] === 'undefined' || registro[14].length <2){  //le fuerza a descartarse porque no tiene nombre
        numeros = [];
    }
    if((typeof registro[16] === 'undefined' || registro[16].length <3) && (typeof registro[17] === 'undefined' || registro[17].length <3)){ //no tiene celdula
        numeros = [];
    }
    return numeros;
}

function comprobarPrefijo(tel) {
    return ((tel.substr(0,1) === '9' && tel.length === 9)  || (prefijos.includes(tel.substring(0,2)) && tel.length === 8) || (prefijos.includes(tel.substring(0,3)) && (tel.length === 8 || tel.length ===9)));
}

function validarNumero(numero) {
    numero = ((typeof numero) === "string")?numero.replace(/\D/g,'').replace(/^0+/, ''):'';
    if(numero.length < 8){  //menores que ocho, se desechan
        numero = null;
    }else if(numero.length === 8 || numero.length===9){ //de ocho o nueve se aceptan tal cual
        numero = numero;
    }else if(numero.length === 10 || numero.length===11){ //se extraen los nueve primeros caracteres cuando son de 10 o 11
        numero = numero.substr(0,9);
    }else{  //los que son mayores o iguales a 14
        numero = numero.substr(numero.length-9,9);
    }
    if(numero){
        if(comprobarPrefijo(numero)){
            return numero;
        }else{
            return null;
        }
    }else{
        return null;
    }
}

function getReader(file,funcionListener) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const data = e.target.result;
        const workbook = XLSX.read(data,{
            type: 'binary'
        });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        funcionListener(sheet,XLSX.utils.decode_range(sheet['!ref']));
    };
    reader.onerror = function (ex) {
        console.log(ex);
        funcionListener(null,null);
    };
    reader.readAsBinaryString(file);
}

function leer(file){
    const reader = new FileReader();
    reader.onload = function (e) {
        const data = e.target.result;
        const workbook = XLSX.read(data,{
            type: 'binary'
        });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const range = XLSX.utils.decode_range(sheet['!ref']);
        let cabezera = [];
        for(let colNum = range.s.c; colNum <= range.e.c;colNum++){
            let celda = sheet[XLSX.utils.encode_cell({r:range.s.r,c:colNum})];
            if(typeof celda !== 'undefined'){
                cabezera.push(celda.w)
            }
        }
        console.log(cabezera);
    };
    reader.onerror = function (ex) {
        console.log(ex);
    };
    reader.readAsBinaryString(file);
}

function imprimirTitulos() {
    tituloVue.titulos = [];
    tituloVue.filas.push(obtenerFila(0));
}
function imprimirSegmento(inicio, cantidad) {
    let rangoFilas = [];
    for(let rowNum = inicio; rowNum < (inicio + cantidad); rowNum++){   //empieza en la segunda fila (+1)
        rangoFilas.push(obtenerFila(rowNum));
    }
    tituloVue.filas = rangoFilas;
}

function obtenerFila(filaNum) {
    let filaGenerada = [];
    for(let colNum=rangeGeneral.s.c; colNum<rangeGeneral.e.c; colNum++){
        let nextCell = sheetGeneral[
            XLSX.utils.encode_cell({r: filaNum, c: colNum})
            ];
        if( typeof nextCell !== 'undefined' ){
            const valor = nextCell.w;
            filaGenerada.push(valor);
        }else{
            filaGenerada.push('');  //agrega un vacio
        }
    }
    return filaGenerada;
}

function mostrarTodos(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const data = e.target.result;
        const workbook = XLSX.read(data,{
            type: 'binary'
        });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const range = XLSX.utils.decode_range(sheet['!ref']);
        tituloVue.titulos = []; //limpia el titulo
        tituloVue.filas = [];
        for(let colNum=range.s.c; colNum<=range.e.c; colNum++){ //leer la primera fila
            let nextCell = sheet[
                XLSX.utils.encode_cell({r: range.s.r, c: colNum})
                ];
            if( typeof nextCell !== 'undefined' ){
                const valor = nextCell.w;
                tituloVue.titulos.push(valor)
            }
        }
        let filas = [];
        for(let rowNum = range.s.r+1; rowNum <= range.e.r; rowNum++){   //empieza en la segunda fila (+1)
            let filaGenerada = [];
            for(let colNum=range.s.c; colNum<=range.e.c; colNum++){
                let nextCell = sheet[
                    XLSX.utils.encode_cell({r: rowNum, c: colNum})
                    ];
                if( typeof nextCell !== 'undefined' ){
                    const valor = nextCell.w;
                    filaGenerada.push(valor);
                }else{
                    filaGenerada.push('');  //agrega un vacio
                }
            }
            filas.push(filaGenerada);
        }
        tituloVue.filas=filas;
    };
    reader.onerror = function (ex) {
        console.log(ex);
    };
    reader.readAsBinaryString(file);
    ////////////////////////////////////////////////
    // var reader = new FileReader();
    // reader.onload = function(e) {
    //     var data = e.target.result;
    //     var workbook = XLSX.read(data, {
    //         type: 'binary'
    //     });
    //     var salida = $('#salida');
    //     workbook.SheetNames.forEach(function(sheetName) {
    //         let arrayR = convertirArray(workbook.Sheets[sheetName]);
    //         let filaTitulos = arrayR[0];
    //         let tituloVue = new Vue({
    //             el: '#titulos-tr',
    //             data: {
    //                 titulos: filaTitulos,
    //                 filas: arrayR
    //             }
    //         });
    //         // for(let f = 1;f < /*200*/arrayR.length; f++){
    //         //     var fila = arrayR[f];
    //         //     for(let col = 0; col< fila.length; col++){   //recorrer todos los numeros
    //         //
    //         //     }
    //         // }
    //     });
    // };
    // reader.onerror = function(ex) {
    //     console.log(ex);
    // };
    // reader.readAsBinaryString(file);
}

function procesar(file) {
    var registrosExitosos = [];
    var registrosErroneos = [];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
        var salida = $('#salida');
        salida.append("INICIO REGISTRO");
        workbook.SheetNames.forEach(function(sheetName) {
            var arrayR = convertirArray(workbook.Sheets[sheetName]);
            for(let f = 1;f < /*200*/arrayR.length; f++){
                var validado = true;    //para saber si es valido el registro o no
                var fila = arrayR[f];
                var numeros = [];   //contendre los numeros validos
                for(let col = 23; col<29; col++){   //recorrer todos los numeros
                    var numero = ((typeof fila[col]) === "string")?fila[col].replace(/\D/g,'').replace(/^0+/, ''):'';
                    if(numero.length < 8){  //menores que ocho, se desechan
                        numero = null;
                    }else if(numero.length === 8 || numero.length===9){ //de ocho o nueve se aceptan tal cual
                        numero = numero;
                    }else if(numero.length === 10 || numero.length===11){ //se extraen los nueve primeros caracteres cuando son de 10 o 11
                        numero = numero.substr(0,9);
                    }else{  //los que son mayores o iguales a 14
                        numero = numero.substr(numero.length-9,9);
                    }
                    if(numero){
                        numeros.push(numero);
                    }
                }
                if(numeros.length===0){ //si no existio ningun numero, entonces no es valida la fila
                    validado = false;
                }
                if(validado){
                    salida.append(`<br>Cliente: ${fila[14]}`);
                    numeros.forEach(function (num) {
                        salida.append(`<br>Tel :${num}`);
                    });
                }else{
                    registrosErroneos.push(fila)
                }
            }
            // Here is your object
            // var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            // var json_object = JSON.stringify(XL_row_object);
            // console.log(json_object);
        });
        console.log(registrosErroneos.length);
    };
    reader.onerror = function(ex) {
        console.log(ex);
    };
    reader.readAsBinaryString(file);
}

function convertirArray(sheet){
    var result = [];
    var row;
    var rowNum;
    var colNum;
    var range = XLSX.utils.decode_range(sheet['!ref']);
    for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
        row = [];
        for(colNum=range.s.c; colNum<=range.e.c; colNum++){
            var nextCell = sheet[
                XLSX.utils.encode_cell({r: rowNum, c: colNum})
                ];
            if( typeof nextCell === 'undefined' ){
                row.push(void 0);
            } else row.push(nextCell.w);
        }
        result.push(row);
    }
    return result;
}
