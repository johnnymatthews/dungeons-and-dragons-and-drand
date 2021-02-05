let global_randomness;

function fetch_data(callback, api_call) {
    fetch(`https://drand.cloudflare.com/${api_call}`)
        .then(response => response.json())
        .then(json => callback(null, json))
        .catch(error => callback(error, null))
};

function fetch_randomness(round) {
    if(round == null) {
        round = "latest";
    }

    fetch_data((error, current_round) => {
        if(error) {
            console.log(error);
            return error;
        } else {
            global_randomness = current_round.randomness;
        }
    }, `public/${round}`);
}

function roll_dice(sides) {
    // This is a very silly way of getting a random float, but it's late and I'm tired.
    let yolo;
    yolo = parseInt(global_randomness);
    yolo = yolo.toString();
    yolo = "0." + yolo;
    yolo = parseFloat(yolo);

    let results = {
        randomness: global_randomness,
        floated: yolo + 1,
        d4: Math.trunc(yolo * 4),
        d6: Math.trunc(yolo * 6),
        d8: Math.trunc(yolo * 8),
        d10: Math.trunc(yolo * 10),
        d12: Math.trunc(yolo * 12),
        d20: Math.trunc(yolo * 20)
    };

    console.log(results);
}

function paint_results(results) {
    document.getElementById("results_output").innerHTML = results;
}

function main() {
    fetch_randomness();
    let result = roll_dice(6);
    paint_results(result);
}
