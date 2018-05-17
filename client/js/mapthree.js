const taxi = (function() {
    const COLORS = ['#feebe2','#fbb4b9','#f768a1','#c51b8a','#7a0177','#feebe2','#fbb4b9','#f768a1','#c51b8a','#7a0177'];
    const centers =[
        'latitude',
        'longitude'
    ];


    const prop = s => d => {
        return d[s];
    };

    const attachEvents = map => {
                fetch('/taxi')
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        data.forEach(entry => {
                            console.log(entry)

                                const coord= [
                                    {lat: entry.pickup_latitude, lng: entry.pickup_longitude},
                                    {lat: entry.dropoff_latitude, lng: entry.dropoff_longitude}
                                ]
                                let path = new google.maps.Polyline({
                                    strokeColor: 'white',
                                    strokeWeight: .1,
                                    map: map,
                                    path: coord, 
                                    geodesic: true,
                                    strokeOpacity: 1.0
                                });
                        });
                    });

    };
    

    const buildMap = _ => {
        let map;
        const initMap = () => {
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: {lat: 40.7128, lng: -74.0060},
                disableDefaultUI: true,
                styles:[
                    {
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "saturation": 36
                            },
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 40
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            },
                            {
                                "weight": 1.2
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 30
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 30
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 29
                            },
                            {
                                "weight": 0.2
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 18
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 19
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    }
                ]           
            });

            attachEvents(map);
        };


        window.initMap = initMap;
    }

    const init = _ => {
        buildMap();
    }

    return {
        init,
    }
})();

taxi.init();

