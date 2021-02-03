function fetch_data(callback, api_call) {
    fetch(`https://drand.cloudflare.com/${api_call}`)
        .then(response => response.json())
        .then(json => callback(null, json))
        .catch(error => callback(error, null))
};

function main() {
    let previous_rounds = [];

    fetch_data((error, current_round) => {
        if(error) {
            console.log(error);
            document.getElementById("paint_output").innerHTML = error;
        } else {
            console.log("current_round: ", current_round);
        }
    }, "public/latest");
}

main();
setInterval(main, 15000)
