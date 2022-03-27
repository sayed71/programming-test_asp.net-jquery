
//Initialization
$(function () {
    ShowReportSummary();
    ShowReportData();

    $('a.printPage').click(function () {
        window.print();
        return false;
    });
});

//Show Report
function ShowReportSummary() {
    $.ajax({
        type: "POST",
        url: "/Home/ReportSummary",
        data: {},
        success: function (data) {
            if (!!data) {
                //alert(data);
                var arrData = data.split(',');
                if (arrData.length > 0) {
                    var TotalData = parseInt(arrData[0]);
                    var TotalNumericData = parseInt(arrData[1]);
                    var TotalAlphanumericData = parseInt(arrData[2]);
                    var TotalFloatData = parseInt(arrData[3]);

                    var PerNumericData = (TotalNumericData * 100) / TotalData;
                    var PerAlphanumericData = (TotalAlphanumericData * 100) / TotalData;
                    var PerFloatData = (TotalFloatData * 100) / TotalData;

                    if (!!PerNumericData) {
                        $('#tdNumeric').html("% " + PerNumericData.toFixed(2));
                    }
                    else {
                        $('#tdNumeric').html("% 0");
                    }

                    if (!!PerAlphanumericData) {
                        $('#tdAlphanumeric').html("% " + PerAlphanumericData.toFixed(2));
                    }
                    else {
                        $('#tdAlphanumeric').html("% 0");
                    }

                    if (!!PerFloatData) {
                        $('#tdFloat').html("% " + PerFloatData.toFixed(2));
                    }
                    else {
                        $('#tdFloat').html("% 0");
                    }
                }
            }
        },
        failure: function (response) {
            console.log(response.responseText);
        },
        error: function (response) {
            console.log(response.responseText);
        }
    });
}

//Show Details Data
function ShowReportData() {
    $.ajax({
        type: "POST",
        url: "/Home/GetReportData",
        data: {},
        success: function (data) {
            var htmlData = "";
            var arrData = data.split(',');
            var arrDataLength = parseInt(arrData.length);

            if (arrDataLength > 0) {
                for (var i = 0; i < arrDataLength; i++) {
                    htmlData += arrData[i].trim() + "<br/>";
                }

                $('#tblReportDetailsData').html(htmlData);
            }
            else {
                $('#tblReportDetailsData').html('');
            }
        },
        failure: function (response) {
            console.log(response.responseText);
        },
        error: function (response) {
            console.log(response.responseText);
        }
    });
}

//Remove All Existing Data
function DeleteFileAllData() {
    $('#msg').html('');

    if (confirm('Are you sure you want to delete?')) {
        $.ajax({
            type: "POST",
            url: "/Home/DeleteFileData",
            data: {},
            success: function (data) {
                var data = parseInt(data);
                if (data == 0) {
                    window.location.href = '/home';
                }
                else {
                    $('#msg').html('Delete operation failed!');
                }
            },
            failure: function (response) {
                console.log(response.responseText);
            },
            error: function (response) {
                console.log(response.responseText);
            }
        });

        return true;
    }
    else {
        return false;
    }
}