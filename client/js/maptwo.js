const hospitals = (function() {
    const COLORS = ['#feebe2','#fbb4b9','#f768a1','#c51b8a','#7a0177','#feebe2','#fbb4b9','#f768a1','#c51b8a','#7a0177'];
    const centers =[
        'latitude',
        'longitude'
    ];
    const patients = [
        'patients'
    ];
    const charges = [
        'total_charges'
    ];

    const age = [
        'per_0_17',
        'per_18_29',
        'per_30_49',
        'per_50_69',
        'per_70'
    ];
    const severity = [
        'per_extremeseverity',
        'per_majorseverity',
        'per_minorseverity',
        'per_moderateseverity'
    ];

    const race = [
        'per_black',
        'per_multiracial',
        'per_otherrace',
        'per_white'
    ];

    const payment = [
        'per_bluecross_blueshield',
        'per_depofcorrections',
        'federal_state_local_va',
        'per_managedcare',
        'per_medicaid',
        'per_medicare',
        'per_miscpayment',
        'per_private',
        'per_selfpayment',
        'per_unknownpayment'
    ];

    const gender = [
        'per_male',
        'per_females',
    ];

    const ethnicity = [
        'per_hispanic',
        'per_nonHispanic',
        'per_multi_ethnic',
        'per_unknown'
    ];

    const prop = s => d => {
        return d[s];
    };

    let selectedField;

    let circles = [];

    const attachEvents = map => {
        document.querySelector('.severity').addEventListener('click', e => {
                if (circles.length > 0)
                    circles.forEach(c => c.setMap(null));

                selectedField = e.target.value;
                fetch('/hospitals/severity')
                    .then(res => res.json())
                    .then(data => {
                        const tract = data.filter(item => {
                            const id = item.fac_id;
                            return geoJson.features.find(t => t.properties.id === id);
                        });
                        tract.forEach(entry => {
                            severity.forEach((variable, i) => {
                                let circle = new google.maps.Circle({
                                    fillColor: COLORS[i],
                                    fillOpacity: .5,
                                    radius: entry[variable] *30,
                                    strokeColor: 'white',
                                    strokeWeight: .1,
                                    map: map,
                                    center: {lat: entry.latitude, lng: entry.longitude},
                                });
                                circles.push(circle)
                            });
                            
                        });
                    });
            });
        document.querySelector('.age').addEventListener('click', e => {
                if (circles.length > 0)
                    circles.forEach(c => c.setMap(null));

                selectedField = e.target.value;
                fetch('/hospitals/age')
                    .then(res => res.json())
                    .then(data => {
                        const tract = data.filter(item => {
                            const id = item.fac_id;
                            return geoJson.features.find(t => t.properties.id === id);
                        });
                        tract.forEach(entry => {
                            age.forEach((variable, i)=> {
                                let circle = new google.maps.Circle({
                                    fillColor: COLORS[i],
                                    fillOpacity: .5,
                                    radius: entry[variable] * 30,
                                    strokeColor: 'white',
                                    strokeWeight: .1,
                                    map: map,
                                    center: {lat: entry.latitude, lng: entry.longitude},
                                });
                                circles.push(circle)
                            });
                        });
                    });
            });
            document.querySelector('.race').addEventListener('click', e => {
                if (circles.length > 0)
                    circles.forEach(c => c.setMap(null));

                selectedField = e.target.value;
                fetch('/hospitals/race')
                    .then(res => res.json())
                    .then(data => {
                        const tract = data.filter(item => {
                            const id = item.fac_id;
                            return geoJson.features.find(t => t.properties.id === id);
                        });
                        tract.forEach(entry => {
                            race.forEach((variable, i) => {
                                let circle = new google.maps.Circle({
                                    fillColor: COLORS[i],
                                    fillOpacity: .5,
                                    radius: entry[variable] *30,
                                    strokeColor: 'white',
                                    strokeWeight: .1,
                                    map: map,
                                    center: {lat: entry.latitude, lng: entry.longitude},
                                });
                                circles.push(circle)
                            });
                        });
                    });
            });
            document.querySelector('.ethnicity').addEventListener('click', e => {
                if (circles.length > 0)
                    circles.forEach(c => c.setMap(null));

                selectedField = e.target.value;
                fetch('/hospitals/ethnicity')
                    .then(res => res.json())
                    .then(data => {
                        const tract = data.filter(item => {
                            const id = item.fac_id;
                            return geoJson.features.find(t => t.properties.id === id);
                        });
                        tract.forEach(entry => {
                            ethnicity.forEach((variable, i) => {
                                let circle = new google.maps.Circle({
                                    fillColor: COLORS[i],
                                    fillOpacity: .5,
                                    radius: entry[variable] *30,
                                    strokeColor: 'white',
                                    strokeWeight: .1,
                                    map: map,
                                    center: {lat: entry.latitude, lng: entry.longitude},
                                });
                                circles.push(circle)
                            });
                        });
                    });
            });
            document.querySelector('.payment').addEventListener('click', e => {
                if (circles.length > 0)
                    circles.forEach(c => c.setMap(null));

                selectedField = e.target.value;
                fetch('/hospitals/payment')
                    .then(res => res.json())
                    .then(data => {
                        const tract = data.filter(item => {
                            const id = item.fac_id;
                            return geoJson.features.find(t => t.properties.id === id);
                        });
                        tract.forEach(entry => {
                            payment.forEach((variable, i) => {
                                let circle = new google.maps.Circle({
                                    fillColor: COLORS[i],
                                    fillOpacity: .5,
                                    radius: entry[variable] *30,
                                    strokeColor: 'white',
                                    strokeWeight: .1,
                                    map: map,
                                    center: {lat: entry.latitude, lng: entry.longitude},
                                });
                                circles.push(circle)
                            });
                        });
                    });
            });
            document.querySelector('.gender').addEventListener('click', e => {
                if (circles.length > 0)
                    circles.forEach(c => c.setMap(null));

                selectedField = e.target.value;
                fetch('/hospitals/gender')
                    .then(res => res.json())
                    .then(data => {
                        const tract = data.filter(item => {
                            const id = item.fac_id;
                            return geoJson.features.find(t => t.properties.id === id);
                        });
                        tract.forEach(entry => {
                            gender.forEach((variable, i) => {
                                let circle = new google.maps.Circle({
                                    fillColor: COLORS[i],
                                    fillOpacity: .5,
                                    radius: entry[variable]*30,
                                    strokeColor: 'white',
                                    strokeWeight: .1,
                                    map: map,
                                    center: {lat: entry.latitude, lng: entry.longitude},
                                });
                                circles.push(circle)
                            });
                        });
                    });
            });
            document.querySelector('.patients').addEventListener('click', e => {
                if (circles.length > 0)
                    circles.forEach(c => c.setMap(null));

                selectedField = e.target.value;
                fetch('/hospitals/gender')
                    .then(res => res.json())
                    .then(data => {
                        const tract = data.filter(item => {
                            const id = item.fac_id;
                            return geoJson.features.find(t => t.properties.id === id);
                        });
                        tract.forEach(entry => {
                            patients.forEach((variable, i) => {
                                let circle = new google.maps.Circle({
                                    fillColor: COLORS[i],
                                    fillOpacity: .5,
                                    radius: entry[variable]/8,
                                    strokeColor: 'white',
                                    strokeWeight: .1,
                                    map: map,
                                    center: {lat: entry.latitude, lng: entry.longitude},
                                });
                                circles.push(circle)
                            });
                        });
                    });
            });
            document.querySelector('.charges').addEventListener('click', e => {
                if (circles.length > 0)
                    circles.forEach(c => c.setMap(null));
                    
                selectedField = e.target.value;
                fetch('/hospitals/charges')
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(entry => {
                            charges.forEach((variable, i) => {
                                let circle = new google.maps.Circle({
                                    fillColor: COLORS[i],
                                    fillOpacity: .5,
                                    radius: entry[variable]/20,
                                    strokeColor: 'white',
                                    strokeWeight: .1,
                                    map: map,
                                    center: {lat: entry.latitude, lng: entry.longitude},
                                });
                                circles.push(circle)
                            });
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

hospitals.init();

