const taxi = (function() {
    const COLORS = ['#feebe2','#fbb4b9','#f768a1','#c51b8a','#7a0177','#feebe2','#fbb4b9','#f768a1','#c51b8a','#7a0177'];
    const centers =[
        'latitude',
        'longitude'
    ];

    let trips = [];

    
        //Function to calculate the distance between the dropoff coordinates and the hospital center
    const distance = (lat, lng, lat0, lng0) => {
        const deglen = 110.25;
        let x = lat - lat0;
        let y = (lng - lng0) * Math.cos(lat0);
        return deglen * Math.sqrt(x * x + y * y);
    }

    const attachEvents = map => {
        console.log(geoJson2);
        let state = [];

        fetch('/taxi')
            .then(res => res.json())
            .then(data => {
                state = data;
            });

        geoJson2.features.forEach(hos => {
            let circle = new google.maps.Circle({                                 
                fillColor: '#f768a1',
                fillOpacity: .5,
                radius: 1000,
                strokeColor: 'white',
                strokeWeight: .4,
                map: map,
                center: {lat : hos.properties.latitude, lng : hos.properties.longitude}
            });

            circle.addListener('mouseover', e => {
                if (trips.length > 0) {
                    trips.forEach(c => c.setMap(null));
                    trips = [];
                }

                state.forEach(entry => {
                    const tLat = entry.dropoff_latitude.toFixed(2);
                    const tLng = entry.dropoff_longitude.toFixed(2);
                    const cLat = circle.center.lat().toFixed(2);
                    const cLng = circle.center.lng().toFixed(2);

                    const temp = distance(tLat, tLng, cLat, cLng);
                    if (temp < 1) {
                        const coord= [
                            {lat: entry.pickup_latitude, lng: entry.pickup_longitude},
                            {lat: entry.dropoff_latitude, lng: entry.dropoff_longitude}
                        ]
                        let path = new google.maps.Polyline({
                            strokeColor: 'white',
                            strokeWeight: .5,
                            map: map,
                            path: coord, 
                            geodesic: true,
                            strokeOpacity: 1
                        });
                        trips.push(path);
                    }
                });

                buildPopup(hos.properties.facility_name, trips.length);
            });
        });
    };

    const buildPopup = (hName, count) => {
        const container = document.getElementById('popup');
        const inner = document.querySelector('.content');
        const content = `
            <ul>
                <li><span class="title">Hospital name:</span> ${hName} </li>
                <li><span class="title">Number of trips:</span> ${count}</li>
            </ul>`; 
        inner.innerHTML = content;
        container.className = 'show';
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

