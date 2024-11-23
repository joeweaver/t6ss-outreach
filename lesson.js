// Track state of each chart - showing "abs" or "rel" for abundances
var chart_states = {
    equal_growth_chart: "abs",
    uneven_growth_chart: "abs",
    t6ss_equals_chart: "abs",
    t6ss_40pct_chart: "abs"
};

// Contains all named charts
var charts = {};


// Data to be used by individual charts
const equal_growth = {
    t_max:24,
    abs:
     {
     green: [118, 236, 347, 476, 571, 750, 886, 1004, 1101, 1248, 1391, 1527, 1664, 1798, 1948, 2096, 2214, 2367, 2516, 2645, 2804, 2959, 3109, 3267, 3424 ],
    orange: [99, 198, 291, 396, 472, 638, 733, 821, 930, 1044, 1165, 1293, 1409, 1547, 1674, 1805, 1933, 2054, 2179, 2329, 2447, 2593, 2736, 2878, 3026 ]},
    rel:
    { green:[0.5437788, 0.5437788, 0.54388715, 0.54587156, 0.54745925, 0.54034582, 0.54725139, 0.55013699, 0.54209749, 0.54450262, 0.5442097, 0.54148936, 0.5414904, 0.53751868, 0.53782441, 0.53729813, 0.53387991, 0.53539923, 0.53588924, 0.53176518, 0.53399353, 0.5329611, 0.53190761, 0.53165175, 0.53085271],
     orange:[0.4562212, 0.4562212, 0.45611285, 0.45412844, 0.45254075, 0.45965418, 0.45274861, 0.44986301, 0.45790251, 0.45549738, 0.4557903, 0.45851064, 0.4585096, 0.46248132, 0.46217559, 0.46270187, 0.46612009, 0.46460077, 0.46411076, 0.46823482, 0.46600647, 0.4670389, 0.46809239, 0.46834825, 0.46914729]
    }
};

const one_faster = {
    t_max:24,
    abs:
     {green: [118, 236, 243, 378, 455, 487, 546, 623, 695, 768, 825, 873, 915, 954, 993, 1028, 1062, 1094, 1123, 1155, 1172, 1186, 1201, 1218,1229],
     orange: [99, 198, 386, 529, 717, 867, 1031, 1234, 1403, 1596, 1782, 1988, 2217, 2436, 2661, 2890, 3135, 3384, 3628, 3873, 4138, 4422, 4694, 4958, 5267]},
    rel:
    {green:[0.5437788, 0.5437788, 0.3863275, 0.41675854, 0.38822526, 0.35967504, 0.34622701, 0.33548735, 0.33126787, 0.3248731, 0.3164557, 0.30513806, 0.29214559, 0.28141593, 0.27175698, 0.26237876, 0.25303788, 0.24430549, 0.23637129, 0.2297136, 0.22071563, 0.21148359, 0.20373198, 0.19721503, 0.18919335],
    orange:[0.4562212, 0.4562212, 0.6136725, 0.58324146, 0.61177474, 0.64032496, 0.65377299, 0.66451265, 0.66873213, 0.6751269, 0.6835443, 0.69486194, 0.70785441, 0.71858407, 0.72824302, 0.73762124, 0.74696212, 0.75569451, 0.76362871, 0.7702864, 0.77928437, 0.78851641, 0.79626802, 0.80278497, 0.81080665]
    }
};

const t6ss_equal_growth = {
    t_max:12,
    abs:
     {green: [118, 146, 191, 216, 225, 233, 146, 129, 91, 48, 25, 4, 0],
     orange: [99, 198, 396, 588, 804, 1025, 1307, 1527, 1745, 1983, 2239, 2506, 2763]},
    rel:
    {green: [0.5437788, 0.4244186, 0.3253833, 0.26865672, 0.21865889, 0.18521463, 0.10048176, 0.077898551, 0.04956427, 0.023633678, 0.011042403, 0.0015936255, 0.0],
    orange:  [0.4562212, 0.5755814, 0.6746167, 0.73134328, 0.78134111, 0.81478537, 0.89951824, 0.92210145, 0.95043573, 0.97636632, 0.9889576, 0.99840637, 1.0]}
};

