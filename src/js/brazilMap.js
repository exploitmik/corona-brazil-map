import timelineAnimation from './animationToast.js';
import { statesInfo } from '../db/statesInfo.js';
import { getDataInfo, getSecondInfo } from '../db/getDataInfo.js';

export default function brazilMap(){

	let dataApi;
	Promise.all([
			getDataInfo(),
			getSecondInfo(),
	]).then( response => {

		const [ responseFirst, responseSecond ] = response;
		dataApi = { ...responseFirst['data'], ...responseSecond['data'] };
		updateInitialInfos(dataApi);
		document.dispatchEvent(
			new CustomEvent("loadingfinished")
		);

	});

	let toastElement = document.querySelector('.toast');
	let stateName = document.querySelector('.toast__title');
	// let countCities = document.querySelector('.toast__cities');
	let totalConfirmedElement = document.querySelector('.toast__confirmed');
	// let totalDeathElement = document.querySelector('.toast__death');
	// let totalSuspectsElement = document.querySelector('.toast__suspects');

	const width = document.documentElement.clientWidth,
	    	height = document.documentElement.clientHeight;
	    
	let centered, strokeWidth = 1;

	const svg = d3
		.select('#mapBrazil')
		.attr("width", width)
		.attr("height", height);

	const g = svg.append("g");
	  
	let projection = d3.geo.mercator()
	  .scale((width/2)*1.2)
	  .center([-54, -15])
	  .translate([width / 2, height / 2]);

	let path = d3.geo.path()
	  .projection(projection);

	d3_queue.queue()
		.defer(d3.json, "https://raw.githubusercontent.com/exploitmik/corona-brazil-map/master/src/db/br-states.json")
		.await(ready);

	function ready(error, shp) {
	  if (error) throw error;

	  let states = topojson.feature(shp, shp.objects.estados);
	  let states_contour = topojson.mesh(shp, shp.objects.estados);

	  g.selectAll("path")
		  .data(states.features)
			.enter()
		  .append("path")
		  .attr("class", "state")
		  .attr("class", detectRegion)
		  .attr("d", path)
		  .on("click", clicked);

	  g.append("path")
	    .datum(states_contour)
	    .attr("d", path)
	    .attr("class", "state__contour")
	    .style("stroke-width", strokeWidth);
	}

	function updateScale(scale){
		projection.scale(scale);
		path = path.projection(projection);
		g.selectAll("path").attr("d", path);
	}

	function clicked(dataElement) {
		const element = this;
	  let x, y, zoom;

	  if (dataElement && centered !== dataElement) {
			changeInfos(dataElement.id, element);
	    [x, y] = path.centroid(dataElement);
	    zoom = 2.5;
	    centered = dataElement;
	  } else {
	  	changeInfos(null, element);
	    x = width / 2; y = height / 2;
	    zoom = 1;
	    centered = null;
	  }

	  g.selectAll("path")
	  		.style("stroke-width", (centered ? .8:strokeWidth))
	      .classed("active", centered && function(d) { return d === centered; })

	  g.transition()
	      .duration(800)
	      .attr("transform", `
	      	translate(${width/2}, ${height/2})
	      	scale(${zoom})
	      	translate(${-x},${-y})`);
	}

	async function changeInfos(identifier, element){

		if ( identifier == null) {
			timelineAnimation.timeScale(10);
			timelineAnimation.reverse();
			resetPropertiesText([
				stateName,
				// countCities,
				totalConfirmedElement,
				// totalSuspectsElement,
				// totalDeathElement,
			]);
			return;
		}

		changeToastColor(element);

		// const uid = statesInfo[identifier].id;
		const displayInfo = dataApi.values.find( state => state.state == identifier);

		timelineAnimation.timeScale(1);
		timelineAnimation.restart();

		stateName.textContent = statesInfo[identifier].name;
		// countCities.textContent = statesInfo[identifier].cities;
		totalConfirmedElement.textContent = displayInfo.cases;
		// totalSuspectsElement.textContent = displayInfo.suspects;
		// totalDeathElement.textContent = displayInfo.deaths;
	}

	function resetPropertiesText(properties){
		properties.forEach( prop => prop.textContent = '');
	}

	if ( window.matchMedia('(max-width: 1024px)').matches) {
		updateScale(width*1.3);
	}

	function detectRegion(){
		let currentElement = d3.select(this);
		let currentId = currentElement.data()[0].id;
		let regionName = statesInfo[currentId].region.toLowerCase();
		return `${currentElement.attr('class')} ${regionName}`;
	}

	function changeToastColor(toast){
		const allStylesElement = window.getComputedStyle(toast);
		const regionColor = allStylesElement.getPropertyValue('--color');
		toastElement.style.setProperty('--toastColor', regionColor);
	}

	function changeCaseValues({ values }){
		const sumValues = values.reduce((a, b) => {
      const cases = +a.cases + +b.cases;
      // const deaths = a.deaths + b.deaths;
      // const suspects = a.suspects + b.suspects;
      return { cases };
    });

    // console.log(sumValues.cases);

		// document.querySelector('.confirmed').textContent = sumValues.cases.toLocaleString();
		document.querySelector('.confirmed')
			.textContent = dataApi.confirmed.value.toLocaleString();
		// document.querySelector('.suspects').textContent = sumValues.suspects.toLocaleString();
		document.querySelector('.death')
			.textContent = dataApi.deaths.value.toLocaleString();
	}

	function changeLastAtt({lastUpdate}){
		const date = new Date(lastUpdate);
		const lastAtt = document.querySelector('.footer__last-att');
		lastAtt.textContent += `${date.toLocaleDateString()} às ${date.toLocaleTimeString()}`;
	}

	function updateInitialInfos(data){
		changeLastAtt(data);
		changeCaseValues(data);
	}

}