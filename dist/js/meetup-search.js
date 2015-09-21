/**
 * Call meetup using URL
 * //https://api.meetup.com/2/open_events.json?status=upcoming&text_format=plain&country=CH&lat=47.65963489&lon=8.85769811&radius=50&key=35203c2d266a7614a2511252f364d13
 *
 * @param location location to search for meetup, cicle of 20 km
 * @param callback in case of success called with result
 * @param errorCallback in case of failure called with result
 */
meetupSearch = function(location, callback, errorCallback) {

    var parameters = {
        key: '35203c2d266a7614a2511252f364d13',
        status: 'upcoming',
        text_format: 'plain',
        country: 'CH',
        lat: location.lat,
        lon: location.lng,
        radius: '20'
    };

    var message = {
        'action': 'https://api.meetup.com/2/open_events.json',
        'method': 'GET',
        'parameters': parameters
    };

    console.log(parameters);
    $.ajax({
        'url': message.action,
        'data': parameters,
        'cache': true,
        'timeout' : 5000,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'success': function (data, textStats, XMLHttpRequest) {
            console.log(data);
            callback(data);
        },
        'error': function(jqXHR, textStatus, errorThrown ) {
            errorCallback(textStatus, errorThrown);
        }
    });
};
