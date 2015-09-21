/**
 * Udacity Nighborhood Map Project
 * Model - M of M-V-VM pattern
 *
 * Responsibilities of the model:
 * - State management
 * - Business Logic
 * - Data access, web services, database, etc.
 */

/**
 * The google map instance
 * @type {google.maps.Map}
 */
var map;

/**
 * Array of pins displayed on the map
 * @type {Array of MapPin}
 */
var mapPins = [];


/**
 * The currently selected pin on the map.
 * @type {google.maps.Marker}
 */
var selectedMapPin = null;

/**
 * The info window attached to a pin of the map.
 * Window will be reused, only content changes.
 * @type {google.maps.InfoWindow}
 */
var infoWindow;


/**
 * Initializes the map and creates the array of pins to display
 */
initMap = function () {

    var center = { lat: 46.78000496 , lng: 8.37522517 };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: center
    });

    infoWindow = new google.maps.InfoWindow({
        maxWidth: 300,
        maxHight: 600,
        content: '<div id="content" class="info_window"><p>data load failed<p></p></div>'
    });

    for (i = 0; i < placesModel.placesList.length; i++) {
        mapPin = new MapPin(map, placesModel.placesList[i]);
        mapPins.push(mapPin);
        vm.addSearchResult(mapPin);
    }
};


/**
 * Constructor for a Google Map pin.
 * @param map
 * @param place
 * @constructor
 */
var MapPin = function(map, place) {

    this.map = map;
    this.place = place;

    this.marker = new google.maps.Marker({
        position: place,
        map: map,
        title: place.title,
        animation: null,
        icon: 'images/' + place.keyword[0] + '.png'
    });

    this.marker.addListener('click', (function() {
        vm.showInfoWindowFoward(this);
    }).bind(this));

};



/**
 * Sets this map pin as selected, draw it in red
 */
MapPin.prototype.markSelected = function() {
    if (selectedMapPin !== null) {
        selectedMapPin.marker.setZIndex(google.maps.Marker.MAX_ZINDEX - 1);
    }
    selectedMapPin = this;

    map.setCenter({lat: this.place.lat, lng: this.place.lng + 0.6});
    this.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
    this.marker.setAnimation(google.maps.Animation.BOUNCE);
    mapPinAnnimation(this.marker, 1500);
};


mapPinAnnimation = function(aMarker, aTime)  {
    var marker = aMarker;
    var time = aTime;
    setTimeout(function () {
        marker.setAnimation(google.maps.Animation.NONE);
    }, time);
};



/**
 * Returns true if this ping is assigned to the keyword
 *
 * @param keyword {String}
 * @returns {boolean}
 */
MapPin.prototype.matchKeyword = function(keyword) {
    for (var i = 0; i < this.place.keyword.length; i++) {
        if (keyword === 'all') {
            return true;
        }
        if (keyword ===  this.place.keyword[i]) {
            return true;
        }
    }
    return false;
};


/**
 * Return true if the name of the place starts with 'start.
 * @param start text string
 * @returns {boolean}
 */
MapPin.prototype.matchTitle = function(matchString) {
    if (this.place.title.toLowerCase().indexOf(matchString.toLowerCase()) != -1) {
        return true;
    }
    return false;
};


/**
 * Enable / disable display of a man pin.
 * @param selected {boolean} true to display, false to hide.
 */
MapPin.prototype.setSelected = function(selected) {
    if (selected) {
        this.marker.setMap(map);
    } else {
        this.marker.setMap(null);
    }
};


/**
 * Updates the pins displayed on the map.
 * Updates the search result array.
 * @param keyword keyword to compare with keywords of the place
 */
function markerKeywordMatch(keyword) {
    vm.removeSearchResults();
    for (var i = 0; i < mapPins.length; i++) {
        if (mapPins[i].matchKeyword(keyword)) {
            mapPins[i].setSelected(true);
            vm.addSearchResult(mapPins[i]);
        } else {
            mapPins[i].setSelected(false);
        }
    }
}


