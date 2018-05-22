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
                    changeLegend(selectedField);
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
                    changeLegend(selectedField);
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
                    changeLegend(selectedField);
                    fetch('/census/income')
                        .then(res => res.json())
                        .then(data => {
                            map.data.setStyle(feature => {
                                console.log(feature)
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
                    changeLegend(selectedField);
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
    const getBreaks = (type)=>{
        if (type === 'Men' || type === 'Women' || type === 'Asian' ||type === 'White' || type ==='Black' || type === 'Hispanic'){
            return  [20,40,60,80,100]
        } else if (type === 'Income'){
            return ['2M','4M','6M','8M','10M']
        }else if (type === 'Unemployment') {
            return ['2M','4M','6M','8M','10M']
        }else {
            return[]
        }
    }            
    const changeLegend = (selectedField)=>{
        document.querySelector('.legend_content').innerHTML = `<span class="text">0</span>
        <ul>
            <li><span class="color lightest"></span><span class="text">${getBreaks(selectedField)[0]}</span></li><!--
            --><li><span class="color light"></span><span class="text">${getBreaks(selectedField)[1]}</span></li><!--
            --><li><span class="color medium"></span><span class="text">${getBreaks(selectedField)[2]}</span></li><!--
            --><li><span class="color dark"></span><span class="text">${getBreaks(selectedField)[3]}</span></li><!--
            --><li><span class="color darkest"></span><span class="text">${getBreaks(selectedField)[4]}</span></li>
        </ul>`;
    }
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
                disableDefaultUI: true,
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


             map.data.addListener('mouseout', function(e) {
                const container = document.getElementById('popup3');
                container.className = 'hide';

            });
            geoJson2.features.forEach(hos => {
                let circle = new google.maps.Circle({                                 
                    fillColor: '#536ade',
                    fillOpacity: .8,
                    radius: 400,
                    strokeColor: 'white',
                    strokeWeight: .4,
                    zIndex: 10.0,
                    map: map,
                    center: {lat : hos.properties.latitude, lng : hos.properties.longitude}
                });
                circle.addListener('mouseover', e => {
                    const container = document.getElementById('popup3');
                    const inner = document.querySelector('.content1');
                    const content1 = `
                        <ul>
                            <li><span class="title">Hospital name:</span> ${hos.properties.facility_name} </li>
                            </ul>`; 
                    inner.innerHTML = content1;
                    container.className = 'show';     
                 });
    
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

	// Load google charts
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    
    // Draw the chart and set the chart values
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
      ['Race', 'PopTotal'],
      ['Black', 1875278],
      ['Native', 15481],
      ['Asian', 1126856],
      ['White', 2724805],
      ['Hispanic', 2418646]
    ], false);
    
      // Optional; add a title and set the width and height of the chart
      var options = {
          colors: ['#7a0177','#fbb409','#fbb4b9','#c51bfa','#fa0177'], 
          'chartArea': {'width': '100%', 'height': '80%'},
          backgroundColor: {'fill':'transparent'},
          tooltip: {title:" ",
            textStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: '#323545'}},
          legend: {
          textStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: 'white'}},
          pieSliceTextStyle:{fontName:'Raleway, sans-serif', fontSize: 12, color:'white'}

        };
    
      // Display the chart inside the <div> element with id="piechart"
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);
    };

