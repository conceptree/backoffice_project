exports.navigation = (user) => {
    return `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">OctoMovies | Backoffice</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link" href="/account">${user}</a>
                    </div>
                </div>
            </div>
        </nav>
    `;
}

exports.footer = ()=>{
    return `<div class="container-fluid bg-dark">
        <a href="/privacy" class="link-light">Privacy Policy</a>
    </div>
    `;
}