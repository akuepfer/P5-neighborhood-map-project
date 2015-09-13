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
 * Array of pins displayed on the map
 * @type {Array of MapPin}
 */
var mapPins = [];


/**
 * The currently selected pin on the map.
 * @type {google.maps.Marker}
 */
var selectedMarker = null;

/**
 * The icon of the currently selected marker before it was selected.
 * Used to redraw the pin afer it looses the selection
 * @type {google.maps.Marker.icon}
 */
var initialIcon = null;


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
        icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    });

    this.marker.addListener('click', (function() {
        vm.showInfoWindow(this);
    }).bind(this));

}

/**
 * Sets this map pin as selected, draw it in red
 */
MapPin.prototype.markSelected = function() {
    if (this.marker === selectedMarker) {
        return;
    }
    if (selectedMarker != null) {
        selectedMarker.setIcon(initialIcon)
        selectedMarker.setZIndex(google.maps.Marker.MAX_ZINDEX - 1);
    }
    selectedMarker = this.marker;
    initialIcon = this.marker.icon;
    this.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
    this.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
}


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
}


/**
 * Return true if the name of the place starts with 'start.
 * @param start text string
 * @returns {boolean}
 */
MapPin.prototype.matchTitle = function(start) {
    if (this.place.title.startsWith(start)) {
        return true;
    }
    return false;
}


/**
 * Updated the color of a map pin
 * - selected yellow color
 * - not selected green color
 *
 * @param selected {boolean}
 */
MapPin.prototype.setSelected = function(selected) {
    if (selected) {
        this.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png')
        this.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
    } else {
        this.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
        this.marker.setZIndex(google.maps.Marker.MAX_ZINDEX - 1);
    }
}


/**
 * Updates the color of all pins having the keyword assigned.
 * Updates the search result array.
 * @param keyword keyword to compare with keywords of the place
 */
function markerKeywordMatch(keyword) {
    vm.removeSearchResults();
    for (var i = 0; i < mapPins.length; i++) {
        if (mapPins[i].matchKeyword(keyword)) {
            mapPins[i].setSelected(true)
            vm.addSearchResult(mapPins[i]);
        } else {
            mapPins[i].setSelected(false)
        }
    }
}


/**
 * Updates the color of all pins where the title starts with the match string.
 * Updates the search result array.
 * @param match string to match
 */
function markerTitleMatch(match) {
    vm.removeSearchResults();
    for (var i = 0; i < mapPins.length; i++) {
        if (mapPins[i].matchTitle(match)) {
            mapPins[i].setSelected(true)
            vm.addSearchResult(mapPins[i]);
        } else {
            mapPins[i].setSelected(false)
        }
    }
}


/**
 * Search yelp with term 'restaurant' and a location
 * @param location location to search with
 * @param returnValues push returned values to array
 */
function searchYelp(location, returnValues) {
    yelpSearch('restaurant', location.place.title,
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
        },
        function(textStatus, errorThrown) {
            returnValues.push({
                name: textStatus,
                text: errorThrown,
                imageUrl: "images/connect-error.png",
                url: "",
                link: ""
            });
        }
    );
}


/**
 * 'Ployfill' for string startsWith method
 */
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}


/**
 * Intializes the map and creates the array of pins to display
 */
initMap = function () {

    var center = { lat: 46.78000496 , lng: 8.37522517 };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: center
    });

    for (i = 0; i < placesModel.placesList.length; i++) {
        mapPin = new MapPin(map, placesModel.placesList[i]);
        mapPins.push(mapPin);
        vm.addSearchResult(mapPin);
    }
}
