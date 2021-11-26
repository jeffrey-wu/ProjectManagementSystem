function register(req, res) {
    //render html webpage HERE 
    //CORS to connect to angular project HERE
    res.render("register")
}

function signin(req, res) {
    //render html webpage HERE 
    //CORS to connect to angular project HERE
    res.render("signin")
}

export default { register, signin }