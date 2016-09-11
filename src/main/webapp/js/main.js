(function () {
    
InFlight.initService('catalogs/shopping/v1', function(ShoppingCatalogs) {
   ShoppingCatalogs.categoryItems(
    {
       category_id: "1a001"
    },
    function(err, catalogs){
      // use the catalogs
       $.each(catalogs, function(idx, obj) {
                var result = '<div class="Box list-group alchemy-list-items">';
                result += '<div class="row-fluid">';
                result += '<div class="col-sm-3">';
                result += '<img alt="" class="alchemy-team-img" src="'+obj.image.default["0"].url+'">';
                result += '</img></div><div class="col-sm-9">';
                result += '<h4 class="list-group-item-heading">'+ obj.title.eng + '</h4>';
                result += '<hr><div class="row-fluid"><div class="col-sm-10">';
                result += '<h5><strong>Description</strong></h5>';
                result += '<p class="list-group-item-text">'+ obj.description.eng+'</p></div>';
                result += '<div class="col-sm-2"><h5 class="text-center">Price:<strong>'+ obj.price.usd.amount +'</strong></h5><h5 class="text-center"><a class="btn btn-success">Buy</a></h5>';
                result += '<a class="btn-center" href=""><i aria-hidden="true" class="fa fa-info-circle fa-3x"></i></a></div></div></hr></div></div></div>';
                $('#teams').append(result);
            });
      console.log(catalogs);
    }
  );
});

})();



