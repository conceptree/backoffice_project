"use strict";

(function () {

   document.querySelectorAll(".modal .btn").forEach(el => {
    el.addEventListener("click", onMovieAction);
   });

    function onMovieAction(event){
        let movieId = event.target.id.split("_")[0]
        let buttonType = event.target.id.split("_")[1];

        switch(buttonType){
            case "favourite":
                postData("/favourits", "POST", {
                    movieId:movieId
                });
            break;
            case "delete":
                postData("/movies","DELETE", {id:movieId});
            break;
        }
    }

    function postData(url,method,data) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 console.log(this.responseText);
             }
        };
        xhttp.open(method, url, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(data));
    }

}());