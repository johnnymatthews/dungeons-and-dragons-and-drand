function fetch_data(callback, api_call) {
    fetch(`https://drand.cloudflare.com/${api_call}`)
        .then(response => response.json())
        .then(json => callback(null, json))
        .catch(error => callback(error, null))
};

function get_randomness(round) {
    if(round == null) {
        round = "latest";
    }

    fetch_data((error, current_round) => {
        if(error) {
            console.log(error);
            document.getElementById("paint_output").innerHTML = error;
        } else {
            console.log(current_round);
            return current_round.randomness;
        }
    }, `public/${round}`);
}

function random_d6() {

}

function main() {
    let randomness = get_randomness();
}
get_randomness();
