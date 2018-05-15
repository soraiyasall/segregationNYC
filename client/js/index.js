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

    let selectedField;

    const attachEvents = map => {
            document.querySelectorAll('.population').forEach(el => {
                el.addEventListener('click', e => {
                    selectedField = e.target.value;
                    fetch('/census/population')
                        .then(res => res.json())
                        .then(data => {
                            map.data.setStyle(feature => {
                                const tract = data.find(item => item.Tract === feature.f.geoid);
                                return {
                                    fillColor: getColors('pop', tract ? tract[e.target.value] : 0),
                                    fillOpacity: .8,
                                    strokeWeight: 1,
                                    strokeColor: '#b393b3',
                                }
                            });
                        });
                });
            });
            document.querySelectorAll('.ethnicity').forEach(el => {
                el.addEventListener('click', e => {
                    selectedField = e.target.value;
                    fetch('/census/ethnicity')
                        .then(res => res.json())
                        .then(data => {
                            map.data.setStyle(feature => {
                                const tract = data.find(item => item.Tract === feature.f.geoid);
                                return {
                                    fillColor: getColors('rate', tract ? tract[e.target.value] : 0),
                                    fillOpacity: .8,
                                    strokeWeight: 1,
                                    strokeColor: '#b393b3',
                                }
                            });
                        });
                });
            });
            document.querySelectorAll('.income').forEach(el => {
                el.addEventListener('click', e => {
                    selectedField = e.target.value;
                    fetch('/census/income')
                        .then(res => res.json())
                        .then(data => {
                            map.data.setStyle(feature => {
                                const tract = data.find(item => item.Tract === feature.f.geoid);
                                return {
                                    fillColor: getColors('income', tract ? tract[e.target.value] : 0),
                                    fillOpacity: .8,
                                    strokeWeight: 1,
                                    strokeColor: '#b393b3',
                                }
                            });
                        });
                });
            });
            document.querySelectorAll('.unemployment').forEach(el => {
                el.addEventListener('click', e => {
                    selectedField = e.target.value;
                    fetch('/census/unemployment')
                        .then(res => res.json())
                        .then(data => {
                            map.data.setStyle(feature => {
                                const tract = data.find(item => item.Tract === feature.f.geoid);
                                return {
                                    fillColor: getColors('unemp', tract ? tract[e.target.value] : 0),
                                    fillOpacity: .8,
                                    strokeWeight: 1,
                                    strokeColor: '#b393b3',
                                }
                            });
                        });
                });
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
                fetch('/get/' + e.feature.f.geoid)
                    .then(res => res.json())
                    .then(data => {
                        const container = document.getElementById('popup');
                        const inner = document.querySelector('.content');
                        const content = `
                            <ul>
                                <li><span class="title">Census Tract:</span> ${e.feature.f.geoid}</li>
                                <li><span class="title">Borough Name:</span> ${data.Borough}</li>
                                <li><span class="title">Total Pop:</span> ${data.TotalPop}</li>
                                <li><span class="title">${selectedField}:</span> ${data[selectedField]}</li>
                            </ul>`; 
                        inner.innerHTML = content;
                        container.className = 'show';
                    })
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