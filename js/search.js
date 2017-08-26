var fdb = new ForerunnerDB();
var db = fdb.db("account");
var accountCollection = db.collection('account');
accountCollection.load()

function string(date, what, select, money) {
    return "<tr><td>" + date + "</td><td>" + what + "</td><th>" + select + "</td><td>" + money + "</td></tr>"
}

$("#lookup").click(function() {
    var date = new Date()
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth()+1;
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
    for (var i = 0; i < accountings.length; i++) {
        $("#accountingstable").append(string(accountings[i].date, accountings[i].what, accountings[i].select, accountings[i].money));
    }
});