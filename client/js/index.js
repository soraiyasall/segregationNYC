requirejs(['../assets/nyc.js'], function(util) {
    const census = (function() {
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
    
        const attachEvents = _ => {
            document.getElementById('filterField').addEventListener('change', e => {
                const value = e.target.options[e.target.selectedIndex].value;
        
                if(population.indexOf(value) !== -1) {
                        fetch('/census/population')
                            .then(res => res.json())
                            .then(data => console.log(data.map(prop(value))));
        
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
    
        const buildMap = _ => {
            let map;
            const initMap = () => {
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 8,
                    center: {lat: 40.3, lng: -73}
                });
                
    
                map.data.addGeoJson(geoJson);
    
                map.data.setStyle({
                    fillColor: 'green',
                    strokeWeight: 1
                });
            };
        }
    
        const init = _ => {
            buildMap();
    
            attachEvents();
        }
    
        return {
            init,
        }
    })();
    
    census.init();
});
