function dashboard(){
    // localStorage.setItem('responses',JSON.stringify(responses))
    var totalcount=localStorage.getItem('totalcount');
    var questionContent=JSON.parse(localStorage.getItem('QuestionContent'))
    var responsesoption=JSON.parse(localStorage.getItem('responseoptions'))
    var options=JSON.parse(localStorage.getItem('options'))
    var responses=JSON.parse(localStorage.getItem('responses'))
    var website=''
    console.log(totalcount,'Question content',questionContent,"Responses option",responsesoption,options,'responses',responses)
    for(var i=1;i<=totalcount;i++){
        website+='<div class="question-container1">'+'Q'+i+'. '+questionContent[i-1];
        // console.log(document.getElementById('Question'+i).value);
        website+='<div class="Options"'+'>'
        for(j=1;j<=options[i-1];j++){
            console.log(i-1,j-1)
            // console.log(responsesoption[0])
            website+='<div><input type="radio" id="Q'+i+'O'+j+'"name="Q'+i+'" value='+responsesoption[i-1][j-1]+'>'+'<label for="Q'+i+'O'+j+'">'+responsesoption[i-1][j-1]+'</label></div>'
            console.log('<div id="Question'+i+'" style="height: 370px; width: 100%"></div>')
        }
        console.log('responses option',responsesoption);
        website+='<div id="Question'+i+'" style="height: 370px; width: 100%"></div>'+'</div></div>';
    }
    console.log(website)
    document.getElementById('dashboard').innerHTML=website;
    for(i=1;i<=totalcount;i++){
        var total=0
        for(j=1;j<=options[i-1];j++){
            total+=responses[i-1][j-1]
        }
        var data=new Array();
        for(j=1;j<=options[i-1];j++)
        {
            console.log('value',total)
            console.log(responsesoption[i-1][j-1])
            data.push({y: (responses[i-1][j-1]/total)*100, label: responsesoption[i-1][j-1]})
        }
        var chart = new CanvasJS.Chart('Question'+i, {
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0.00\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: data
            }]
        });
        chart.render();
    }
}
