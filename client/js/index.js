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
                        .then(data => console.log(data.map(prop(value))));
    
            } else if (income.indexOf(value) !== -1){
                fetch('/census/income')
                    .then(res => res.json())
                    .then(data => console.log(data.map(prop(value))));

            } else if (unemployment.indexOf(value) !== -1){
                fetch('/census/unemployment')
                    .then(res => res.json())
                    .then(data => console.log(data.map(prop(value))));
            }

        });
    };

    const getColors = (type, val) => {
        if (type === 'rate') {
            return COLORS[Math.round(val / 20)]
        } else if (type === 'pop') {
            return COLORS[Math.round(val / 2500)]
        } else {
            return COLORS[Math.round(val / 3000)]
        }
    }

    const buildMap = _ => {
        let map;
        const initMap = () => {
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: {lat: 40.7128, lng: -74.0060},
                styles:[{"stylers": [{"saturation": -75},{"lightness": 0}]}]           
            });

            map.data.addGeoJson(geoJson);

            map.data.setStyle(feature => {
                return {
                    fillColor: '#ffffff',
                    fillOpacity: 0,
                    strokeWeight: .5,
                    strokeColor: '#444',
                }
            });
            map.data.addListener('mouseover', function(e) {
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