(function () {

    document.querySelectorAll(".modal .btn").forEach((el) => {
        el.addEventListener("click", onMovieAction);
    });

    function onMovieAction(event) {
        let movieId = event.target.id.split("_")[0];
        let buttonType = event.target.id.split("_")[1];

        switch (buttonType) {
            case "favourite":
                fetch("/login", {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({ movieId: movieId })
                }).then((res) => {
                    if(res.redirected){
                        window.location.replace(res.url);
                    }
                }).catch(err => console.log(err));
                break;
            case "delete":
                fetch("/movies", {
                    method: 'DELETE',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({ id: movieId })
                }).then((res)=>{
                    if(res.redirected){
                        window.location.replace(res.url);
                    }
                });
                break;
        }
    }

    /// auth handles
    token_secret = "octomovietoken";
    isAuthenticated = false;
    authToken = null;

    function verifyAuth() {
        let currentToken = window.localStorage.getItem(token_secret);
        if (currentToken) {
            fetch("http://localhost:3000/profile/", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': currentToken
                }
            }).then(res => {
                if(res.statusText === 'Unauthorized'){
                    if (location.pathname != '/login') {
                        window.localStorage.removeItem(token_secret);
                        window.location.replace("/login");
                    }
                }else{
                    console.log(res.body);
                }
            }
            );
        } else {
            if (location.pathname != '/login') {
                window.location.replace("/login");
            }
        }
    }

   verifyAuth();

    function loadToken() {
        let token = window.localStorage.getItem(token_secret);
        if (token) {
            useToken(token);
        }
    }

    function storeToken(token) {
        window.localStorage.setItem(token_secret, token);
        useToken(token);
    }

    function useToken(token) {
        isAuthenticated = true;
        authToken = token;
    }

    /// LOGIN
    const loginForm = document.querySelector("#loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formElements = event.target.querySelectorAll("input");
            const user = {
                username: formElements[0].value,
                password: formElements[1].value
            };
            fetch("/login", {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(user)
            }).then((res) => {
                return res.json();
            }).then(res => {
                window.localStorage.setItem("octomovietoken", res.token);
                window.location.replace("/");
            }).catch(err => console.log(err));
        });
    }

}());