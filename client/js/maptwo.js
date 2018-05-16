const hospitals = (function() {
    // const CIRCLE = ['#feebe2','#fbb4b9','#f768a1','#c51b8a','#7a0177'];
    const centers =[
        'latitude',
        'longitude'

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
        'patients'
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

    const attachEvents = map => {
        document.querySelectorAll('.severity').forEach(el => {
            el.addEventListener('click', e => {
                selectedField = e.target.value;
                fetch('/hospitals/severity')
                    .then(res => res.json())
                    .then(data => {
                        map.data.setStyle(feature => {
                            const facid = data.find(item => item.fac_id === feature.f.id);
                            return {
                                icon: getCircle( facid ? facid[e.target.value] : 0)

                            }
                        });
                    });
            });
        });
    };


    const getCircle = (val) => {
        return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .2,
        scale: Math.pow(2, val)/2,
        strokeColor: 'white',
        strokeWeight: .5
        }; 
    }

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

            map.data.addGeoJson(geoJson);

            map.data.setStyle(feature => {
                return {
                    fillColor: '#ffffff',
                    fillOpacity: 0,
                    strokeWeight: .5,
                    strokeColor: '#ccc',
                }
            });

            attachEvents(map);

            // map.data.addListener('mouseover', function(e) {
            //     fetch('/get/' + e.feature.f.geoid)
            //         .then(res => res.json())
            //         .then(data => {
            //             const container = document.getElementById('popup');
            //             const inner = document.querySelector('.content');
            //             const content = `
            //                 <ul>
            //                     <li><span class="title">Census Tract:</span> ${e.feature.f.geoid}</li>
            //                     <li><span class="title">Borough Name:</span> ${data.Borough}</li>
            //                     <li><span class="title">Total Pop:</span> ${data.TotalPop}</li>
            //                     <li><span class="title">${selectedField}:</span> ${data[selectedField]}</li>
            //                 </ul>`; 
            //             inner.innerHTML = content;
            //             container.className = 'show';
            //         })
            // });
            
            // map.data.addListener('mouseout', function(e) {
            //     const container = document.getElementById('popup');
            //     container.className = 'hide';
            // });

            // attachEvents(map);
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

//     const attachEvents = map => {
//             document.querySelectorAll('.severity').forEach(el => {
//                 el.addEventListener('click', e => {
//                     selectedField = e.target.value;
//                     fetch('/hospitals/severity')
//                         .then(res => res.json())
//                         .then(data => {
//                             map.data.setStyle(feature => {
//                                 var magnitude = data[selectedField];
//                                 var c1 = {lat: data.latitude, lng: data.longitude},
//                                 return {
//                                   icon: getCircle(magnitude,c1),
        
//                                 };
//                               });
//                         });
//                 });
//             });
//             };

//     const getCircle = (magnitude,c1) =>{
//         return {
//           path: google.maps.SymbolPath.CIRCLE,
//           fillColor: 'red',
//           fillOpacity: .2,
//           scale: Math.pow(2, magnitude) / 2,
//           strokeColor: 'white',
//           center: c1,
//           strokeWeight: .5
//         };
//       }



//     const buildMap = _ => {
//         let map;
//         const initMap = () => {
//             map = new google.maps.Map(document.getElementById('map'), {
//                 zoom: 10,
//                 center: {lat: 40.7128, lng: -74.0060},
//                 disableDefaultUI: true,
//                 styles:[
//                     {
//                         "featureType": "all",
//                         "elementType": "labels.text.fill",
//                         "stylers": [
//                             {
//                                 "saturation": 36
//                             },
//                             {
//                                 "color": "#000000"
//                             },
//                             {
//                                 "lightness": 40
//                             }
//                         ]
//                     },
//                     {
//                         "featureType": "all",
//                         "elementType": "labels.text.stroke",
//                         "stylers": [
//                             {
//                                 "visibility": "on"
//                             },
//                             {
//                                 "color": "#000000"
//                             },
//                             {
//                                 "lightness": 16
//                             }
//                         ]
//                     },
//                     {
//                         "featureType": "all",
//                         "elementType": "labels.icon",
//                         "stylers": [
//                             {
//                                 "visibility": "off"
//                             }
//                         ]
//                     },
//                     {
//                         "featureType": "administrative",
//                         "elementType": "geometry.fill",
//                         "stylers": [
//                             {
//                                 "color": "#000000"
//                             },
//                             {
//                                 "lightness": 20
//                             }
//                         ]
//                     },
//                     {
//                         "featureType": "administrative",
//                         "elementType": "geometry.stroke",
//                         "stylers": [
//                             {
//                                 "color": "#000000"
//                             },
//                             {
//                                 "lightness": 17
//                             },
//                             {
//                                 "weight": 1.2
//                             }
//                         ]
//                     },
//                     {
//                         "featureType": "landscape",
//                         "elementType": "geometry",
//                         "stylers": [
//                             {
//                                 "color": "#000000"
//                             },
//                             {
//                                 "lightness": 30
//                             }
//                         ]
//                     },
//                     {
//                         "featureType": "poi",
//                         "elementType": "geometry",
//                         "stylers": [
//                             {
//                                 "color": "#000000"
//                             },
//                             {
//                                 "lightness": 30
//                             }
//                         ]
//                     },
//                     {
//                         "featureType": "road.highway",
//                         "elementType": "geometry.fill",
//                         "stylers": [
//                             {
//                                 "color": "#000000"
//                             },
//                             {
//                                 "lightness": 17
//                             }
//                         ]
//                     },
//                     {
//                         "featureType": "road.highway",
//                         "elementType": "geometry.stroke",
//                         "stylers": [
//                             {
//                                 "color": "#000000"
//                             },
//                             {
//                                 "lightness": 29
//                             },
//                             {
//                                 "weight": 0.2
//                             }
//                         ]
//                     },
//                     {
//                         "featureType": "road.arterial",
//                         "elementType": "geometry",
//                         "stylers": [
//                             {
//                                 "color": "#000000"
//                             },
//                             {
//                                 "lightness": 18
//                             }
//                         ]
//                     },
//                     {
//                         "featureType": "road.local",
//                         "elementType": "geometry",
//                         "stylers": [
//                             {
//                                 "color": "#000000"
//                             },
//                             {
//                                 "lightness": 16
//                             }
//                         ]
//                     },
//                     {
//                         "featureType": "transit",
//                         "elementType": "geometry",
//                         "stylers": [
//                             {
//                                 "color": "#000000"
//                             },
//                             {
//                                 "lightness": 19
//                             }
//                         ]
//                     },
//                     {
//                         "featureType": "water",
//                         "elementType": "geometry",
//                         "stylers": [
//                             {
//                                 "color": "#000000"
//                             },
//                             {
//                                 "lightness": 17
//                             }
//                         ]
//                     }
//                 ]           
//             });
//             map.data.addListener('mouseout', function(e) {
//                 const container = document.getElementById('popup');
//                 container.className = 'hide';
//             });

//             attachEvents(map);
//         };


//         window.initMap = initMap;
//     }

//     const init = _ => {
//         buildMap();
//     }

//     return {
//         init,
//     }
// })();

// hospitals.init();