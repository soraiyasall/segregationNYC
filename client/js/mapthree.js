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
                            strokeColor: '#323545',
                            strokeWeight: .4,
                            map: map,
                            path: coord, 
                            geodesic: true,
                            strokeOpacity: 1,
                        });
                        trips.push(path);
                    }
                });
                console.log(hos.properties.facility_name, trips.length)
                buildPopup(hos.properties.facility_name, trips.length);
            });
        });
    };

    const buildPopup = (hName, count) => {
        const container = document.getElementById('popup');
        const inner = document.querySelector('.content');
        const content = `
            <p><span class="title">${hName}</span> </p>
            <ul>
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
                styles:[
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "##f4f4f4" 
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#dedede"
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
                                "color": "#dedede"
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
                                "color": "#dedede"
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
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f1f1f1"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "saturation": 36
                            },
                            {
                                "color": "#333333"
                            },
                            {
                                "lightness": 40
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f2f2f2"
                            },
                            {
                                "lightness": 19
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#fefefe"
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
                                "color": "#fefefe"
                            },
                            {
                                "lightness": 17
                            },
                            {
                                "weight": 1.2
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