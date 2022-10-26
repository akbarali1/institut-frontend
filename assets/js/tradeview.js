var $i = 0,
    $chiqim = $("#yangi"),
    $bdexample = $(".bd-example"),
    $form = $('#dynamicAddRemove'),
    $kirimadd = $('#kirimadd'),
    $left_col = $('#left_col'),
    $right_col = $('#right_col'),
    $kirim = $('#kirim'),
    $not = $('#not'),
    $kirimbutton = $('#kirimbutton'),
    $csrf = $("meta").attr("content");


function yanaButton() {
    ++$i;
    Chiqim($i);
}

// SHortcut js
shortcut.add("alt+c", function () {
    ++$i;
    Chiqim($i);
}, {
    'type': 'keydown',
    'propagate': false,
    'disable_in_input': false,
    'target': document
});

shortcut.add("alt+k", function () {
    ++$i;
    Kirim($i);
}, {
    'type': 'keydown',
    'propagate': false,
    'disable_in_input': false,
    'target': document
});

//Kliklar uchun
$kirimbutton.click(function () {
    ++$i;
    Kirim($i);
});

$chiqim.click(function () {
    ++$i;
    Chiqim($i);
});

//Funksiyalar

function removeDiv($id) {
    $("#remdiv" + $id).remove();
}

function save($id) {
    var csrf = $("input").attr("name", "_token").val(), $selectUpdate = $("#selectUpdate").val();
    $.ajax({
        url: "./update/" + $id,
        type: "POST",
        data: {
            id: $id,
            name: $("#tdname" + $id).val(),
            money: $("#tdmoney" + $id).val(),
            type: $selectUpdate,
            time: $("#tdtime" + $id).val(),
            cat_select: $("select[name='cat_select']").val(),
            money_type_select: $("select[name='money_type_select']").val(),
            _token: csrf,
        },
        dataType: 'JSON',
        success: function (a) {

            $("#money" + $id).text(a.money);
            $("#time" + $id).text(a.time);
            $("#name" + $id).text(a.name);
            $("#category" + $id).text(a.cat_name)
            $("#money_type" + $id).text(a.money_type_name)

            if (a.type == '1') {
                $("#type" + $id).html(`<font color="red"><i class="bi bi-box-arrow-in-up"> </i> Chiqim</font>`);
            } else if (a.type == '2') {
                $("#type" + $id).html(`<font color="green"><i class="bi bi-box-arrow-in-down"></i> Kirim</font>`);
            }

            $("#buttonsave" + $id).after(`<button type="button" class="btn btn-primary" id="button` + $id + `" onclick="update(` + $id + `)" style=" padding: 2px 5px; ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
            </svg>
          </button>`),
                $("#buttonsave" + $id).remove();
            // console.log(a);
        }
    });
}

function reset($id) {

}

function update($id) {
    var csrf = $("input").attr("name", "_token").val();
    $.ajax({
        url: "./get/" + $id,
        type: "POST",
        data: {
            id: $id,
            _token: csrf,
        },
        dataType: 'JSON',
        success: function (a) {
            // console.log(a);
            $("#money" + $id).empty(),
                $("#time" + $id).empty(),
                $("#name" + $id).empty(),
                $("#type" + $id).empty();
            if (a.type == '1') {
                $("#type" + $id).html(`<select class="form-select form-select" aria-label=".form-select-sm example" id="selectUpdate">
                    <option value="1"> Chiqim</option>
                    <option value="2">Kirim</option>
                </select>`);
            } else if (a.type == '2') {
                $("#type" + $id).html(`<select class="form-select form-select" aria-label=".form-select-sm example" id="selectUpdate">
                    <option value="2">Kirim</option>
                    <option value="1">Chiqim</option>
                </select>`);
            }

            var category = a.category,
                cat_select = '<select name="cat_select" class="form-select form-select">',
                select_cat = ''

            for (var c = 0; c < a.category.length; c++) {
                if (category[c].id === a.cat_id) {
                    select_cat = 'selected';
                } else {
                    select_cat = ''
                }
                cat_select += '<option value="' + category[c].id + '" ' + select_cat + '>' + category[c].name + '</option>'
            }
            cat_select += '</select>';
            $('#category' + $id).html(cat_select);

            var money_type_all = a.money_type_all,
                money_type_all_select = '<select name="money_type_select" class="form-select form-select">',
                select_money_type_all = ''

            for (var m = 0; m < money_type_all.length; m++) {
                if (money_type_all[m].id === a.money_type) {
                    select_money_type_all = 'selected';
                } else {
                    select_money_type_all = ''
                }
                money_type_all_select += '<option value="' + money_type_all[m].id + '" ' + select_money_type_all + '>' + money_type_all[m].name + '</option>'
            }
            money_type_all_select += '</select>';
            $('#money_type' + $id).html(money_type_all_select);

            $("#money" + $id).html(`<input class="form-control" type="number" id="tdmoney` + $id + `" class="w-100" value="` + a.money + `">`),
                $("#time" + $id).html(`<input class="form-control" type="date" id="tdtime` + $id + `"" class="w-100" value="` + a.time + `">`),
                $("#name" + $id).html(`<input class="form-control" type="text"  id="tdname` + $id + `" class="w-100" value="` + a.name + `" >`),
                $("#button" + $id).after(`<button type="button" class="btn btn-success" id="buttonsave` + $id + `" accesskey="t" onclick="save(` + $id + `)" style=" padding: 2px 5px; ">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/></svg>
              </button>`);
            $("#button" + $id).remove();
            $("#tdname" + $id).focus();
            // console.log(a);
        }
    });
}

function not() {
    $(".bd-example").show();
    $right_col.show();
    $('#kirim').hide();
    $('#dynamicAddRemove').hide();
}

function selectchange($id) {
    var $value = $("#select_" + $id + " option:selected").val(),
        $text = $("#select_" + $id + " option:selected").text(),
        $cat_id = $("#select_" + $id + " option:selected").attr('cat_id'),
        $money_id = $("#select_" + $id + " option:selected").attr('money_type');
    $("#maqsad_" + $id).val($text);
    $("#maqsad_" + $id).attr('readonly', true);
    $("#money_" + $id).val($value);
    $("#money_" + $id).focus();

    $("#cat_id_" + $id).val($cat_id).change();
    $("#money_type_" + $id).val($money_id).change();
}

function deleteTrade(id) {
    var csrf = $("input").attr("name", "_token").val(),
        r = confirm("Haqiqatdan o`chirasizmi ?");
    if (r == true) {
        $.ajax({
            url: "./delete/" + id,
            type: "POST",
            data: {
                id: id,
                _token: csrf,
            },
            beforeSend: function () {
            },
            dataType: 'JSON',
            success: function (a) {
                location.reload();
            }
        });
    }
}
