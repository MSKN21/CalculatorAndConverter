function update(num) {
  let inp = document.getElementById("barip").value;
  let x = num.value;
  let y = inp + x;
  console.log(y);
  document.getElementById("barip").value = y;
  let sel = document.getElementById("barip");
  sel.focus();
}

function pow(num) {
  let inp = document.getElementById("barip").value;
  let x = num.value;
  let y = inp + x;
  if (inp.length == 0) {
    y = 0 + x;
  }
  console.log(y);
  document.getElementById("barip").value = y;
  let sel = document.getElementById("barip");
  sel.focus();
}

function popone(num) {
  let x = document.getElementById("barip").value;
  let s = x.length;
  x = x.slice(0, s - 1);
  document.getElementById("barip").value = x;
  let sel = document.getElementById("barip");
  sel.focus();
}

function empty(ex) {
  document.getElementById("barip").value = "";
  let sel = document.getElementById("barip");
  sel.focus();
}

let p1 = [];
let p2 = [];
let pin = [];

function result(data) {
  let l = 0;
  for (let i = 0; i < data.length; i++) {
    if (
      data[i] == "$" ||
      data[i] == "%" ||
      data[i] == "+" ||
      data[i] == "-" ||
      data[i] == "/" ||
      data[i] == "*" ||
      data[i] == "^" ||
      data[i] == "," ||
      data[i] == "="
    )
      l++;
  }
  if (l == 0) {
    let num = parseFloat(data);
    p2.push(num);
  } else if (l >= 1) {
    let oprtr = data[0];
    let sum, sub, mul, div, power, a, b, c, d, x, y, r, q, m, o, e, f, mod;
    let no = p2.length;
    console.log(no);
    switch (oprtr) {
      case "+":
        b = p2[no - 1];
        a = p2[no - 2];
        sum = a + b;
        p2.pop();
        p2.pop();
        p2.push(sum);
        break;

      case "-":
        c = p2[no - 1];
        d = p2[no - 2];
        sub = d - c;
        p2.pop();
        p2.pop();
        p2.push(sub);
        break;

      case "*":
        x = p2[no - 1];
        y = p2[no - 2];
        mul = y * x;
        p2.pop();
        p2.pop();
        p2.push(mul);
        break;

      case "/":
        r = p2[no - 1];
        q = p2[no - 2];
        div = q / r;
        p2.pop();
        p2.pop();
        p2.push(div);
        break;

      case "^":
      case "$":
        m = p2[no - 2];
        o = p2[no - 1];
        power = Math.pow(m, o);
        p2.pop();
        p2.pop();
        p2.push(power);
        break;
      case "%":
        e = p2[no - 1];
        f = p2[no - 2];
        mod = f % e;
        p2.pop();
        p2.pop();
        p2.push(mod);
        break;

      default:
        console.log("invalid input!!!");
        break;
    }
    console.log(p2);
  }
}

function isempty(arr) {
  let len = arr.length;
  if (len == 0) return true;
  return false;
}

function topin(arr) {
  let len = arr.length;
  return arr[len - 1];
}

function isoperand(ch) {
  if (ch >= "0" && ch <= "9") return true;
  if (ch == ".") return true;
  return false;
}

function isoperator(ch) {
  if (
    ch == "+" ||
    ch == "-" ||
    ch == "*" ||
    ch == "/" ||
    ch == "$" ||
    ch == "^" ||
    ch == "%"
  )
    return true;
  return false;
}

function getoprweight(ch) {
  let weight = -1;
  switch (ch) {
    case "+":
    case "-":
      weight = 1;
      break;
    case "*":
    case "/":
      weight = 2;
      break;
    case "$":
    case "^":
      weight = 3;
      break;
    case "%":
      weight = 4;
      break;
  }
  return weight;
}

function infixtopost(str) {
  let l = str.length;
  let res = "";
  for (let i = 0; i < l; i++) {
    if (isoperand(str[i])) {
      res += str[i];
    } else if (isoperator(str[i])) {
      res += ",";
      while (
        !isempty(pin) &&
        topin(pin) != "(" &&
        getoprweight(topin(pin)) >= getoprweight(str[i]) &&
        !(
          (topin(pin) == "$" && str[i] == "$") ||
          (topin(pin) == "^" && str[i] == "^")
        )
      ) {
        let c = topin(pin);
        pin.pop();
        res += c;
      }
      pin.push(str[i]);
    } else if (str[i] == "(") {
      pin.push(str[i]);
    } else if (str[i] == ")") {
      while (!isempty(pin) && topin(pin) != "(") {
        let op = topin(pin);
        res += op;
        pin.pop();
      }
      pin.pop();
    }
  }

  while (!isempty(pin)) {
    res += topin(pin);
    pin.pop();
  }

  return res;
}

