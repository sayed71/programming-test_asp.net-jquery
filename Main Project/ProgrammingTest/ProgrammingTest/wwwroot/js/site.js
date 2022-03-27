//Make Random Number (3 Types)
function RandomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

function MakeRandomString(DataType) {
    var RanStr = "";

    var Str1 = '0123456789';
    //var Str2 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; //(Optional)
    var Str2 = "0123456789abcdefghijklmnopqrstuvwxyz";

    if (DataType == "Numeric")
        RanStr = RandomString(8, Str1);
    else if (DataType == "Alphanumeric")
        RanStr = RandomString(4, Str2) + RandomString(3, Str1) + RandomString(4, Str2);
    else if (DataType == "Float")
        RanStr = RandomString(5, Str1) + "." + RandomString(3, Str1);
    else
        RanStr = "";

    return RanStr;
}


$(function () {
    let timeout;
    CheckFileSize();

    $('#btnStart').on('click', function () {
        StartFunction();
    });

    $('#btnEnd').on('click', function () {
        StopFunction();
    });

    //Show Report Function
    $('#btnGenerateReport').on('click', function () {
        clearTimeout(timeout);

        $('#msg').html('');

        $.ajax({
            type: "POST",
            url: "/Home/CheckFileSize",
            data: { },
            success: function (data) {
                var data = parseInt(data);
                if (data > 0) {
                    window.location.href = '/show-report'; //Redirect URL
                }
                else {
                    $('#msg').html('File is empty, please click start button.');
                }
            },
            failure: function (response) {
                console.log(response.responseText);
            },
            error: function (response) {
                console.log(response.responseText);
            }
        });
    });

     
    $("[data-labelfor]").click(function () {
        $('#' + $(this).attr("data-labelfor")).prop('checked',
            function (i, oldVal) { return !oldVal; });
    });
});

//Check File Size (jQuery Part)
function CheckFileSize() {
    $.ajax({
        type: "POST",
        url: "/Home/CheckFileSize",
        data: {},
        success: function (data) {
            var data = parseInt(data);
            if (data > 0) {
                var CalFileSize = data / 1024;
                var FileSize = parseFloat(CalFileSize).toFixed(2) + " KB";

                $('#txtOutputFileSize').val(FileSize);
            }
            else {
                $('#txtOutputFileSize').val('0 KB');
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

//Make Countdown (Random Number)
function StartFunction() {
    if ($("#chkNumericNo").prop('checked') == true || $("#chkAlphanumeric").prop('checked') == true || $("#chkFloatNo").prop('checked') == true) {
        $('#msg').html('');

        var NumericValue = MakeRandomString('Numeric');
        var AlphanumericValue = MakeRandomString('Alphanumeric');
        var FloatValue = MakeRandomString('Float');

        if ($("#chkNumericNo").prop('checked') == true && !!NumericValue) {
            $('#txtCounter1NumericNo').val(NumericValue);
        }
        else {
            $('#txtCounter1NumericNo').val('');
        }

        if ($("#chkAlphanumeric").prop('checked') == true && !!AlphanumericValue) {
            $('#txtCounter2Alphanumeric').val(AlphanumericValue);
        }
        else {
            $('#txtCounter2Alphanumeric').val('');
        }

        if ($("#chkFloatNo").prop('checked') == true && !!FloatValue) {
            $('#txtCounter3FloatNo').val(FloatValue);
        }
        else {
            $('#txtCounter3FloatNo').val('');
        }

        var GetNumericValue = $('#txtCounter1NumericNo').val().trim();
        var GetAlphanumericValue = $('#txtCounter2Alphanumeric').val().trim();
        var GetFloatValue = $('#txtCounter3FloatNo').val().trim();

        SaveData(GetNumericValue, GetAlphanumericValue, GetFloatValue);
    }
    else {
        $('#txtCounter1NumericNo').val('');
        $('#txtCounter2Alphanumeric').val('');
        $('#txtCounter3FloatNo').val('');

        $('#msg').html('Please select data type (numeric, alphanumeric, float).');
    }

    timeout = setTimeout(function () { StartFunction() }, 1000);
}

//Stop Countdown (Random Number)
function StopFunction() {
    clearTimeout(timeout);
}

//Save Operation (jQuery Part)
function SaveData(NumericValue, AlphanumericValue, FloatValue) {
    $.ajax({
        type: "POST",
        url: "/Home/SaveData",
        data: { "NumericValue": NumericValue, "AlphanumericValue": AlphanumericValue, "FloatValue": FloatValue },
        success: function (data) {
            if (!!data) {
                //alert(data);

                var CalFileSize = data/1024;
                var FileSize = parseFloat(CalFileSize).toFixed(2)+" KB";

                $('#txtOutputFileSize').val(FileSize);
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

