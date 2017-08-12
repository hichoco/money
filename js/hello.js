var fdb = new ForerunnerDB();
var db = fdb.db("hello");

var studentCollection = db.collection('students');
var friendCollection = db.collection('friend');

// for (var i = 0; i < 10; i++) {
// //var newStudent = {
// var name: "Koding"+ math.floor(100*math.random()) ,
// var age: math.floor(100*math.random())
// }

//studentCollection.insert(newStudent)
//studentCollection.save()

//};


studentCollection.load()
friendCollection.load()

function studentsbbb(_id, name) {
    return "<tr><td class ='studentsId'>" + _id + "</td><td>" + name + "</td ><td><button class=  'fix btn btn-danger' data-id=" + _id + " >修改</button></td><td><button class='deletes btn btn-primary' data-id=" + _id + ">刪除</button></td>< /tr>"
}

function friend (_id, name) {
	return  "<option value='"+ _id +"'>"+ name +"</option>"
}


function afterload() {
    var students = studentCollection.find()
    console.log(students)
    for (var i = 0; i < students.length; i++) {
        console.log(students[i]._id)
        $("#studentTable").append(studentsbbb(students[i]._id, students[i].name));

    }
    var friends = friendCollection.find();
	    console.log(friends)
    for (var i = 0; i < friends.length; i++) {
        console.log(friends[i]._id)
        $("#friend-id").append(friend(friends[i]._id, friends[i].name));
        $("#newfriend-id").append(friend(friends[i]._id, friends[i].name));
    }
    $("#studentTable").on("click", ".studentsId", function() {
        var studentsId = $(this).text()

        var query = {
            _id: studentsId
        }
        var student = studentCollection.find(query)[0];
        console.log(student)
        $("#studentsname").text(student.name)
        $("#studentid").text(student._id)
        $("#studentage").text(student.age)
        $("#studentsclass").text(student.newclass)
        $("#studentsinfo").modal('show')

    });
}

setTimeout(afterload, 1000)




function creat() {
    var name = $("#name").val();
    var age = $("#age").val();
    var newclass = $("#newclass").val();
    var friendid = $("#friend-id").val()
    var newStudents = {
        name: name,
        age: age,
        newclass: newclass,
        friendid:friendid,
    }
    studentCollection.insert(newStudents)
    studentCollection.save()
    var student = studentCollection.find(newStudents)[0]
    $("#studentTable").append(studentsbbb(student._id, student.name));
}
$('#creat').click(creat)


function delt() {
    var r = confirm("right?");
    var id = $(this).attr("data-id");
    if (r == true) {
        studentCollection.remove({
            _id: id
        });
        studentCollection.save()

        $(this).parents("tr").remove()

    }


}

function fix() {
    var studentsId = $(this).attr("data-id");
    console.log(studentsId)
    var query = {
        _id: studentsId
    }
    var student = studentCollection.find(query)[0];
    console.log(student)
    $("#name2").val(student.name)
    $("#age2").val(student.age)
    $("#newclass").val(student.class)
    $("#newfriend-id").val(student.friendid)
    $("#save").attr("data-id", studentsId)
    $("#fix2").modal('show')
}



$("#studentTable").on("click", ".deletes", delt)
$("#studentTable").on("click", ".fix", fix)

function save() {
    var studentsId = $(this).attr("data-id");

    var newStudent = {
        name: $("#name2").val(),
        age: $("#age2").val(),
        class: $("#newclass").val(),
        friend: $("#newfriend-id").val(),
    }
    studentCollection.updateById(studentsId, newStudent);
    console.log(studentsId)
    studentCollection.save()
    $("#fix2").modal('hide')
}
$("#save").click(save)


function find() {
    var bigage = $("#bigage").val();
    var smailage = $("#smailage").val();
    var clases = []
    if ($("#aclass").prop("checked")) {
        clases.push("a")
    }
    if ($("#bclass").prop("checked")) {
        clases.push("b")
    }


    students = studentCollection.find({
        age: {
            $gt: bigage / 1,
            $lt: smailage / 1,

        },
        newclass: {
            $in: clases
        }

    });
    console.log(students)

    $("#studentTable").find("tr").remove()
    for (var i = 0; i < students.length; i++) {
        console.log(students[i]._id)
        $("#studentTable").append(studentsbbb(students[i]._id, students[i].name));

    }
}
$("#find").on("click", find)
