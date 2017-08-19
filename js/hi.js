var fdb = new ForerunnerDB();
var db = fdb.db("account");
var accountCollection = db.collection('account');
accountCollection.load()


function string(date, what, select, money) {
    return "<tr><td>" + date + "</td><td>" + what + "</td><th>" + select + "</td><td>" + money + "</td></tr>"
}


setTimeout(function() {
    var accountings = accountCollection.find({}, {
            $orderBy: {
                "date": -1
            },
            $limit: 10
        }

    )
    for (var i = 0; i < accountings.length; i++) {
    	$("#accountingstable").append(string(accountings[i].date, accountings[i].what, accountings[i].select, accountings[i].money));
    }

}, 500)