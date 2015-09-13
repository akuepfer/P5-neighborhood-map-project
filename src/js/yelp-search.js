/**
 * To search at yelp
 *
 * This is an adaption of code code sample from Lev Brie lev.brie@gmail.com
 * https://github.com/levbrie/mighty_marks/blob/master/yelp-search-sample.html
 */

// <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
// <script type="text/javascript" src="http://oauth.googlecode.com/svn/code/javascript/oauth.js"></script>
// <script type="text/javascript" src="http://oauth.googlecode.com/svn/code/javascript/sha1.js"></script>

var auth = {
    //
    // Update with your auth tokens.
    //
    consumerKey: "9Vtw_SjZAv8H-7sayVjtyg",
    consumerSecret: "dvbjzZNq03nTFCf4NuqyEjTzibI",
    accessToken: "TCYdRHfPmjpP3MBnHSIpk3jikLk1JTtM",
    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
    // You wouldn't actually want to expose your access token secret like this in a real application.
    accessTokenSecret: "5FCaTJgjwJ0iP95QM41nhmMJgB4",
    serviceProvider: {
        signatureMethod: "HMAC-SHA1"
    }
};


yelpSearch = function(term, location, callback, errorCallback) {

    var accessor = {
        consumerSecret: auth.consumerSecret,
        tokenSecret: auth.accessTokenSecret
    };

    parameters = [];
    parameters.push(['term', term]);
    parameters.push(['location', location]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    var message = {
        'action': 'http://api.yelp.com/v2/search',
        'method': 'GET',
        'parameters': parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);
    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

    console.log(parameterMap);
    $.ajax({
        'url': message.action,
        'data': parameterMap,
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
}
