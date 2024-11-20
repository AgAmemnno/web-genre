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
            //console.log(prop.ID);
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
  var tname = `${ty}-temp`;
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

function setHtml0(ty) {
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

var genre = (t) => {}
;
var fadeIn = () => {}
;
var highlight = (t) => {}
;
var focusRead = (t) => {}
;
var focusRemove = (t) => {}
;
var removeHighlight = (t) => {}
;

var smoothScroll = (t) => {}
;
document.addEventListener("DOMContentLoaded", (event) => {
    // Pen by ArcSinDesign.com - Follow https://codepen.io/BoiseDigital/
    var background_color = document.getElementsByName('half-nav')[0];
    var genre_content = document.getElementById('genre-content');
    var genre_title = document.getElementById('genre-title');
    var background_image = document.getElementById('backgroundImage');
    background_image.style.color = "#1a1a1a";

    genre = (the_genre) => {

        genre_content.className = '';
        genre_title.className = '';
        //genre_content.innerHTML = "";
        //genre_content.style.opacity=0;

        window.setTimeout(fadeIn, 0);

        if (the_genre == 'photo') {
            genre_content.className = 'half-content ';
            background_color.style.backgroundColor = "#4bada2";
            //background_image.style.color="#57C8BA";
            background_image.style.backgroundColor = "#40948a";
            genre_title.innerHTML = "Photo";
            genre_content.innerHTML = "<h1>Photo</h1>\
            <p>Photoをメインにするページのアイディアです。</p><span class=\"sep\"></span>\
            <div id=\"photo1\" name=\"photo1\"><h2 id=\"photo1\">photo1</h2><p>Photo1のレイアウトの特徴はこうこうこうです。あたしは、これがいいと思うんです。なぜなら、このレイアウトにしかできないこうこうこういうところがあるからです。</p></div>\
            <div id=\"photo2\" name=\"photo2\"><h2 id=\"photo2\">photo2</h2><p>Photo2のレイアウトの特徴はこうこうこうです。あたしは、これがいいと思うんです。なぜなら、このレイアウトにしかできないこうこうこういうところがあるからです。</p></div>\
            <div id=\"photo3\" name=\"photo3\"><h2 id=\"photo3\">photo3</h2><p>Photo3のレイアウトの特徴はこうこうこうです。あたしは、これがいいと思うんです。なぜなら、このレイアウトにしかできないこうこうこういうところがあるからです。</p></div>\
            <div id=\"photo4\" name=\"photo4\"><h2 id=\"photo4\">photo4</h2><p>Photo4のレイアウトの特徴はこうこうこうです。あたしは、これがいいと思うんです。なぜなら、このレイアウトにしかできないこうこうこういうところがあるからです。</p></div>\
            <div id=\"photo5\" name=\"photo5\"><h2 id=\"photo5\">photo5</h2><p>Photo5のレイアウトの特徴はこうこうこうです。あたしは、これがいいと思うんです。なぜなら、このレイアウトにしかできないこうこうこういうところがあるからです。</p></div>";
        }

        if (the_genre == 'creative') {
            genre_content.className = 'half-content ';
            background_color.style.backgroundColor = "#40a0ff";
            //background_image.style.color="#FF6517";
            background_image.style.backgroundColor = "#3380cc";
            genre_title.innerHTML = "Creative";
            genre_content.innerHTML = "<h1>Creative</h1> \
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec volutpat eros. Nam mattis erat posuere gravida dignissim. Proin orci velit, accumsan ut lacus id, scelerisque euismod quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur a lorem consequat felis blandit fermentum. Aliquam arcu lacus, accumsan non sagittis nec, tristique sit amet ligula. Sed sapien massa, iaculis pretium ornare ut, facilisis vitae leo. Aliquam id elit lectus.</p><span class=\"sep\"></span>\
             <div id=\"graphicDesign-container\" name=\"graphicDesign-container\"> <h2 id=\"graphicDesign\">Graphic Design</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec volutpat eros. Nam mattis erat posuere gravida dignissim. Proin orci velit, accumsan ut lacus id, scelerisque euismod quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur a lorem consequat felis blandit fermentum. Aliquam arcu lacus, accumsan non sagittis nec, tristique sit amet ligula. Sed sapien massa, iaculis pretium ornare ut, facilisis vitae leo. Aliquam id elit lectus.</p> </div> <div id=\"videoEditing-container\"> <h2 id=\"videoEditing\">Video Editing</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec volutpat eros. Nam mattis erat posuere gravida dignissim. Proin orci velit, accumsan ut lacus id, scelerisque euismod quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur a lorem consequat felis blandit fermentum. Aliquam arcu lacus, accumsan non sagittis nec, tristique sit amet ligula. Sed sapien massa, iaculis pretium ornare ut, facilisis vitae leo. Aliquam id elit lectus.</p> </div> <div id=\"photography-container\"> <h2 id=\"photography\">Photography</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec volutpat eros. Nam mattis erat posuere gravida dignissim. Proin orci velit, accumsan ut lacus id, scelerisque euismod quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur a lorem consequat felis blandit fermentum. Aliquam arcu lacus, accumsan non sagittis nec, tristique sit amet ligula. Sed sapien massa, iaculis pretium ornare ut, facilisis vitae leo. Aliquam id elit lectus.</p> </div> <div id=\"stock-container\"> <h2 id=\"stock\">Stock Media</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec volutpat eros. Nam mattis erat posuere gravida dignissim. Proin orci velit, accumsan ut lacus id, scelerisque euismod quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur a lorem consequat felis blandit fermentum. Aliquam arcu lacus, accumsan non sagittis nec, tristique sit amet ligula. Sed sapien massa, iaculis pretium ornare ut, facilisis vitae leo. Aliquam id elit lectus.</p> </div>\
             <div id=\"content-container\"> <h2 id=\"content\">Content Generation</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec volutpat eros. Nam mattis erat posuere gravida dignissim. Proin orci velit, accumsan ut lacus id, scelerisque euismod quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur a lorem consequat felis blandit fermentum. Aliquam arcu lacus, accumsan non sagittis nec, tristique sit amet ligula. Sed sapien massa, iaculis pretium ornare ut, facilisis vitae leo. Aliquam id elit lectus.</p> </div>";
        }

        if (the_genre == 'branding') {
            genre_content.className = 'half-content ';
            background_color.style.backgroundColor = "#2D4473";
            //background_image.style.color="#2D4473";
            background_image.style.backgroundColor = "#233559";
            genre_title.innerHTML = "Branding";
            genre_content.innerHTML = "<h1>Branding</h1> \
            <p>Morbi lectus nibh, fringilla eget eros at, elementum aliquam ante. Nam pellentesque vel mauris feugiat imperdiet. Mauris in tortor at metus ultricies laoreet. Nunc placerat non neque vel aliquet. Ut tristique porta efficitur. Vivamus nec fermentum dui. Nunc at nibh sed nisl volutpat fermentum eget fermentum erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec volutpat eros. Nam mattis erat posuere gravida dignissim. Proin orci velit, accumsan ut lacus id, scelerisque euismod quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur a lorem consequat felis blandit fermentum. Aliquam arcu lacus, accumsan non sagittis nec, tristique sit amet ligula. Sed sapien massa, iaculis pretium ornare ut, facilisis vitae leo. Aliquam id elit lectus.</p><span class=\"sep\"></span>\
            <div id=\"web-container\"> <h2 id=\"web\">Web Development</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec volutpat eros. Nam mattis erat posuere gravida dignissim. Proin orci velit, accumsan ut lacus id, scelerisque euismod quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur a lorem consequat felis blandit fermentum. Aliquam arcu lacus, accumsan non sagittis nec, tristique sit amet ligula. Sed sapien massa, iaculis pretium ornare ut, facilisis vitae leo. Aliquam id elit lectus.</p> </div>\
             <div id=\"brand-container\" name=\"brand-container\"> <h2 id=\"brand\">Brand Identity</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec volutpat eros. Nam mattis erat posuere gravida dignissim. Proin orci velit, accumsan ut lacus id, scelerisque euismod quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur a lorem consequat felis blandit fermentum. Aliquam arcu lacus, accumsan non sagittis nec, tristique sit amet ligula. Sed sapien massa, iaculis pretium ornare ut, facilisis vitae leo. Aliquam id elit lectus.</p> </div> <div id=\"seo-container\"> <h2 id=\"seo\">Search Optimization</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec volutpat eros. Nam mattis erat posuere gravida dignissim. Proin orci velit, accumsan ut lacus id, scelerisque euismod quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur a lorem consequat felis blandit fermentum. Aliquam arcu lacus, accumsan non sagittis nec, tristique sit amet ligula. Sed sapien massa, iaculis pretium ornare ut, facilisis vitae leo. Aliquam id elit lectus.</p> </div>";

        }

    }

    fadeIn = () => {
        genre_content.className += 'fader';
        genre_title.className += 'titleFader';
    }

    highlight = (section) => {
        console.log(section);
        document.getElementById(section).className = 'w3-bounce';
        setTimeout(function() {
            document.getElementById(section).className = '';
        }, 1000);
        let ret = setHtml(section);
    }

    focusRead = (section) => {
        document.getElementById('genre-content').className = 'dull half-content ';
        document.getElementById(section).className = 'focus';
    }

    focusRemove = (section) => {
        document.getElementById(section).className = 'half-content ';
        document.getElementById('genre-content').classList.remove('dull');
    }

    removeHighlight = (section) => {}
}
);