/**
 * Updates the pins displayed on the map.
 * Updates the search result array.
 * @param match string to match
 */
function markerTitleMatch(match) {
    vm.removeSearchResults();
    for (var i = 0; i < mapPins.length; i++) {
        if (mapPins[i].matchTitle(match)) {
            mapPins[i].setSelected(true);
            vm.addSearchResult(mapPins[i]);
        } else {
            mapPins[i].setSelected(false);
        }
    }
}


/**
 * Search yelp with term 'restaurant' and a location
 * @param location location to search with
 * @param returnValues retrieved values will be pushed to this array
 */
function searchYelp(mapPin, returnValues) {

    yelpSearch('restaurant', mapPin.place.title,
        function(yelpResult) {
            for (var i = 0; i < yelpResult.businesses.length; i++) {
                returnValues.push({
                    name: yelpResult.businesses[i].name,
                    text: yelpResult.businesses[i].snippet_text,
                    imageUrl: imageUrl(yelpResult.businesses[i].snippet_image_url),
                    url: yelpResult.businesses[i].url,
                    link: yelpResult.businesses[i].name,
                });
            }
            showMapInfoWindow(mapPin, "#yelpInfoWindow");
        },
        function(textStatus, errorThrown) {
            returnValues.push({
                name: textStatus,
                text: errorThrown,
                imageUrl: "images/connect-error.png",
                url: "",
                link: ""
            });
            showMapInfoWindow(mapPin, "#yelpInfoWindow");
        }
    );
}


/**
 * Search meetup with the coordinates of the mapPin
 * @param mapPin coordinates to search with
 * @param returnValues retrieved values will be pushed to this array.
 */
function searchMeetup(mapPin, returnValues) {
    var description = "";
    var address = "";
    var city = "";
    meetupSearch(mapPin.place,
        function(meetupResult) {
            for (var i = 0; i < meetupResult.results.length; i++) {
                if (meetupResult.results[i].description === undefined || meetupResult.results[i].description.length < 120) {
                    description = meetupResult.results[i].description;
                } else {
                    description = meetupResult.results[i].description.substring(0, 120) + ' ...';
                }
                if (meetupResult.results[i].venue !== undefined) {
                    address = meetupResult.results[i].venue.address_1;
                    city = meetupResult.results[i].venue.city;
                }
                returnValues.push({
                    name: meetupResult.results[i].name,
                    description: description,
                    address: address,
                    city: city,
                    time: new Date(meetupResult.results[i].time).toLocaleString(),
                    event_url: meetupResult.results[i].event_url,
                    urlname: meetupResult.results[i].group.urlname
                });
            }
            if (meetupResult.results.length === 0) {
                returnValues.push({
                    name: "No meeetup in this area.",
                    description: "",
                    city: "",
                    time: "",
                    url: "",
                    address: "",
                    event_url: "",
                    urlname: ""
                });
            }
            showMapInfoWindow(mapPin, "#meetupInfoWindow");
        },
        function(textStatus, errorThrown) {
            returnValues.push({
                name: textStatus,
                description: errorThrown,
                city: "",
                time: "",
                url: "",
                address: "",
                event_url: "",
                urlname: ""
            });
            showMapInfoWindow(mapPin, "#meetupInfoWindow");
        }
    );
}


/**
 * Retrieve hidden dom tree and display it in the google map info window.
 * Therefore creation of the HTML code for the popup window is delegated to knockoutjs.
 *
 * @param mapPin the pin on the map where the content must be attached to
 * @param nodeId the id of the hidden dom tree to display in the info window
 */
showMapInfoWindow = function(mapPin, nodeId) {
    var node = $(nodeId).clone();
    infoWindow.setContent(node.html());
    infoWindow.open(map, mapPin.marker);
};

