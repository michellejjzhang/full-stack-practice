var data = {"name": "", "age": 0, "id": 0, "message": ""};

var ViewModel = {
    numRows: 0,
    showForm: function(e){
        var buttonId = $(e.currentTarget).attr('id');
        var divId = buttonId.substr(0, buttonId.length - 1) + "Div";
        if($('#'+divId).hasClass("hideForm")){
            $('#'+divId).removeClass("hideForm");
            $('#'+divId).addClass("showForm");
        } else {
            $('#'+divId).removeClass("showForm");
            $('#'+divId).addClass("hideForm");
        }
        var buttonType = buttonId.substr(buttonId.length-1);
        if (buttonType != "B" || buttonType != "S"){
            data["id"] = $('#'+buttonType+'.employeeId').text();
        }
    },
    addRow: function(information, i){
        var html = '<tr><td class = "employeeId" id = "' + i + '">' + information[i]["EmployeeId"]+
            '</td><td class = "employeeName" id = "' + i + '">' + information[i]["Name"] +
            '</td><td class = "employeeAge" id = "' + i + '">' + information[i]["Age"] +
            '</td><td> <button onclick="deleteUser('+ information[i]["EmployeeId"] +
            ')" class = "buttons delete" id = "' + i + '">Delete</button>'
            +' </td><td> <button class = "buttons update" id = "updateEmployee' + i + '">Update</button>' +
            '</td></tr>';
        $('#employeeInfo').append(html);
        $('#updateEmployee'+i).on("click", ViewModel.showForm);
    },
    addDataToScreen: function() {
        debugger;
        var results = $.get("oldVersion/Buttons.php", function(response){
            debugger;
            var information = JSON.parse(response);
            numRows = information.length;
            $('#employeeInfo').not(':first').not(':last').remove();
            for(var i = 0; i < information.length; i++){
                ViewModel.addRow(information,i);
            }

        }).fail(function(err){
            debugger;
            console.log("failure");
            console.log(err);
        });
    },
    displayData: function(){
        var results = $.get("oldVersion/Buttons.php",  function(response){
            var information = JSON.parse(response);
            for(var i = 0; i < information.length; i++){
                var existingRow = $(document).find('#'+i+'.employeeId');
                if(existingRow.length){
                    $('#'+i+'.employeeId').text(information[i]["EmployeeId"]);
                    $('#'+i+'.employeeName').text(information[i]["Name"]);
                    $('#'+i+'.employeeAge').text(information[i]["Age"]);
                } else {
                    ViewModel.addRow(information,i);
                }
            }
            if (numRows > information.length){
                for (; i < numRows; ++i ){
                    $('#'+i+'.employeeId').remove();
                    $('#'+i+'.employeeName').remove();
                    $('#'+i+'.employeeAge').remove();
                    $('#'+i+'.delete').remove();
                    $('#updateEmployee'+i+'.update').remove();
                }
            }
            numRows = information.length;
        }).fail(function(err){
            console.log("failure");
            console.log(err);
        });
    }
};

function addUser(){
    var formArray = [];
    formArray = $("#addEmployeeForm").serializeArray();
    var name = formArray[0]["value"];
    data["name"] = name;
    var age = formArray[1]["value"];
    data["age"] = age;
    data["message"] = "add";
    var results = $.post("oldVersion/Buttons.php", data, function(response){
        ViewModel.displayData();
    }).fail(function(err){
        console.log("failure");
        console.log(err);
    });
}

function updateUser(){
    var formArray = [];
    formArray = $("#updateUserForm").serializeArray();
    var name = formArray[0]["value"];
    data["name"] = name;
    var age = formArray[1]["value"];
    data["age"] = age;
    data["message"] = "update";
    var results = $.post("oldVersion/Buttons.php", data, function(response){
        ViewModel.displayData();
    }).fail(function(err){
        console.log("failure");
        console.log(err);
    });
}

function deleteUser(employeeId){
    data["id"] = employeeId;
    data["message"] = "delete";
    var results = $.post("oldVersion/Buttons.php", data, function(response){
        ViewModel.displayData();
    }).fail(function(err){
        console.log("failure");
        console.log(err);
    });
}

$(document).ready(function(){
    debugger;
    ViewModel.addDataToScreen();
    $('#addEmployeeB').on("click", ViewModel.showForm);
    $('#addEmployeeS').on("click", addUser);
    $('#addEmployeeS').on("click", ViewModel.showForm);
    $('#updateEmployeeS').on("click", updateUser);
    $('#updateEmployeeS').on("click", ViewModel.showForm);
});