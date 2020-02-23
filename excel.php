<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script
            src="https://code.jquery.com/jquery-3.4.1.js"
            integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js"></script>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.16/vue.js"></script>
    <script src="script.js"></script>
</head>
<body>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <input type='file'  id='input-file'><br>
        </div>
        <div class="col-md-12">
            <h4>Listado de Todos los registros del archivo</h4>
        </div>
        <div class="col-md-12">

            <div class="row responsive">
                <div class="col-md-12 container-fluid">
                    <table id="titulos-tr" class="table table-striped table-bordered table-hover table-condensed">
                        <thead>
                        <tr>
                            <th v-for="titulo in titulos">{{titulo}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="fila in filas" id="individual">
                            <td v-for="(index, columna) in fila" track-by="$index">
                                {{columna}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<p id="salida"></p>
</body>
</html>