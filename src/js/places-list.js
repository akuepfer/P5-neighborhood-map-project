/**
 * Udacity Nighborhood Map Project
 * Neighborhood places
 */
var placesModel = {

    placesList: [
        {
            title: "Zurich",
            keyword: ["city", "domicile"], lat: 47.36499008, lng: 8.50779533,
            text: "Zurich is the largest city in Switzerland and the capital of the canton of Zürich." +
            "Zürich is a leading global city and among the world's largest financial centres despite a relatively low population.",
            url: "https://en.wikipedia.org/wiki/Z%C3%BCrich",
        },
        {
            title: "Schaffhausen",
            keyword: ["city", "home-town"], lat: 47.69968244, lng: 8.6443305,
            text: "The old portion of the city has many fine Renaissance era buildings decorated with exterior frescos and " +
            "sculpture, as well as the impressive old canton fortress, the Munot.",
            url: "https://en.wikipedia.org/wiki/Schaffhausen",
        },
        {
            title: "Bern",
            keyword: ["city", "capital"], lat: 46.94727767, lng: 7.45121746,
            text: "Bern is the capital of Switzerland." +
            "In 1983 the historic old town in the centre of Bern became a UNESCO World Heritage Site and Bern is ranked among " +
            "the world’s top ten cities for the best quality of life (2010).",
            url: "https://en.wikipedia.org/wiki/Bern",
        },
        {
            title: "Genf",
            keyword: ["city"], lat: 46.20397635, lng: 6.14727428,
            text: "Genf is the second most populous city in Switzerland (after Zürich) and is the most populous city of Romandy, " +
            "the French-speaking part of Switzerland. Situated where the Rhône exits Lake Geneva." +
            "Geneva is a global city, a financial center, and worldwide center for diplomacy due to the presence of numerous " +
            "international organizations, including the headquarters of many of the agencies of the United Nations[3] and the Red Cross.",
            url: "https://en.wikipedia.org/wiki/Geneva",
        },
        {
            title: "Winterthur ",
            keyword: ["city", "industry"], lat: 47.49719814, lng: 8.72941017,
            text: "Economically, Winterthur was one of the homes of Switzerland's rail industry and an industrial centre. " +
            "The rail industry and other heavy industry have largely disappeared.",
            url: "https://en.wikipedia.org/wiki/Winterthur",
        },
        {
            title: "Rhine Falls",
            keyword: ["attraction", "tourist", "waterfall"], lat: 47.677951, lng: 8.61558,
            text: "The Rhine Falls (Rheinfall in German) is the largest plain waterfall in Europe.",
            url: "http://www.rheinfall.ch/en/",
        },
        {
            title: "Stein am Rhein",
            keyword: ["attraction", "tourist", "medieval centre"], lat: 47.65963489, lng: 8.85769811,
            text: "The town has a well-preserved medieval centre, retaining the ancient street plan. The site of the city wall, " +
            "and the city gates are preserved, though the former city wall now consists of houses.",
            url: "https://en.wikipedia.org/wiki/Stein_am_Rhein",
        },
        {
            title: "Matterhorn",
            keyword: [ "mountain", "attraction", "tourist" ], lat: 45.976574, lng: 7.6584519,
            text: "The Matterhorn (German: Matterhorn, Italian: Monte Cervino, French: Mont Cervio) is a mountain of the Alps, " +
            "straddling the border between Switzerland and Italy. It is a huge pyramidal peak in the Monte Rosa area of the " +
            "Pennine Alps, whose summit is 4,478 metres (14,692 ft) high",
        },
        {
            title: "Lucerne Chapel Bridge",
            keyword: ["attraction", "tourist", "bridge"], lat: 47.051649, lng: 8.307535,
            text: "Due Lucerne's location on the shore of Lake Lucerne (der Vierwaldstättersee), within sight of Mount Pilatus and " +
            "Rigi in the Swiss Alps, Lucerne has long been a destination for tourists." +
            "One of the city's famous landmarks is the Chapel Bridge (Kapellbrücke), a wooden bridge first erected in the 14th century.",
            url: "https://en.wikipedia.org/wiki/Lucerne",
        },
        {
            title: "Pontresina Engadin",
            keyword: ["sport", "skying"], lat: 46.4929957, lng: 9.9024964,
            text: "Pontresina is wonderfull for winter sports like cross country skying. " +
            "Pontresina (Romansh: Puntraschigna) is a municipality in the district of Maloja in the canton of Graubünden in Switzerland.",
            url: "http://www.pontresina.ch/",
        },
        {
            title: "Konstanz",
            keyword: ["attraction", "tourist", "city"], lat: 47.65962353, lng: 9.17505534,
            text: "Konstanz is situated on Lake Constance (the Bodensee in German)." +
            "The Altstadt (Old Town), which is large considering the small size of modern Konstanz, has many old buildings" +
            " and twisting alleys.",
            url: "https://en.wikipedia.org/wiki/Konstanz"
        },
        {
            title: "Château de Chillon",
            keyword: ["attraction", "tourist", "castle"], lat: 46.414213, lng: 6.927492,
            text: "The Château de Chillon (Chillon Castle) is an island castle located on Lake Geneva (Lac Léman)" +
            "Chillon is amongst the most visited castles in Switzerland and Europe.",
            url: "https://en.wikipedia.org/wiki/Ch%C3%A2teau_de_Chillon"
        },
        {
            title: "Cern Genfe",
            keyword: ["science", "place of interest", "research", ], lat: 46.232795, lng: 6.055024,
            text: "The European Organization for Nuclear Research (French: Organisation européenne pour la recherche nucléaire), " +
            "known as CERN, derived from the name 'Conseil Européen pour la Recherche Nucléaire'; is a European research" +
            " organization that operates the largest particle physics laboratory in the world.",
            url: "http://home.web.cern.ch/"
        },
        {
            title: "Swiss Science Center Technorama",
            keyword: [ "science", "place of interest" ], lat: 47.514069, lng: 8.764489,
            text: "Get carried away in this amazing world of science. The interactive exhibits at Technorama invite you to " +
            "touch, to try, to play and to understand - a true feast for all your senses.",
            url: "http://www.technorama.ch/en/"

        },
        {
            title: "Swiss Museum of Transport",
            keyword: [ "science", "place of interest" ], lat: 47.052873, lng: 8.336391,
            text: "The Swiss Transport Museum or Verkehrshaus der Schweiz, in Lucerne, is a museum, opened in July 1959 and " +
            "exhibiting all forms of transport (including locomotives, automobiles, ships, and aircraft) as well as communications. " +
            "It is Switzerland's most popular museum.",
            url: "https://www.verkehrshaus.ch/en"
        },
    ]
};
