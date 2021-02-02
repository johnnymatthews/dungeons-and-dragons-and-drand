import Client, { HTTP } from 'https://cdn.jsdelivr.net/npm/drand-client/drand.js';

const chainHash = '8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce'; 
const urls = [
    'https://api.drand.sh',
    'https://drand.cloudflare.com'
];

function paint_number(thingy) {
    document.getElementById("paint_output").innerHTML=thingy;
}

async function main() {

    const options = { chainHash };
    const client = await Client.wrap(HTTP.forURLs(urls, chainHash), options);
    const res = await client.get();
    console.log(res.round, res.randomness);
    paint_number(res.randomness);
}

main();
setInterval(main, 5000);