function mulbrac(str) {
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    if (i != 0) {
      if (str[i] == "(" && isoperand(str[i - 1])) {
        arr.push("*");
        arr.push(str[i]);
      } else arr.push(str[i]);
    } else arr.push(str[i]);
  }
  str = arr.join("");
  console.log(str);
  return str;
}
var backing = [];
let popit = 0;

function finalresult() {
  let ans = document.getElementById("barip").value;
  backing.push(ans);
  ans = mulbrac(ans);
  console.log(ans);
  let str = infixtopost(ans);
  let z = 0;
  let size = str.length;
  while (z < size + 1) {
    if (
      !(
        str[z] == "$" ||
        str[z] == "%" ||
        str[z] == "+" ||
        str[z] == "-" ||
        str[z] == "/" ||
        str[z] == "*" ||
        str[z] == "^" ||
        str[z] == "," ||
        str[z] == "\0" ||
        str[z] == "="
      )
    ) {
      let chr = str[z];
      p1.push(chr);
      z++;
    } else {
      let s_a = p1.join("");
      if (p1.length >= 1) {
        result(s_a);
      }
      while (p1.length != 0) {
        p1.pop();
      }
      if (!(str[z] == "," || str[z] == "\0")) {
        result(str[z]);
      }
      z++;
    }
  }
  console.log(p2);
  document.getElementById("barip").value = p2[0];
  p2 = [];
  p1 = [];
  pin = [];
  let sel = document.getElementById("barip");
  sel.focus();
}

var input = document.getElementById("barip");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    finalresult();
  }
});

function prev() {
  let last = backing.pop();
  if (last == undefined) {
    last = "";
  }
  document.getElementById("barip").value = last;
  let sel = document.getElementById("barip");
  sel.focus();
}

function focs() {
  let sel = document.getElementById("barip");
  sel.focus();
}
/*
above is the functionality of a basic mode calculator 
(infix to postfix, post to output & its functions , for input bar value entering func's ,popping func's ,clearing funcs)
and some small func's like entr,bracks thats it
*/

/*
below is start for converter functionalty
*/

