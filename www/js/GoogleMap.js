function centerOffset() {
    return [ 0.00035, 0 ];
};

function googleMapOptions(lat, lng) {
    var latlng = new google.maps.LatLng(lat + centerOffset()[0], lng + centerOffset()[1]);
    return {
        zoom: 19,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        draggable: false,
        disableDefaultUI: true
    };
};

function googleMapStyledMapType(name) {
    /* スタイル付き地図 */
    var styleOptions = [
        {
            /* すべての文字（焦げ茶） */
            featureType: 'all',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }, { hue: '#6d4d38' }]
        },
        {
            /* 市区名 */
            featureType: 'administrative.locality',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }, { lightness: '20' }]
        },
        {
            /* 風景（ベージュ） */
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ hue: '#E5E4F7'/*'#f7f0e4'*/ }, { lightness: '10' }, { saturation: '40' }]
        },
        {
            /* ビジネス系の建物（オレンジ） */
            featureType: 'poi.business',
            elementType: 'geometry',
            stylers: [{ visibility: 'simplified' }, { hue: '#f98508' }, { lightness: '-20' }, { saturation: '75' }]
        },
        {
            /* 公園（黄緑） */
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ visibility: 'simplified' }, { hue: '#99cc00' }, { lightness: '35' }, { saturation: '40' }]
        },
        {
            /* すべての道路（黄色） */
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ visibility: 'simplified' }, { hue: '#ffcc22' }, { lightness: '100' }, { saturation: '80' }]
        },
        {
            /* 高速道路 */
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ lightness: '-30' }]
        },
        {
            /* 線路（オレンジ） */
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{ visibility: 'on' }, { hue: '#f98508' }]
        },
        {
            /* 駅名（焦げ茶） */
            featureType: 'transit.station.rail',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }, { hue: '#6d4d38' }, { saturation: '-20' }]
        },
        {
            /* 水域（水色） */
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ visibility: 'on' }, { hue: '#b6deea' }, { saturation: '20' }, { lightness: '10' }]
        }
    ];
    return new google.maps.StyledMapType(styleOptions, { name: name });
};

function googleMapMarkerOptions(map, lat, lng) {
    return {
        position: new google.maps.LatLng(lat, lng),
        map: map,
        icon: new google.maps.MarkerImage('images/FallingGreenleaves.gif'),
        animation: google.maps.Animation.BOUNCE
    };
};