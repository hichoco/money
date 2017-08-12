
var fdb = new ForerunnerDB();
var db = fdb.db("account");
var accountCollection = db.collection('account');
accountCollection.load()

$("#go").click(function () {
	
	var date = $("#date").val()
	var moomoo = $("#moomoo").val()
	var money = $("#money").val()
	var moo = $("#moo").val()

	var newaccount = {
    date : date,
    moo : moo ,
    money :money,
    moomoo : moomoo,
};

	accountCollection.insert(newaccount);
	accountCollection.save();
	
	$("#date").val("")
	$("#moomoo").val("")
	$("#money").val("")
	$("#moo").val("")
	alert("ok")

	alert(date+moo+"類"+moomoo+"項目"+money+"元")

});
