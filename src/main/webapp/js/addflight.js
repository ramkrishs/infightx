/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    
    $( "#submit-flight" ).click(function() {
        getformData();
    });

})();


function getformData() {
    var confirmCode = $('#confirmCode').val();
    var fromLocation = $('#fromLocation').val();
    var toLocation = $('#toLocation').val();
    var username = $('#username').val();

    console.log(confirmCode);
    console.log(fromLocation);
    console.log(toLocation);
    console.log(username);


    var res = $.ajax({
        type: "POST",
        url: 'http://localhost:8084/inflightrest/rest/addflight',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: { username: username,confirmCode: confirmCode,toLocation:toLocation, fromLocation:fromLocation}
        
    })
        .done(function(data)
        {
            alert( "You have successfully done" );
            console.log(data);
            
        })
        .fail(function(data)
        {
            console.log(data);
        });
}



