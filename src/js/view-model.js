/**
 * Udacity Nighborhood Map Project
 * View Model - VM of M-V-VM pattern
 * Mediator between Model (M) and View(V) which glues them together.
 * The VM retrieves data from the model (M) and exposes it to the view (V) as properties in a form that the view can
 * easily consume.
 */

/**
 * Entry for keyword search
 * @param name displayed name on select dialog
 * @param ident keyword used to search locations
 * @constructor
 */
var Keyword = function(name, keyword) {
    this.name = name;
    this.ident = keyword;
};

/**
 * @constructor
 */
function ViewModel() {

    var self = this;

    /**
     * Predefined keywords for location search by keyword
     */
    self.availableKeywords = ko.observableArray([
        new Keyword("All", "all"),
        new Keyword("Capital", "capital"),
        new Keyword("City", "city"),
        new Keyword("Domicile", "domicile"),
        new Keyword("Tourist attraction", "attraction"),
        new Keyword("Mountain", "mountain"),
        new Keyword("Sports", "sport"),
        new Keyword("Place of interest", "science"),
        new Keyword("Science", "science")
    ]);

    /**
     * Places of interest keyword selection
     */
    self.selectedKeyword = ko.observable({name: "All", ident: "all"});
    self.selectedKeyword.subscribe(function (newValue) {
        console.log("selected keyword " + newValue.name);
        markerKeywordMatch(newValue.ident);
    });


    /**
     * Search dialog, using subscribe instead of a click callback has the advantage
     * that this method is called whenever a character is added to or removed from the searchInput.
     * When using a click callback (without additional configuration) the callback is trigggered bevore the
     * character is available.
     */
    self.searchInput = ko.observable("");
    self.searchInput.subscribe(function (newValue) {
        console.log("new Value " + newValue);
        markerTitleMatch(newValue);
    });

    /**
     * Additional info radio group, to set the additional info source
     */
    self.additionalInfo = "info";
    self.additionalInfoSelect = ko.observable();
    self.additionalInfoSelect.subscribe(function (newValue) {
        console.log("additionalInfoSelect " + newValue);
        self.additionalInfo = newValue;
    });

    /**
     * Search result list
     */
    self.searchResult = ko.observableArray([]);

    /**
     * Info Text
     */
    self.showInfoText = ko.observable(false);
    self.infoTitle = ko.observable();
    self.infoText = ko.observable();
    self.infoUrl = ko.observable();

    /**
     * Yelp Info Text
     */
    self.showYelpInfoText = ko.observable(false);
    self.yelpSearchResult = ko.observableArray([]);

    /**
     * Meetup Search
     */
    self.showMeetupInfoText = ko.observable(false);
    self.meetupSearchResult = ko.observableArray([]);


    showSearchInput = function() {
        $("#search_input").fadeIn("slow");
    };

    hideSearchInput = function() {
        $("#search_input").fadeOut("slow");
    };


    /**
     * To display the info window for the selected pin and to fade out the search window on small displays.
     * The info window is either a an overview window, a list of yelp resources or a list of meetup resources,
     * depending on the user selection.
     *
     * @param selectPin pin to display info about
     */
    self.showInfoWindow = function (selectPin) {

        selectPin.markSelected();

        if ($(window).width() < 800) {
            $("#search_input").fadeOut("slow");
        }

        if (self.additionalInfo === "info") {
            self.showInfoTextWindow(selectPin);
        } else if (self.additionalInfo === "yelp") {
            self.showYelpInfoWindow(selectPin);
        } else {
            self.showMeetupInfoWindow(selectPin);
        }
    };


    /**
     * To display the text info window
     * @param selectedMapPin pin to display info about
     */
    self.showInfoTextWindow = function (selectedMapPin) {

        self.infoTitle(selectedMapPin.place.title);
        self.infoText(selectedMapPin.place.text);
        self.infoUrl(selectedMapPin.place.url);
        showMapInfoWindow(selectedMapPin, "#textInfoWindow");
    };


    /**
     * To display the yelp info window.
     * @param select pin to display info about
     */
    self.showYelpInfoWindow = function (selectedMapPin) {
        self.infoTitle(selectedMapPin.place.title);
        self.yelpSearchResult.removeAll();
        searchYelp(selectedMapPin, self.yelpSearchResult);
    };

    /**
     * To display the meetuo info window.
     * @param select pin to display info about
     */
    self.showMeetupInfoWindow = function (selectedMapPin) {
        self.infoTitle(selectedMapPin.place.title);
        self.meetupSearchResult.removeAll();
        searchMeetup(selectedMapPin, self.meetupSearchResult);
    };

}

/**
 * To call showInfoWindow from the view and from the model
 * @param selectedPin
 */
ViewModel.prototype.showInfoWindowFoward = function(selectedPin) {
    vm.showInfoWindow(selectedPin);
};


/**
 * Adds a pin to the search result array.
 * @param pin
 */
ViewModel.prototype.addSearchResult = function (pin) {
    this.searchResult.push(pin);
};


/**
 * Empties the search result array
 */
ViewModel.prototype.removeSearchResults = function () {
    this.searchResult.removeAll();
};


/**
 * Either returns image or if undefined the path to a dummy image.
 * @param image url of an image
 * @returns {*} image path
 */
function imageUrl(image) {
    if (image === undefined) {
        return "images/user_medium_square.png";
    } else {
        return image;
    }
}

/**
 * Initialize the knockoutjs view model
 * @type {ViewModel}
 */
var vm = new ViewModel();
ko.applyBindings(vm);

/**
 * Set first entry of Search, Additional Info as selected.
 */
$('#infoId').prop('checked', true);

