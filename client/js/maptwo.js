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
        geoJson2.features.forEach(hos => {
            let circle = new google.maps.Circle({                                 
                fillColor: '#f768a1',
                fillOpacity: 1,
                radius: 250,
                strokeColor: 'white',
                strokeWeight: .4,
                map: map,
                center: {lat : hos.properties.latitude, lng : hos.properties.longitude}
            });
        });

        document.querySelector('.severity').addEventListener('click', e => {
                if (circles.length > 0)
                    circles.forEach(c => c.setMap(null));

                selectedField = e.target.value;
                fetch('/hospitals/severity')
                    .then(res => res.json())
                    .then(data => {
                        const tract = data.filter(item => {
                            const id = item.fac_id;
                            return geoJson2.features.find(t => t.properties.id === id);
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
                            return geoJson2.features.find(t => t.properties.id === id);
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
                            return geoJson2.features.find(t => t.properties.id === id);
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
                            return geoJson2.features.find(t => t.properties.id === id);
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
                            return geoJson2.features.find(t => t.properties.id === id);
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
                            return geoJson2.features.find(t => t.properties.id === id);
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
                            return geoJson2.features.find(t => t.properties.id === id);
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

            map.data.addListener('mouseover', function(e) {
                console.log(e)
                fetch('/hospitals' + e.feature.f.geoid)
                    .then(res => res.json())
                    .then(data => {
                        const container = document.getElementById('popup4');
                        const inner = document.querySelector('.content4');
                        const content4 = `
                            <ul>
                                <li><span class="title">Census Tract:</span> ${e.feature.f.geoid}</li>
                                <li><span class="title">Borough Name:</span> ${data.Borough}</li>
                                <li><span class="title">Total Pop:</span> ${data.TotalPop}</li>
                                <li><span class="title">${selectedField}:</span> ${data[selectedField]}</li>
                            </ul>`; 
                        inner.innerHTML = content4;
                        container.className = 'show';        
                })
            });


            map.data.addListener('mouseout', function(e) {
                const container = document.getElementById('popup4');
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

hospitals.init();

// google.charts.load("current", {packages:["corechart"]});
//     google.charts.setOnLoadCallback(drawChart);
//     function drawChart() {
//       var data = google.visualization.arrayToDataTable([
//         ['Insurance', 'Percentage'],
//         ['Bluecross Blueshield', 7.49],
//         ['Department of Corrections', 0.13],
//         ['Federal State Local Va', 0.23],
//         ['Managed Care', 0.22],
//         ['Medicaid', 41.38],
//         ['Medicare',32.86 ],
//         ['Misc Payment', 0.89],
//         ['Private', 13.33],
//         ['Self Payment', 2.93 ],
//         ['Unknown Payment', 0.54 ]
//       ]);

//       var view = new google.visualization.DataView(data);

//       var options = {
//         width: 600,
//         height: 400,
//         chartArea: {
//             top: 55,
//             height: '40%' 
//          },
//         bar: {groupWidth: "95%"},
//         colors: ['#ff4172',],         backgroundColor: {'fill':'transparent'},
//         tooltip: {title:" ",
//           textStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: '#323545'}},
//         legend: {
//         position:'none'},
//         vAxis: {textStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: '#323545'}},

//       };
//       var chart = new google.visualization.BarChart(document.getElementById("barchartinsurance"));
//       chart.draw(view, options);
//   }

  google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Hospital', 'Price'],
        ['Henry J. Carter Specialty Hospital', 288130.9323],
        ['NYU Hospital for Joint Diseases', 140579.6657],
        ['New York Presbyterian Hospital - Columbia Presbyterian Center', 128631.2669],
        ['NYU Hospitals Center', 98887.42585],
        ['New York Presbyterian Hospital - New York Weill Cornell Center', 92935.69044],
        ['Memorial Hospital for Cancer and Allied Diseases',86685.84683 ],
        ['Hospital for Special Surgery',76085.38292],
        ['Montefiore Medical Center - Henry & Lucy Moses Div', 75090.31519],
        ['Montefiore Med Center - Jack D Weiler Hosp of A Einstein College Div', 73774.33111],
        ['Mount Sinai Hospital', 68359.58467]
      ]);

      var data2 = google.visualization.arrayToDataTable([
        ['Insurance', 'Percentage'],
        ['Bluecross Blueshield', 7.49],
        ['Department of Corrections', 0.13],
        ['Federal State Local Va', 0.23],
        ['Managed Care', 0.22],
        ['Medicaid', 41.38],
        ['Medicare',32.86 ],
        ['Misc Payment', 0.89],
        ['Private', 13.33],
        ['Self Payment', 2.93 ],
        ['Unknown Payment', 0.54 ]
    ]);

      var options = {
        width: 500,
        height: 400,
        chartArea: {
            top: 75,
            height: '40%' 
         },
        bar: {groupWidth: "40%"},
        colors: ['#ff4172'],         
        backgroundColor: {'fill':'transparent'},
        tooltip: {title:" ",
          textStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: '#323545'}},
        legend: {
        position:'none'},
        vAxis: {textStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: '#323545'}},

      };

      var options2 = {
        width: 500,
        height: 400,
        chartArea: {
            top: 75,
            height: '40%' 
         },
        colors: ['#ff4172'],         
        backgroundColor: {'fill':'transparent'},
        tooltip: {title:" ",
          textStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: '#323545'}},
        legend: {
        position:'none'},
        bar: {groupWidth: "75%"},
        vAxis: {textStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: '#323545'}},

        };

      var chart = new google.visualization.BarChart(document.getElementById("barchartprice"));
      chart.draw(data, options);

      var chart = new google.visualization.BarChart(document.getElementById('barchartinsurance'));
      chart.draw(data2, options2);
    }