let photoService = {
    endpoint: "https://api.unsplash.com/",
    accessKey: "&client_id=mj5PFE4ahehmfQbuAf6ct5mFI3UFKxGNpe_Wq9Yq8yQ"
}

photoService.getPic = (query) => {
    const config = {
        method: "GET",
        url: `${photoService.endpoint}search/photos?query=${query}${photoService.accessKey}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json", },
    };

    return axios(config);
};


// endpoint: "https://data.mongodb-api.com/app/data-nbbhj/endpoint/data/v1/",
//     apiKey: "EUytOixBZtxPeFXx6XyFE7vbF53UzdTVrAJDknkTltoTK9TUz2qUaBKK8droUAiL"
// };

// destinations.add = (payload) => {
    
//     const axios = require('axios');
//     var data = JSON.stringify({
//         "collection": "trips",
//         "database": "sample_training",
//         "dataSource": "Cluster0",
//         "projection": {
//             "_id": 1
//         }
//     });
            
//     const config = {
//         method: 'post',
//         url: `${destinations.endpoint}action/insertOne`,
//         data: payload,
//         headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Request-Headers': '*',
//         'api-key': 'EUytOixBZtxPeFXx6XyFE7vbF53UzdTVrAJDknkTltoTK9TUz2qUaBKK8droUAiL',
//         },
//     data: data
// };
            
// return axios(config).then((response) => {
//         return { ...payload, id: response.data};
//     });
// }