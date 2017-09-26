$(document).ready(function() {

    $("#autocomplete").keyup(function(e) {
        $("#quickSearch").empty();
        $("#quickSearchDiv").show();
        var regex = new RegExp($("#autocomplete").val(), "i");
        var query = $("#autocomplete").val();
        console.log(query);

        // Enter URL for autoFill
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/AUTOFILL_URL/',
            data: { query: query },
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].match(regex)) {
                        $("#quickSearch").append(
                            "<li><a tabindex='-1' href='javascript:void(0);' onclick=dispSelection('" + data[i] + "')>" + data[i] + "</a></li>"
                        );
                    }
                }
            }
        });

        // ONLY FOR TESTING ------------------------------- CAN BE REMOVED AFTER TESTING
        var questions = ['asd', 'asd123', 'adgssg']
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].match(regex)) {
                $("#quickSearch").append(
                    "<li><a tabindex='-1' href='javascript:void(0);' onclick=dispSelection('" + questions[i] + "')>" + questions[i] + "</a></li>"
                );
            }
        }
        //  ------------------------------------------------
    });

    $("body").click(function() {
        $("#quickSearchDiv").hide();
    });
    $("#quickSearchContainer").click(function(event) {
        event.stopPropagation();
    });
});
autocText = null;

function dispSelection(question) {
    $("#text").empty();
    $("#resultPanel").hide();
    $("#answer").empty();
    var query = { "query": question, "topn": 5 }
    console.log(query);

    // Enter URL for FAQ    
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/FAQ/',
        data: query,
        success: function(result) {
            for (var i = 0; i < result.length; i++) {
                let ans = result[i].answer;
                $("#text").append(
                    "<li onclick=showAnswer('" + ans + "')>" + result[i].question + "</li>"
                );
            }
        }
    });

    // ONLY FOR TESTING ------------------------------- CAN BE REMOVED AFTER TESTING
    var result = [
        { "question": "Q1123 Q1123 Q1123 Q1123 Q1123 Q1123 Q1123 Q1123 Q1123 Q1123 Q1123 Q1123 Q1123 Q1123 Q1123 Q1123 Q1123 ", "similarity": 0.50, "answer": "ANS1" },
        { "question": "Q2", "similarity": 0.50, "answer": "ANS2" },
        { "question": "Q3", "similarity": 0.50, "answer": "ANS3" },
        { "question": "Q4", "similarity": 0.50, "answer": "ANS4" }
    ]

    for (var i = 0; i < result.length; i++) {
        let ans = result[i].answer;
        $("#text").append(
            "<li onclick=showAnswer('" + ans + "')>" + result[i].question + "</li>"
            // "<li><a href='javascript:void(0);' onclick=alert('" + result[i] + "')>" + result[i].question + "</a></li>"
        );
    }
    // -----------------------------------------------


    $("#quickSearchDiv").hide();
    document.getElementById("selection").style.display = "block";
    document.getElementById("autocomplete").value = question;
}

function showAnswer(obj) {
    document.getElementById("resultPanel").style.display = "block";

    console.log(obj);
    // document.getElementById('answer').innerHTML.value('obj');
    $('#answer').text(obj)
}

function clearAll() {
    $("#selection").hide();
    $("#text").empty();
    $("#resultPanel").hide();
    $("#answer").empty();
    $("#autocomplete").val('');
    $("#autocomplete").focus();
}

$(document).ready(function() {
    $("#autocomplete").focus();
});