{
  // let select=document.querySelector('#cntype');
  // select.addEventListener('change',display);
  // function display(type)
  // {
  //     let x=type.target.value;
  //     if(x=="land")
  //     {
  //         document.getElementById('frm1').style.visibility="visible";
  //     }
  //     else if(x=="weight")
  //     {
  //         document.getElementById('frm1').style.visibility="hidden";
  //         document.getElementById('frm2').style.visibility="visible";
  //     }
  //     else if(x=="lenghts")
  //     {
  //         document.getElementById('frm1').style.visibility="hidden";
  //         document.getElementById('frm2').style.visibility="hidden";
  //         document.getElementById('frm3').style.visibility="visible";
  //     }
  //     else
  //     {
  //         console.log("not there"+x);
  //     }
  // }
  // let lands=[
  //     {
  //         type:"mile",
  //         km:1.6093,
  //         m:1606.3,
  //         cm:160930,
  //         mm:1609300
  //     },
  //     {
  //         type:"km",
  //         m:1000,
  //         cm:100000,
  //         mm:1000000
  //     },
  //     {
  //         type:"m",
  //         cm:100,
  //         mm:1000
  //     },
  //     {
  //         type:"cm",
  //         mm:10
  //     }
  // ];
  // function find(from,to)
  // {
  //     let x;
  //     for(let i=0;i<lands.length;i++)
  //     {
  //         if(lands[i].type==from)
  //         {
  //             x=i;
  //             console.log("found at "+i);
  //         }
  //     }
  //     if(lands[x][to]==undefined)
  //     {
  //         for(let i=0;i<lands.length;i++)
  //         {
  //             if(lands[i].type==to)
  //             {
  //                 x=i;
  //                 console.log("found at"+i);
  //             }
  //         }
  //         console.log(1/(lands[x][from]));
  //         return (1/(lands[x][from]));
  //     }
  //     else
  //     {
  //         console.log(lands[x][to]);
  //         return (lands[x][to]);
  //     }
  // }
}
{
  // let type_selection=[
  //     {miles:1,kilometre:1.609344,metre:1609.344,centimetre:160934.4,millimetre:1609344},
  //     {year:1,days:365.25,hours:8766,minutes:525960,seconds:31600000,milliseconds:31600000000,microseconds:31600000000000},
  //     {tonne:1,kilogram:1000,pounds:2204.62,ounce:35273.97,grams:1000000,milligrams:1000000000}
  // ];
  // let typelist={};
  // typelist['0']=['miles','kilometre','metre','centimetre','millimetre'];
  // typelist['1']=['year','days','hours','minutes','seconds','milliseconds','microseconds'];
  // typelist['2']=['tonne','kilogram','pounds','ounce','grams','milligrams'];
  // let typetab=document.getElementById('cntype').value; //default
  // //type auto selected identifier
  // let typeselect=document.querySelector('#cntype');
  // typeselect.addEventListener('change',displaytype);
  // function displaytype(type)
  // {
  //     typetab=type.target.value;
  //     console.log(typeof typetab,typetab);
  //     insertnewlist();
  // }
  // //type auto identifier stops here
  // function insertnewlist() {
  //     var m=document.getElementById("cntype");
  //     var fromlist = document.getElementById("frm1");
  //     var tolist = document.getElementById("toland");
  //     var seltab = m.options[m.selectedIndex].value;
  //     console.log(seltab);
  //     while (fromlist.options.length) {
  //       fromlist.remove(0);
  //     }
  //     while (tolist.options.length) {
  //         tolist.remove(0);
  //       }
  //     var opts = typelist[seltab];
  //     if (opts) {
  //         var i;
  //         for (i = 0; i < opts.length; i++) {
  //             var opt = new Option(opts[i],i);
  //             fromlist.options.add(opt);
  //         }
  //     }
  //     var opts = typelist[seltab];
  //     if (opts) {
  //         var i;
  //         for (i = 0; i < opts.length; i++) {
  //           var opt = new Option(opts[i],i);
  //           tolist.options.add(opt);
  //         }
  //       }
  // }
  // let frmtab=document.getElementById('frm1').text; //default
  // let totab=document.getElementById('toland').text; //default
  // // //from auto selected identifier
  // // let select=document.querySelector('#frm1');
  // // select.addEventListener('change',display);
  // // function display(type)
  // // {
  // //     frmtab=type.target.text;
  // //     console.log("from = "+frmtab);
  // // }
  // // //from auto identifier stops here
  // // //to auto selected identifier
  // // let to=document.querySelector('#toland');
  // // to.addEventListener('change',todisplay);
  // // function todisplay(type)
  // // {
  // //     totab=type.target.text;
  // //     console.log("to = "+totab);
  // // }
  // // //to auto identifier stops here
  // function swap()
  // {
  //     let frm=document.getElementById('frm1');
  //     let too=document.getElementById('toland');
  //     console.log(frm,"  ",too);
  //     frmtab=frm.options[frm.selectedIndex].value;
  //     totab=too.options[too.selectedIndex].value;
  //     console.log(frmtab,"  ",totab);
  //     document.getElementById('frm1').selectedIndex=totab;
  //     document.getElementById('toland').selectedIndex=frmtab;
  // }
  // function convresult()
  // {
  //     let frm=document.getElementById('frm1');
  //     let too=document.getElementById('toland');
  //     frmtab=frm.options[frm.selectedIndex].text;
  //     totab=too.options[too.selectedIndex].text;
  //     console.log(frmtab,"   ",totab);
  //     let num=document.getElementById('inpfrom').value;
  //     if(frmtab==totab)
  //     {
  //         document.getElementById('toout').value=num;
  //     }
  //     else
  //     {
  //         let type=parseInt(typetab)
  //         console.log(type);
  //         let num1=type_selection[type][frmtab];
  //         let num2=type_selection[type][totab];
  //         let final=(num*(num2/num1));
  //         document.getElementById('toout').value=final;
  //     }
  // }
}
