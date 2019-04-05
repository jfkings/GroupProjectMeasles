// global data
var deaths = null;
var coverage = null;
var children = null;
var disagrees = null;
var coverageYear = null;
var coverageSortby = null;

// load data

function load_deaths(after_load) {
    Plotly.d3.csv('/table/deaths', function(data) {
        console.log('deaths loaded', data);
        deaths = data;  
        after_load();
    } );
}

function load_coverage(after_load) {
    Plotly.d3.csv('/table/coverage', function(data) {
        console.log('coverage loaded', data);
        coverage = data;  
        after_load();
    } );
}

function load_children(after_load) {
    Plotly.d3.csv('/table/children', function(data) {
        console.log('children loaded', data);
        children = data;  
        after_load();
    } );
}

function load_disagrees(after_load) {
    Plotly.d3.csv('/table/disagrees', function(data) {
        console.log('disagrees loaded', data);
        disagrees = data;  
        after_load();
    } );
}

// Plot Disagrees

function plotDisagrees(sortby) {

    // make selected sort for button
    sortby = sortby || "alpha"; 
    console.log('sortby', sortby);
    switch (sortby) {
        case "alpha":
            disagrees = _.sortBy(disagrees, item => item.Entity);
            break;
        case "ascend":
            disagrees = _.sortBy(disagrees, item => +item.Pct);
            break;
        case "descend":
            disagrees = _.sortBy(disagrees, item => -item.Pct);
            break;
        default:
            console.log('unknown sortby', sortby);
    }
    console.log('sorted disagrees', disagrees);

    // send data to Plotly.js format
    var entity = disagrees.map(item => item.Entity);
    var percent = disagrees.map(item => item.Pct);
    
    // make plot points
    var plotData = [
        { x: entity, y: percent, name: 'Disagrees'},
    ];

    // set target element
    var target = document.getElementById('disagrees');

    // find space remaining for chart
    var w = window.innerWidth - 30;
    var h = window.innerHeight - target.offsetTop - 20;

    // set chart layout
    var layout = {
        autosize: false,
        width: w,
        height: h,
        title: { text:'% of Countries Populations That Believe Vaccines are Unsafe', font: { size: 18 } },
        xaxis: { title: { text: 'Country', font: { size: 13 } } },
        yaxis: { type: 'log',
                 title: { text: 'Percent That Disagrees', font: { size: 13 } },
                 
               },
        margin: { l: 70, r: 40, b: 120, t: 60, pad: 8 },
        font: { size: 8.5 }
    };

    // draw plot
    Plotly.newPlot(target, plotData, layout);
}

// Plot Coverage 

function plotCoverage(sortby) {
    
    // coverage for 2015
    var coverageForYear = _.filter(coverage, item => item.Code && +item.Year == 2015);
    console.log('coverageForYear', coverageForYear);

    // make selected sort for button
    sortby = sortby || "alpha"; // if not set, make alpha
    coverageSortby = sortby;
    switch (sortby) {
        case "alpha":
            coverageForYear = _.sortBy(coverageForYear, item => item.Entity);
            break;
        case "ascend":
            coverageForYear = _.sortBy(coverageForYear, item => +item.Vaccine_Pct);
            break;
        case "descend":
            coverageForYear = _.sortBy(coverageForYear, item => -item.Vaccine_Pct);
            break;
        default:
            console.log('unknown sortby', sortby);
    }

    // send data to Plotly.js format
    var entity = coverageForYear.map(item => item.Entity);
    prcntCovered = coverageForYear.map(item => +item.Vaccine_Pct);
    console.log('prcntCovered', prcntCovered);
    

    // make plot points
    var plotData = [
        { x: entity, y: prcntCovered, name: 'Percent Vaccinated' },
    ];

    // set target 
    var target = document.getElementById('coverage');

    // find space for chart
    var w = window.innerWidth - 30;
    var h = window.innerHeight - target.offsetTop - 20;

    // set chart layout
    var layout = {
        autosize: false,
        width: w,
        height: h,
        title: { text:'Coverage', font: { size: 18 } },
        xaxis: { title: { text: 'Countries', font: { size: 13 } } },
        yaxis: { title: { text: 'Percent Covered', font: { size: 13 } } },
        margin: { l: 70, r: 40, b: 120, t: 60, pad: 8 },
        font: { size: 8.5 }
    };

    Plotly.newPlot(target, plotData, layout);
}


function plotDeaths(sortby) {

    var deathsForYear = _.filter(deaths, item => item.Code && +item.Year == 2015);
    console.log('deathsForYear', deathsForYear);

    // make selected sort for button
    sortby = sortby || "alpha"; // if not set, make alpha
    console.log('sortby', sortby);
    switch (sortby) {
        case "alpha":
            deaths = _.sortBy(deathsForYear, item => item.Entity);
            break;
        case "ascend":
            deaths = _.sortBy(deathsForYear, item => +item.Measles_Number);
            break;
        case "descend":
            deaths = _.sortBy(deathsForYear, item => -item.Measles_Number);
            break;
        default:
            console.log('unknown sortby', sortby);
    }
    console.log('sorted deaths', deaths);

    // send data to Plotly.js format
    var entity = deathsForYear.map(item => item.Entity);
    var death = deathsForYear.map(item => item.Measles_Number);
    
    // set plot points
    var plotData = [{ x: entity, y: death, name: 'deaths'},
    ];

    // set target 
    var target = document.getElementById('deaths');

    // find space for chart
    var w = window.innerWidth - 30;
    var h = window.innerHeight - target.offsetTop - 20;

    // set chart layout
    var layout = {
        autosize: false,
        width: w,
        height: h,
        title: { text:'Deaths', font: { size: 18 } },
        xaxis: { title: { text: 'Country', font: { size: 13 } } },
        yaxis: { type: 'log',
                 title: { text: 'Deaths', font: { size: 13 } },
               },
        margin: { l: 70, r: 40, b: 120, t: 60, pad: 8 },
        font: { size: 8.5 }
    };

    Plotly.newPlot(target, plotData, layout);
}

