//Cargamos la lista de Clientes

$(document).ready(function () {
    loadData();
});

//Carga de clientes
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Nombre + '</td>';
                html += '<td>' + item.Rfc + '</td>';
                html += '<td>' + item.Direccion + '</td>';
                html += '<td>' + item.Cp + '</td>';
                html += '<td>' + item.Correo + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')">Editar</a> | <a href="#" onclick="Delele(' + item.Id + ')">Eliminar</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Nuevo Cliente
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        Id: $('#Id').val(),
        Nombre: $('#Nombre').val(),
        Rfc: $('#Rfc').val(),
        Direccion: $('#Direccion').val(),
        Cp: $('#Cp').val(),
        Correo: $('#Correo').val()
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Obtener cliente
function getbyID(EmpID) {
    $('#Nombre').css('border-color', 'lightgrey');
    $('#Rfc').css('border-color', 'lightgrey');
    $('#Direccion').css('border-color', 'lightgrey');
    $('#Cp').css('border-color', 'lightgrey');
    $('#Correo').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/getbyID/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Nombre').val(result.Nombre);
            $('#Rfc').val(result.Rfc);
            $('#Direccion').val(result.Direccion);
            $('#Cp').val(result.Cp);
            $('#Correo').val(result.Correo);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Actualizar Cliente
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        Id: $('#Id').val(),
        Nombre: $('#Nombre').val(),
        Rfc: $('#Rfc').val(),
        Direccion: $('#Direccion').val(),
        Cp: $('#Cp').val(),
        Correo: $('#Correo').val(),
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#Nombre').val("");
            $('#Rfc').val("");
            $('#Direccion').val("");
            $('#Cp').val("");
            $('#Correo').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Borrar cliente
function Delele(ID) {
    var ans = confirm("¿Esta seguro que quiere borrar este cliente?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Limpiar 
function clearTextBox() {
    $('#Id').val("");
    $('#Nombre').val("");
    $('#Rfc').val("");
    $('#Direccion').val("");
    $('#Cp').val("");
    $('#Correo').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
}
//validacion usando jquery  
function validate() {
    var isValid = true;
    if ($('#Nombre').val().trim() == "") {
        $('#Nombre').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Nombre').css('border-color', 'lightgrey');
    }
    if ($('#Rfc').val().trim() == "") {
        $('#Rfc').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Rfc').css('border-color', 'lightgrey');
    }
    if ($('#Direccion').val().trim() == "") {
        $('#Direccion').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Direccion').css('border-color', 'lightgrey');
    }
    if ($('#Cp').val().trim() == "") {
        $('#Cp').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Cp').css('border-color', 'lightgrey');
    }
    if ($('#Correo').val().trim() == "") {
        $('#Correo').css('border-color', 'Red');
        isValid = false;
    }
    else {

            $('#Correo').css('border-color', 'lightgrey');
      
       
    }
    return isValid;
}