const t6ss_40pct = {
    t_max:24,
    abs:
     {green: [118, 204, 334, 442, 554, 635, 627, 656, 668, 707, 791, 923, 1065, 1247, 1462, 1678, 1921, 2187, 2466, 2749, 3031, 3366, 3719, 4076, 4459],
     orange: [99, 198, 280, 397, 535, 697, 817, 1001, 1163, 1271, 1360, 1423, 1454, 1480, 1499, 1511, 1520, 1526, 1530, 1534, 1539, 1539, 1539, 1539, 1539]},
    rel:
    {green: [0.5437788, 0.50746269, 0.54397394, 0.52681764, 0.5087236, 0.47672673, 0.43421053, 0.3958962, 0.36482796, 0.35743175, 0.36773594, 0.39343564, 0.42278682, 0.45727906, 0.49375211, 0.52618376, 0.55826795, 0.58901158, 0.61711712, 0.64183983, 0.66323851, 0.68623853, 0.70730316, 0.72591273, 0.74341447],
        orange:  [0.4562212, 0.49253731, 0.45602606, 0.47318236, 0.4912764, 0.52327327, 0.56578947, 0.6041038, 0.63517204, 0.64256825, 0.63226406, 0.60656436, 0.57721318, 0.54272094, 0.50624789, 0.47381624, 0.44173205, 0.41098842, 0.38288288, 0.35816017, 0.33676149, 0.31376147, 0.29269684, 0.27408727, 0.25658553]
}
};


const chart_data = {
    equal_growth_chart: equal_growth,
    uneven_growth_chart: one_faster,
    t6ss_equals_chart: t6ss_equal_growth,
    t6ss_40pct_chart: t6ss_40pct
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

// Basic data block for charts. Will be updated dynamically
var data_abs = {
  labels: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"],
  datasets: [{
    ...base_dataset_config,
    label: "Orange Bacteria",
    borderColor: "#d95f02", 
    pointBorderColor: "black",
    pointBackgroundColor: "#d95f02",
    pointHoverBackgroundColor: "#fc8d62",
    pointHoverBorderColor: "#d95f02",
    pointStyle: "circle",
    data: equal_growth.abs.orange,
  },
  {
    ...base_dataset_config,
    label: "Green Bacteria",
    borderColor: "#1b9e77", 
    pointBorderColor: "black",
    pointBackgroundColor: "#1b9e77",
    pointHoverBackgroundColor: "#66c2a6",
    pointHoverBorderColor: "#1b9e77",
    pointStyle: "rect",
    data: equal_growth.abs.green,
  }]
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
  }
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

function update_chart_data_by_label(chart_name, label){
    to_update = charts[chart_name].data.datasets.find(ds => ds.label === label);
    data_label = (label=="Green Bacteria") ? "green" : "orange";
    if(to_update){
        to_update.data = chart_data[chart_name][chart_states[chart_name]][data_label];
    }
    charts[chart_name].update();
    //update does something which clobbers the xmax option. fortunately it's after the draw, so let's reset it
    charts[chart_name].options.scales.x.max=chart_data[chart_name].t_max+1;
}

function update_chart_data(chart_name){
  // update y axis to reflect state change
  var ylab =  (chart_states[chart_name] == "rel") ? "Relative Abundance (Proportion)" : "Absolute Abundance (Total Count)";
  charts[chart_name].options.scales.y.title.text=ylab;

 // update x axis range
 charts[chart_name].options.scales.x.max=chart_data[chart_name].t_max+1;

 // update the two data series 
  update_chart_data_by_label(chart_name,"Orange Bacteria");
  update_chart_data_by_label(chart_name,"Green Bacteria");

  }

function create_update_add_chart(chart_name){
  if(document.getElementById(chart_name)) {
      charts[chart_name] = create_chart(chart_name);
      update_chart_data(chart_name);
  }
}

function init() {
  Chart.defaults.font.size = 14;
  create_update_add_chart("equal_growth_chart"); 
  create_update_add_chart("uneven_growth_chart"); 
  create_update_add_chart("t6ss_equals_chart"); 
  create_update_add_chart("t6ss_40pct_chart"); 
}

function toggle_chart(chart_name) {
  // toggle state flag for given chart 
  chart_states[chart_name] = (chart_states[chart_name] == "rel") ? "abs" : "rel";
  update_chart_data(chart_name); 
}
