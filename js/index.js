function hello() {
    var name = $("#name").val();
    var old = $("#old").val();
    

    var like = "like"

    if ($("#橘子").prop("checked")) {
        like +=("" + $("#橘子").val());

    }
    if ($("#蘋果").prop("checked")) {
       like += ("" + $("#蘋果").val());


    }
    alert(name + ":" + old + "歲" + "~你好" + like);
}

$("#hello").on("click", hello);


    $("#name").val("");
    $("#old").val("");
    $("#橘子").prop("checked",false);
    $("#蘋果").prop("checked",false);

