var fdb = new ForerunnerDB();
var db = fdb.db("account");
var accountCollection = db.collection('account');
accountCollection.load()

function string(date, what, select, money) {
    return "<tr><td>" + date + "</td><td>" + what + "</td><th>" + select + "</td><td>" + money + "</td></tr>"
}

$("#lookup").click(function() {
    $("#accountingTable").find("tr").remove();
    if ($('input[name=look]:checked').val() == "thisweek") {
        var date = new Date()
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;

        if (month < 10) {
            month = "0" + month + "-01"
        }
        var everdate = year + "-" + month;
        console.log(everdate)
        var accountings = accountCollection.find({
                date: {
                    $gte: everdate

                }
            }

        )
        var eatcost = 0
        var homecost = 0
        var wearcost = 0
        for (var i = 0; i < accountings.length; i++) {
            $("#accountingstable").append(string(accountings[i].date, accountings[i].what, accountings[i].select, accountings[i].money));

            if (accountings[i].select == "eat") {
                eatcost += accountings[i].money / 1;
            } else if (accountings[i].select == "home") {
                homecost += accountings[i].money / 1;
            } else if (accountings[i].select == "wear") {
                wearcost += accountings[i].money / 1;
            }
        }

        console.log(eatcost)
        var totalcost = eatcost + homecost + wearcost;
        $("#eatm").text(eatcost)
        $("#eatb").text((eatcost / totalcost) * 100 + "%")
        $("#homem").text(homecost)
        $("#homeb").text((homecost / totalcost) * 100 + "%")
        $("#wm").text(wearcost)
        $("#wb").text((wearcost / totalcost) * 100 + "%")
        $("#allm").text(totalcost)
    } else {
        var fromTime = $("#fromTime").val();
        var toTime = $("#toTime").val();
        var accountings = accountCollection.find({
            date: {
                $gte: fromTime,
                $lte: toTime
            }
        });
        for (var i = 0; i < accountings.length; i++) {
            $("#accountingTable").append(createAccountingHTMLString(accountings[i].date, accountings[i].category, accountings[i].item, accountings[i].cost))
        }
    }
    var totalcost = eatcost + homecost + wearcost;
    $("#eatm").text(eatcost)
    $("#eatb").text((eatcost / totalcost) * 100 + "%")
    $("#homem").text(homecost)
    $("#homeb").text((homecost / totalcost) * 100 + "%")
    $("#wm").text(wearcost)
    $("#wb").text((wearcost / totalcost) * 100 + "%")
    $("#allm").text(totalcost)
});