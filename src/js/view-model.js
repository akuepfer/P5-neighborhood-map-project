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

    /**
     * Predefined keywords for location search
     */
    this.availableKeywords = ko.observableArray([
        new Keyword("All", "all"),
        new Keyword("Capital", "capital"),
        new Keyword("City", "city"),
        new Keyword("Domicile", "domicile"),
        new Keyword("Tourist attraction", "tourist attraction"),
        new Keyword("Mountain", "mountain"),
        new Keyword("Sports", "sport"),
        new Keyword("Place of interest", "place of interest"),
        new Keyword("Science", "science")
    ]);

    /**
     * Places of interest keyword selection
     */
    this.selectedKeyword = ko.observable({ name: "All",  ident: "all" });
    this.selectedKeyword.subscribe(function (newValue) {
        console.log("selected keyword " + newValue.name);
        markerKeywordMatch(newValue.ident);
    });


    /**
     * Search dialog
     */
    this.searchInput = ko.observable("");
    this.searchInput.subscribe(function (newValue) {
        console.log("new Value " + newValue);
        markerTitleMatch(newValue);
    });

    /**
     * Additional info radio group, to set the additional info source
     */
    this.additionalInfo = "info";
    this.additionalInfoSelect = ko.observable();
    this.additionalInfoSelect.subscribe((function (newValue) {
        console.log("additionalInfoSelect " + newValue);
        this.additionalInfo = newValue;
    }).bind(this));

    /**
     * Search result list
     */
    this.searchResult = ko.observableArray([]);

    /**
     * Info Text
     */
    this.showInfoText = ko.observable(false);
    this.infoTitle = ko.observable();
    this.infoText = ko.observable();
    this.infoUrl = ko.observable();

    /**
     * Yelp Info Text
     */
    this.showYelpInfoText = ko.observable(false);
    this.yelpSearchResult = ko.observableArray([]);
};

/**
 * Adds a pin to the search result array.
 * @param pin
 */
ViewModel.prototype.addSearchResult = function(pin) {
    this.searchResult.push(pin)
}

/**
 * Empties the search result array
 */
ViewModel.prototype.removeSearchResults = function() {
    this.searchResult.removeAll()
}

/**
 * To enable the info window for the selected pin.
 * This is either a an overview window or a list of yelp resources depending on the user selection.
 *
 * @param selectPin pin to display info about
 */
ViewModel.prototype.showInfoWindow = function(selectPin) {
    selectPin.markSelected();
    if (vm.additionalInfo === "info") {
        vm.showInfoTextWindow(selectPin)
    } else {
        vm.showYelpInfoWindow(selectPin)
    }

};

/**
 * To display the text info window
 * @param select pin to display info about
 */
ViewModel.prototype.showInfoTextWindow = function(select) {
    vm.infoTitle(select.place.title);
    vm.infoText(select.place.text);
    vm.infoUrl(select.place.url)
    vm.showYelpInfoText(false);
    vm.showInfoText(true);
};

/**
 * Hide the text info window
 */
ViewModel.prototype.hideInfoText = function() {
    vm.showInfoText(false);
}

/**
 * To display the yelp info window.
 * @param select pin to display info about
 */
ViewModel.prototype.showYelpInfoWindow = function(select) {
    vm.infoTitle(select.place.title);
    vm.yelpSearchResult.removeAll();
    searchYelp(select, vm.yelpSearchResult);
    vm.showInfoText(false);
    vm.showYelpInfoText(true);
};

/**
 * Hide the yelp info window
 */
ViewModel.prototype.hideYelpInfoText = function() {
    vm.showYelpInfoText(false);
}

/**
 * Either returns image or if undefined the path to a dummy image.
 * @param image url of an image
 * @returns {*} image path
 */
function imageUrl(image) {
    if (image === undefined) {
        return "images/placeholder-100x100.png";
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


