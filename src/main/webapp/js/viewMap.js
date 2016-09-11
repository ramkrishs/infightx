/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    getformData();
    
var locationArray  = [];
    
function getformData() {
    
    
    var res = $.ajax({
        type: "GET",
        url: 'http://45.55.207.137:8080/inflight/rest/locations/all',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        
    })
        .done(function(data)
        {
            $.each(data, function(idx, obj) {
                locationArray.push(obj.toLocation);
                console.log(typeof obj.toLocation);
            });
            MQ.geocode().search(locationArray)
            .on('success', function(e) {
                var results = e.result,
                    html = '',
                    group = [],
                    features,
                    marker,
                    result,
                    latlng,
                    prop,
                    best,
                    val,
                    map,
                    r,
                    i;

                map = L.map('map', {
                    layers: MQ.mapLayer()
                });

                for (i = 0; i < results.length; i++) {
                    result = results[i].best;
                    latlng = result.latlng;

                    for (prop in result) {
                        r = result[prop];

                        if (prop === 'displayLatLng') {
                            val = r.lat + ', ' + r.lng;

                        } else if (prop === 'mapUrl') {
                            val = '<br /><img src="' + r + '" />';

                        } else {
                            val = r;
                        }
                       
                    }


                    // create POI markers for each location
                    marker = L.marker([ latlng.lat, latlng.lng ])
                          .bindPopup(result.adminArea5 + ', ' + result.adminArea3);

                    group.push(marker);
                }

                // add POI markers to the map and zoom to the features
                features = L.featureGroup(group).addTo(map);
                map.fitBounds(features.getBounds());

                
            });
            console.log(data);
        })
        .fail(function(data)
        {
            console.log(data);
        });
}
console.log('HERE');

console.log(locationArray);



})();





