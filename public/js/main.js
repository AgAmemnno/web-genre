class StyleParser{
    dict = [];
    init(){
        this.dict = [];
        var ss = window.document.styleSheets;
        console.assert(ss[0].href == 'http://127.0.0.1:9001/css/w3.css',"stylesheets not found");
        this.ss = ss[0];
    }
    setDict(parent,msg){
        this.dict.push([parent,msg]);
    }
    createtipAlert(){
        for(let i =0;i<this.dict.length;i++){
            let r = this.dict[i];
            r[0].onclick = ()=>{
                alert(`${r[1]}`);
            }
        }
    }
    modalID = 0;
    createtip(){



      for(let i =0;i<this.dict.length;i++){
        let r = this.dict[i];
        var msgs = r[1];
        const prop = {ID:`modal${this.modalID}`,msgs:msgs};
        this.modalID++;

       
        var tname = `templateModal`
        var template = document.getElementById(tname).innerHTML;
        var compiled_template = Handlebars.compile(template);
        var rendered = compiled_template(prop);
        let target = document.getElementById('modal');
        target.innerHTML += rendered;
        r[0].onclick = ()=>{ 
            console.log(prop.ID);
            document.getElementById(prop.ID).style.display='block';
        };
      }
    }
    addClass(){
       
    
    }
}
var sp = new StyleParser();

function findcss(a,o) {
    var sheets = document.styleSheets;
    a.matches = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
    for (var i in sheets) {
        try{
            var rules = sheets[i].rules || sheets[i].cssRules;
            for (var r in rules) {
                if (a.matches(rules[r].selectorText)) {
                    o.push({value:rules[r].cssText});
                }
            };
        }catch(e){
            
        }
    }
    return o;
}

function styleCompare(ele,src,dst){
     if(!ele.classList.value){
         return [];
     }
    let msgs  = [{value: `CLASS  ${ele.classList.value}\n`}];
    msgs = findcss(ele,msgs);
    let assign  = false;
    
    for (let i = src.length; i--; ) {
      var nameString = src[i];
      const nameString2 = dst[i];
      console.assert( nameString ==  nameString2,"error");
      let val  = src.getPropertyValue(nameString);
      let val2 = dst.getPropertyValue(nameString);
      if(val != val2 ){
          var mod   = nameString.split("-");
          mod =  mod.filter(s => s!="");
          if(mod.length > 1){
              var n = mod[0];
              for(let j = 1;j<mod.length;j++){
                  var v = mod[j];
                  n+= v.charAt(0).toUpperCase() + v.slice(1);
              }
              nameString = n;
          }
          let st = eval(`ele.style.${nameString}`);
          if(st != ''){
              //console.log(st);
              val = st;
          }
          msgs.push( {value: `${nameString} :: ${val}     default :: ${val2}`});
          assign = true;
      }  
    }
    if(!assign){
       return [];
    }
    return msgs;
}

function domCompare(src,dst){
  let dstChild = dst.childNodes;
  src.childNodes.forEach((element,i) => {
    let dstEle = dstChild[i];
    console.assert(element.textContent == dstEle.textContent, `dom compare src <-> dst conflicted  ${element.textContent}  !=  ${dstEle.textContent}`);

    if(element.style){
      let style     = getComputedStyle(element);
      let style_def = getComputedStyle(dstEle);
      let msgs = styleCompare(element, style  , style_def);
      if(msgs.length > 1){
           sp.setDict(element,msgs);
      }
    }
    if(element.hasChildNodes()){
       domCompare(element,dstEle);
    }
    return;
  });
};

function domTraversal(parentElement){
  parentElement.childNodes.forEach((element) => {
    if(element.classList){
        element.classList.remove(...element.classList);
    }
    if(element.hasChildNodes()){
        domTraversal(element);
    }
    return;
  });
};

function setHtml(ty) {
  var tname = `template${ty}`
  var template = document.getElementById(tname).innerHTML;
  var compiled_template = Handlebars.compile(template);
  var rendered = compiled_template({name: "Luke", power: "force"});
  //Overwrite the contents of #target with the renderer HTML
  let target = document.getElementById('target');
  target.innerHTML = rendered;
  if(ty ==0){
        carousel();
  }
  let def = document.getElementById('default');
  def.innerHTML = rendered;
  sp.init();
　domTraversal(def,0,0);
  domCompare(target,def);
  sp.createtip();
  return [target,def];
}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOMContentLoaded");
    let cont = document.getElementById('template-container');
    cont.innerHTML ='<script id="templateModal" type="text/x-handlebars-template">\
    <div id="{{ID}}" class="w3-modal">\
      <div class="w3-modal-content">\
        <div class="w3-container">\
          <span onclick= document.getElementById("{{ID}}").style.display="none" class="w3-button w3-display-topright">&times;</span>\
            {{#each msgs}}\
                <p>{{value}}</p>\
            {{/each}}\
        </div>\
      </div>\
    </div>\
    </script>\
    <script id="template5" type="text/x-handlebars-template">\
     <p>Use the <strong>"{{power}}"</strong>, {{name}}!</p>\
    </script>\
    ';

    let name = "#template1";
    let ret  = setHtml(0);
    let target = ret[0];
    let def = ret[1];
    
    /*
    doc = domParser.parseFromString(stringContainingSVGSource, "image/svg+xml");
    doc = domParser.parseFromString(stringContainingHTMLSource, "text/html");
    */  
});