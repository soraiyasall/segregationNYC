const hospitals = (function() {
	const COLORS = ['#28B463','#fa0177', '#c51bfa','#5DADE2','#E67E22','#c51b8a','#7a0177','#2C3E50','#fbb409','#0768a1'];
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
        'per_moderateseverity',
		'per_minorseverity'
		
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

	const crossRef = item => {
		const id = item.fac_id;
		return geoJson2.features.find(t => t.properties.id === id);
	};

	let circles = [];

	const plotCircles = (entry, map) => (variable, i) => {
		let circle = new google.maps.Circle({
			fillColor: COLORS[i],
			fillOpacity: .5,
			radius: entry[variable] *30,
			strokeColor: 'black',
			strokeWeight: .2,
			map: map,
			center: {lat: entry.latitude, lng: entry.longitude},
		});
		
		const hospital = geoJson2.features.find(item => item.properties.id === entry.fac_id);
		circle.addListener('mouseover', putValueInLegend.bind(null, entry,hospital.properties.facility_name));
		circles.push(circle)
	};

	const putValueInLegend = (entry, hName) => {
		Object.keys(entry).filter(k => k !== 'latitude' && k !== 'longitude' && k !== 'fac_id').forEach(variable => {
            const container = document.querySelector('.legend2 .' + variable);
			container.innerHTML = entry[variable].toFixed(2);
		});
		const container = document.getElementById('popup6');
		const inner = document.querySelector('.content6');
		const content6 = `
				<p><span class="title">${hName}</span> </p>`; 
		inner.innerHTML = content6;
		container.className = 'show';
	};

	const drawLegend = (x, names) => {
		const container = document.querySelector('.legend');

		const circle = (color, text) => {
			return '<li class="legend2">' + text + '<span style="background-color: ' + color + '"></span><span class="' + text + '"></span></li>'
		}

		container.innerHTML = '<ul>' + Array(x).fill().map((_, i) => circle(COLORS[i], names[i])).join('') + '</ul>'
	};


	const attachEvents = map => {
			geoJson2.features.forEach(hos => {
				let circle = new google.maps.Circle({                                 
					fillColor: '#536ade',
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
                    const tract = data.filter(crossRef);
                    drawLegend(Object.keys(tract[0]).length - 3, severity);
					console.log(tract)
					tract.forEach(entry => {
						severity.forEach(plotCircles(entry, map));
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
                    const tract = data.filter(crossRef);
                    
                    drawLegend(Object.keys(tract[0]).length - 3, age);

					tract.forEach(entry => {
						age.forEach(plotCircles(entry, map));
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
					const tract = data.filter(crossRef);

					drawLegend(Object.keys(tract[0]).length - 3, race);

					tract.forEach(entry => {
						race.forEach(plotCircles(entry, map));
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
                    const tract = data.filter(crossRef);
                    drawLegend(Object.keys(tract[0]).length - 3, ethnicity);

					tract.forEach(entry => {
						ethnicity.forEach(plotCircles(entry, map));
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
                    const tract = data.filter(crossRef);
                    drawLegend(Object.keys(tract[0]).length - 3, payment);

					tract.forEach(entry => {
						payment.forEach(plotCircles(entry, map));
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
                    const tract = data.filter(crossRef);
                    drawLegend(Object.keys(tract[0]).length - 3, gender);
					tract.forEach(entry => {
						gender.forEach(plotCircles(entry, map));
					});
				});
		});
		document.querySelector('.patients').addEventListener('click', e => {
			if (circles.length > 0)
				circles.forEach(c => c.setMap(null));

			selectedField = e.target.value;
			fetch('/hospitals/patients')
				.then(res => res.json())
				.then(data => {
                    const tract = data.filter(crossRef);

                    drawLegend(Object.keys(tract[0]).length - 3, patients);

					tract.forEach(entry => {
						patients.forEach((variable, i) => {
							let circle = new google.maps.Circle({
								fillColor: COLORS[i],
								fillOpacity: .5,
								radius: entry[variable]/8,
								strokeColor: 'black',
								strokeWeight: .2,
								map: map,
								center: {lat: entry.latitude, lng: entry.longitude},
							});
							const hospital = geoJson2.features.find(item => item.properties.id === entry.fac_id);
							circle.addListener('mouseover', putValueInLegend.bind(null, entry,hospital.properties.facility_name));
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
                    const tract = data.filter(crossRef);
                    drawLegend(Object.keys(tract[0]).length - 3, charges);
					tract.forEach(entry => {
						charges.forEach((variable, i) => {
							let circle = new google.maps.Circle({
								fillColor: COLORS[i],
								fillOpacity: .5,
								radius: entry[variable]/40,
								strokeColor: 'black',
								strokeWeight: .2,
								map: map,
								center: {lat: entry.latitude, lng: entry.longitude},
							});
							const hospital = geoJson2.features.find(item => item.properties.id === entry.fac_id);
							circle.addListener('mouseover', putValueInLegend.bind(null, entry,hospital.properties.facility_name));
							circles.push(circle);

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

hospitals.init();


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
		width: '50%',
		height: '250',
		chartArea:{
			width: '50%',
			height: '80%',
		},
        bar: {groupWidth: "40%"},
        colors: ['#ff4172'],         
        backgroundColor: {'fill':'transparent'},
        tooltip: {title:" ",
          textStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: '#323545'}},
        legend: {
        position:'none'},
        vAxis: {textStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: 'white'}},
        hAxis: {textStyle: {fontName:'Raleway, sans-serif', fontSize: 10, color: 'white'}},


      };

      var options2 = {
        width: '50%',
		height: '250',
		chartArea:{
			width: '50%',
			height: '80%',
		},
        colors: ['#ff4172'],         
        backgroundColor: {'fill':'transparent'},
        tooltip: {title:" ",
          textStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: '#323545'}},
        legend: {
        position:'none'},
        bar: {groupWidth: "75%"},
        vAxis: {textStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: 'white'}},
        hAxis: {textStyle: {fontName:'Raleway, sans-serif', fontSize: 10, color: 'white'} },


        };

      var chart = new google.visualization.BarChart(document.getElementById("barchartprice"));
      chart.draw(data, options);

      var chart = new google.visualization.BarChart(document.getElementById('barchartinsurance'));
      chart.draw(data2, options2);
    }
