let type_selection = [
  {
    miles: 1,
    kilometres: 1.609344,
    metres: 1609.344,
    centimetres: 160934.4,
    millimetres: 1609344,
  },
  {
    year: 1,
    days: 365.25,
    hours: 8766,
    minutes: 525960,
    seconds: 31600000,
    milliseconds: 31600000000,
    microseconds: 31600000000000,
  },
  {
    tonne: 1,
    kilogram: 1000,
    pounds: 2204.62,
    ounce: 35273.97,
    grams: 1000000,
    milligrams: 1000000000,
  },
];

let typelist = {};
typelist["0"] = ["miles", "kilometres", "metres", "centimetres", "millimetres"];
typelist["1"] = [
  "year",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds",
  "microseconds",
];
typelist["2"] = ["tonne", "kilogram", "pounds", "ounce", "grams", "milligrams"];

let typetab = document.getElementById("cntype").value; //default

//type auto selected identifier
let typeselect = document.querySelector("#cntype");
typeselect.addEventListener("change", displaytype);

function displaytype(type) {
  typetab = type.target.value;
  console.log(typeof typetab, typetab);
  insertnewlist();
}
//type auto identifier stops here

function insertnewlist() {
  var m = document.getElementById("cntype");
  var fromlist = document.getElementById("frm1");
  var tolist = document.getElementById("toland");
  var seltab = m.options[m.selectedIndex].value;
  console.log(seltab);
  while (fromlist.options.length) {
    fromlist.remove(0);
  }
  while (tolist.options.length) {
    tolist.remove(0);
  }
  var opts = typelist[seltab];
  if (opts) {
    var i;
    for (i = 0; i < opts.length; i++) {
      var opt = new Option(opts[i], i);
      fromlist.options.add(opt);
    }
  }
  var opts = typelist[seltab];
  if (opts) {
    var i;
    for (i = 0; i < opts.length; i++) {
      var opt = new Option(opts[i], i);
      tolist.options.add(opt);
    }
  }
}

let frmtab = document.getElementById("frm1").text; //default
let totab = document.getElementById("toland").text; //default

//from auto selected identifier
let select = document.querySelector("#frm1");
select.addEventListener("change", display);

function display() {
  convresult();
}
//from auto identifier stops here

//to auto selected identifier
let to = document.querySelector("#toland");
to.addEventListener("change", todisplay);

function todisplay() {
  convresult();
}
//to auto identifier stops here

function swap() {
  let frm = document.getElementById("frm1");
  let too = document.getElementById("toland");
  console.log(frm, "  ", too);
  frmtab = frm.options[frm.selectedIndex].value;
  totab = too.options[too.selectedIndex].value;
  console.log(frmtab, "  ", totab);
  document.getElementById("frm1").selectedIndex = totab;
  document.getElementById("toland").selectedIndex = frmtab;
  convresult();
}

let instant = document.querySelector("#inpfrom");
instant.addEventListener("keyup", active);

function active() {
  convresult();
}

function convresult() {
  let frm = document.getElementById("frm1");
  let too = document.getElementById("toland");
  frmtab = frm.options[frm.selectedIndex].text;
  totab = too.options[too.selectedIndex].text;
  console.log(frmtab, "   ", totab, "   ", typetab);
  let num = document.getElementById("inpfrom").value;
  if (frmtab == totab) {
    let same = " " + num + " " + frmtab + " Equals " + num + " " + totab;
    document.getElementById("toout").value = same;
  } else {
    let type = parseInt(typetab);
    console.log(type);
    let num1 = type_selection[type][frmtab];
    let num2 = type_selection[type][totab];
    console.log(num1, "  ", num2);
    let final = num * (num2 / num1);
    final = " " + num + " " + frmtab + " Equals " + final + " " + totab;
    document.getElementById("toout").value = final;
  }
}

var input = document.getElementById("inpfrom");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    convresult();
  }
});
