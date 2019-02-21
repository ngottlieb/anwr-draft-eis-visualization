(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{38:function(e,t,a){e.exports=a(54)},44:function(e,t,a){},48:function(e,t,a){},52:function(e,t,a){},54:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(21),o=a.n(i),s=(a(44),a(31)),l=a.n(s),c=a(33),u=a(13),p=a(14),d=a(17),h=a(15),f=a(16),v=a(11),m=(a(48),a(27)),y=a(28),g=a(30),b=a(23),A=a.n(b),j=a(56),O=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={designations:a.props.designations||[]},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"total",value:function(e){if(!this.props.data)return 0;var t=this.props.data[this.props.currentAlternative],a=0,r=!0,n=!1,i=void 0;try{for(var o,s=t.features[Symbol.iterator]();!(r=(o=s.next()).done);r=!0){var l=o.value;l.properties.designation===e&&(a+=l.properties.GIS_Acres)}}catch(c){n=!0,i=c}finally{try{r||null==s.return||s.return()}finally{if(n)throw i}}return Math.trunc(a).toLocaleString()}},{key:"totalForSale",value:function(){if(!this.props.data)return 0;var e=this.props.data[this.props.currentAlternative],t=0,a=!0,r=!1,n=void 0;try{for(var i,o=e.features[Symbol.iterator]();!(a=(i=o.next()).done);a=!0){var s=i.value;"OG-NoSale"!==s.properties.designation&&(t+=s.properties.GIS_Acres)}}catch(l){r=!0,n=l}finally{try{a||null==o.return||o.return()}finally{if(r)throw n}}return Math.trunc(t).toLocaleString()}},{key:"render",value:function(){var e=this,t=Object.keys(this.state.designations).map(function(t){return n.a.createElement(n.a.Fragment,{key:t},n.a.createElement("dt",null,e.state.designations[t].prettyName),n.a.createElement("dd",null,e.total(t)))});return n.a.createElement(n.a.Fragment,null,n.a.createElement("h4",null,"Statistics"),n.a.createElement("h5",null,"Total Acres Under Each Designation"),n.a.createElement("dl",{className:"dl-horizontal"},t),n.a.createElement("h5",null,"Total Acres for Sale: ",this.totalForSale()))}}]),t}(r.Component),k=["Alternative B","Alternative C","Alternative D1","Alternative D2"],S=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement(A.a,{position:"topright",className:"info"},n.a.createElement("h4",null,"Proposed Alternative: "),n.a.createElement(j.a.Control,{as:"select",defaultValue:this.props.currentAlternative,onChange:function(t){e.props.changeAlternative(t.target.value)}},k.map(function(e){return n.a.createElement("option",{key:e},e)})),n.a.createElement("hr",null),n.a.createElement(O,{currentAlternative:this.props.currentAlternative,designations:this.props.designations,data:this.props.data}))}}]),t}(r.Component),E=(a(52),{"OG-NoSale":{prettyName:"Not For Sale",color:"#7fc97f"},"OG-NSO":{prettyName:"No Surface Occupancy",color:"#beaed4"},"OG-CSU":{prettyName:"Controlled Surface Use",color:"#fdc086"},"OG-TL":{prettyName:"Timing Limitations",color:"#ffff99"},"OG-SaleSTC":{prettyName:"Standard Terms and Conditions",color:"#f0027f"}}),w=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={position:[69.78,-143.55],zoom:8},a.featureStyle=a.featureStyle.bind(Object(v.a)(Object(v.a)(a))),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"featureStyle",value:function(e){var t={fillOpacity:"0.3",color:"rgb(49, 130, 189)"},a=E[e.properties.designation].color;return t.fillColor=a,t}},{key:"baseMapStyle",value:function(e){return{color:"rgb(49, 130, 189)",fillColor:null,fillOpacity:0}}},{key:"render",value:function(){var e,t;return this.props.programArea&&(e=n.a.createElement(m.a,{data:this.props.programArea,style:this.baseMapStyle})),this.props.currentAlternative&&this.props.data&&(t=n.a.createElement(m.a,{data:this.props.data[this.props.currentAlternative],filter:this.showFeature,key:this.props.filterUpdateKey,style:this.featureStyle})),n.a.createElement(y.a,{center:this.state.position,zoom:this.state.zoom,id:"mapid"},n.a.createElement(g.a,{url:"https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",accessToken:x,attribution:"data from <a href='https://eplanning.blm.gov/epl-front-office/eplanning/planAndProjectSite.do?methodName=dispatchToPatternPage&currentPageId=152115'>Alaska BLM</a> ",id:"mapbox.outdoors"}),e,t,n.a.createElement(S,{currentAlternative:this.props.currentAlternative,changeAlternative:this.props.changeAlternative,data:this.props.data,designations:E}),n.a.createElement(A.a,{position:"bottomright",className:"info legend"},Object.keys(E).map(function(e){return n.a.createElement(n.a.Fragment,{key:e},n.a.createElement("i",{style:{background:E[e].color}}),E[e].prettyName,n.a.createElement("br",null))})))}}]),t}(r.Component),x="pk.eyJ1IjoibmdvdHRsaWViIiwiYSI6ImNqcm1yZjk3ZDBtY3M0M3RrY2k0N3RjMDcifQ.onvCNE2GGEo63j53moDLMw",N=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={programArea:null,data:null,currentAlternative:"Alternative B",filterUpdateKey:0},a.loadProgramArea(),a.loadAlternatives(),a.triggerFilterUpdate=a.triggerFilterUpdate.bind(Object(v.a)(Object(v.a)(a))),a.changeAlternative=a.changeAlternative.bind(Object(v.a)(Object(v.a)(a))),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"triggerFilterUpdate",value:function(){this.setState({filterUpdateKey:this.state.filterUpdateKey+1})}},{key:"changeAlternative",value:function(e){this.setState({currentAlternative:e,filterUpdateKey:this.state.filterUpdateKey+1})}},{key:"loadProgramArea",value:function(){var e=Object(c.a)(l.a.mark(function e(){var t,a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("./data/CoastalPlain_ProgramArea.json");case 3:return t=e.sent,e.next=6,t.json();case 6:a=e.sent,this.setState({programArea:a.default}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}},e,this,[[0,10]])}));return function(){return e.apply(this,arguments)}}()},{key:"loadAlternatives",value:function(){var e=Object(c.a)(l.a.mark(function e(){var t,a,r,n,i;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t={},e.next=4,fetch("./data/alternative_b.json");case 4:return a=e.sent,e.next=7,a.json();case 7:return t["Alternative B"]=e.sent,e.next=10,fetch("./data/alternative_c.json");case 10:return r=e.sent,e.next=13,r.json();case 13:return t["Alternative C"]=e.sent,e.next=16,fetch("./data/alternative_d1.json");case 16:return n=e.sent,e.next=19,n.json();case 19:return t["Alternative D1"]=e.sent,e.next=22,fetch("./data/alternative_d2.json");case 22:return i=e.sent,e.next=25,i.json();case 25:t["Alternative D2"]=e.sent,this.setState({data:t}),e.next=32;break;case 29:e.prev=29,e.t0=e.catch(0),console.log(e.t0);case 32:case"end":return e.stop()}},e,this,[[0,29]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement(w,{programArea:this.state.programArea,data:this.state.data,currentAlternative:this.state.currentAlternative,filterUpdateKey:this.state.filterUpdateKey,changeAlternative:this.changeAlternative}))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[38,2,1]]]);
//# sourceMappingURL=main.c6d77f6e.chunk.js.map