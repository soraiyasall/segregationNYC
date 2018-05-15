const census = (function() {
    const COLORS = ['#feebe2','#fbb4b9','#f768a1','#c51b8a','#7a0177'];

    const population = [
        'Men',
        'Women'
    ];
    const ethnicity = [
        'White',
        'Black',
        'Native',
        'Asian',
        'Hispanic'
    ];

    const income = [
        'Income'
    ];

    const unemployment = [
        'Unemployment'
    ];

    const prop = s => d => {
        return d[s];
    };

    const attachEvents = map => {
        document.getElementById('filterField').addEventListener('change', e => {
            const value = e.target.options[e.target.selectedIndex].value;
    
            if(population.indexOf(value) !== -1) {
                    fetch('/census/population')
                        .then(res => res.json())
                        .then(data => {
                            map.data.setStyle(feature => {
                                return {
                                    fillColor: getColors('pop', data.find(item => item.Tract === feature.f.geoid)[value]),
                                    fillOpacity: .8,
                                    strokeWeight: 1,
                                    strokeColor: '#b393b3',
                                }
                            });
                        });
    
            } else if (ethnicity.indexOf(value) !== -1){
                    fetch('/census/ethnicity')
                        .then(res => res.json())
                        .then(data => {
                            map.data.setStyle(feature => {
                                return {
                                    fillColor: getColors('rate', data.find(item => item.Tract === feature.f.geoid)[value]),
                                    fillOpacity: .8,
                                    strokeWeight: 1,
                                    strokeColor: '#b393b3',
                                }
                            });
                        });

    
            } else if (income.indexOf(value) !== -1){
                fetch('/census/income')
                    .then(res => res.json())
                    .then(data => {
                        map.data.setStyle(feature => {
                            return {
                                fillColor: getColors('income', data.find(item => item.Tract === feature.f.geoid)[value]),
                                fillOpacity: .8,
                                strokeWeight: 1,
                                strokeColor: '#b393b3',
                            }
                        });
                    });


            } else if (unemployment.indexOf(value) !== -1){
                fetch('/census/unemployment')
                    .then(res => res.json())
                    .then(data => {
                        map.data.setStyle(feature => {
                            return {
                                fillColor: getColors('unemp', data.find(item => item.Tract === feature.f.geoid)[value]),
                                fillOpacity: .8,
                                strokeWeight: 1,
                                strokeColor: '#b393b3',
                            }
                        });
                    });

            }

        });
    };

    const getColors = (type, val) => {
        if (type === 'rate') {
            return COLORS[Math.round(val / 20)]
        } else if (type === 'pop') {
            return COLORS[Math.round(val / 2500)]
        } else if (type === 'income'){
            return COLORS[Math.round(val / 30000)]
        } else if (type === 'unemp'){
            return COLORS[Math.round(val / 12)]
        }
        
    }

    const buildMap = _ => {
        let map;
        const initMap = () => {
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: {lat: 40.7128, lng: -74.0060},
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

            map.data.addGeoJson(geoJson);

            map.data.setStyle(feature => {
                return {
                    fillColor: '#ffffff',
                    fillOpacity: 0,
                    strokeWeight: .5,
                    strokeColor: '#ccc',
                }
            });
            map.data.addListener('mouseover', function(e) {
                console.log(e)
                const container = document.getElementById('popup');
                const inner = document.querySelector('.content');
                const content = `<h1>${e.feature.f.geoid}</h1>`; 
                inner.innerHTML = content;
                container.className = 'show';
            });
               
            map.data.addListener('mouseout', function(e) {
                const container = document.getElementById('popup');
                container.className = 'hide';
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

census.init();