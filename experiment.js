// Track state of each chart - showing "abs" or "rel" for abundances
var chart_states = {
    abundance: "abs",
    growth: "0pct",
};

var experiment_chart = null;
var curr_data = "growth_0pct";

// Data to be used by individual charts
const growth_0pct = {
    t_max:24,
    abs:
     {green: [118, 146, 191, 216, 225, 233, 146, 129, 91, 48, 25, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     orange: [99, 198, 396, 588, 804, 1025, 1307, 1527, 1745, 1983, 2239, 2506, 2763, 3007, 3265, 3554, 3819, 4075, 4338, 4612, 4909, 5174, 5482, 5752, 6038]
},
    rel:
    {green: [0.5437788, 0.4244186, 0.3253833, 0.26865672, 0.21865889, 0.18521463, 0.10048176, 0.077898551, 0.04956427, 0.023633678, 0.011042403, 0.0015936255, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    orange:  [0.4562212, 0.5755814, 0.6746167, 0.73134328, 0.78134111, 0.81478537, 0.89951824, 0.92210145, 0.95043573, 0.97636632, 0.9889576, 0.99840637, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]}
};

const growth_10pct = {
    t_max:24,
    abs:
     {green: [118, 176, 214, 236, 251, 258, 165, 130, 86, 41, 21, 7, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     orange: [99, 232, 431, 693, 889, 1116, 1388, 1613, 1857, 2093, 2338, 2609, 2862, 3130, 3411, 3682, 3958, 4224, 4512, 4814, 5107, 5416, 5707, 6011, 6352]},
    rel:
    {green: [0.5437788, 0.43137255, 0.33178295, 0.2540366, 0.22017544, 0.18777293, 0.10624598, 0.07458405, 0.044261451, 0.019212746, 0.0089020772, 0.002675841, 0.00069832402, 0.00031938678, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    orange:  [0.4562212, 0.56862745, 0.66821705, 0.7459634, 0.77982456, 0.81222707, 0.89375402, 0.92541595, 0.95573855, 0.98078725, 0.99109792, 0.99732416, 0.99930168, 0.99968061, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]}
};


const growth_20pct = {
    t_max:24,
    abs:
     {green: [118, 191, 235, 262, 284, 291, 197, 164, 104, 58, 26, 7, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     orange: [99, 213, 411, 656, 850, 1084, 1351, 1576, 1809, 2055, 2301, 2578, 2842, 3120, 3386, 3670, 3932, 4203, 4481, 4755, 5039, 5350, 5650, 5943, 6262]
},
    rel:
    {green: [0.5437788, 0.47277228, 0.36377709, 0.28540305, 0.25044092, 0.21163636, 0.12726098, 0.094252874, 0.054364872, 0.027449124, 0.011173184, 0.0027079304, 0.00070323488, 0.00032041012, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    orange: [0.4562212, 0.52722772, 0.63622291, 0.71459695, 0.74955908, 0.78836364, 0.87273902, 0.90574713, 0.94563513, 0.97255088, 0.98882682, 0.99729207, 0.99929677, 0.99967959, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0] }
};


const growth_30pct = {
    t_max:24,
    abs:
     {green: [118, 196, 250, 288, 315, 328, 239, 209, 150, 92, 54, 25, 10, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     orange: [99, 199, 402, 611, 811, 1017, 1273, 1510, 1760, 1994, 2237, 2498, 2751, 3025, 3281, 3550, 3821, 4085, 4363, 4639, 4905, 5206, 5528, 5835, 6150]},
    rel:
    {green: [0.5437788, 0.49620253, 0.38343558, 0.32035595, 0.27975133, 0.24386617, 0.15806878, 0.12158232, 0.078534031, 0.044103547, 0.023570493, 0.0099088387, 0.0036218761, 0.00033046927, 0.00030469226, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    orange: [0.4562212, 0.50379747, 0.61656442, 0.67964405, 0.72024867, 0.75613383, 0.84193122, 0.87841768, 0.92146597, 0.95589645, 0.97642951, 0.99009116, 0.99637812, 0.99966953, 0.99969531, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1]}
};

const growth_40pct = {
    t_max:24,
    abs:
     {green: [118, 201, 270, 323, 362, 394, 317, 294, 223, 164, 112, 64, 32, 14, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
     orange: [99, 198, 395, 550, 769, 938, 1192, 1443, 1667, 1883, 2110, 2379, 2669, 2933, 3205, 3473, 3755, 4020, 4279, 4575, 4866, 5160, 5453, 5745, 6031]},
    rel:
    {green: [0.5437788, 0.5037594, 0.40601504, 0.36998855, 0.32007073, 0.2957958, 0.2100729, 0.16925734, 0.11798942, 0.080117245, 0.050405041, 0.026197298, 0.011847464, 0.0047505938, 0.0012464942, 0.00057553957, 0.00026624068, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    orange:  [0.4562212, 0.4962406, 0.59398496, 0.63001145, 0.67992927, 0.7042042, 0.7899271, 0.83074266, 0.88201058, 0.91988276, 0.94959496, 0.9738027, 0.98815254, 0.99524941, 0.99875351, 0.99942446, 0.99973376, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]}
};

const growth_50pct = {
    t_max:24,
    abs:
     {green: [118, 202, 293, 371, 432, 472, 417, 407, 342, 288, 257, 298, 361, 435, 514, 611, 744, 902, 1047, 1233, 1441, 1703, 1962, 2268, 2614],
     orange: [99, 198, 365, 458, 692, 842, 1049, 1287, 1509, 1720, 1913, 2070, 2234, 2389, 2551, 2704, 2824, 2927, 3025, 3098, 3142, 3176, 3202, 3213, 3223]},
    rel:
    {green: [0.5437788, 0.505, 0.44528875, 0.44752714, 0.38434164, 0.35920852, 0.28444748, 0.24025974, 0.18476499, 0.14342629, 0.11843318, 0.12584459, 0.13911368, 0.15403683, 0.16769984, 0.18431373, 0.20852018, 0.23557065, 0.25712181, 0.28469176, 0.31442287, 0.34904694, 0.37993803, 0.4137931, 0.44783279],
    orange: [0.4562212, 0.495, 0.55471125, 0.55247286, 0.61565836, 0.64079148, 0.71555252, 0.75974026, 0.81523501, 0.85657371, 0.88156682, 0.87415541, 0.86088632, 0.84596317, 0.83230016, 0.81568627, 0.79147982, 0.76442935, 0.74287819, 0.71530824, 0.68557713, 0.65095306, 0.62006197, 0.5862069, 0.55216721]
 }
};


const growth_60pct = {
    t_max:24,
    abs:
     {green: [118, 204, 334, 442, 554, 635, 627, 656, 668, 707, 791, 923, 1065, 1247, 1462, 1678, 1921, 2187, 2466, 2749, 3031, 3366, 3719, 4076, 4459],
     orange: [99, 198, 280, 397, 535, 697, 817, 1001, 1163, 1271, 1360, 1423, 1454, 1480, 1499, 1511, 1520, 1526, 1530, 1534, 1539, 1539, 1539, 1539, 1539]},
    rel:
    {green: [0.5437788, 0.50746269, 0.54397394, 0.52681764, 0.5087236, 0.47672673, 0.43421053, 0.3958962, 0.36482796, 0.35743175, 0.36773594, 0.39343564, 0.42278682, 0.45727906, 0.49375211, 0.52618376, 0.55826795, 0.58901158, 0.61711712, 0.64183983, 0.66323851, 0.68623853, 0.70730316, 0.72591273, 0.74341447],
        orange:  [0.4562212, 0.49253731, 0.45602606, 0.47318236, 0.4912764, 0.52327327, 0.56578947, 0.6041038, 0.63517204, 0.64256825, 0.63226406, 0.60656436, 0.57721318, 0.54272094, 0.50624789, 0.47381624, 0.44173205, 0.41098842, 0.38288288, 0.35816017, 0.33676149, 0.31376147, 0.29269684, 0.27408727, 0.25658553]}
};


const chart_data = {
    growth_0pct: growth_0pct,
    growth_10pct: growth_10pct,
    growth_20pct: growth_20pct,
    growth_30pct: growth_30pct,
    growth_40pct: growth_40pct,
    growth_50pct: growth_50pct,
    growth_60pct: growth_60pct
}

// Common to all charts
const base_dataset_config = { 
    lineTension: 0,
    pointBorderWidth: 1.5,
    pointHoverRadius: 18,
    pointRadius: 8,
    pointHitRadius: 12,
    spanGaps: true,
    fill: false,
    pointHoverBorderWidth: 2
};

// Common to comparison charts
const base_comp_config = { 
    ...base_dataset_config,
    borderColor: "#d95f02", 
    pointBorderColor: "black",
    pointBackgroundColor: "#d95f02",
    pointHoverBackgroundColor: "#fc8d62",
    pointHoverBorderColor: "#d95f02",
};


// Basic data block for charts. Will be updated dynamically
var data_abs = {
  labels: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"],
  datasets: [{
    ...base_dataset_config,
    label: "Can Stab",
    borderColor: "#d95f02", 
    pointBorderColor: "black",
    pointBackgroundColor: "#d95f02",
    pointHoverBackgroundColor: "#fc8d62",
    pointHoverBorderColor: "#d95f02",
    pointStyle: "circle",
    data: chart_data.growth_0pct.abs.orange,
  },
  {
    ...base_dataset_config,
    label: "Can't Stab",
    borderColor: "#1b9e77", 
    pointBorderColor: "black",
    pointBackgroundColor: "#1b9e77",
    pointHoverBackgroundColor: "#66c2a6",
    pointHoverBorderColor: "#1b9e77",
    pointStyle: "rect",
    data: chart_data.growth_0pct.abs.green,
  }]
};
var data_comp = {
  labels: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"],
  datasets: [{
    ...base_comp_config,
    label: "0% Disadvantage",
    pointStyle: "cross",
    data: chart_data.growth_0pct.abs.orange,
  },
  {
    ...base_comp_config,
    label: "10% disadvantage",
    pointStyle: "circle",
    data: chart_data.growth_10pct.abs.orange,
  },
  {
    ...base_comp_config,
    label: "20% disadvantage",
    pointStyle: "triangle",
    data: chart_data.growth_20pct.abs.orange,
  },
  {
    ...base_comp_config,
    label: "30% disadvantage",
    pointStyle: "star",
    data: chart_data.growth_30pct.abs.orange,
  },
  {
    ...base_comp_config,
    label: "40% disadvantage",
    pointStyle: "rectRounded",
    data: chart_data.growth_40pct.abs.orange,
  },
  {
    ...base_comp_config,
    label: "50% disadvantage",
    pointStyle: "rectRot",
    data: chart_data.growth_50pct.abs.orange,
  },
  {
    ...base_comp_config,
    label: "60% disadvantage",
    pointStyle: "rect",
    data: chart_data.growth_60pct.abs.orange,
  }



  ]
};


// common options for all charts
var options = {
  plugins:{
      legend: {
          labels:{
              usePointStyle: true
            }
      }
  },
  scales:{
      y:{
          min: 0,
          title:{
              display: true,
              text: "Absolute Abundance (Total Count)"
          }
      },
      x:{
          grid:{
              display:false
            },
          title:{
              display: true,
              text: "Time (hours)"
            }
      }
  },
    // adapted from https://stackoverflow.com/questions/68353537/is-there-a-way-to-highlight-a-line-on-a-line-graph-with-hover
    onHover: (e, activeEls, chart) => {
      if (activeEls.length === 0) {
        chart.data.datasets.forEach((dataset) => {
          dataset.borderColor = dataset.borderColor.length === 9 ? dataset.borderColor.slice(0, -2) : dataset.borderColor;
          dataset.pointBorderColor = dataset.pointBorderColor.length === 9 ? dataset.pointBorderColor.slice(0, -2) : dataset.pointBorderColor;
          dataset.pointBackgroundColor = dataset.pointBackgroundColor.length === 9 ? dataset.pointBackgroundColor.slice(0, -2) : dataset.pointBackgroundColor;
        });
        chart.update();
        return;
      }

      const hoveredEl = chart.getElementsAtEventForMode(e, 'point', {
        intersect: true
      }, true)[0]

      chart.data.datasets.forEach((dataset, i) => {
        dataset.borderColor = (hoveredEl.datasetIndex === i || dataset.borderColor.length === 9) ? dataset.borderColor : dataset.borderColor + '4D';
        dataset.pointBorderColor = (hoveredEl.datasetIndex === i || dataset.pointBorderColor.length === 9) ? dataset.pointBorderColor : dataset.pointBorderColor + '4D';
        dataset.pointBackgroundColor = (hoveredEl.datasetIndex === i || dataset.pointBackgroundColor.length === 9) ? dataset.pointBackgroundColor : dataset.pointBackgroundColor + '4D';
      });

      chart.update();
    },
};


// Initialize all charts
init();

function create_chart(chart_name){
    return new Chart(document.getElementById(chart_name).getContext("2d"), {
    type: "line",
    data: data_abs,
    options: options
  });
}

function update_chart_data_by_label(label){
    to_update = experiment_chart.data.datasets.find(ds => ds.label === label);
    data_label = (label=='Can Stab') ? "orange" : "green";
    if(to_update){
        to_update.data = chart_data[curr_data][chart_states.abundance][data_label];
    }
    experiment_chart.update();
    //update does something which clobbers the xmax option. fortunately it's after the draw, so let's reset it
    experiment_chart.options.scales.x.max=chart_data[curr_data].t_max+1;
}

function update_chart_data(){

  // update y axis to reflect state change
  var ylab =  (chart_states.abundance == "rel") ? "Relative Abundance (Proportion)" : "Absolute Abundance (Total Count)";
  experiment_chart.options.scales.y.title.text=ylab;

 // update x axis range
 experiment_chart.options.scales.x.max=chart_data[curr_data].t_max+1;

 // update the two data series 
 update_chart_data_by_label("Can Stab");
 update_chart_data_by_label("Can\'t Stab");

}

function create_update_add_chart(chart_name){
  if(document.getElementById(chart_name)) {
      charts[chart_name] = create_chart(chart_name);
      update_chart_data(chart_name);
  }
}

function init() {
  Chart.defaults.font.size = 14;
  experiment_chart = create_chart("growth_experiment_chart");
  curr_data="growth_60pct";
  update_chart_data();
/*  create_update_add_chart("equal_growth_chart"); 
  create_update_add_chart("uneven_growth_chart"); 
  create_update_add_chart("t6ss_equals_chart"); 
  create_update_add_chart("t6ss_40pct_chart"); 
*/
}

function toggle_chart(chart_name) {
  // toggle state flag for given chart 
  chart_states.abundance = (chart_states.abundance == "rel") ? "abs" : "rel";
  update_chart_data(); 
}

function toggle_series(chart_name) {
  experiment_chart.data = data_comp;
  experiment_chart.update();
}

function handleRadioButtonChange(value) {
    console.log("Selected value:", value);
    chart_states.growth=value;
    curr_data=value;
    update_chart_data();
}

const radioButtons = document.querySelectorAll('input[name="growth"]');
  radioButtons.forEach(button => {
    button.addEventListener('change', function() {
      handleRadioButtonChange(this.value); 
    });
});
