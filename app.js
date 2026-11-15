let YEARS=[2021,2022,2023,2024,2025];
const FIELDS=[
 ["ca","Chiffre d'affaires"],["cogs","Coût des ventes"],["sga","Frais commerciaux et généraux"],["dep","Dotations aux amortissements"],
 ["ebit","Résultat d'exploitation (EBIT)"],["interest","Charges d'intérêts"],["net","Résultat net"],["cfo","Flux de trésorerie d'exploitation"],
 ["rec","Créances clients"],["inv","Stocks"],["ca_cur","Actif circulant"],["ppe","Immobilisations corporelles nettes"],
 ["ta","Total actif"],["cl","Passif circulant"],["ltd","Dettes financières long terme"],["equity","Capitaux propres"],["re","Réserves et report à nouveau"]
];
const HYP=[
 ["rawShare","Part du coût des ventes liée au pétrole / éthylène","pct"],
 ["pass","Part de la hausse des coûts répercutée sur les prix","pct"],
 ["salesFx","Ventes exposées au dollar (négatif si devise = USD)","pct"],
 ["costFx","Coûts exposés au dollar (négatif si devise = USD)","pct"],
 ["co2","Émissions de CO₂ scopes 1-2 (Mt/an)","n"],
 ["co2exp","Part des émissions soumise à une taxe carbone","pct"],
 ["eur","Cours : 1 € en devise de publication","n"],
 ["debt","Endettement financier total (M devise)","n"],
 ["float","Part de la dette à taux variable","pct"],
 ["sea","Part des achats transportés par voie maritime","pct"],
 ["tax","Taux d'impôt sur les sociétés","pct"]
];
const EXAMPLE={
 snep:{name:"SNEP",country:"Maroc",cur:"MDH",data:{
  ca:[1082.8,1107.4,794.5,633.3,745.7],cogs:[600.4,744.0,451.4,494.0,598.6],sga:[195.2,206.2,200.0,196.4,198.5],dep:[28.8,28.8,36.8,60.2,75.1],
  ebit:[207.5,153.0,-10.7,-51.9,-157.1],interest:[16.0,13.1,24.0,33.6,39.4],net:[134.2,87.1,-56.8,-74.6,-192.5],cfo:[76.3,-23.7,17.5,-1.7,-69.9],
  rec:[461.4,398.1,227.4,306.1,317.7],inv:[144.5,266.6,224.5,219.6,202.4],ca_cur:[931.3,854.7,643.8,653.3,625.1],ppe:[353.1,387.0,471.7,587.6,572.5],
  ta:[1744.9,1702.2,1622.1,1797.5,1673.5],cl:[715.0,674.3,727.3,862.7,965.3],ltd:[171.7,130.6,92.6,207.3,173.1],equity:[858.2,897.3,802.2,727.5,535.1],re:[484.0,570.2,618.9,562.2,487.5]},
  hyp:{rawShare:.55,pass:.30,salesFx:.10,costFx:.60,co2:.12,co2exp:0,eur:10.8,debt:820.7,float:.75,sea:.60,tax:.30}},
 arkema:{name:"Arkema",country:"France",cur:"M€",data:{
  ca:[9519,11550,9514,9544,9068],cogs:[7376,8970,7554,7605,7454],sga:[784,868,874,920,910],dep:[817,707,718,802,838],
  ebit:[1733,1287,681,586,288],interest:[53,71,70,73,125],net:[1309,965,418,354,63],cfo:[915,1496,1272,1121,997],
  rec:[1432,1360,1261,1312,1185],inv:[1283,1399,1208,1348,1142],ca_cur:[5385,4762,4858,4995,4825],ppe:[3031,3429,3730,4227,3935],
  ta:[12301,13511,14517,15209,14245],cl:[1993,2410,2079,2486,2260],ltd:[2680,2560,3734,3680,3802],equity:[6350,7339,7455,7761,7032],re:[5598,6218,6304,6439,6292]},
  hyp:{rawShare:.35,pass:.60,salesFx:.34,costFx:.30,co2:1.9,co2exp:.50,eur:1,debt:4558,float:.15,sea:.30,tax:.25}},
 dow:{name:"Dow",country:"États-Unis",cur:"M$",data:{
  ca:[54968,56902,44622,42964,39968],cogs:[44191,48338,39742,38358,37435],sga:[1313,1337,1265,1317,1384],dep:[2842,2758,2611,2894,2834],
  ebit:[7881,5584,1572,1802,-1698],interest:[731,662,746,811,865],net:[6311,4582,589,1116,-2623],cfo:[7009,7475,5196,2914,1032],
  rec:[6920,5713,4731,4756,4762],inv:[7372,6988,6076,6544,6595],ca_cur:[20848,20477,17614,16590,18062],ppe:[20555,20442,21066,22004,22250],
  ta:[62990,60603,57967,57312,58538],cl:[13226,11331,9957,10288,9180],ltd:[14280,14698,14907,15711,17849],equity:[18739,21247,19108,17851,17522],re:[20623,23180,21774,20909,16781]},
  hyp:{rawShare:.20,pass:.50,salesFx:-.60,costFx:-.40,co2:26.6,co2exp:.23,eur:1.08,debt:19598,float:.10,sea:.20,tax:.21}}
};


EXAMPLE.snep.sector="Chimie (PVC, électrolyse)";EXAMPLE.arkema.sector="Chimie de spécialités";EXAMPLE.dow.sector="Chimie de base";
EXAMPLE.snep.env={eco:"Surcapacité mondiale de PVC et importations à bas prix ; nouvelles unités (90 000 t de PVC) encore en stabilisation ; approvisionnement en éthylène perturbé.",reg:"Droits antidumping sur le PVC américain (24,88 %) et égyptien (jusqu'à 92,19 %).",geo:"Éthylène importé par voie maritime ; prix fixés sur le marché mondial ; protection dépendante de décisions publiques révisables.",audit:"Continuité d'exploitation"};
EXAMPLE.arkema.env={eco:"Demande faible aux États-Unis et en Europe ; cycle bas des acryliques ; dollar faible (effet change −2,9 % sur les ventes 2025).",reg:"PFAS à Pierre-Bénite (site Seveso seuil haut), assignation en justice de janvier 2026 ; quotas carbone européens.",geo:"Un tiers des ventes en Amérique du Nord ; investissements en Chine.",audit:"Provisions et litiges environnementaux"};
EXAMPLE.dow.env={eco:"Surcapacités en Asie et en Europe ; marges au plus bas ; dividende réduit de 50 %, projet Path2Zero reporté de deux ans.",reg:"Fermeture de trois actifs européens ; 23 % des émissions directes sous quotas européens ; restructuration de 1,1 à 1,5 Md$.",geo:"60 % des ventes hors États-Unis et Canada ; coentreprises au Moyen-Orient (Sadara, EQUATE).",audit:"Restructuration et dépréciations"};
EXAMPLE.snep.src=["Comptes sociaux publiés sur le site de l'AMMC : états financiers 2021, 2022, 2025 et rapport financier annuel 2024 (snep.ma).", "Coût des ventes = achats consommés de matières et fournitures. Frais généraux = autres charges externes + impôts et taxes + charges de personnel. Passif circulant = dettes du passif circulant + trésorerie-passif (et provisions). Actif circulant 2022 estimé. Flux d'exploitation estimés : résultat net + dotations − variation (clients + stocks) + variation des dettes circulantes ; 2021 sans la variation des dettes."];EXAMPLE.arkema.src=["Communiqués de résultats annuels (Business Wire), données S&amp;P Global reprises par stockanalysis.com et abcbourse.com.", "Résultat d'exploitation IFRS publié (2021 gonflé par la cession du PMMA). Charges d'intérêts = résultat financier. Réserves = « primes et réserves ». Capitaux propres y compris minoritaires."];EXAMPLE.dow.src=["Rapports 10-K (SEC) via edgar.tools, stockanalysis.com, kalkinemedia.com et barchart.com.", "Résultat d'exploitation calculé par S&amp;P. Résultat net part du groupe. Flux d'exploitation totaux. Capitaux propres y compris minoritaires."];
const PALETTE=["#0F8B8D","#3F5FD8","#8E44AD","#C2410C","#2F7D32","#B0306A","#7A5C00","#1F6F9F"];
const STORE="riskscope-fidex5-v2";
const clone=o=>JSON.parse(JSON.stringify(o));
function fresh(){return{cos:{},order:[]};}
let state;
try{const s=JSON.parse(localStorage.getItem(STORE)||"null");state=s&&s.cos&&s.order?s:null;if(state)state.order=state.order.filter(k=>state.cos[k]);}catch(e){state=null;}
if(!state) state=fresh();
document.documentElement.style.setProperty("--c1",PALETTE[0]);document.documentElement.style.setProperty("--c2",PALETTE[1]);document.documentElement.style.setProperty("--c3",PALETTE[2]);
let scen={oil:0,fx:0,demand:0,log:0,carbon:0,rate:0,cost:0,oneoff:0};
let scenName="aucun";
let ui={year:4,planCo:"all",dataCo:state.order[0],missionCo:state.order[0]};
function save(){try{localStorage.setItem(STORE,JSON.stringify(state));}catch(e){}}
const keys=()=>state.order.filter(k=>state.cos[k]);
const col=k=>state.cos[k].color||"#555";

const fmt=(v,d=0)=>{if(v==null||!isFinite(v))return "n.d.";let r=Number(v.toFixed(d));if(r===0)r=0;return r.toLocaleString("fr-FR",{minimumFractionDigits:d,maximumFractionDigits:d});};
const pct=(v,d=0)=>(v==null||!isFinite(v))?"n.d.":(v*100).toLocaleString("fr-FR",{maximumFractionDigits:d,minimumFractionDigits:d})+" %";
const clamp=(v,a=0,b=100)=>Math.max(a,Math.min(b,v));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const parseNum=s=>{if(s==null)return NaN;let t=String(s).trim().replace(/[\s  ]/g,"");if(/^\(.*\)$/.test(t))t="-"+t.slice(1,-1);t=t.replace(/−/g,"-");if(/,\d{1,2}$/.test(t)&&!/\.\d/.test(t))t=t.replace(/\./g,"").replace(",",".");else t=t.replace(/,/g,"");return t===""?NaN:Number(t);};

/* ---------- Calculs ---------- */
function yr(d,t){const o={};for(const [k] of FIELDS){const v=d[k]?d[k][t]:null;o[k]=(v===null||v===undefined||v==="")?NaN:Number(v);}return o;}
function beneish(d,t){
  if(t<1)return {};const c=yr(d,t),p=yr(d,t-1);
  const sdiv=(a,b)=>b?a/b:NaN;
  const gm=x=>sdiv(x.ca-x.cogs,x.ca);
  const DSRI=sdiv(sdiv(c.rec,c.ca),sdiv(p.rec,p.ca));
  const GMI=sdiv(gm(p),gm(c));
  const AQI=sdiv(1-sdiv(c.ca_cur+c.ppe,c.ta),1-sdiv(p.ca_cur+p.ppe,p.ta));
  const SGI=sdiv(c.ca,p.ca);
  const DEPI=sdiv(sdiv(p.dep,p.dep+p.ppe),sdiv(c.dep,c.dep+c.ppe));
  const SGAI=sdiv(sdiv(c.sga,c.ca),sdiv(p.sga,p.ca));
  const LVGI=sdiv(sdiv(c.cl+c.ltd,c.ta),sdiv(p.cl+p.ltd,p.ta));
  const TATA=sdiv(c.net-c.cfo,c.ta);
  const M=-4.84+.920*DSRI+.528*GMI+.404*AQI+.892*SGI+.115*DEPI-.172*SGAI+4.679*TATA-.327*LVGI;
  return{DSRI,GMI,AQI,SGI,DEPI,SGAI,LVGI,TATA,M};
}
function mZone(M){return !isFinite(M)?"na":M>-1.78?"crit":M>-2.22?"warn":"good";}
const M_LABEL={crit:"Manipulation probable",warn:"Zone grise",good:"Pas d'alerte",na:"Non calculé"};
function altman(x){const tl=x.ta-x.equity;return .717*(x.ca_cur-x.cl)/x.ta+.847*x.re/x.ta+3.107*x.ebit/x.ta+.420*x.equity/(tl||1)+.998*x.ca/x.ta;}
const BEN=[1,2,3,4,5,6,7,8,9].map(d=>Math.log10(1+1/d));
function benford(d){
  const cnt=Array(9).fill(0);let n=0;
  for(const [k] of FIELDS)for(const v of d[k]){let a=Math.abs(Number(v));if(!a||!isFinite(a))continue;while(a>=10)a/=10;while(a<1)a*=10;cnt[Math.floor(a)-1]++;n++;}
  const obs=cnt.map(c=>n?c/n:0);const mad=obs.reduce((s,o,i)=>s+Math.abs(o-BEN[i]),0)/9;
  return{obs,mad,n};
}
function benZone(m){return m<0.012?"good":m<0.015?"warn":"crit";}
function stress(key){
  const co=state.cos[key],h=co.hyp,b=yr(D(key),4),s=scen,c={};
  const cg=isFinite(b.cogs)?b.cogs:(isFinite(b.ca)&&isFinite(b.ebit)?0.7*(b.ca-b.ebit):0);
  const oilCost=cg*h.rawShare*s.oil/100;
  c.oil=-oilCost+oilCost*h.pass;
  c.fx=(b.ca*h.salesFx-cg*h.costFx)*s.fx/100;
  c.demand=-(b.ca-cg)*s.demand/100;
  c.log=-cg*h.sea*0.10*s.log/100;
  c.carbon=-h.co2*h.co2exp*s.carbon*h.eur;
  c.cost=-(isFinite(b.sga)?b.sga:0.3*(b.ca-b.ebit))*(s.cost||0)/100;
  c.oneoff=-b.ca*(s.oneoff||0)/100;
  const dInt=(h.debt!=null&&isFinite(h.debt)?h.debt:(isFinite(b.ltd)?b.ltd:0))*h.float*s.rate/10000;
  c.rate=-dInt;
  const dCA=oilCost*h.pass+b.ca*h.salesFx*s.fx/100-b.ca*s.demand/100;
  const dEBIT=c.oil+c.fx+c.demand+c.log+c.carbon+c.cost+c.oneoff;
  const ebit=b.ebit+dEBIT, interest=b.interest+dInt;
  const dNet=(dEBIT-dInt)*(1-h.tax), net=b.net+dNet, ca=b.ca+dCA;
  const zb=altman(b), zs=altman({...b,ebit,ca,re:b.re+dNet,equity:b.equity+dNet});
  const cov=interest>0?ebit/interest:Infinity, covB=b.interest>0?b.ebit/b.interest:Infinity;
  let verdict="good";
  if(zs<1.23||cov<1.5||net<0)verdict="crit";else if(zs<2.9||cov<3)verdict="warn";else if(!isFinite(zs)&&!isFinite(cov))verdict="na";
  return{b,c,ca,ebit,interest,net,zb,zs,cov,covB,verdict,dEBIT,marginB:b.ebit/b.ca,marginS:ebit/ca};
}
const VERD={good:"Résiste",warn:"Fragilisée",crit:"Continuité menacée",na:"Non calculé"};
function scenActive(){return Object.values(scen).some(v=>v!==0);}
function risks(key){
  const co=state.cos[key],d=D(key),b=yr(d,4),p=yr(d,3),h=co.hyp;
  const be=beneish(d,4),st=stress(key);
  const lev=(b.cl+b.ltd)/b.ta;
  const invIdx=(b.inv/p.inv)/(b.ca/p.ca);
  const fxExp=Math.abs(h.salesFx*b.ca-h.costFx*(isFinite(b.cogs)?b.cogs:b.ca-b.ebit))/b.ca;
  const ebitDrop=Math.abs(b.ebit)>0?-st.dEBIT/Math.abs(b.ebit):0;
  const carbonRatio=Math.abs(b.ebit)>0?(h.co2*h.co2exp*100*h.eur)/Math.abs(b.ebit):0;
  const L=[];
  const add=(risk,prob,impact,compte,assertion,proc,why)=>L.push({key,risk,prob:clamp(Math.round(prob)||1,1,5),impact,compte,assertion,proc,why});
  add("Manipulation des comptes",!isFinite(be.M)?2:be.M>-1.78?5:be.M>-2.22?3:1,5,"Chiffre d'affaires, créances","Réalité, séparation des exercices","Tests de cut-off, revue des écritures manuelles de clôture et des avoirs post-clôture",isFinite(be.M)?`M-score ${fmt(be.M,2)}`:"M-score non calculé (données incomplètes)");
  add("Recouvrement des créances",be.DSRI>1.15?4:be.DSRI>1.05?3:2,3,"Créances clients","Existence, évaluation","Circularisation clients, balance âgée, revue des dépréciations",`DSRI ${fmt(be.DSRI,2)}`);
  add("Surstockage / dépréciation des stocks",invIdx>1.15?4:invIdx>1.05?3:2,3,"Stocks","Existence, évaluation","Assister à l'inventaire physique, tester la valeur nette de réalisation",`Stocks/CA ${fmt(invIdx,2)}`);
  add("Marge sous pression (coûts matières)",scenActive()?(ebitDrop>.5?5:ebitDrop>.25?4:ebitDrop>.1?3:2):(be.GMI>1.1?4:be.GMI>1.02?3:2),4,"Coût des ventes, stocks","Évaluation, exhaustivité","Analyse des marges par produit, test des coûts de revient et des achats",scenActive()?`EBIT ${pct(-ebitDrop)} sous scénario`:`GMI ${fmt(be.GMI,2)}`);
  add("Risque de change",fxExp>.3?4:fxExp>.15?3:2,3,"Dettes et créances en devises, écarts de change","Évaluation","Contrôle de la conversion au cours de clôture, revue des couvertures",`Exposition nette ${pct(fxExp)}`);
  add("Continuité d'exploitation",(st.zs<1.23||st.cov<1.5)?5:st.zs<2.9?3:1,5,"Ensemble des états financiers","Présentation","Prévisions de trésorerie à 12 mois, respect des covenants, lettre d'affirmation",`Z' ${fmt(st.zs,2)}, couverture ${isFinite(st.cov)?fmt(st.cov,1)+"×":"n.d."}`);
  add("Endettement et taux",lev>.6?4:lev>.45?3:2,3,"Emprunts et dettes financières","Exhaustivité, présentation","Confirmations bancaires, tableau des emprunts, test des covenants",`Endettement ${pct(lev)} de l'actif`);
  add("Réglementation carbone / environnement",carbonRatio>.3?4:carbonRatio>.1?3:2,3,"Provisions, quotas d'émission","Exhaustivité","Revue des quotas CO₂, des litiges et provisions environnementales",`Coût à 100 €/t : ${pct(carbonRatio)} de l'EBIT`);
  return L.map(r=>({...r,score:r.prob*r.impact}));
}
const SHORT={"Manipulation des comptes":"Fraude","Recouvrement des créances":"Créances","Surstockage / dépréciation des stocks":"Stocks","Marge sous pression (coûts matières)":"Marge","Risque de change":"Change","Continuité d'exploitation":"Continuité","Endettement et taux":"Dette","Réglementation carbone / environnement":"Carbone"};
const prio=s=>s>=15?"crit":s>=8?"warn":"good";
const PRIO_L={crit:"Élevée",warn:"Moyenne",good:"Faible"};

/* ---------- Rendu ---------- */
function coCard(key,inner){const co=state.cos[key];return `<div class="card co" style="--co:${col(key)}"><div class="co-head"><span class="co-name">${esc(co.name)}</span><span class="co-meta">${esc(co.country||"")}${co.country?" · ":""}${esc(co.cur)}${co.custom?' <span class="tag">ajoutée</span>':""}</span></div>${inner}</div>`;}
function pill(z,text){return `<span class="pill ${z}">${text}</span>`;}

function radarSVG(vals,color){
  const labels=["Créances","Marges","Accruals","Endettement","Stocks","Benford"];
  const W=300,cx=150,cy=120,R=82,n=labels.length;
  const pt=(i,r)=>{const a=-Math.PI/2+i*2*Math.PI/n;return[cx+r*Math.cos(a),cy+r*Math.sin(a)];};
  let s=`<svg viewBox="0 0 ${W} 240" width="100%" style="max-width:320px" role="img" aria-label="Radar des risques : ${labels.map((l,i)=>l+" "+Math.round(vals[i])).join(", ")}">`;
  for(const f of [.25,.5,.75,1]){s+=`<polygon points="${labels.map((_,i)=>pt(i,R*f).join(",")).join(" ")}" fill="none" stroke="var(--line)" stroke-width="1"/>`;}
  labels.forEach((l,i)=>{const[x,y]=pt(i,R);s+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--line)"/>`;const[lx,ly]=pt(i,R+18);s+=`<text x="${lx}" y="${ly+4}" font-size="11" text-anchor="${Math.abs(lx-cx)<5?"middle":lx>cx?"start":"end"}">${l}</text>`;});
  s+=`<text x="${cx+3}" y="${cy-R*.5+3}" font-size="9">50</text><text x="${cx+3}" y="${cy-R+10}" font-size="9">100</text>`;
  s+=`<polygon points="${vals.map((v,i)=>pt(i,R*(v||0)/100).join(",")).join(" ")}" fill="${color}" fill-opacity=".2" stroke="${color}" stroke-width="2"/>`;
  vals.forEach((v,i)=>{const[x,y]=pt(i,R*(v||0)/100);s+=`<circle cx="${x}" cy="${y}" r="3.2" fill="${color}"/>`;});
  return s+"</svg>";
}
function radarData(k,t){
  const d=D(k),be=beneish(d,t),bf=benford(RD(k)),c=yr(d,t),p=yr(d,t-1);
  const lev=(c.cl+c.ltd)/c.ta, invIdx=(c.inv/p.inv)/(c.ca/p.ca);
  const v=[clamp((be.DSRI-.9)/.5*100),clamp((be.GMI-.9)/.4*100),clamp((be.TATA+.05)/.1*100),clamp((lev-.3)/.4*100),clamp((invIdx-.9)/.5*100),clamp(bf.mad/.03*100)];
  const al=[];const g=(a,b2)=>(a/b2-1);
  const recG=g(c.rec,p.rec),caG=g(c.ca,p.ca),invG=g(c.inv,p.inv);
  if(recG-caG>.1)al.push(["crit",`Créances ${pct(recG)} contre CA ${pct(caG)} : ventes fictives ou clients qui paient mal ?`]);
  else al.push(["good",`Créances (${pct(recG)}) cohérentes avec le CA (${pct(caG)})`]);
  if(invG-caG>.1)al.push(["warn",`Stocks ${pct(invG)} contre CA ${pct(caG)} : risque de stocks obsolètes`]);
  if(be.TATA>.03)al.push(["crit",`Résultat bien supérieur à la trésorerie générée (TATA ${fmt(be.TATA,3)})`]);
  else if(c.cfo<0)al.push(["warn",`Flux de trésorerie d'exploitation négatif : ${fmt(c.cfo)} ${state.cos[k].cur}`]);
  if(be.GMI>1.05)al.push(["warn",`Marge brute en recul (GMI ${fmt(be.GMI,2)}) : incitation à embellir les comptes`]);
  if(be.SGI>1.2)al.push(["warn",`Forte croissance (${pct(be.SGI-1)}) : pression sur les objectifs`]);
  return{be,v,al};
}
const SLIDERS=[
 ["oil","Prix du pétrole / éthylène",-40,80,5,"%","Matière première du PVC et de la chimie"],
 ["fx","Dollar face aux autres devises",-20,30,1,"%","+ = dollar plus fort"],
 ["demand","Baisse de la demande",0,40,1,"%","Récession, perte d'un client majeur"],
 ["log","Surcoût du fret maritime",0,30,1,"%","Blocage mer Rouge, détroit d'Ormuz"],
 ["carbon","Taxe carbone",0,200,5," €/t","Quotas UE, ajustement carbone aux frontières"],
 ["rate","Hausse des taux d'intérêt",0,500,25," pb","Sur la dette à taux variable"],
 ["cost","Hausse des autres coûts d'exploitation",0,30,1,"%","Salaires, énergie, sous-traitance"],
 ["oneoff","Charge ou perte exceptionnelle",0,20,1,"% du CA","Litige, amende, dépréciation, sinistre"]
];
const PRESETS=[
 ["Choc pétrolier",{oil:40,fx:5,demand:0,log:5,carbon:0,rate:0}],
 ["Crise en mer Rouge",{oil:10,fx:0,demand:0,log:20,carbon:0,rate:0}],
 ["Dollar fort",{oil:0,fx:15,demand:0,log:0,carbon:0,rate:0}],
 ["Récession mondiale",{oil:-20,fx:0,demand:15,log:0,carbon:0,rate:100}],
 ["Taxe carbone UE",{oil:0,fx:0,demand:0,log:0,carbon:100,rate:0}],
 ["Hausse des taux",{oil:0,fx:0,demand:0,log:0,carbon:0,rate:250}]
];
const sign=(k,v)=>(v>0&&(k==="oil"||k==="fx")?"+":"")+(v||0);
function renderSliders(){
  document.getElementById("sliders").innerHTML=SLIDERS.map(([k,l,mn,mx,st,u,hint])=>`<div class="sl"><label for="s-${k}"><span>${l}</span><output id="o-${k}">${sign(k,scen[k]||0)}${u}</output></label><input type="range" id="s-${k}" min="${mn}" max="${mx}" step="${st}" value="${scen[k]||0}"><div class="hint">${hint}</div></div>`).join("");
  SLIDERS.forEach(([k,,,,,u])=>{document.getElementById("s-"+k).oninput=e=>{scen[k]=+e.target.value;scenName="personnalisé";document.getElementById("o-"+k).textContent=sign(k,scen[k])+u;updateStress();};});
  document.getElementById("presets").innerHTML=PRESETS.map(([n],i)=>`<button class="btn" data-i="${i}">${n}</button>`).join("")+`<button class="btn dark" data-i="-1">Réinitialiser</button>`;
  document.querySelectorAll("#presets button").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(i<0){scen={...ZERO};scenName="aucun";}else{scen={...ZERO,...PRESETS[i][1]};scenName=PRESETS[i][0];}renderSliders();updateStress();});
}
function updateStress(){renderStress();renderOverview();renderMatrix();renderPlan();renderRatios();if(document.getElementById("view-mission").classList.contains("active"))renderMission();}
const NAMES={oil:"Pétrole",fx:"Change",demand:"Demande",log:"Fret",carbon:"Carbone",rate:"Taux",cost:"Autres coûts",oneoff:"Exceptionnel"};
function renderData(){
  if(!keys().length)return;
  if(!keys().includes(ui.dataCo))ui.dataCo=keys()[0];
  const seg=document.getElementById("data-co");
  seg.innerHTML=keys().map(k=>`<button aria-pressed="${ui.dataCo===k}" data-k="${k}">${esc(state.cos[k].name)}</button>`).join("");
  seg.querySelectorAll("button").forEach(b=>b.onclick=()=>{ui.dataCo=b.dataset.k;renderData();});
  const co=state.cos[ui.dataCo];
  document.getElementById("data-title").textContent=`Comptes de ${co.name} (${co.cur})`;
  const sc=document.getElementById("src-card");sc.hidden=!co.src;if(co.src)document.getElementById("src-body").innerHTML=`<p><b>Sources :</b> ${co.src[0]}</p><p class="small" style="margin-top:6px"><b>Retraitements :</b> ${co.src[1]}</p><p class="small">À vérifier dans les rapports annuels originaux.</p>`;
  const del=document.getElementById("del-co");del.hidden=STOREX.mode==="db"&&STOREX.canWrite===false;
  del.onclick=()=>{if(del.dataset.confirm!=="1"){del.dataset.confirm="1";del.textContent="Confirmer la suppression";setTimeout(()=>{del.dataset.confirm="";del.textContent="Supprimer cette société";},4000);return;}
    const k=ui.dataCo;del.dataset.confirm="";del.textContent="Supprimer cette société";deleteCo(k);};
  const RY=realYears(ui.dataCo),FC=fcActive(ui.dataCo),PJ=FC?proj(ui.dataCo):null;
  document.getElementById("data-table").innerHTML=`<thead><tr><th>Poste (${esc(co.cur)})</th>${RY.map(y=>`<th class="n">${y}</th>`).join("")}${FC?`<th class="n">${CUR_YEAR} (prévision)</th>`:""}</tr></thead><tbody>${FIELDS.map(([k,l])=>`<tr><td>${l}</td>${RY.map((y,t)=>`<td><input id="d-${k}-${t}" inputmode="decimal" value="${co.data[k][t]==null?"":co.data[k][t]}" aria-label="${esc(l)} ${y}"></td>`).join("")}${FC?`<td class="fc">${fmt(PJ[k],Math.abs(PJ[k])<100?1:0)}</td>`:""}</tr>`).join("")}</tbody>`;
  document.querySelectorAll("#data-table input").forEach(inp=>inp.onchange=()=>{const[,k,t]=inp.id.split("-");const v=parseNum(inp.value);if(isFinite(v)){co.data[k][+t]=v;saveCo(ui.dataCo);refreshAll();}else if(inp.value.trim()===""){co.data[k][+t]=null;saveCo(ui.dataCo);refreshAll();}else inp.value=co.data[k][+t]==null?"":co.data[k][+t];});
  document.getElementById("hyp-table").innerHTML=`<thead><tr><th>Hypothèse</th><th class="n">Valeur</th></tr></thead><tbody>${HYP.map(([k,l,u])=>`<tr><td>${l}${u==="pct"?" <span class='small'>(%)</span>":""}</td><td style="width:120px"><input id="h-${k}" inputmode="decimal" value="${co.hyp[k]==null?"":u==="pct"?+(co.hyp[k]*100).toFixed(1):co.hyp[k]}" aria-label="${esc(l)}"></td></tr>`).join("")}</tbody>`;
  document.querySelectorAll("#hyp-table input").forEach(inp=>inp.onchange=()=>{const k=inp.id.slice(2);const u=HYP.find(h=>h[0]===k)[2];const v=parseNum(inp.value);if(isFinite(v)){co.hyp[k]=u==="pct"?v/100:v;co.hypUser=true;saveCo(ui.dataCo);refreshAll();}else if(k==="debt"&&inp.value.trim()===""){co.hyp.debt=null;saveCo(ui.dataCo);refreshAll();}});
}
function renderPdfSelect(){
  const s=document.getElementById("pdf-co");const cur=s.value;
  s.innerHTML=`<option value="all">Toutes les sociétés</option>`+keys().map(k=>`<option value="${k}">${esc(state.cos[k].name)}</option>`).join("");
  if([...s.options].some(o=>o.value===cur))s.value=cur;
}
function setupDataTools(){
  const msg=t=>{const m=document.getElementById("data-msg");m.textContent=t;setTimeout(()=>{if(m.textContent===t)m.textContent="";},4000);};
  document.getElementById("copy-json").onclick=async()=>{const t=JSON.stringify({cos:state.cos,order:state.order,team:state.team,phases:state.phases});try{await navigator.clipboard.writeText(t);msg("Données copiées. Collez-les dans un message au groupe.");}catch(e){document.getElementById("json-area").value=t;msg("Copie impossible ici : le texte est dans la zone ci-dessous.");}};
  document.getElementById("import-json").onclick=()=>{try{const o=JSON.parse(document.getElementById("json-area").value);const cos=o.cos||o;const order=o.order||Object.keys(cos);if(!order.every(k=>cos[k]&&cos[k].data&&cos[k].hyp))throw 0;order.forEach((k,i)=>{if(!cos[k].color)cos[k].color=PALETTE[i%PALETTE.length];});Object.entries(cos).forEach(([k,c])=>{state.cos[k]=c;saveCo(k);});if(o.team)state.team=o.team;if(o.phases)state.phases=o.phases;state.order=order.filter(k=>state.cos[k]);save();refreshAll();msg("Analyses importées dans l'historique.");}catch(e){msg("Texte non reconnu : collez exactement le texte copié avec le bouton « Copier ».");}};
  document.getElementById("reset-data").onclick=()=>{loadExample("all");location.hash="#accueil";};
}

/* ---------- Nouvelle société ---------- */
const dlg=document.getElementById("new-dlg");
function nfYears(){const y=parseInt(document.getElementById("nf-year").value,10);const ly=y>1990&&y<2100?y:2025;return[ly-4,ly-3,ly-2,ly-1,ly];}
function nfTable(keep){
  const old={};if(keep)document.querySelectorAll("#nf-table input").forEach(i=>old[i.id]=i.value);
  const ys=nfYears();
  document.getElementById("nf-table").innerHTML=`<thead><tr><th>Poste (millions)</th>${ys.map(y=>`<th class="n">${y}</th>`).join("")}</tr></thead><tbody>${FIELDS.map(([k,l])=>`<tr><td>${l}</td>${ys.map((y,t)=>`<td><input id="nf-${k}-${t}" inputmode="decimal" aria-label="${esc(l)} ${y}" value="${esc(old[`nf-${k}-${t}`]||"")}"></td>`).join("")}</tr>`).join("")}</tbody>`;
}
function openNew(){
  document.getElementById("new-form").reset();nfTable();nfQuick();setMode(sampler?"pdf":"quick");
  ["nf-pdf-msg"].forEach(id=>{const m=document.getElementById(id);m.textContent="";m.className="msg";});
  if(STOREX.mode==="db"&&STOREX.canWrite===false){histMsg("Lecture seule : demandez un accès Éditeur pour créer des analyses.",true);return;}
  document.getElementById("nf-err").textContent="";document.getElementById("nf-paste-msg").textContent="";document.getElementById("nf-file-msg").textContent="";
  if(dlg.showModal)dlg.showModal();else dlg.setAttribute("open","");
  document.getElementById("nf-name").focus();
}
function closeNew(){if(dlg.close)dlg.close();else dlg.removeAttribute("open");}
document.getElementById("open-new").onclick=openNew;
document.getElementById("nf-year").onchange=()=>nfTable(true);
document.getElementById("nf-file").onchange=e=>{const f=e.target.files&&e.target.files[0];if(f)importFile(f);};
document.getElementById("nf-template").onclick=()=>downloadTemplate();
document.getElementById("new-close").onclick=closeNew;
document.getElementById("nf-cancel").onclick=closeNew;
document.getElementById("nf-fill").onclick=()=>{
  const lines=document.getElementById("nf-paste").value.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  const m=document.getElementById("nf-paste-msg");
  let filled=0;
  lines.slice(0,FIELDS.length).forEach((line,i)=>{
    let cells=line.split(/\t|;/).map(c=>c.trim());
    if(cells.length>5&&!isFinite(parseNum(cells[0])))cells=cells.slice(1);
    if(cells.length===6)cells=cells.slice(1);
    cells.slice(-5).forEach((c,t)=>{const v=parseNum(c);if(isFinite(v)){document.getElementById(`nf-${FIELDS[i][0]}-${t}`).value=v;filled++;}});
  });
  m.className="msg"+(filled?"":" err");
  m.textContent=filled?`${filled} cases remplies sur ${FIELDS.length*5}. Vérifiez le tableau.`:"Aucun chiffre reconnu : collez 17 lignes de 5 colonnes séparées par des tabulations.";
};
document.getElementById("new-form").onsubmit=e=>{
  e.preventDefault();
  const err=document.getElementById("nf-err");err.textContent="";
  const name=document.getElementById("nf-name").value.trim();
  if(!name){err.textContent="Indiquez le nom de la société.";return;}
  const data={};let filled=0,missing=0;
  if(nfMode==="quick"){
    for(const [k] of FIELDS)data[k]=[null,null,null,null,null];
    QUICK_F.forEach(k=>[3,4].forEach(t=>{const v=parseNum(document.getElementById(`nq-${k}-${t}`).value);if(isFinite(v)){data[k][t]=v;filled++;}else missing++;}));
  }else{
    for(const [k] of FIELDS){data[k]=[0,1,2,3,4].map(t=>{const v=parseNum(document.getElementById(`nf-${k}-${t}`).value);if(isFinite(v)){filled++;return v;}missing++;return null;});}
  }
  for(const k of ["ca","ta","equity"]){if(![3,4].every(t=>isFinite(data[k][t])&&data[k][t]!==0)){err.textContent="Le chiffre d'affaires, le total actif et les capitaux propres sont obligatoires pour les deux derniers exercices.";return;}}
  const cur=document.getElementById("nf-cur").value;
  const hyp={rawShare:.30,pass:.50,salesFx:cur==="M$"?0:.10,costFx:cur==="M$"?0:.30,co2:0,co2exp:0,eur:cur==="MDH"?10.8:cur==="M$"?1.08:1,debt:null,float:.30,sea:.30,tax:.25};
  const ly=nfYears()[4];
  addCo({name,country:document.getElementById("nf-country").value.trim(),sector:document.getElementById("nf-sector").value.trim(),lastYear:ly,cur,data,hyp,mode:nfMode,aiFilled:nfMode==="full"&&nfAi},true);
  closeNew();
  histMsg(`${name} ajoutée à l'historique.${missing?` ${missing} case(s) vide(s) : les scores qui en dépendent sont marqués « non calculé » ; complétez-les dans Données si besoin.`:""}`);
  location.hash="#accueil";setTimeout(()=>document.getElementById("open-section").scrollIntoView({behavior:"smooth"}),50);
};

/* ---------- Modes de saisie : PDF (IA), rapide, complète ---------- */
const QUICK_F=["ca","ebit","net","interest","cfo","rec","ca_cur","cl","ta","equity","ltd","re"];
let nfMode="quick",nfAi=false,pdfCtl=null;
function setMode(m){nfMode=m;document.querySelectorAll("#new-dlg .mode").forEach(b=>b.setAttribute("aria-pressed",b.dataset.mode===m));document.querySelectorAll("#new-dlg .mode-panel").forEach(p=>p.hidden=p.dataset.panel!==m);
  if(m==="pdf"){const ok=!!sampler&&!!window.pdfjsLib;document.getElementById("nf-pdf").disabled=!ok;document.getElementById("nf-pdf-off").hidden=ok;}}
function nfQuick(){const ys=nfYears();const old={};document.querySelectorAll("#nf-quick input").forEach(i=>old[i.id]=i.value);
  document.getElementById("nf-quick").innerHTML=`<thead><tr><th>Poste (millions)</th><th class="n">${ys[3]}</th><th class="n">${ys[4]}</th></tr></thead><tbody>${QUICK_F.map(k=>{const l=FIELDS.find(f=>f[0]===k)[1];return `<tr><td>${l}${["ca","ta","equity"].includes(k)?" *":""}</td>${[3,4].map(t=>`<td><input id="nq-${k}-${t}" inputmode="decimal" aria-label="${esc(l)} ${ys[t]}" value="${esc(old[`nq-${k}-${t}`]||"")}"></td>`).join("")}</tr>`;}).join("")}</tbody>`;}
document.querySelectorAll("#new-dlg .mode").forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
document.getElementById("nf-year").addEventListener("change",()=>nfQuick());
const PDF_KW=["bilan","actif circulant","capitaux propres","chiffre d'affaires","chiffre d affaires","compte de produits","produits et charges","resultat d'exploitation","resultat net","flux de tresorerie","tableau de financement","total actif","balance sheet","income statement","total assets","cash flow","shareholders","revenue","operating income","net income","stocks","creances","dettes de financement","passif circulant","comptes consolides","etats financiers","compte de resultat"];
async function pdfText(file,msg,signal){
  const buf=await file.arrayBuffer();
  const doc=await pdfjsLib.getDocument({data:buf,isEvalSupported:false}).promise;
  const pages=[];
  for(let i=1;i<=doc.numPages;i++){if(signal.aborted)throw{code:"cancelled"};
    if(i%5===1)msg(`Lecture de « ${file.name} » : page ${i} / ${doc.numPages}…`);
    const pg=await doc.getPage(i);const tc=await pg.getTextContent();
    let s="",lastY=null;for(const it of tc.items){const y=it.transform?Math.round(it.transform[5]):null;if(lastY!==null&&y!==lastY)s+="\n";else if(s)s+=" ";s+=it.str;lastY=y;}
    pages.push({n:i,t:s});}
  return pages;
}
function pickPages(pages){
  if(pages.reduce((a,p)=>a+p.t.length,0)<60000)return pages;
  const sc=pages.map(p=>{const t=norm(p.t);let k=0;PDF_KW.forEach(w=>{if(t.includes(w))k++;});const digits=(p.t.match(/\d[\d\s.,]{3,}/g)||[]).length;return{p,s:k*3+Math.min(digits,60)/10};});
  const top=sc.filter(x=>x.s>=4).sort((a,b)=>b.s-a.s).slice(0,16).map(x=>x.p).sort((a,b)=>a.n-b.n);
  let out=[],len=0;for(const p of top){if(len+p.t.length>110000)break;out.push(p);len+=p.t.length;}
  return out;
}
async function extractFromPdfs(files){
  const msgEl=document.getElementById("nf-pdf-msg"),stop=document.getElementById("nf-pdf-stop");
  const msg=(t,err)=>{msgEl.className="msg"+(err?" err":"");msgEl.textContent=t;};
  if(!sampler||!window.pdfjsLib){msg("La lecture par l'IA n'est pas disponible ici.",true);return;}
  pdfCtl=new AbortController();stop.hidden=false;stop.onclick=()=>pdfCtl.abort();
  const years={};let meta={};
  try{
    for(const f of files){
      const pages=await pdfText(f,msg,pdfCtl.signal);
      const chosen=pickPages(pages);const total=chosen.reduce((a,p)=>a+p.t.length,0);
      if(total<1500){msg(`« ${f.name} » semble scanné (pas de texte lisible). Utilisez une version PDF texte du rapport, ou l'analyse rapide.`,true);continue;}
      msg(`Recherche des états financiers dans « ${f.name} » (${chosen.length} pages retenues) : l'IA extrait les chiffres…`);
      const prompt=`Tu es un assistant d'audit. Voici le texte extrait des pages d'un rapport annuel qui contiennent les états financiers (bilan, compte de résultat ou CPC, tableau des flux ou de financement).
Extrais, pour chaque exercice présent (en général l'exercice N et N-1), les montants demandés. Si le rapport contient des comptes consolidés et des comptes sociaux, utilise les comptes consolidés ; sinon les comptes sociaux.
Règles : convertis tous les montants en MILLIONS de la devise de publication (montants en unités : divise par 1 000 000 ; en milliers : divise par 1 000). Les charges sont des valeurs positives ; un résultat négatif garde le signe moins. Si un poste n'apparaît pas clairement, mets null : ne devine jamais.
Postes : ca = chiffre d'affaires ; cogs = coût des ventes ou, à défaut, achats consommés de matières et fournitures ; sga = frais commerciaux, généraux et administratifs (ou, en plan comptable marocain/français : autres charges externes + impôts et taxes + charges de personnel) ; dep = dotations d'exploitation aux amortissements ; ebit = résultat d'exploitation ; interest = charges d'intérêts ; net = résultat net (part du groupe si consolidé) ; cfo = flux net de trésorerie lié à l'activité (ou, à défaut, capacité d'autofinancement) ; rec = créances clients nettes ; inv = stocks nets ; ca_cur = total actif circulant y compris trésorerie-actif ; ppe = immobilisations corporelles nettes ; ta = total actif (total bilan) ; cl = passif circulant y compris trésorerie-passif ; ltd = dettes financières à long terme (dettes de financement) ; equity = capitaux propres totaux ; re = réserves + report à nouveau (ou résultats non distribués).
Réponds uniquement avec un objet JSON de la forme :
{"societe": string|null, "pays": string|null, "devise": "MDH"|"M€"|"M$"|null, "unite_source": string, "exercices": [{"annee": 2025, "ca": number|null, "cogs": number|null, "sga": number|null, "dep": number|null, "ebit": number|null, "interest": number|null, "net": number|null, "cfo": number|null, "rec": number|null, "inv": number|null, "ca_cur": number|null, "ppe": number|null, "ta": number|null, "cl": number|null, "ltd": number|null, "equity": number|null, "re": number|null}]}

TEXTE DU RAPPORT (${f.name}) :
${chosen.map(p=>`--- Page ${p.n} ---\n${p.t}`).join("\n")}`;
      const r=await sampler.json(prompt,{signal:pdfCtl.signal,modelTier:"default"});
      if(r&&typeof r==="object"){
        if(r.societe&&!meta.name)meta.name=String(r.societe);if(r.pays&&!meta.country)meta.country=String(r.pays);if(r.devise&&!meta.cur)meta.cur=r.devise;
        (Array.isArray(r.exercices)?r.exercices:[]).forEach(ex=>{const y=parseInt(ex.annee,10);if(!(y>1990&&y<2100))return;years[y]=years[y]||{};FIELDS.forEach(([k])=>{const v=typeof ex[k]==="number"?ex[k]:parseNum(ex[k]);if(isFinite(v)&&years[y][k]===undefined)years[y][k]=v;});});
      }
    }
    const ys=Object.keys(years).map(Number).sort((a,b)=>a-b);
    if(!ys.length){msg("Aucun chiffre n'a pu être extrait. Essayez un autre fichier ou l'analyse rapide.",true);return;}
    const ly=ys[ys.length-1];
    if(meta.name&&!document.getElementById("nf-name").value.trim())document.getElementById("nf-name").value=meta.name;
    if(meta.country&&!document.getElementById("nf-country").value.trim())document.getElementById("nf-country").value=meta.country;
    if(meta.cur&&["MDH","M€","M$"].includes(meta.cur))document.getElementById("nf-cur").value=meta.cur;
    document.getElementById("nf-year").value=ly;nfTable(true);nfQuick();
    let n=0;
    ys.forEach(y=>{const t=y-(ly-4);if(t<0||t>4)return;FIELDS.forEach(([k])=>{const v=years[y][k];if(v!==undefined){const el=document.getElementById(`nf-${k}-${t}`);if(el){el.value=Math.round(v*100)/100;el.classList.add("ai-fill");n++;}}});});
    nfAi=true;setMode("full");
    const fm=document.getElementById("nf-file-msg");fm.className="msg";fm.textContent=`L'IA a trouvé ${n} montants pour ${ys.filter(y=>y>ly-5).join(", ")}. Vérifiez les cases jaunes avec le rapport, complétez si besoin (ou importez le rapport d'une année plus ancienne), puis lancez l'analyse.`;
    msg("");
  }catch(e){
    if(e&&e.code==="cancelled")msg("Lecture arrêtée.");
    else if(e&&e.code==="not_granted")msg("L'IA n'est pas autorisée : acceptez la demande d'autorisation ou utilisez l'analyse rapide.",true);
    else if(e&&e.code==="prompt_too_large")msg("Le rapport est trop volumineux : découpez le PDF pour ne garder que les états financiers.",true);
    else if(e&&e.code==="invalid_json")msg("L'IA n'a pas renvoyé de chiffres exploitables : réessayez.",true);
    else if(e&&e.code==="rate_limited")msg("Limite d'usage atteinte : réessayez plus tard.",true);
    else if(e&&e.api)msg(e.message,true);
    else msg("La lecture du PDF a échoué : vérifiez le fichier, ou utilisez l'analyse rapide.",true);
  }finally{stop.hidden=true;pdfCtl=null;}
}
document.getElementById("nf-pdf").onchange=e=>{const fs=[...(e.target.files||[])];if(fs.length)extractFromPdfs(fs);};
document.getElementById("nf-table").addEventListener("input",e=>{if(e.target.classList)e.target.classList.remove("ai-fill");});

/* ---------- PDF ---------- */
try{if(window.pdfjsLib&&window.pdfjsWorker)pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";}catch(e){}
let dlCap=null;
try{if(window.claude&&window.claude.use)window.claude.use("downloads").then(d=>{dlCap=d;}).catch(()=>{});}catch(e){}
const P=s=>String(s==null?"":s).replace(/[  ]/g," ").replace(/−/g,"-").replace(/₂/g,"2").replace(/₁₀/g,"10").replace(/≥/g,">=").replace(/×/g,"x").replace(/[’]/g,"'").replace(/[–—]/g,"-").replace(/→/g,"->");
function hex(c){const m=/^#?([0-9a-f]{6})$/i.exec(c||"");if(!m)return[80,80,80];const n=parseInt(m[1],16);return[n>>16&255,n>>8&255,n&255];}
document.getElementById("pdf-btn").onclick=()=>{const v=document.getElementById("pdf-co").value;downloadPdf(v==="all"?keys():[v]);};

/* ---------- État de la mission ---------- */
const CI_Q=[
 "Séparation des tâches entre commande, réception, comptabilisation et paiement",
 "Rapprochements bancaires mensuels revus par un responsable",
 "Procédure de clôture et d'inventaire physique formalisée",
 "Écritures manuelles validées par une seconde personne",
 "Suivi des créances clients (balance âgée, relances, dépréciations)",
 "Comité d'audit ou audit interne actif",
 "Sécurité du système d'information (droits d'accès, sauvegardes)",
 "Certification sans réserve les exercices précédents"
];
const CI_A=[["Oui",0],["Partiel",1],["Non",2]];
const BASES={ca:["Chiffre d'affaires",0.5],ta:["Total actif",1],equity:["Capitaux propres",2],pbt:["Résultat avant impôt",5]};
function defMission(){return{base:"ca",rate:0.5,perf:70,ci:CI_Q.map(()=>1)};}
function ensureState(){
  Object.keys(state.cos).forEach(k=>{const c=state.cos[k];if(!c.mission)c.mission=defMission();if(!c.env)c.env=defEnv();if(!c.lastYear)c.lastYear=2025;if(typeof applyPrep==="function")applyPrep(k);});
  state.team=state.team||["Membre 1","Membre 2","Membre 3","Membre 4","Membre 5"];
  state.phases=state.phases||[
    {name:"Prise de connaissance",start:"2026-11-16",end:"2026-11-29",who:0},
    {name:"Évaluation du contrôle interne",start:"2026-11-30",end:"2026-12-13",who:1},
    {name:"Mission intérimaire (tests de procédures)",start:"2026-12-14",end:"2027-01-03",who:2},
    {name:"Mission finale (inventaire, circularisations, tests substantifs)",start:"2027-01-04",end:"2027-01-31",who:3},
    {name:"Synthèse, rapport et présentation",start:"2027-02-01",end:"2027-02-14",who:4}];
}
function pbtOf(b){return b.ebit-b.interest;}
function materiality(k){
  const m=state.cos[k].mission,b=yr(D(k),4);
  const baseVal=m.base==="pbt"?pbtOf(b):b[m.base];
  const sm=baseVal*m.rate/100, sp=sm*m.perf/100, si=sm*0.05;
  return{baseVal,sm,sp,si,neg:baseVal<=0};
}
function ciScore(k){const a=state.cos[k].mission.ci;const s=a.reduce((x,y)=>x+y,0)/(a.length*2);return{s,lvl:s<1/3?1:s<2/3?2:3};}
const LVL=["","Faible","Moyen","Élevé"];
const LVLZ=["","good","warn","crit"];
function auditRisk(r,rc){
  const ri=r.score>=15?3:r.score>=8?2:1, prod=ri*rc;
  const rnd=prod>=6?1:prod>=3?2:3;
  const work=rnd===1?"Tests substantifs étendus, au plus près de la clôture ; confirmations externes":rnd===2?"Tests de procédures + tests substantifs ciblés":"Procédures analytiques et tests limités";
  const sample=rnd===1?"≈ 60 éléments":rnd===2?"≈ 30 éléments":"≈ 15 éléments";
  return{ri,rnd,work,sample};
}

/* ---------- Notation ---------- */
function ratios(k,t){const x=yr(D(k),t);return{
  liq:x.cl?x.ca_cur/x.cl:NaN, marg:x.ca?x.ebit/x.ca:NaN, roa:x.ta?x.net/x.ta:NaN, roe:x.equity>0?x.net/x.equity:NaN,
  gear:x.equity>0?x.ltd/x.equity:NaN, cov:x.interest>0?x.ebit/x.interest:NaN, dso:x.ca?x.rec/x.ca*365:NaN, dio:x.cogs?x.inv/x.cogs*365:NaN, cfo:x.ca?x.cfo/x.ca:NaN};}
const GRADES=[[85,"AAA"],[75,"AA"],[65,"A"],[55,"BBB"],[45,"BB"],[35,"B"],[25,"CCC"],[15,"CC"],[0,"D"]];
function rating(k,stressed){
  const st=stress(k),b=st.b,be=beneish(D(k),4);
  const z=stressed?st.zs:st.zb, ebit=stressed?st.ebit:b.ebit, interest=stressed?st.interest:b.interest, ca=stressed?st.ca:b.ca;
  const eq=stressed?b.equity+(st.net-b.net):b.equity;
  const parts=[
    ["Solvabilité (Altman Z')",30,clamp((z-0.5)/2.5*100)],
    ["Couverture des intérêts",20,interest>0?clamp(ebit/interest/8*100):(ebit>0?100:0)],
    ["Marge d'exploitation",15,clamp((ebit/ca+0.05)/0.2*100)],
    ["Endettement",15,eq>0?clamp((1-(b.ltd/eq)/1.5)*100):0],
    ["Trésorerie d'exploitation",10,clamp((b.cfo/b.ca+0.05)/0.2*100)],
    ["Qualité des comptes (Beneish)",10,!isFinite(be.M)?50:be.M<-2.22?100:be.M<-1.78?50:0]];
  const score=parts.reduce((s,p)=>s+p[1]*(isFinite(p[2])?p[2]:0)/100,0);
  const grade=eq<=0?"D":GRADES.find(g=>score>=g[0])[1];
  const z2=score>=55?"good":score>=35?"warn":"crit";
  return{score,grade,parts,zone:eq<=0?"crit":z2};
}

/* ---------- Mission ---------- */
function drawGantt(){
  const ph=state.phases,d=s=>new Date(s+"T00:00:00").getTime();
  const t0=Math.min(...ph.map(p=>d(p.start))),t1=Math.max(...ph.map(p=>d(p.end)))+864e5;
  const W=760,l=230,r=16,rowH=34,top=30,H=top+ph.length*rowH+8,sx=t=>l+(t-t0)/(t1-t0)*(W-l-r);
  let s=`<svg viewBox="0 0 ${W} ${H}" width="100%" style="min-width:560px" role="img" aria-label="Calendrier de la mission">`;
  let m=new Date(t0);m.setDate(1);while(m.getTime()<=t1){const x=sx(Math.max(m.getTime(),t0));s+=`<line x1="${x}" x2="${x}" y1="${top-6}" y2="${H-4}" stroke="var(--line)"/><text x="${x+4}" y="${top-12}" font-size="10.5">${m.toLocaleDateString("fr-FR",{month:"short",year:"2-digit"})}</text>`;m.setMonth(m.getMonth()+1);}
  ph.forEach((p,i)=>{const y=top+i*rowH,a=sx(d(p.start)),b=Math.max(a+4,sx(d(p.end)+864e5));
    s+=`<text x="0" y="${y+15}" font-size="11.5" style="fill:var(--ink)">${esc(p.name.length>34?p.name.slice(0,33)+"…":p.name)}</text><text x="0" y="${y+28}" font-size="10">${esc(state.team[p.who]||"")}</text>`;
    s+=`<rect x="${a}" y="${y+5}" width="${b-a}" height="18" rx="4" fill="var(--accent)" fill-opacity="${0.55+0.09*i}"/>`;
    const lab=`${new Date(d(p.start)).toLocaleDateString("fr-FR",{day:"numeric",month:"short"})} → ${new Date(d(p.end)).toLocaleDateString("fr-FR",{day:"numeric",month:"short"})}`;
    s+=b-a>110?`<text x="${a+6}" y="${y+18}" font-size="10" style="fill:#fff">${lab}</text>`:(b+100<W?`<text x="${b+5}" y="${y+18}" font-size="10">${lab}</text>`:`<text x="${a-5}" y="${y+18}" font-size="10" text-anchor="end">${lab}</text>`);});
  document.getElementById("gantt").innerHTML=s+"</svg>";
  document.getElementById("gantt-interp").innerHTML=interp(ganttInterp());
}
function renderPlanOnly(){renderPlan();}

/* ---------- Assistant IA ---------- */
let sampler=null,aiTurns=[],aiCtl=null;
/* ---------- IA hors claude.ai : clé API personnelle (appel direct depuis le navigateur) ---------- */
const API_STORE="riskscope-apikey";
const API_MODELS=[["claude-sonnet-5-5","Claude Sonnet 5.5 (précis, recommandé)"],["claude-haiku-5-5","Claude Haiku 5.5 (rapide, économique)"]];
function apiCfg(){try{const o=JSON.parse(localStorage.getItem(API_STORE)||"{}");return{key:o.key||"",model:o.model||API_MODELS[0][0]};}catch(e){return{key:"",model:API_MODELS[0][0]};}}
function apiSave(o){try{if(o)localStorage.setItem(API_STORE,JSON.stringify(o));else localStorage.removeItem(API_STORE);return true;}catch(e){return false;}}
function apiSampler(key,model){
  async function call(messages,{signal,onText,max=2048}={}){
    const msgs=[];messages.forEach(m=>{const c=String(m.content);if(msgs.length&&msgs[msgs.length-1].role===m.role)msgs[msgs.length-1].content+="\n\n"+c;else msgs.push({role:m.role,content:c});});
    let res;
    try{res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",signal,headers:{"content-type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model,max_tokens:max,messages:msgs,stream:!!onText})});}
    catch(e){const er=new Error(e&&e.name==="AbortError"?"Arrêté.":"Connexion à l'API impossible (réseau ou blocage du navigateur).");er.code=e&&e.name==="AbortError"?"cancelled":"network";er.api=true;throw er;}
    if(!res.ok){let d="";try{d=(await res.json()).error.message;}catch(_){}
      const er=new Error(res.status===401?"Clé API refusée : vérifiez-la dans la carte « Clé API ».":res.status===429?"Limite de débit atteinte : patientez une minute.":res.status===400&&/credit/i.test(d)?"Crédit API épuisé : rechargez votre compte sur console.anthropic.com.":res.status===404?"Modèle indisponible pour cette clé : choisissez-en un autre.":`Erreur de l'API (${res.status})${d?" : "+d:""}`);
      er.api=true;er.code=res.status===429?"rate_limited":"api_error";er.status=res.status;throw er;}
    if(!onText){const j=await res.json();return{text:(j.content||[]).filter(b=>b.type==="text").map(b=>b.text).join(""),truncated:j.stop_reason==="max_tokens"};}
    const rd=res.body.getReader(),dec=new TextDecoder();let buf="",text="",stop=null;
    try{
      for(;;){const {done,value}=await rd.read();if(done)break;buf+=dec.decode(value,{stream:true});let i;
        while((i=buf.indexOf("\n"))>=0){const ln=buf.slice(0,i).trim();buf=buf.slice(i+1);if(!ln.startsWith("data:"))continue;let ev;try{ev=JSON.parse(ln.slice(5));}catch(_){continue;}
          if(ev.type==="content_block_delta"&&ev.delta&&ev.delta.type==="text_delta"){text+=ev.delta.text;onText({text});}
          else if(ev.type==="message_delta"&&ev.delta)stop=ev.delta.stop_reason;
          else if(ev.type==="error"){const er=new Error((ev.error&&ev.error.message)||"Erreur de l'API");er.api=true;er.code="api_error";er.text=text;throw er;}}}
    }catch(e){if(e&&e.name==="AbortError"){const er=new Error("Arrêté.");er.code="cancelled";er.text=text;throw er;}throw e;}
    return{text,truncated:stop==="max_tokens"};
  }
  const s=(messages,opt={})=>call(messages,opt);
  s.json=async(prompt,opt={})=>{const {text}=await call([{role:"user",content:prompt+"\n\nRéponds uniquement avec l'objet JSON demandé, sans aucun texte autour."}],{signal:opt.signal,max:8000});
    const t=text.replace(/```(?:json)?/g,"");const a=t.indexOf("{"),b=t.lastIndexOf("}");if(a<0||b<a)throw new Error("Réponse de l'IA illisible : réessayez.");return JSON.parse(t.slice(a,b+1));};
  s.viaApi=true;s.model=model;return s;
}
function renderApiCard(){
  const box=document.getElementById("api-card");if(!box)return;
  if(sampler&&!sampler.viaApi){box.hidden=true;return;}
  box.hidden=false;const c=apiCfg();
  box.innerHTML=`<div class="section-head"><h3>Activer l'IA hors de claude.ai (clé API)</h3>${c.key?`<span class="pill good">Clé enregistrée</span>`:`<span class="pill na">Aucune clé</span>`}</div>
  <p class="small">Sur GitHub ou en local, l'IA (analyse par société, lecture des PDF, assistant, environnement) utilise votre propre clé API Claude, créée sur console.anthropic.com. Elle reste uniquement dans ce navigateur et chaque appel est facturé sur votre compte Anthropic. <b>Ne mettez jamais la clé dans le code ni sur GitHub.</b></p>
  <div class="fields" style="margin-top:8px">
    <label>Clé API<input type="password" id="api-key" autocomplete="off" placeholder="${c.key?"•••• "+esc(c.key.slice(-4)):"sk-ant-…"}"></label>
    <label>Modèle<select id="api-model">${API_MODELS.map(([v,l])=>`<option value="${v}" ${v===c.model?"selected":""}>${l}</option>`).join("")}</select></label>
  </div>
  <div class="actions" style="margin-top:10px"><button class="btn primary" id="api-save">Enregistrer et tester</button>${c.key?`<button class="btn small" id="api-del">Effacer la clé</button>`:""}<span class="msg" id="api-msg" role="status"></span></div>`;
  const m=document.getElementById("api-msg");
  document.getElementById("api-model").onchange=e=>{if(c.key){apiSave({key:c.key,model:e.target.value});window.__aiKeyReady&&window.__aiKeyReady();}};
  document.getElementById("api-save").onclick=async()=>{
    const key=(document.getElementById("api-key").value.trim())||c.key,model=document.getElementById("api-model").value;
    if(!key){m.className="msg err";m.textContent="Collez d'abord votre clé API.";return;}
    m.className="msg";m.textContent="Test de la clé…";
    try{await apiSampler(key,model)([{role:"user",content:"Réponds seulement : OK"}],{max:5});
      if(!apiSave({key,model})){m.className="msg err";m.textContent="Ce navigateur bloque l'enregistrement local : la clé ne sera gardée que pour cette visite.";}
      window.__aiKeyReady&&window.__aiKeyReady({key,model});
    }catch(e){m.className="msg err";m.textContent=e.message||"La clé n'a pas fonctionné.";}
  };
  const del=document.getElementById("api-del");if(del)del.onclick=()=>{apiSave(null);sampler=null;window.__aiKeyOff&&window.__aiKeyOff();renderApiCard();renderAIBits();renderEnv();};
}

const AI_SUGG=["Explique la note de risque de la société ouverte","Rédige la conclusion du plan de mission","Compare les sociétés ouvertes en 5 points","Quels contrôles faut-il prioriser ?","Explique le Beneish M-score simplement"];
function aiContext(){
  const o={scenario:scenActive()?{nom:scenName,...scen}:"aucun",annee_en_cours:CUR_YEAR,prevision_incluse:keys().some(fcActive),societes:keys().map(k=>{const co=state.cos[k],d=D(k),be=beneish(d,4),be24=beneish(d,3),st=stress(k),r=rating(k,false),mt=materiality(k),cs=ciScore(k);
    const last=t=>Object.fromEntries(FIELDS.map(([f])=>[f,d[f][t]]));
    return{nom:co.name,pays:co.country,devise:co.cur,exercice_N:YEARS[4],comptes_N_moins_1:last(3),comptes_N:last(4),beneish_M_N:+fmt(be.M,2).replace(",","."),beneish_M_N_moins_1:+fmt(be24.M,2).replace(",","."),DSRI_N:be.DSRI,altman_Z_N:st.zb,altman_Z_apres_crise:st.zs,verdict_crise:VERD[st.verdict],note:r.grade,score_note:Math.round(r.score),
      seuil_signification:mt.neg?null:Math.round(mt.sm),seuil_planification:mt.neg?null:Math.round(mt.sp),base_seuil:BASES[state.cos[k].mission.base][0],risque_controle:LVL[cs.lvl],
      prevision:fcActive(k)?{annee:CUR_YEAR,...fcParams(k),comptes_prevus:proj(k)}:null,points_vigilance:vigilPoints(k),continuite:(()=>{const G=gcEval(k);return{conclusion:GC_C[G.lvl],indicateurs:G.A.filter(x=>x.v).map(x=>x.l)};})(),monte_carlo:(()=>{const M=mcRun(k);return{proba_detresse:M.pDist,proba_perte:M.pLoss,z_median:M.z50};})(),test_ecritures:JE[k]?(()=>{const T=jeTests(k);return{ecritures:T.n,signalees:T.flagged.length,prioritaires:T.prio,tests:T.cnt,benford_mad:T.ben.mad};})():null,scenarios_ia:(co.ai&&co.ai.scenarios)||[],
      risques:risks(k).sort((a,b)=>b.score-a.score).map(x=>({risque:x.risque||x.risk,proba:x.prob,impact:x.impact,indicateur:x.why,procedure:x.proc}))};})};
  return JSON.stringify(o,(k,v)=>typeof v==="number"?Math.round(v*1000)/1000:v);
}
const AI_RULES=()=>`Tu es l'assistant d'audit de RiskScope, l'outil du cabinet FIDEX5 (projet de groupe, Master CCA). Réponds en français, de façon claire et concise (10 lignes maximum sauf demande de rédaction), avec des puces si utile. Appuie-toi uniquement sur les données JSON ci-dessous (montants en millions de la devise indiquée) et sur des connaissances générales d'audit (normes ISA, Beneish, Altman). Si une donnée manque, dis-le. Rappelle qu'un score est une alerte, pas une preuve. N'utilise pas de titres Markdown.\n\nDONNÉES RISKSCOPE :\n${aiContext()}`;
function mdLite(t){const lines=esc(t).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").split(/\n/);let out="",inL=false;
  for(const ln of lines){const m=/^\s*[-•*]\s+(.*)/.exec(ln);if(m){if(!inL){out+="<ul>";inL=true;}out+=`<li>${m[1]}</li>`;}else{if(inL){out+="</ul>";inL=false;}if(ln.trim())out+=`<p>${ln.replace(/^#+\s*/,"")}</p>`;}}
  return out+(inL?"</ul>":"");}
function addBubble(role,html){const b=document.createElement("div");b.className="bubble "+role;b.innerHTML=html;const c=document.getElementById("chat");c.append(b);c.scrollTop=c.scrollHeight;return b;}
function setupAssistant(){
  const st=document.getElementById("ai-status"),send=document.getElementById("ai-send"),stop=document.getElementById("ai-stop"),inp=document.getElementById("ai-input");
  document.getElementById("ai-chips").innerHTML=AI_SUGG.map((s,i)=>`<button class="btn small" data-i="${i}">${esc(s)}</button>`).join("");
  document.querySelectorAll("#ai-chips button").forEach(b=>b.onclick=()=>{inp.value=AI_SUGG[+b.dataset.i];ask();});
  const off=msg=>{st.textContent=msg;send.disabled=true;inp.disabled=true;document.querySelectorAll("#ai-chips button").forEach(b=>b.disabled=true);};
  const chipsOn=v=>document.querySelectorAll("#ai-chips button").forEach(b=>b.disabled=!v);
  const ready=(s,txt)=>{sampler=s;st.textContent=txt;send.disabled=false;inp.disabled=false;chipsOn(true);AITRIED.clear();renderApiCard();renderEnv();renderAIBits();autoAI();};
  const tryKey=o=>{const c=o||apiCfg();if(!c.key)return false;const nm=(API_MODELS.find(x=>x[0]===c.model)||[0,c.model])[1];ready(apiSampler(c.key,c.model),`Prêt. L'IA utilise votre clé API (${nm}) : chaque question est facturée sur votre compte Anthropic.`);return true;};
  const noAI="Hors de claude.ai : ajoutez votre clé API Claude dans la carte ci-dessus pour activer l'IA.";
  window.__aiKeyReady=tryKey;window.__aiKeyOff=()=>off(noAI);
  const fallback=()=>{if(!tryKey())off(noAI);renderApiCard();};
  if(!(window.claude&&window.claude.use)){fallback();}
  else window.claude.use("sample").then(s=>{if(!s){fallback();return;}ready(s,"Prêt. La première question vous demandera d'autoriser l'assistant (il utilise votre compte Claude).");}).catch(fallback);
  async function ask(){
    const q=inp.value.trim();if(!q||!sampler)return;
    if(!keys().length){st.textContent="Ouvrez d'abord une analyse depuis l'historique.";return;}
    inp.value="";addBubble("user",esc(q));aiTurns.push({role:"user",content:q});
    const bub=addBubble("ai","<p class=\"small\">Réflexion…</p>");
    send.disabled=true;stop.hidden=false;aiCtl=new AbortController();
    const turns=aiTurns.slice(-10);
    try{
      const {text,truncated}=await sampler([{role:"user",content:AI_RULES()},...turns],{cache:false,signal:aiCtl.signal,onText:({text})=>{bub.innerHTML=mdLite(text);document.getElementById("chat").scrollTop=1e9;}});
      bub.innerHTML=mdLite(text)+(truncated?'<p class="small">Réponse coupée : posez une question plus ciblée.</p>':"");
      aiTurns.push({role:"assistant",content:text});st.textContent="Prêt.";
    }catch(e){
      const code=e&&e.code;
      if(e&&e.text)bub.innerHTML=mdLite(e.text);else bub.remove();
      if(code==="cancelled"){st.textContent="Réponse arrêtée.";}
      else if(code==="not_granted"||code==="sampling_disabled"||code==="not_declared"||code==="capability_disabled"||code==="capability_removed"){off("L'assistant n'est pas autorisé pour ce compte ou cet affichage.");}
      else if(e&&e.api&&code!=="rate_limited"){st.textContent=e.message;}
      else if(code==="rate_limited"){st.textContent="Trop de questions d'un coup ou limite d'usage atteinte : réessayez plus tard.";}
      else if(code==="refused"){st.textContent="L'assistant n'a pas pu répondre à cette question : reformulez-la.";}
      else{st.textContent="La réponse a été interrompue : réessayez.";}
      aiTurns.pop();
    }finally{send.disabled=!sampler;stop.hidden=true;aiCtl=null;}
  }
  send.onclick=ask;stop.onclick=()=>aiCtl&&aiCtl.abort();
  inp.onkeydown=e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();ask();}};
}

/* ---------- Mode présentation ---------- */
let deckI=0,deckSlides=[];
function withScen(sc,fn){const old=scen,oldN=scenName;scen=sc;try{return fn();}finally{scen=old;scenName=oldN;}}
function buildSlides(){
  const ks=keys();
  const alert=ks.map(k=>({k,t:[1,2,3,4].map(t=>({t,M:beneish(D(k),t).M})).reduce((a,b)=>b.M>a.M?b:a)})).reduce((a,b)=>b.t.M>a.t.M?b:a);
  const ak=alert.k,at=alert.t.t,abe=beneish(D(ak),at),ac=yr(D(ak),at),ap=yr(D(ak),at-1);
  const shock=PRESETS[0];
  const S=[];
  S.push(`<div class="small" style="letter-spacing:2px;text-transform:uppercase">Mission d'audit · Master CCA</div><h1>RiskScope : identifier les risques inhérents de ${ks.map(k=>esc(state.cos[k].name)).join(", ")}</h1><p class="lead">Une plateforme fintech qui croise les risques venant des comptes et ceux venant de l'environnement, puis génère le plan de mission.</p><p class="small">Équipe FIDEX5 : ${state.team.map(esc).join(" · ")}</p>`);
  S.push(`<h2>Notre démarche</h2><div class="grid3">${[["1. Fraud Radar","Beneish M-score, loi de Benford et ratios d'alerte sur 5 ans d'états financiers."],["2. CrashTest","Simulation de crises : pétrole, dollar, fret, taxe carbone, taux."],["3. Plan de mission","Matrice des risques, seuil de signification, risque d'audit et procédures."]].map(([t,d])=>`<div class="card"><h3>${t}</h3><p class="small" style="font-size:15px">${d}</p></div>`).join("")}</div>`);
  S.push(`<h2>Notation de risque ${YL(4)}</h2><div class="grid3">${ks.map(k=>{const r=rating(k,false);return `<div class="card co" style="--co:${col(k)}"><div class="co-name">${esc(state.cos[k].name)}</div><div class="rating ${r.zone}" style="font-size:64px;margin-top:8px">${r.grade}</div><div class="small">Score ${fmt(r.score)}/100 · Altman Z' ${fmt(stress(k).zb,2)}</div></div>`;}).join("")}</div>`);
  S.push(`<h2>Alerte Fraud Radar : ${esc(state.cos[ak].name)} en ${YEARS[at]}</h2><div class="grid3"><div class="card"><div class="small">Beneish M-score</div><div class="big">${fmt(abe.M,2)}</div>${pill(mZone(abe.M),M_LABEL[mZone(abe.M)])}</div><div class="card"><div class="small">Créances clients</div><div class="big">${ac.rec>=ap.rec?"+":""}${pct(ac.rec/ap.rec-1)}</div><div class="small">contre un chiffre d'affaires de ${pct(ac.ca/ap.ca-1)}</div></div><div class="card"><div class="small">Indice DSRI</div><div class="big">${fmt(abe.DSRI,2)}</div><div class="small">au-delà de 1 : créances qui gonflent</div></div></div><p class="lead">Ce n'est pas une preuve de fraude, mais une zone à tester : circularisation des clients, balance âgée, séparation des exercices.</p>`);
  S.push(`<h2>CrashTest : « ${shock[0]} »</h2><p class="lead">Pétrole +40 %, dollar +5 %, fret +5 %.</p><div class="grid3">${ks.map(k=>{const st=withScen(shock[1],()=>stress(k));return `<div class="card co" style="--co:${col(k)}"><div class="co-name">${esc(state.cos[k].name)}</div><div class="row"><span>Résultat d'exploitation</span><span class="num">${fmt(st.b.ebit)} → <b>${fmt(st.ebit)}</b></span></div><div class="row"><span>Altman Z'</span><span class="num">${fmt(st.zb,2)} → <b>${fmt(st.zs,2)}</b></span></div><div style="margin-top:8px">${pill(st.verdict,VERD[st.verdict])}</div></div>`;}).join("")}</div>`);
  S.push(`<h2>Risques prioritaires et travaux d'audit</h2><div class="grid3">${ks.map(k=>{const cs=ciScore(k),mt=materiality(k);return `<div class="card co" style="--co:${col(k)}"><div class="co-name">${esc(state.cos[k].name)}</div><ul class="alerts">${risks(k).sort((a,b)=>b.score-a.score).slice(0,3).map(r=>`<li><span class="dot ${prio(r.score)}"></span><span>${esc(r.risk)}</span></li>`).join("")}</ul><p class="small" style="margin-top:10px">Seuil de signification : ${mt.neg?"n.d.":fmt(mt.sm)+" "+esc(state.cos[k].cur)} · Risque lié au contrôle : ${LVL[cs.lvl].toLowerCase()}</p></div>`;}).join("")}</div>`);
  S.push(`<h2>Points de vigilance pour ${CUR_YEAR}</h2><div class="grid3">${ks.map(k=>`<div class="card co" style="--co:${col(k)}"><div class="co-name">${esc(state.cos[k].name)}</div><ol class="vlist">${vigilPoints(k).slice(0,4).map(p=>`<li><b>${esc(p.t)}</b></li>`).join("")}</ol></div>`).join("")}</div>`);
  S.push(`<h2>Et ensuite ?</h2><div class="grid3">${[["Toute entreprise","Saisie ou import Excel des comptes de n'importe quelle société, dès aujourd'hui."],["Assistant IA","Questions en langage naturel et rédaction de conclusions à partir des données."],["Lecture des rapports annuels","Prochaine étape : l'IA extrait elle-même les chiffres des PDF publiés."]].map(([t,d])=>`<div class="card"><h3>${t}</h3><p class="small" style="font-size:15px">${d}</p></div>`).join("")}</div><p class="lead">Merci. Questions ?</p>`);
  return S;
}
function showSlide(){document.getElementById("slide").innerHTML=deckSlides[deckI];document.getElementById("deck-count").textContent=`${deckI+1} / ${deckSlides.length}`;document.getElementById("deck-prev").disabled=deckI===0;document.getElementById("deck-next").textContent=deckI===deckSlides.length-1?"Terminer":"Suivant →";}
function openDeck(){if(!keys().length){alertBar("Ouvrez d'abord une analyse (ou une comparaison) depuis l'historique pour lancer la présentation.");return;}deckSlides=buildSlides();deckI=0;const d=document.getElementById("deck");d.classList.add("on");showSlide();try{d.requestFullscreen&&d.requestFullscreen().catch(()=>{});}catch(e){}}
function closeDeck(){document.getElementById("deck").classList.remove("on");try{if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});}catch(e){}}
document.getElementById("present").onclick=openDeck;
document.getElementById("deck-close").onclick=closeDeck;
document.getElementById("deck-prev").onclick=()=>{if(deckI>0){deckI--;showSlide();}};
document.getElementById("deck-next").onclick=()=>{if(deckI<deckSlides.length-1){deckI++;showSlide();}else closeDeck();};
document.addEventListener("keydown",e=>{if(!document.getElementById("deck").classList.contains("on"))return;if(e.key==="ArrowRight"||e.key===" "){e.preventDefault();document.getElementById("deck-next").click();}else if(e.key==="ArrowLeft"){document.getElementById("deck-prev").click();}else if(e.key==="Escape"){closeDeck();}});

/* ---------- Guides d'utilisation ---------- */
const GUIDES={
accueil:{t:"Comment utiliser l'accueil",steps:[
 "<b>Changer de société</b> : la barre « Société » en haut de chaque onglet ouvre SNEP, Arkema, Dow, Braskem ou les autres analyses d'un clic (ou avec les flèches ← → du clavier). « Comparer toutes » les affiche côte à côte.",
 "<b>Nouvelle analyse</b> : téléchargez le modèle Excel, remplissez les 17 postes sur 5 exercices, puis importez le fichier dans « + Nouvelle analyse ». Vous pouvez aussi coller les chiffres depuis Excel ou les saisir à la main.",
 "<b>Historique</b> : chaque analyse est conservée avec sa note, son M-score, son Altman Z' et son verdict. « Ouvrir » affiche l'analyse ; « PDF » télécharge le rapport ; la recherche filtre par nom, pays ou secteur.",
 "<b>Comparer</b> : cochez 2 à 4 analyses puis « Comparer la sélection ». Tous les onglets (Fraud Radar, CrashTest, Ratios, Mission…) affichent alors les sociétés côte à côte.",
 "<b>Prévision et IA</b> : à l'ouverture d'une analyse, RiskScope ajoute une prévision de l'année en cours (case « Prévision » dans la barre du haut) et lance une analyse IA de la société : scénarios de risques propres, hypothèses du stress test, environnement et points de vigilance.",
 "<b>Exemples</b> : SNEP, Arkema et Dow se chargent d'un clic pour découvrir l'outil ou faire une démonstration.",
 "<b>Lire l'analyse ouverte</b> : cartes de synthèse, matrice des risques (probabilité × impact) et plan de mission généré, avec interprétations et exports PDF ou CSV."]},
radar:{t:"Comment utiliser le Fraud Radar",steps:[
 "<b>Choisir l'exercice</b> en haut à droite : chaque indice compare l'année choisie à la précédente. Par défaut, le radar porte sur le dernier exercice publié. L'année marquée (p) est la prévision de l'année en cours : les postes y sont projetés proportionnellement, son M-score n'indique donc qu'une tendance.",
 "<b>Beneish M-score</b> : au-dessus de −1,78, risque de manipulation probable ; entre −2,22 et −1,78, zone grise ; en dessous de −2,22, pas d'alerte.",
 "<b>Radar</b> : six axes de 0 (normal) à 100 (alerte forte). Créances = DSRI, Marges = GMI, Accruals = TATA (résultat non encaissé), Endettement, Stocks, Benford.",
 "<b>Loi de Benford</b> : dans des données naturelles, le chiffre 1 apparaît en premier dans environ 30 % des cas. Un écart important peut signaler des chiffres arrangés.",
 "<b>Test des écritures (ISA 240)</b> : importez le grand livre (FEC, Excel ou CSV) ou générez le grand livre fictif. Huit tests (week-end, montants ronds, clôture, seuil, comptes rares, utilisateurs rares, libellés sensibles, doublons) et Benford sur les montants réels désignent les écritures à justifier en priorité.",
 "<b>À retenir</b> : ces scores signalent où chercher ; ils ne prouvent pas une fraude. Chaque alerte se traduit par des tests (circularisation, cut-off, revue des écritures)."]},
crashtest:{t:"Comment utiliser le CrashTest",steps:[
 "<b>Monte-Carlo</b> : sous les cartes, RiskScope simule 1 000 années en tirant tous les facteurs au hasard (et les risques IA selon leur probabilité). Lisez la probabilité de zone de détresse : au-delà de 20 %, c'est un indicateur de doute sur la continuité.",
 "<b>Choisir une crise</b> : risques spécifiques proposés par l'IA pour chaque société (en haut), crises génériques (choc pétrolier, mer Rouge, dollar fort…) ou réglage libre des huit curseurs. Le stress test s'applique à la prévision de l'année en cours quand elle est activée.",
 "<b>Lire les cartes</b> : les comptes du dernier exercice sont recalculés. Le verdict passe à « Continuité menacée » si l'Altman Z' tombe sous 1,23, si les intérêts ne sont plus couverts 1,5 fois ou si le résultat devient négatif.",
 "<b>Effet de chaque facteur</b> : barres rouges = perte, vertes = gain, en millions de la devise de la société.",
 "<b>Graphique des marges</b> : cercle vide = marge du dernier exercice, cercle plein = marge après la crise. Plus le trait est long, plus la société est sensible.",
 "<b>Hypothèses</b> : la sensibilité de chaque société (part du pétrole, exposition au dollar, CO₂, dette variable) se règle dans l'onglet Données."]},
ratios:{t:"Comment lire les ratios et la notation",steps:[
 "<b>Note AAA à D</b> : combine six critères pondérés (solvabilité 30 %, couverture des intérêts 20 %, marge 15 %, endettement 15 %, trésorerie 10 %, qualité des comptes 10 %). AAA à BBB = solide, BB à B = vulnérable, CCC à D = très fragile. C'est une note pédagogique, pas celle d'une agence.",
 "<b>Marge d'exploitation</b> = résultat d'exploitation / chiffre d'affaires. Négative : l'activité perd de l'argent avant frais financiers.",
 "<b>ROE</b> = résultat net / capitaux propres. <b>Liquidité générale</b> = actif circulant / passif circulant ; sous 1, risque de manque de trésorerie à court terme.",
 "<b>Endettement</b> = dettes long terme / capitaux propres ; au-dessus de 1, la société dépend fortement de ses prêteurs. <b>Délai clients</b> = créances / CA × 365 ; au-delà de 90 jours, risque de recouvrement.",
 "<b>Couverture des intérêts</b> = EBIT / charges d'intérêts ; sous 1,5, la société peine à payer ses intérêts. Chaque graphique s'exporte en image (PNG) ou en données (CSV)."]},
mission:{t:"Comment planifier la mission",steps:[
 "<b>Travaux d'audit</b> (en bas) : continuité d'exploitation (ISA 570, indicateurs calculés + à vérifier), revue analytique (ISA 520, variations significatives à expliquer) et échantillonnage par unités monétaires (taille, intervalle et tirage des écritures du grand livre).",
 "<b>0. Points d'attention</b> : en haut, les points de vigilance de l'année en cours (proposés par l'IA ou déduits des scores). Seuil, risques et notation sont calculés sur la prévision de l'année en cours.",
 "<b>1. Seuil de signification</b> : choisissez une base (CA, total actif, capitaux propres ou résultat) et un taux. Le seuil de planification (souvent 50 à 75 % du seuil) sert à dimensionner les tests ; les anomalies sous 5 % du seuil sont négligées.",
 "<b>2. Contrôle interne</b> : répondez aux 8 questions d'après la prise de connaissance. Plus il y a de « Non », plus le risque lié au contrôle est élevé.",
 "<b>3. Risque d'audit</b> : pour chaque compte, le tableau combine risque inhérent et risque lié au contrôle pour fixer le risque de non-détection acceptable, et donc la nature et la taille des tests.",
 "<b>4. Calendrier</b> : saisissez les noms des membres, les dates et le responsable de chaque phase. Le diagramme se met à jour et s'exporte en image.",
 "Les choix sont enregistrés dans ce navigateur et repris dans le rapport PDF et dans le mode présentation."]},
environnement:{t:"Comment utiliser cet onglet",steps:[
 "Ce tableau résume l'analyse documentaire : les facteurs économiques, réglementaires et géopolitiques de chaque société et le risque d'audit qu'ils créent.",
 "Il justifie les hypothèses du CrashTest et les risques retenus dans le plan de mission : citez-le dans votre présentation de l'étape 2 du travail."]},
equipe:{t:"Comment travailler en équipe",steps:[
 "<b>Accès</b> : le propriétaire de la page la partage avec chaque membre (bouton Partager de claude.ai, accès Éditeur pour pouvoir mettre à jour les tâches). Chacun est reconnu par son compte Claude : pas de mot de passe à créer.",
 "<b>Créer la mission</b> (chef de mission) : choisissez une analyse de l'historique, l'échéance, et laissez cochée la génération des tâches. Une fiche est créée pour chaque risque du plan, avec objectif, procédures, échantillon et consignes.",
 "<b>Ajouter les membres</b> : dans « Équipe », cherchez un collègue par son nom, ou acceptez les demandes de ceux qui ont cliqué sur « Demander à rejoindre ». Donnez un rôle : auditeur ou stagiaire.",
 "<b>Attribuer</b> : ouvrez une fiche, choisissez le responsable et l'échéance. Chaque membre retrouve ses fiches dans « Mes tâches », avec ce qu'il doit faire (✓) et ce qu'il ne doit pas faire (✗).",
 "<b>Réaliser et réviser</b> : le membre commence la tâche, rédige ses travaux et sa conclusion, puis la marque terminée. Le chef de mission la valide ou la renvoie avec un commentaire. Le tableau de bord suit l'avancement et les retards."]},
assistant:{t:"Comment utiliser l'assistant IA",steps:[
 "Cliquez sur une question proposée ou écrivez la vôtre, puis « Envoyer » (ou Entrée).",
 "L'assistant reçoit les chiffres, les scores, la note, le seuil, le risque lié au contrôle et le scénario de crise affichés dans RiskScope : il répond à partir de ces données.",
 "Il peut expliquer un résultat, comparer les sociétés ou rédiger une conclusion. Relisez toujours ses réponses : une IA peut se tromper.",
 "<b>Hors de claude.ai</b> (GitHub, fichier local) : collez votre clé API Claude (console.anthropic.com) dans la carte « Activer l'IA ». Elle reste dans ce navigateur, n'est jamais envoyée ailleurs qu'à l'API d'Anthropic, et chaque appel est facturé sur votre compte. Ne la mettez jamais dans le code.",
 "La première question demande votre autorisation : l'assistant utilise votre compte Claude. Il fonctionne dans la version publiée sur claude.ai."]},
donnees:{t:"Comment saisir et partager les données",steps:[
 "Choisissez la société en haut à droite. Les montants sont en millions de la devise de publication (MDH, M€ ou M$).",
 "Modifiez une case puis quittez-la : tous les onglets se recalculent. Les chiffres d'origine (SNEP, Arkema, Dow) peuvent être rétablis avec « Revenir aux chiffres publiés ».",
 "Les hypothèses de sensibilité alimentent le CrashTest : justifiez-les avec les rapports annuels.",
 "Pour travailler à plusieurs : « Copier toutes les données », envoyez le texte au groupe, qui le colle puis clique sur « Importer »."]}
};
function injectGuides(){
  Object.entries(GUIDES).forEach(([id,g])=>{
    const v=document.getElementById("view-"+id);if(!v||v.querySelector(".guide"))return;
    v.firstElementChild.insertAdjacentHTML("afterend",`<details class="guide"><summary>${g.t}</summary><ol>${g.steps.map(s=>`<li>${s}</li>`).join("")}</ol></details>`);
  });
}

/* ---------- Interprétations ---------- */
const interp=t=>`<p class="interp"><b>Interprétation :</b> ${t}</p>`;
const BW={DSRI:.92,GMI:.528,AQI:.404,SGI:.892,DEPI:.115,TATA:4.679};
const BX={DSRI:"les créances clients augmentent plus vite que le chiffre d'affaires",GMI:"la marge brute se dégrade",AQI:"la part d'actifs difficiles à évaluer augmente",SGI:"la croissance des ventes est forte, ce qui met la direction sous pression",DEPI:"le rythme d'amortissement ralentit, ce qui gonfle le résultat",TATA:"le résultat est peu converti en trésorerie"};
function interpM(be){
  if(!isFinite(be.M))return "M-score non calculé : il faut les 17 postes sur deux exercices consécutifs. Complétez les cases vides dans l'onglet Données (ou importez le rapport annuel) pour obtenir le Fraud Radar complet.";
  const z=mZone(be.M);let top=null,tv=0;
  Object.keys(BW).forEach(id=>{const c=BW[id]*((be[id]||0)-(id==="TATA"?0:1));if(isFinite(c)&&c>tv){tv=c;top=id;}});
  let s=`M-score de ${fmt(be.M,2)} : ${z==="crit"?"au-dessus du seuil de −1,78, le modèle classe la société parmi les manipulateurs probables":z==="warn"?"zone grise, entre −2,22 et −1,78":"sous −2,22, pas de signe de manipulation selon le modèle"}.`;
  if(top&&tv>0.05)s+=` Le signal le plus fort vient de ${top} (${fmt(be[top],top==="TATA"?3:2)}) : ${BX[top]}.`;
  s+=z==="crit"?" À traiter en priorité : tests de séparation des exercices, revue des écritures de fin d'année et circularisation des clients.":z==="warn"?" Renforcer les tests sur les postes signalés.":" Les tests standards suffisent sur ce point.";
  return s;
}
function interpBenford(bf){const z=benZone(bf.mad);
  return z==="good"?`La répartition des premiers chiffres suit la loi de Benford (écart ${fmt(bf.mad,4)}) : pas d'anomalie visible.`:`Écart de ${fmt(bf.mad,4)}, ${z==="warn"?"à la limite":"au-delà"} du seuil de 0,015. Avec seulement ${bf.n} montants, le test reste indicatif : à refaire sur le grand livre avant de conclure.`;}
function interpStress(k){
  const st=stress(k),cu=state.cos[k].cur;
  if(!scenActive())return `Aucune crise sélectionnée : Altman Z' de ${fmt(st.zb,2)} en ${YL(4)}, ${st.zb<1.23?"zone de détresse":st.zb<2.9?"zone grise":"zone saine"}. Choisissez un scénario pour mesurer la résistance de la société.`;
  const worst=Object.entries(st.c).sort((a,b)=>a[1]-b[1])[0];
  const ch=Math.abs(st.b.ebit)>0?(st.ebit-st.b.ebit)/Math.abs(st.b.ebit):NaN;
  let s=`Sous « ${scenName} », le résultat d'exploitation passe de ${fmt(st.b.ebit)} à ${fmt(st.ebit)} ${cu}${isFinite(ch)?` (${ch>0?"+":""}${pct(ch)})`:""}.`;
  if(worst&&worst[1]<0)s+=` Le facteur le plus pénalisant est ${NAMES[worst[0]].toLowerCase()} (${fmt(worst[1])} ${cu}).`;
  s+=st.verdict==="crit"?" La continuité d'exploitation devient un risque majeur : examiner les prévisions de trésorerie, les financements et les covenants.":st.verdict==="warn"?" La société tient mais sort fragilisée : surveiller les covenants et les dépréciations d'actifs.":" La société absorbe le choc.";
  return s;
}
function interpDumbbell(){
  const d=keys().map(k=>({k,s:stress(k)})).filter(x=>isFinite(x.s.marginB)&&isFinite(x.s.marginS));
  if(!d.length)return "";
  if(!scenActive())return `Marges ${YL(4)} : ${d.map(x=>`${state.cos[x.k].name} ${pct(x.s.marginB,1)}`).join(", ")}. Choisissez une crise pour comparer la sensibilité des sociétés.`;
  const w=d.reduce((a,b)=>(b.s.marginS-b.s.marginB)<(a.s.marginS-a.s.marginB)?b:a);
  const loss=w.s.marginS-w.s.marginB;
  return `${state.cos[w.k].name} est la plus touchée : sa marge perd ${fmt(Math.abs(loss)*100,1)} point${Math.abs(loss)*100>=2?"s":""}. Un même choc ne frappe pas les sociétés de la même façon selon leur structure de coûts, leur devise et leur pouvoir de prix.`;
}
const GRADE_TXT={AAA:"situation très solide",AA:"situation très solide",A:"situation solide",BBB:"situation correcte",BB:"situation vulnérable",B:"situation fragile",CCC:"situation très fragile, risque de défaut élevé",CC:"situation très fragile, risque de défaut élevé",D:"défaillance probable"};
function interpRating(k){
  const r=rating(k,false),parts=[...r.parts].filter(p=>isFinite(p[2])).sort((a,b)=>a[2]-b[2]);
  const lc=s=>s.charAt(0).toLowerCase()+s.slice(1);
  const weak=parts.slice(0,2).map(p=>lc(p[0])),strong=parts[parts.length-1];
  return `Note ${r.grade} : ${GRADE_TXT[r.grade]}. Points faibles : ${weak.join(" et ")}.${strong&&strong[2]>=60?` Point fort : ${lc(strong[0])}.`:""} ${prioAudit(r)}`;
}
function prioAudit(r){return r.score<35?"Pour l'auditeur, la continuité d'exploitation doit figurer parmi les risques significatifs.":r.score<55?"Pour l'auditeur, une vigilance particulière s'impose sur la valorisation des actifs et le respect des covenants.":"Pour l'auditeur, le risque financier global est limité.";}
const RATIO_DEFS=[["marg","Marge d'exploitation","%",v=>pct(v,1)],["roe","Rentabilité des capitaux propres (ROE)","%",v=>pct(v,1)],["liq","Liquidité générale (actif / passif circulant)","x",v=>fmt(v,2)],["gear","Endettement long terme / capitaux propres","x",v=>fmt(v,2)],["dso","Délai clients (jours de CA)","j",v=>fmt(v)],["cov","Couverture des intérêts (EBIT / intérêts)","x",v=>fmt(v,1)]];
function interpRatio(id,f){
  const ks=keys(),v=k=>[ratios(k,0)[id],ratios(k,4)[id]];
  const trend=ks.map(k=>{const [a,b]=v(k);return `${state.cos[k].name} ${isFinite(a)?f(a):"n.d."} → ${isFinite(b)?f(b):"n.d."}`;}).join(" ; ");
  const last=ks.map(k=>({k,x:v(k)[1]})).filter(o=>isFinite(o.x));
  const names=arr=>arr.map(o=>state.cos[o.k].name).join(", ");
  let s=`De ${YEARS[0]} à ${YL(4)} : ${trend}.`;
  const best=last.length?last.reduce((a,b)=>(id==="gear"||id==="dso")?(b.x<a.x?b:a):(b.x>a.x?b:a)):null;
  if(best&&last.length>1)s+=` Meilleure position en ${YL(4)} : ${state.cos[best.k].name}.`;
  const flag=(cond,txt)=>{const l=last.filter(o=>cond(o.x));if(l.length)s+=` ${names(l)} : ${txt}`;};
  if(id==="marg")flag(x=>x<0,"marge négative, l'activité perd de l'argent avant frais financiers.");
  if(id==="roe")flag(x=>x<0,"rentabilité négative, les pertes réduisent les capitaux propres.");
  if(id==="liq")flag(x=>x<1,"actif circulant inférieur aux dettes à court terme, risque de liquidité.");
  if(id==="gear")flag(x=>x>1,"dettes long terme supérieures aux capitaux propres.");
  if(id==="dso")flag(x=>x>90,"délai clients supérieur à 90 jours, risque de recouvrement à vérifier par circularisation.");
  if(id==="cov")flag(x=>x<1.5,"intérêts mal couverts par le résultat d'exploitation, risque sur la continuité.");
  return s;
}
function interpMission(k){
  const mt=materiality(k),cs=ciScore(k),co=state.cos[k];
  const rows=risks(k).map(r=>auditRisk(r,cs.lvl)),strict=rows.filter(a=>a.rnd===1).length;
  let s=mt.neg?"Le seuil ne peut pas être calculé sur une base négative.":`Une anomalie, ou un cumul d'anomalies, supérieur à ${fmt(mt.sm,mt.sm<10?2:0)} ${co.cur} serait jugé significatif ; les tests sont calibrés sur ${fmt(mt.sp,mt.sp<10?2:0)} ${co.cur}.`;
  s+=cs.lvl===1?" Le contrôle interne paraît fiable : l'équipe peut s'appuyer sur lui et alléger les tests substantifs.":cs.lvl===2?" Le contrôle interne est partiellement fiable : approche mixte, tests de procédures puis tests substantifs ciblés.":" Le contrôle interne n'est pas fiable : l'approche sera essentiellement substantive.";
  s+=` ${strict} compte${strict>1?"s":""} sur ${rows.length} exige${strict>1?"nt":""} des tests étendus.`;
  return s;
}
function interpMatrix(){
  return keys().map(k=>{const red=risks(k).filter(r=>r.score>=15);return `${state.cos[k].name} : ${red.length?`${red.length} risque${red.length>1?"s":""} majeur${red.length>1?"s":""} (${red.map(r=>SHORT[r.risk].toLowerCase()).join(", ")})`:"aucun risque majeur"}`;}).join(" ; ")+". Les risques majeurs (cases rouges) doivent être couverts par des procédures étendues dans le plan de mission.";
}

/* ---------- Exports ---------- */
function rootVars(){const cs=getComputedStyle(document.documentElement),o={};["--bg","--surface","--soft","--ink","--muted","--line","--accent","--accent-ink","--good","--warn","--crit","--good-bg","--warn-bg","--crit-bg","--c1","--c2","--c3"].forEach(v=>o[v]=cs.getPropertyValue(v).trim());return o;}
function svgToPng(svgStr,title){
  return new Promise((resolve,reject)=>{
    const vars=rootVars();
    let s=svgStr.replace(/var\((--[a-z0-9-]+)\)/gi,(m,v)=>vars[v]||"#888");
    if(!/xmlns=/.test(s))s=s.replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" ');
    const vb=/viewBox="([\d.\s-]+)"/.exec(s);const [, , w, h]=vb?vb[1].split(/\s+/).map(Number):[0,0,600,300];
    const th=title?32:0,W=w,H=h+th;
    s=s.replace(/<svg ([^>]*?)width="[^"]*"/,"<svg $1").replace(/style="min-width:[^"]*"/,"").replace("<svg ",`<svg x="0" y="${th}" width="${W}" height="${h}" `);
    const outer=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><style>text{fill:${vars["--muted"]};font-family:Arial,Helvetica,sans-serif}</style><rect width="${W}" height="${H}" fill="#fff"/>${title?`<text x="8" y="21" style="fill:${vars["--ink"]};font-size:15px;font-weight:bold">${esc(title)}</text>`:""}${s}</svg>`;
    const img=new Image();
    img.onload=()=>{const sc=3,c=document.createElement("canvas");c.width=W*sc;c.height=H*sc;const g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height);g.drawImage(img,0,0,c.width,c.height);resolve({url:c.toDataURL("image/png"),w:W,h:H});};
    img.onerror=()=>reject(new Error("svg"));
    img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(outer);
  });
}
function dataUrlToBlob(u){const [h,b]=u.split(",");const bin=atob(b);const a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return new Blob([a],{type:/:(.*?);/.exec(h)[1]});}
async function saveFile(filename,data,msgEl){
  const m=msgEl||document.getElementById("pdf-msg");
  const blob=data instanceof Blob?data:new Blob([data],{type:"text/plain"});
  const say=(t,err)=>{if(!m)return;m.className="msg"+(err?" err":"");m.textContent=t;setTimeout(()=>{if(m.textContent===t)m.textContent="";},5000);};
  if(dlCap){
    try{await dlCap.save({filename,data:blob});say(`${filename} enregistré.`);}
    catch(e){if(e&&e.code==="declined")say("Téléchargement annulé.");else if(e&&e.code==="rate_limited")say("Une fenêtre de téléchargement est déjà ouverte : réessayez dans un instant.",true);else fallbackDl(filename,blob,say);}
  }else fallbackDl(filename,blob,say);
}
function fallbackDl(filename,blob,say){try{const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=filename;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},2000);say(`${filename} téléchargé.`);}catch(e){say("Le téléchargement n'est pas possible dans cet affichage.",true);}}
const slug=s=>String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
function toCsv(rows){return "﻿"+rows.map(r=>r.map(c=>{let v=c==null?"":typeof c==="number"?(isFinite(c)?String(Math.round(c*10000)/10000).replace(".",","):""):String(c);return /[;"\n]/.test(v)?`"${v.replace(/"/g,'""')}"`:v;}).join(";")).join("\r\n");}
const CSV={};
CSV.plan=()=>[["Société","Risque","Probabilité","Impact","Score","Priorité","Indicateur","Comptes","Assertions","Procédures"],...keys().flatMap(k=>risks(k).sort((a,b)=>b.score-a.score).map(r=>[state.cos[k].name,r.risk,r.prob,r.impact,r.score,PRIO_L[prio(r.score)],r.why,r.compte,r.assertion,r.proc]))];
CSV.beneish=()=>[["Société","Exercice","DSRI","GMI","AQI","SGI","DEPI","SGAI","LVGI","TATA","M-score","Lecture"],...keys().flatMap(k=>[1,2,3,4].map(t=>{const b=beneish(D(k),t);return[state.cos[k].name,YL(t),b.DSRI,b.GMI,b.AQI,b.SGI,b.DEPI,b.SGAI,b.LVGI,b.TATA,b.M,M_LABEL[mZone(b.M)]];}))];
CSV.benford=()=>[["Société","Montants",...[1,2,3,4,5,6,7,8,9].map(d=>"Chiffre "+d),"Écart moyen (MAD)"],["Attendu (Benford)","",...BEN],...keys().map(k=>{const b=benford(RD(k));return[state.cos[k].name,b.n,...b.obs,b.mad];})];
CSV.stress=()=>[["Scénario",scenActive()?scenName:"aucun",...SLIDERS.map(s=>`${s[1]} : ${scen[s[0]]}${s[5]}`)],[],["Société","Devise","CA avant","CA après","EBIT avant","EBIT après","Résultat net avant","Résultat net après","Couverture avant","Couverture après","Z' avant","Z' après","Verdict","Marge avant","Marge après",...Object.values(NAMES).map(n=>"Effet "+n.toLowerCase())],...keys().map(k=>{const s=stress(k);return[state.cos[k].name,state.cos[k].cur,s.b.ca,s.ca,s.b.ebit,s.ebit,s.b.net,s.net,s.covB,s.cov,s.zb,s.zs,VERD[s.verdict],s.marginB,s.marginS,...Object.keys(NAMES).map(n=>s.c[n])];})];
CSV.ratios=()=>[["Société","Exercice",...RATIO_DEFS.map(d=>d[1])],...keys().flatMap(k=>YEARS.map((y,t)=>{const r=ratios(k,t);return[state.cos[k].name,YL(t),...RATIO_DEFS.map(d=>r[d[0]])];}))];
RATIO_DEFS.forEach(([id,title])=>{CSV["ratio_"+id]=()=>[["Exercice",...keys().map(k=>state.cos[k].name)],...YEARS.map((y,t)=>[YL(t),...keys().map(k=>ratios(k,t)[id])])];});
CSV.history=()=>[["Société","Pays","Secteur","Devise","Dernier exercice","Note","Score","M-score","Altman Z'","Verdict","Créée le","Mise à jour"],...libKeys().map(k=>{const c=state.cos[k];let r,be,st;withNoFc(()=>withScen(ZERO,()=>{r=rating(k,false);be=beneish(D(k),4);st=stress(k);}));return[c.name,c.country||"",c.sector||"",c.cur,c.lastYear||"",r.grade,r.score,be.M,st.zb,VERD[st.verdict],c.createdAt?new Date(c.createdAt).toLocaleDateString("fr-FR"):"",c.updatedAt?new Date(c.updatedAt).toLocaleDateString("fr-FR"):""];})];
CSV.rating=()=>!keys().length?[["Aucune analyse ouverte"]]:[["Société","Note","Score /100",...rating(keys()[0],false).parts.map(p=>`${p[0]} (poids ${p[1]})`),"Interprétation"],...keys().map(k=>{const r=rating(k,false);return[state.cos[k].name,r.grade,r.score,...r.parts.map(p=>p[2]),interpRating(k)];})];
CSV.mission=()=>{const k=ui.missionCo,co=state.cos[k],mt=materiality(k),cs=ciScore(k);return[["Société",co.name],["Base du seuil",BASES[state.cos[k].mission.base][0]],["Taux (%)",state.cos[k].mission.rate],["Seuil de signification",mt.sm],["Seuil de planification",mt.sp],["Anomalies insignifiantes",mt.si],["Risque lié au contrôle",LVL[cs.lvl]],[],["Question de contrôle interne","Réponse"],...CI_Q.map((q,i)=>[q,CI_A.find(a=>a[1]===state.cos[k].mission.ci[i])[0]]),[],["Risque","Comptes","Risque inhérent","Risque lié au contrôle","Non-détection acceptable","Travaux","Échantillon"],...risks(k).sort((a,b)=>b.score-a.score).map(r=>{const a=auditRisk(r,cs.lvl);return[r.risk,r.compte,LVL[a.ri],LVL[cs.lvl],LVL[a.rnd],a.work,a.sample];})];};
CSV.calendar=()=>[["Phase","Début","Fin","Responsable"],...state.phases.map(p=>[p.name,p.start,p.end,state.team[p.who]||""])];
CSV.all=()=>{const out=[["RiskScope FIDEX5 - export des résultats",new Date().toLocaleDateString("fr-FR")],[]];
  const add=(t,rows)=>{out.push([t]);rows.forEach(r=>out.push(r));out.push([]);};
  add("NOTATION",CSV.rating());add("BENEISH",CSV.beneish());add("BENFORD",CSV.benford());add("CRASHTEST",CSV.stress());add("RATIOS",CSV.ratios());add("PLAN DE MISSION",CSV.plan());add("CALENDRIER",CSV.calendar());return out;};
function expBar(png,name,csv){return `<div class="exp">${png?`<button class="btn small" data-png="${png}" data-name="${esc(name)}">Image PNG</button>`:""}${csv?`<button class="btn small" data-csv="${csv}">Données CSV</button>`:""}</div>`;}
document.addEventListener("click",async e=>{
  const b=e.target.closest("[data-png],[data-csv],#csv-all");if(!b)return;
  const msg=b.closest(".card,.hero")?.querySelector(".msg")||document.getElementById("pdf-msg");
  if(b.id==="csv-all"){saveFile("FIDEX5-RiskScope-resultats.csv",new Blob([toCsv(CSV.all())],{type:"text/csv"}),document.getElementById("pdf-msg"));return;}
  if(b.dataset.csv){const rows=CSV[b.dataset.csv]();saveFile(`FIDEX5-${b.dataset.csv}.csv`,new Blob([toCsv(rows)],{type:"text/csv"}),expMsg(b));return;}
  const host=document.getElementById(b.dataset.png)||document.querySelector(b.dataset.png);const svg=host&&host.querySelector("svg");
  if(!svg)return;
  try{const r=await svgToPng(svg.outerHTML,b.dataset.name);saveFile(`FIDEX5-${slug(b.dataset.name)}.png`,dataUrlToBlob(r.url),expMsg(b));}catch(err){const m=expMsg(b);m.className="msg err";m.textContent="L'image n'a pas pu être créée.";}
});
function expMsg(b){let m=b.parentElement.querySelector(".msg");if(!m){m=document.createElement("span");m.className="msg";m.setAttribute("role","status");b.parentElement.append(m);}return m;}
/* ---------- Rendus avec interprétations et exports ---------- */
function renderOverview(){
  document.getElementById("scenario-label").textContent=scenActive()?scenName:"aucun (réglez-le dans CrashTest)";
  document.getElementById("overview").innerHTML=keys().map(k=>{
    const be=beneish(D(k),4),st=stress(k),r=rating(k,false);
    const rs=risks(k).sort((a,b)=>b.score-a.score);
    return coCard(k,`<div class="kpis" style="grid-template-columns:auto 1fr 1fr;align-items:end">
      <div class="kpi"><div class="lab">Note ${YL(4)}</div><div class="rating ${r.zone}" style="font-size:34px">${r.grade}</div></div>
      <div class="kpi"><div class="lab">M-score ${YL(4)}</div><div class="val">${fmt(be.M,2)}</div>${pill(mZone(be.M),M_LABEL[mZone(be.M)])}</div>
      <div class="kpi"><div class="lab">Altman Z' ${scenActive()?"après crise":YL(4)}</div><div class="val">${fmt(st.zs,2)}</div>${pill(st.verdict,VERD[st.verdict])}</div>
    </div>
    <p class="small" style="margin:12px 0 4px">Risques prioritaires</p>
    <ul class="alerts">${rs.slice(0,3).map(r=>`<li><span class="dot ${prio(r.score)}"></span><span>${esc(r.risk)} <span class="small">(${esc(r.why)})</span></span></li>`).join("")}</ul>
    ${interp(`${GRADE_TXT[r.grade].charAt(0).toUpperCase()+GRADE_TXT[r.grade].slice(1)} (note ${r.grade}). Risque n° 1 pour l'audit : ${rs[0].risk.toLowerCase()}. ${mZone(be.M)==="na"?"Le M-score n'a pas pu être calculé (postes manquants) : complétez les données pour le Fraud Radar complet.":mZone(be.M)==="good"?`Les comptes ${YL(4)} ne montrent pas de signe de manipulation selon Beneish.`:"Le M-score appelle des tests renforcés sur les comptes."}`)}
    <div style="margin-top:10px"><button class="btn small" data-pdf="${k}">Rapport PDF</button></div>`);
  }).join("");
  document.querySelectorAll("#overview [data-pdf]").forEach(b=>b.onclick=()=>downloadPdf([b.dataset.pdf]));
}
function renderMatrix(){
  const all=keys().flatMap(risks);
  let h="";
  for(let imp=5;imp>=1;imp--){
    h+=`<div class="ax">${imp}</div>`;
    for(let pr=1;pr<=5;pr++){
      const s=pr*imp;const bg=s>=15?"var(--crit-bg)":s>=8?"var(--warn-bg)":"var(--good-bg)";
      const items=all.filter(r=>r.prob===pr&&r.impact===imp);
      h+=`<div class="cell" style="background:${bg}" title="Probabilité ${pr}, impact ${imp}">${items.map(r=>`<span class="chip" style="--co:${col(r.key)}">${esc(state.cos[r.key].name)} · ${SHORT[r.risk]}</span>`).join("")}</div>`;
    }
  }
  h+=`<div class="ax"></div>`+[1,2,3,4,5].map(i=>`<div class="ax">${i}</div>`).join("");
  document.getElementById("matrix").innerHTML=h;
  document.getElementById("legend").innerHTML=keys().map(k=>`<span style="--co:${col(k)}"><i></i>${esc(state.cos[k].name)}</span>`).join("")+`<span class="small">Vertical : impact · horizontal : probabilité</span>`;
  document.getElementById("matrix-interp").innerHTML=interp(interpMatrix());
}
function renderPlan(){
  if(ui.planCo!=="all"&&!state.cos[ui.planCo])ui.planCo="all";
  const f=document.getElementById("plan-filter");
  f.innerHTML=[["all","Toutes"],...keys().map(k=>[k,state.cos[k].name])].map(([k,l])=>`<button aria-pressed="${ui.planCo===k}" data-k="${k}">${esc(l)}</button>`).join("");
  f.querySelectorAll("button").forEach(b=>b.onclick=()=>{ui.planCo=b.dataset.k;renderPlan();});
  const rows=(ui.planCo==="all"?keys():[ui.planCo]).flatMap(risks).sort((a,b)=>b.score-a.score);
  document.getElementById("plan").innerHTML=`<thead><tr><th>Priorité</th><th>Risque</th><th>Comptes / assertions</th><th>Procédures d'audit</th></tr></thead><tbody>${rows.map(r=>{
    const z=prio(r.score);
    return `<tr><td>${pill(z,PRIO_L[z])}<div class="small mono">${r.prob}×${r.impact}=${r.score}</div></td><td><b style="color:${col(r.key)}">${esc(state.cos[r.key].name)}</b> · ${esc(r.risk)}<div class="small">${esc(r.why)}</div></td><td>${esc(r.compte)}<div class="small">${esc(r.assertion)}</div></td><td>${esc(r.proc)}</td></tr>`;}).join("")}</tbody>`;
  const hi=rows.filter(r=>r.score>=15).length,mid=rows.filter(r=>r.score>=8&&r.score<15).length;
  document.getElementById("plan-interp").innerHTML=interp(`${hi} risque${hi>1?"s":""} de priorité élevée et ${mid} de priorité moyenne. Les risques élevés concentrent les travaux : tests étendus, confirmations externes et examen au plus près de la clôture ; les risques faibles sont couverts par des procédures analytiques.`);
}
function renderRadar(){
  const ys=document.getElementById("year-seg");
  if(!ui.yearUser)ui.year=keys().length&&isFc(4)?3:4;
  ys.innerHTML=[1,2,3,4].map(t=>`<button aria-pressed="${ui.year===t}" data-t="${t}">${YL(t)}</button>`).join("");
  ys.querySelectorAll("button").forEach(b=>b.onclick=()=>{ui.year=+b.dataset.t;ui.yearUser=true;renderRadar();});
  const t=ui.year;
  document.getElementById("radar-cards").innerHTML=keys().map(k=>{
    const {be,v,al}=radarData(k,t);const z=mZone(be.M);
    return coCard(k,`<div class="kpis" style="grid-template-columns:1fr auto;align-items:end"><div class="kpi"><div class="lab">M-score ${YL(t)}</div><div class="val">${fmt(be.M,2)}</div></div>${pill(z,M_LABEL[z])}</div>
      <div class="radar-wrap" id="radar-svg-${k}">${radarSVG(v,col(k))}</div>
      <ul class="alerts">${al.map(([z2,tx])=>`<li><span class="dot ${z2}"></span><span>${esc(tx)}</span></li>`).join("")}</ul>
      ${interp(interpM(be))}${expBar("radar-svg-"+k,`Radar ${state.cos[k].name} ${YL(t)}`)}`);
  }).join("");
  const idx=[["DSRI","Créances / CA","> 1 : créances qui gonflent"],["GMI","Marge brute","> 1 : marge qui se dégrade"],["AQI","Qualité des actifs","> 1 : actifs plus douteux"],["SGI","Croissance des ventes","forte croissance = pression"],["DEPI","Amortissements","> 1 : amortissements ralentis"],["SGAI","Frais généraux / CA","> 1 : frais en hausse"],["LVGI","Endettement","> 1 : levier en hausse"],["TATA","Accruals / actif","> 0 : résultat non encaissé"]];
  const bes=keys().map(k=>beneish(D(k),t));
  document.getElementById("beneish-table").innerHTML=`<thead><tr><th>Indice</th><th>Lecture</th>${keys().map(k=>`<th class="n" style="color:${col(k)}">${esc(state.cos[k].name)}</th>`).join("")}</tr></thead><tbody>${idx.map(([id,l,r])=>`<tr><td><b class="mono">${id}</b> <span class="small">${l}</span></td><td class="small">${r}</td>${bes.map(b=>`<td class="n">${fmt(b[id],id==="TATA"?3:2)}</td>`).join("")}</tr>`).join("")}<tr><td><b>M-score</b></td><td class="small">seuil −1,78</td>${bes.map(b=>`<td class="n"><b>${fmt(b.M,2)}</b></td>`).join("")}</tr></tbody>`;
  const flagged=keys().filter((k,i)=>mZone(bes[i].M)!=="good");
  document.getElementById("beneish-interp").innerHTML=interp(flagged.length?`En ${YL(t)}, ${flagged.map(k=>state.cos[k].name).join(" et ")} ${flagged.length>1?"dépassent":"dépasse"} le seuil de vigilance de −2,22. Comparez les indices supérieurs à 1 pour identifier les postes à tester.`:`En ${YL(t)}, aucune société ne dépasse le seuil de vigilance de −2,22 : pas de signal de manipulation selon le modèle.`);
  document.getElementById("benford").innerHTML=keys().map(k=>{
    const bf=benford(RD(k)),c=col(k);
    const W=280,H=150,x0=24,bw=(W-x0-6)/9,ymax=.4,sy=v=>H-20-Math.min(v,ymax)/ymax*(H-34);
    let s=`<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Benford ${esc(state.cos[k].name)}">`;
    [0,.1,.2,.3,.4].forEach(g=>{s+=`<line x1="${x0}" x2="${W-4}" y1="${sy(g)}" y2="${sy(g)}" stroke="var(--line)"/><text x="${x0-4}" y="${sy(g)+3}" font-size="9" text-anchor="end">${g*100}</text>`;});
    bf.obs.forEach((o,i)=>{s+=`<rect x="${x0+i*bw+3}" y="${sy(o)}" width="${bw-6}" height="${sy(0)-sy(o)}" fill="${c}" fill-opacity=".75" rx="2"/><text x="${x0+i*bw+bw/2}" y="${H-6}" font-size="10" text-anchor="middle">${i+1}</text>`;});
    s+=`<polyline points="${BEN.map((e,i)=>`${x0+i*bw+bw/2},${sy(e)}`).join(" ")}" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`;
    BEN.forEach((e,i)=>{s+=`<circle cx="${x0+i*bw+bw/2}" cy="${sy(e)}" r="2.2" fill="var(--ink)"/>`;});
    s+="</svg>";const z=benZone(bf.mad);
    return `<div><div class="co-head"><b style="color:${c}">${esc(state.cos[k].name)}</b>${pill(z,z==="good"?"Conforme":z==="warn"?"Limite":"Écart à investiguer")}</div><div id="ben-${k}">${s}</div><div class="small">${bf.n} montants · écart moyen (MAD) <span class="mono">${fmt(bf.mad,4)}</span> · seuil 0,015</div>${interp(interpBenford(bf))}${expBar("ben-"+k,`Benford ${state.cos[k].name}`)}</div>`;
  }).join("");
}
function renderStress(){
  document.getElementById("stress-cards").innerHTML=keys().map(k=>{
    const st=stress(k),cu=state.cos[k].cur,b=st.b;
    const dl=(a,c)=>{const d=c-a;return `<span class="${d<-1e-9?"delta-neg":d>1e-9?"delta-pos":""}">${fmt(c)}</span>`;};
    const maxAbs=Math.max(1e-9,...Object.values(st.c).map(Math.abs));
    const contrib=Object.entries(st.c).map(([n,v])=>{const w=Math.abs(v)/maxAbs*50;return `<div class="contrib"><span>${NAMES[n]}</span><div class="bar-track"><div class="mid"></div><div class="bar-fill" style="left:${v<0?50-w:50}%;width:${w}%;background:${v<0?"var(--crit)":"var(--good)"}"></div></div><span class="mono" style="text-align:right">${v>0?"+":""}${fmt(v)}</span></div>`;}).join("");
    return coCard(k,`<div style="margin:10px 0">${pill(st.verdict,VERD[st.verdict])}</div>
      <div class="row"><span>Chiffre d'affaires</span><span class="num">${fmt(b.ca)} → <b>${dl(b.ca,st.ca)}</b></span></div>
      <div class="row"><span>Résultat d'exploitation</span><span class="num">${fmt(b.ebit)} → <b>${dl(b.ebit,st.ebit)}</b></span></div>
      <div class="row"><span>Résultat net</span><span class="num">${fmt(b.net)} → <b>${dl(b.net,st.net)}</b></span></div>
      <div class="row"><span>Couverture des intérêts</span><span class="num">${isFinite(st.covB)?fmt(st.covB,1)+"×":"n.d."} → <b>${isFinite(st.cov)?fmt(st.cov,1)+"×":"n.d."}</b></span></div>
      <div class="row"><span>Altman Z'</span><span class="num">${fmt(st.zb,2)} → <b>${fmt(st.zs,2)}</b></span></div>
      <p class="small" style="margin:12px 0 2px">Effet de chaque facteur sur le résultat (${esc(cu)})</p>${contrib}
      ${interp(interpStress(k))}`);
  }).join("");
  document.getElementById("dumbbell").innerHTML=`<div class="scroll">${dumbbellSvg()}</div><p class="small">Cercle vide : marge ${YL(4)} ; cercle plein : marge après la crise sélectionnée.</p>`;
  document.getElementById("dumbbell-interp").innerHTML=interp(interpDumbbell());
}
function dumbbellSvg(){
  const data=keys().map(k=>({k,s:stress(k)}));
  const vals=data.flatMap(d=>[d.s.marginB,d.s.marginS]).filter(isFinite);
  let mn=Math.min(0,...vals),mx=Math.max(.05,...vals);
  mn=Math.floor(mn*20)/20;mx=Math.ceil(mx*20)/20;if(mx-mn>1){mn=Math.max(mn,-.5);mx=Math.min(mx,.5);}
  const W=640,rowH=40,top=28,H=top+rowH*data.length+10,x0=110,x1=W-20,sx=v=>x0+(clamp(v,mn,mx)-mn)/(mx-mn)*(x1-x0);
  let s=`<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Marges d'exploitation avant et après crise">`;
  for(let g=mn;g<=mx+1e-9;g+=.05){const x=sx(g);s+=`<line x1="${x}" x2="${x}" y1="${top-8}" y2="${H-6}" stroke="var(--line)" ${Math.abs(g)<1e-9?'stroke-width="1.5"':""}/><text x="${x}" y="${top-12}" font-size="10" text-anchor="middle">${Math.round(g*100)} %</text>`;}
  data.forEach((d,i)=>{const y=top+i*rowH+rowH/2,c=col(d.k),a=sx(d.s.marginB),b=sx(d.s.marginS);
    s+=`<text x="${x0-10}" y="${y+4}" font-size="12.5" text-anchor="end" style="fill:${c};font-weight:600">${esc(state.cos[d.k].name).slice(0,16)}</text>`;
    s+=`<line x1="${a}" x2="${b}" y1="${y}" y2="${y}" stroke="${c}" stroke-width="3" stroke-opacity=".45"/>`;
    s+=`<circle cx="${a}" cy="${y}" r="6" fill="#fff" stroke="${c}" stroke-width="2"/><circle cx="${b}" cy="${y}" r="6" fill="${c}"/>`;
    s+=`<text x="${b}" y="${y-10}" font-size="10.5" text-anchor="middle" style="fill:var(--ink)">${pct(d.s.marginS,1)}</text>`;});
  return s+"</svg>";
}
function renderRatios(){
  document.getElementById("rating-cards").innerHTML=keys().map(k=>{
    const r=rating(k,false),rs=scenActive()?rating(k,true):null;
    return coCard(k,`<div style="display:flex;align-items:flex-end;gap:16px;margin-top:10px"><div class="rating ${r.zone}">${r.grade}</div><div class="small">Score ${fmt(r.score)}/100${rs?`<br>Après « ${esc(scenName)} » : <b>${rs.grade}</b> (${fmt(rs.score)})`:""}</div></div>
      <div style="margin-top:10px">${r.parts.map(([l,w,v])=>`<div class="contrib" style="grid-template-columns:150px 1fr 40px"><span>${l}</span><div class="bar-track"><div class="bar-fill" style="left:0;width:${isFinite(v)?v:0}%;background:${col(k)}"></div></div><span class="mono" style="text-align:right">${isFinite(v)?Math.round(v):0}</span></div>`).join("")}</div>
      ${interp(interpRating(k))}`);
  }).join("");
  document.getElementById("ratio-charts").innerHTML=RATIO_DEFS.map(([id,title,u,f])=>`<div class="card"><h3>${title}</h3><div id="rc-${id}">${lineChart(keys().map(k=>({k,vals:YEARS.map((y,t)=>ratios(k,t)[id])})),u,f)}</div>${interp(interpRatio(id,f))}${expBar("rc-"+id,title,"ratio_"+id)}</div>`).join("");
}
function lineChart(series,u,f){
  const W=360,l=46,r=58,tp=14,bt=26,legH=22,H0=200,H=H0+legH;
  let all=series.flatMap(s=>s.vals).filter(isFinite);
  if(!all.length)return `<p class="small">Données insuffisantes.</p>`;
  let mn=Math.min(...all),mx=Math.max(...all);
  if(u==="x"&&mx>15)mx=15; if(u==="x"&&mn<-15)mn=-15;
  if(mn>0&&u!=="%")mn=0; if(mn===mx){mn-=1;mx+=1;}
  const pad=(mx-mn)*0.08;mn-=pad;mx+=pad;
  const sx=i=>l+i*(W-l-r)/(YEARS.length-1), sy=v=>tp+(mx-clamp(v,mn,mx))/(mx-mn)*(H0-tp-bt);
  let s=`<svg viewBox="0 0 ${W} ${H}" width="100%" role="img">`;
  for(let i=0;i<=4;i++){const v=mn+(mx-mn)*i/4,y=sy(v);s+=`<line x1="${l}" x2="${W-r}" y1="${y}" y2="${y}" stroke="var(--line)"/><text x="${l-6}" y="${y+3}" font-size="9.5" text-anchor="end">${f(v)}</text>`;}
  if(mn<0&&mx>0)s+=`<line x1="${l}" x2="${W-r}" y1="${sy(0)}" y2="${sy(0)}" stroke="var(--muted)" stroke-width="1"/>`;
  if(isFc(4)){const bx=(sx(3)+sx(4))/2;s+=`<rect x="${bx}" y="${tp}" width="${W-r-bx}" height="${H0-tp-bt}" fill="var(--accent)" fill-opacity=".07"/><text x="${W-r-4}" y="${tp+10}" font-size="9" text-anchor="end" style="fill:var(--accent-ink)">prévision</text>`;}
  YEARS.forEach((y,i)=>{s+=`<text x="${sx(i)}" y="${H0-8}" font-size="10" text-anchor="middle">${YL(i)}</text>`;});
  const ends=[];
  series.forEach(({k,vals})=>{const c=col(k);const pts=vals.map((v,i)=>isFinite(v)?[sx(i),sy(v)]:null).filter(Boolean);
    if(pts.length>1)s+=`<polyline points="${pts.map(p=>p.join(",")).join(" ")}" fill="none" stroke="${c}" stroke-width="2.2"/>`;
    pts.forEach((p,i)=>{s+=`<circle cx="${p[0]}" cy="${p[1]}" r="${i===pts.length-1?4:2.5}" fill="${c}"/>`;});
    const lv=vals[vals.length-1];if(isFinite(lv))ends.push({y:sy(lv),c,t:`${f(lv)}`});});
  ends.sort((a,b)=>a.y-b.y);for(let i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<11)ends[i].y=ends[i-1].y+11;
  ends.forEach(e=>{s+=`<text x="${W-r+8}" y="${e.y+3}" font-size="10" style="fill:${e.c};font-weight:600">${esc(e.t)}</text>`;});
  let lx=l;series.forEach(({k})=>{const n=esc(state.cos[k].name).slice(0,14);s+=`<rect x="${lx}" y="${H-14}" width="10" height="10" rx="2" fill="${col(k)}"/><text x="${lx+14}" y="${H-5}" font-size="10.5" style="fill:var(--ink)">${n}</text>`;lx+=24+n.length*6.2;});
  return s+`</svg>`;
}
function renderMission(){
  if(!keys().length)return;
  if(!keys().includes(ui.missionCo))ui.missionCo=keys()[0];
  const k=ui.missionCo,m=state.cos[k].mission,co=state.cos[k];
  const seg=document.getElementById("mission-co");
  seg.innerHTML=keys().map(x=>`<button aria-pressed="${x===k}" data-k="${x}">${esc(state.cos[x].name)}</button>`).join("");
  seg.querySelectorAll("button").forEach(b=>b.onclick=()=>{ui.missionCo=b.dataset.k;renderMission();renderAIBits();});
  const bs=document.getElementById("ms-base"),rt=document.getElementById("ms-rate"),pf=document.getElementById("ms-perf");
  bs.value=m.base;rt.value=String(m.rate).replace(".",",");pf.value=String(m.perf);
  bs.onchange=()=>{m.base=bs.value;m.rate=BASES[m.base][1];save();renderMission();};
  rt.onchange=()=>{const v=parseNum(rt.value);if(isFinite(v)&&v>0){m.rate=v;save();}renderMission();};
  pf.onchange=()=>{const v=parseNum(pf.value);if(isFinite(v)&&v>0&&v<=100){m.perf=v;save();}renderMission();};
  const mt=materiality(k);
  document.getElementById("ms-out").innerHTML=[["Seuil de signification",mt.sm],["Seuil de planification",mt.sp],["Anomalies insignifiantes (5 %)",mt.si]].map(([l,v])=>`<div class="box"><div class="lab">${l}</div><div class="val">${mt.neg?"n.d.":fmt(v,v<10?2:0)}</div><div class="small">${esc(co.cur)}</div></div>`).join("");
  const loss=pbtOf(yr(D(k),4))<=0;
  document.getElementById("ms-note").innerHTML=mt.neg?`<b>Base négative ou nulle :</b> choisissez le chiffre d'affaires ou le total actif.`:`Base retenue : ${BASES[m.base][0].toLowerCase()} ${YL(4)} = ${fmt(mt.baseVal)} ${esc(co.cur)} × ${fmt(m.rate,2)} %. Fourchettes usuelles : CA 0,5–1 %, total actif 1–2 %, capitaux propres 1–5 %, résultat avant impôt 5–10 %.${loss?" La société est déficitaire : le résultat n'est pas une base pertinente.":""}`;
  document.getElementById("ci-list").innerHTML=CI_Q.map((q,i)=>`<div class="q"><span>${q}</span><div class="seg" role="group" aria-label="${esc(q)}">${CI_A.map(([l,v])=>`<button aria-pressed="${m.ci[i]===v}" data-i="${i}" data-v="${v}">${l}</button>`).join("")}</div></div>`).join("");
  document.querySelectorAll("#ci-list button").forEach(b=>b.onclick=()=>{m.ci[+b.dataset.i]=+b.dataset.v;save();renderMission();});
  const cs=ciScore(k);
  document.getElementById("ci-out").innerHTML=`Risque lié au contrôle : ${pill(LVLZ[cs.lvl],LVL[cs.lvl])} <span class="small">(${Math.round(cs.s*100)} % de faiblesses)</span>`;
  const rows=risks(k).sort((a,b)=>b.score-a.score);
  document.getElementById("ra-table").innerHTML=`<thead><tr><th>Risque / compte</th><th>Risque inhérent</th><th>Risque lié au contrôle</th><th>Non-détection acceptable</th><th>Nature et étendue des travaux</th></tr></thead><tbody>${rows.map(r=>{const a=auditRisk(r,cs.lvl);
    return `<tr><td>${esc(r.risk)}<div class="small">${esc(r.compte)}</div></td><td>${pill(LVLZ[a.ri],LVL[a.ri])}</td><td>${pill(LVLZ[cs.lvl],LVL[cs.lvl])}</td><td>${pill(LVLZ[4-a.rnd],LVL[a.rnd])}</td><td>${a.work}<div class="small">Échantillon indicatif : ${a.sample}${!mt.neg?` · seuil de planification ${fmt(mt.sp,mt.sp<10?2:0)} ${esc(co.cur)}`:""}</div></td></tr>`;}).join("")}</tbody>`;
  document.getElementById("mission-interp").innerHTML=interp(interpMission(k));
  document.getElementById("team").innerHTML=state.team.map((n,i)=>`<label class="small" for="tm-${i}">Membre ${i+1}<input type="text" id="tm-${i}" value="${esc(n)}"></label>`).join("");
  state.team.forEach((n,i)=>{document.getElementById("tm-"+i).onchange=e=>{state.team[i]=e.target.value.trim()||`Membre ${i+1}`;save();renderMission();};});
  document.getElementById("phases").innerHTML=state.phases.map((p,i)=>`<div class="phase"><span>${esc(p.name)}</span><input type="date" id="ph-s-${i}" value="${p.start}" aria-label="Début ${esc(p.name)}"><input type="date" id="ph-e-${i}" value="${p.end}" aria-label="Fin ${esc(p.name)}"><select id="ph-w-${i}" aria-label="Responsable ${esc(p.name)}">${state.team.map((n,j)=>`<option value="${j}" ${j===p.who?"selected":""}>${esc(n)}</option>`).join("")}</select></div>`).join("");
  state.phases.forEach((p,i)=>{
    document.getElementById("ph-s-"+i).onchange=e=>{if(e.target.value){p.start=e.target.value;save();drawGantt();}};
    document.getElementById("ph-e-"+i).onchange=e=>{if(e.target.value){p.end=e.target.value;save();drawGantt();}};
    document.getElementById("ph-w-"+i).onchange=e=>{p.who=+e.target.value;save();drawGantt();};});
  drawGantt();renderGC();renderRA520();renderSample();
}
function ganttInterp(){const d=s=>new Date(s+"T00:00:00");const ph=state.phases;const a=d(ph.reduce((x,p)=>p.start<x?p.start:x,ph[0].start)),b=d(ph.reduce((x,p)=>p.end>x?p.end:x,ph[0].end));const wk=Math.round((b-a)/864e5/7);
  const over=ph.some((p,i)=>i>0&&p.start<=ph[i-1].end);
  return `La mission dure environ ${wk} semaines, du ${a.toLocaleDateString("fr-FR",{day:"numeric",month:"long"})} au ${b.toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"})}.${over?" Certaines phases se chevauchent : vérifiez que les responsables sont disponibles.":" Les phases s'enchaînent sans chevauchement."} La mission finale doit suivre la clôture et l'inventaire physique.`;}
/* ---------- PDF avec graphiques et interprétations ---------- */
async function buildPdf(ks){
  const {jsPDF}=window.jspdf;const doc=new jsPDF({unit:"mm",format:"a4"});
  const W=210,M=14,CW=W-2*M;let y=0;
  const img={};
  const grab=async(key,svg,title)=>{try{img[key]=await svgToPng(svg,title);}catch(e){}};
  for(const [id,title,u,f] of RATIO_DEFS)await grab("r_"+id,lineChart(ks.map(k=>({k,vals:YEARS.map((yy,t)=>ratios(k,t)[id])})),u,f),title);
  for(const k of ks)await grab("radar_"+k,radarSVG(radarData(k,4).v,col(k)),"Fraud Radar "+YL(4));
  if(scenActive())await grab("dumb",dumbbellSvg(),"Marge d'exploitation avant / après crise");
  const g=document.querySelector("#gantt svg");if(g)await grab("gantt",g.outerHTML,"Calendrier de la mission");
  const stamp=()=>{doc.setFont("helvetica","bold");doc.setFontSize(18);doc.setTextColor(30,33,37);doc.text("FIDEX",M,16);const w=doc.getTextWidth("FIDEX");doc.setTextColor(176,99,111);doc.text("5",M+w,16);
    doc.setFont("helvetica","normal");doc.setFontSize(9);doc.setTextColor(95,100,108);doc.text(P("Audit & Conseil · RiskScope"),M+w+6,16);
    doc.text(P(new Date().toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"})),W-M,16,{align:"right"});
    doc.setDrawColor(227,228,232);doc.line(M,20,W-M,20);};
  const newPage=()=>{doc.addPage();y=28;};
  const ensure=h=>{if(y+h>282)newPage();};
  const h2=(t,c)=>{ensure(14);doc.setFont("helvetica","bold");doc.setFontSize(14);doc.setTextColor(...(c||[30,33,37]));doc.text(P(t),M,y);y+=7;};
  const h3=t=>{ensure(10);doc.setFont("helvetica","bold");doc.setFontSize(11);doc.setTextColor(30,33,37);doc.text(P(t),M,y);y+=5;};
  const para=(t,size=10,color=[60,64,70])=>{doc.setFont("helvetica","normal");doc.setFontSize(size);doc.setTextColor(...color);const lines=doc.splitTextToSize(P(t),CW);ensure(lines.length*4.5+2);doc.text(lines,M,y);y+=lines.length*4.5+2;};
  const note=t=>{const lines=doc.splitTextToSize(P("Interprétation : "+t),CW-6);const hh=lines.length*4.3+4;ensure(hh+2);doc.setFillColor(248,236,238);doc.rect(M,y-3.5,CW,hh,"F");doc.setFillColor(176,99,111);doc.rect(M,y-3.5,1.2,hh,"F");doc.setFont("helvetica","normal");doc.setFontSize(9);doc.setTextColor(60,64,70);doc.text(lines,M+4,y+0.5);y+=hh+2;};
  const table=(head,body,opts={})=>{doc.autoTable({startY:y,head:[head.map(P)],body:body.map(r=>r.map(P)),margin:{left:M,right:M,top:28},styles:{font:"helvetica",fontSize:8.5,cellPadding:1.8,textColor:[30,33,37],lineColor:[227,228,232],lineWidth:.1},headStyles:{fillColor:[246,246,247],textColor:[95,100,108],fontStyle:"bold"},...opts});y=doc.lastAutoTable.finalY+5;};
  const pic=(key,x,w)=>{const im=img[key];if(!im)return 0;const h=w*im.h/im.w;doc.addImage(im.url,"PNG",x,y,w,h);return h;};
  const picFull=(key,w=CW)=>{const im=img[key];if(!im)return;const h=w*im.h/im.w;ensure(h+2);doc.addImage(im.url,"PNG",M+(CW-w)/2,y,w,h);y+=h+3;};
  const R=k=>{const a=yr(D(k),4);return a;};
  y=28;
  doc.setFont("helvetica","bold");doc.setFontSize(20);doc.setTextColor(30,33,37);
  doc.text(P(ks.length>1?"Rapport d'analyse des risques inhérents":"Rapport d'analyse : "+state.cos[ks[0]].name),M,y);y+=8;
  para(`Sociétés analysées : ${ks.map(k=>state.cos[k].name).join(", ")}. Exercices ${YEARS[0]} à ${YL(4)}. Scénario de crise : ${scenActive()?scenName+" ("+SLIDERS.filter(s=>scen[s[0]]).map(s=>s[1].toLowerCase()+" "+sign(s[0],scen[s[0]])+s[5]).join(", ")+")":"aucun"}. Équipe : ${state.team.join(", ")}.`);
  h3("Synthèse");
  table(["Société","Devise","Note","M-score "+YL(4),"Lecture","Z' "+YL(4),"Z' après crise","Verdict"],ks.map(k=>{const be=beneish(D(k),4),st=stress(k),r=rating(k,false);return[state.cos[k].name,state.cos[k].cur,`${r.grade} (${fmt(r.score)})`,fmt(be.M,2),M_LABEL[mZone(be.M)],fmt(st.zb,2),fmt(st.zs,2),VERD[st.verdict]];}));
  ks.forEach(k=>note(`${state.cos[k].name} - ${interpRating(k)}`));
  if(ks.length>1){note(interpMatrix());}
  // ratios
  newPage();h2(`Évolution des ratios (${YEARS[0]}-${YL(4)})`);
  const cw=(CW-6)/2;
  for(let i=0;i<RATIO_DEFS.length;i+=2){
    const a=img["r_"+RATIO_DEFS[i][0]],b=RATIO_DEFS[i+1]&&img["r_"+RATIO_DEFS[i+1][0]];
    const hh=Math.max(a?cw*a.h/a.w:0,b?cw*b.h/b.w:0);ensure(hh+2);
    pic("r_"+RATIO_DEFS[i][0],M,cw);if(b)pic("r_"+RATIO_DEFS[i+1][0],M+cw+6,cw);y+=hh+3;
  }
  RATIO_DEFS.forEach(([id,title,u,f])=>note(`${title}. ${interpRatio(id,f)}`));
  if(scenActive()&&img.dumb){newPage();h2("CrashTest : "+scenName);picFull("dumb");note(interpDumbbell());}
  ks.forEach(k=>{
    const co=state.cos[k],c=hex(co.color),{be,al}=radarData(k,4),st=stress(k),bf=benford(RD(k));
    newPage();h2(`${co.name}${co.country?" ("+co.country+")":""} - montants en ${co.cur}`,c);
    if(fcActive(k)){const fp=fcParams(k);para(`Étude prévisionnelle ${CUR_YEAR} : les indicateurs « ${CUR_YEAR} (p) » reposent sur une croissance du chiffre d'affaires de ${fmt(fp.g*100,1)} % par an et une marge d'exploitation de ${fmt(fp.m*100,1)} % (${fp.src==="ia"?"proposées par l'IA":fp.src==="prep"?"préparées par l'équipe FIDEX5":fp.src==="user"?"saisies par l'équipe":"tendance des derniers exercices"}).`,9,[95,100,108]);}
    h3(`Points de vigilance pour ${CUR_YEAR}`);
    table(["Point","Compte / assertion","Détail"],vigilPoints(k).map(p=>[p.t,p.a||"",p.d]),{columnStyles:{0:{cellWidth:50},1:{cellWidth:36}}});
    {const G=gcEval(k),M=mcRun(k);h3(`Continuité d'exploitation (ISA 570) : ${GC_C[G.lvl]}`);
     table(["Indicateur","Présent","Valeur"],[...G.A.map(x=>[x.l,x.v?"Oui":"Non",x.x]),...GC_MAN.map((l,i)=>[l,(co.mission.gc||[])[i]?"Oui":"Non",""])],{columnStyles:{1:{cellWidth:18},2:{cellWidth:34}}});
     h3(`CrashTest Monte-Carlo (${fmt(M.N)} simulations ${YL(4)})`);
     para(`Probabilité de zone de détresse : ${pct(M.pDist,0)} ; de perte nette : ${pct(M.pLoss,0)} ; couverture des intérêts < 1,5 : ${pct(M.pCov,0)}. Z' pessimiste / médian / optimiste : ${fmt(M.z5,2)} / ${fmt(M.z50,2)} / ${fmt(M.z95,2)}.`);
     if(JE[k]){const T=jeTests(k);h3(`Test des écritures (ISA 240)${JE[k].demo?" - grand livre fictif de démonstration":""}`);para(`${fmt(T.n)} écritures analysées, ${fmt(T.flagged.length)} signalées, ${fmt(T.prio)} à examiner en priorité. Benford : écart moyen ${fmt(T.ben.mad,3)}.`);
       table(["Date","Compte","Libellé","Montant","Tests"],T.flagged.slice(0,10).map(x=>[fmtD(x.r.d),x.r.acc,x.r.lib||"(vide)",fmt(x.r.amt,0),x.f.map(id=>JE_T.find(t=>t[0]===id)[1]).join(", ")]),{columnStyles:{0:{cellWidth:20},1:{cellWidth:18},3:{cellWidth:24}}});}
     const RA=raRows(k).P.filter(x=>x.sig),RY=realYears(k);
     if(RA.length){h3(`Revue analytique ${RY[3]}-${RY[4]} : variations significatives`);table(["Poste","Variation","%","Explication"],RA.map(x=>[x.l,fmt(x.dv,1),pct(x.dp,0),((co.mission.raExp||{})[x.f])||"À expliquer"]),{columnStyles:{0:{cellWidth:44},1:{cellWidth:22},2:{cellWidth:16}}});}}
    const im=img["radar_"+k];
    if(im){const w=70,h=w*im.h/im.w;doc.addImage(im.url,"PNG",M,y,w,h);
      doc.setFont("helvetica","normal");doc.setFontSize(9.5);doc.setTextColor(60,64,70);
      const txt=doc.splitTextToSize(P("Alertes : "+al.map(a=>a[1]).join(" ; ")+"."),CW-w-6);doc.text(txt,M+w+6,y+6);y+=Math.max(h,txt.length*4.3+8)+3;}
    note(interpM(be));note(interpBenford(bf));
    h3("Chiffres clés");
    const keyF=["ca","ebit","net","cfo","rec","inv","ta","equity","ltd"];
    table(["Poste",...YEARS.map((y,i)=>YL(i))],keyF.map(f=>[FIELDS.find(x=>x[0]===f)[1],...D(k)[f].map(v=>fmt(v,Math.abs(v)<100&&v%1?1:0))]),{columnStyles:{1:{halign:"right"},2:{halign:"right"},3:{halign:"right"},4:{halign:"right"},5:{halign:"right"}}});
    h3(`Indices Beneish (${YEARS[1]} à ${YL(4)})`);
    const bes=[1,2,3,4].map(t=>beneish(D(k),t));
    table(["Indice",...[1,2,3,4].map(i=>YL(i))],["DSRI","GMI","AQI","SGI","DEPI","SGAI","LVGI","TATA","M"].map(id=>[id==="M"?"M-score":id,...bes.map(b=>fmt(b[id],id==="TATA"?3:2))]),{columnStyles:{1:{halign:"right"},2:{halign:"right"},3:{halign:"right"},4:{halign:"right"}}});
    h3(scenActive()?"CrashTest : "+scenName:"Solidité financière");
    const b=st.b;
    table(["Indicateur","Avant","Après"],[["Chiffre d'affaires",fmt(b.ca),fmt(st.ca)],["Résultat d'exploitation",fmt(b.ebit),fmt(st.ebit)],["Résultat net",fmt(b.net),fmt(st.net)],["Couverture des intérêts",isFinite(st.covB)?fmt(st.covB,1)+"x":"n.d.",isFinite(st.cov)?fmt(st.cov,1)+"x":"n.d."],["Altman Z'",fmt(st.zb,2),fmt(st.zs,2)]],{columnStyles:{1:{halign:"right"},2:{halign:"right"}}});
    note(interpStress(k));
    {const mt=materiality(k),cs=ciScore(k),r=rating(k,false);
    h3("Notation et planification");
    table(["Élément","Valeur"],[["Note de risque",`${r.grade} (score ${fmt(r.score)}/100)`],["Seuil de signification",mt.neg?"n.d. (base négative)":`${fmt(mt.sm)} ${co.cur} (${BASES[state.cos[k].mission.base][0].toLowerCase()} x ${fmt(state.cos[k].mission.rate,2)} %)`],["Seuil de planification",mt.neg?"n.d.":`${fmt(mt.sp)} ${co.cur} (${fmt(state.cos[k].mission.perf)} % du seuil)`],["Anomalies insignifiantes",mt.neg?"n.d.":`${fmt(mt.si,mt.si<10?2:0)} ${co.cur}`],["Risque lié au contrôle",`${LVL[cs.lvl]} (${Math.round(cs.s*100)} % de faiblesses au questionnaire)`]],{columnStyles:{0:{cellWidth:55}}});
    note(interpMission(k));
    h3("Plan de mission et risque d'audit");
    table(["Priorité","Risque","Comptes / assertions","Non-détection","Travaux"],risks(k).sort((a,b)=>b.score-a.score).map(r=>{const a=auditRisk(r,cs.lvl);return[`${PRIO_L[prio(r.score)]} (${r.prob}x${r.impact})`,`${r.risk}\n${r.why}`,`${r.compte}\n${r.assertion}`,LVL[a.rnd],`${r.proc}\n${a.work} (${a.sample})`];}),{columnStyles:{0:{cellWidth:22},1:{cellWidth:38},2:{cellWidth:36},3:{cellWidth:20}}});}
  });
  newPage();h2("Équipe et calendrier de la mission");
  if(img.gantt)picFull("gantt");
  table(["Phase","Début","Fin","Responsable"],state.phases.map(p=>[p.name,new Date(p.start+"T00:00:00").toLocaleDateString("fr-FR"),new Date(p.end+"T00:00:00").toLocaleDateString("fr-FR"),state.team[p.who]||""]));
  note(ganttInterp());
  para("Avertissement : les scores (Beneish, Altman, Benford, notation) aident à identifier les risques ; ils ne constituent pas une conclusion d'audit. Chaque alerte doit être vérifiée par des procédures.",8.5,[95,100,108]);
  const n=doc.getNumberOfPages();for(let p=1;p<=n;p++){doc.setPage(p);stamp();doc.setFont("helvetica","normal");doc.setFontSize(8);doc.setTextColor(150,150,155);doc.text(`${p} / ${n}`,W-M,292,{align:"right"});}
  return doc;
}
async function downloadPdf(ks){
  const m=document.getElementById("pdf-msg");m.className="msg";
  if(!window.jspdf||!window.jspdf.jsPDF){m.className="msg err";m.textContent="Le générateur de PDF ne s'est pas chargé : vérifiez la connexion et rechargez la page.";return;}
  m.textContent="Création du rapport…";
  try{
    const doc=await buildPdf(ks);
    const filename=`FIDEX5-RiskScope-${ks.length>1?"toutes-societes":slug(state.cos[ks[0]].name)}.pdf`;
    await saveFile(filename,doc.output("blob"),m);
  }catch(e){m.className="msg err";m.textContent="La création du PDF a échoué. Vérifiez que tous les chiffres sont remplis.";}
}
/* ---------- Espace Équipe (missions partagées) ---------- */
const TEAM={db:null,user:null,me:null,canWrite:null,missions:[],tasks:[],mid:null,view:"mine",unsubM:null,unsubT:null,loaded:false,timer:null};
const ROLES={chef:"Chef de mission",auditeur:"Auditeur",stagiaire:"Stagiaire"};
const ST={todo:["À faire","warn"],doing:["En cours","warn"],done:["Terminé, à revoir","good"],validated:["Validé","good"],rework:["À reprendre","crit"]};
const COLS=[["todo","À faire",["todo","rework"]],["doing","En cours",["doing"]],["done","À revoir",["done"]],["validated","Validé",["validated"]]];
const GEN_DO=["Documenter chaque test dans la fiche : source, date, échantillon, résultat","Signaler tout de suite au chef de mission toute anomalie supérieure au seuil de planification","Conserver une copie des pièces justificatives obtenues"];
const GEN_DONT=["Ne jamais modifier les données ou documents du client","Ne rien communiquer sur la mission en dehors de l'équipe (confidentialité)","Ne pas réduire l'échantillon ni changer la procédure sans l'accord du chef de mission","Ne pas conclure sans pièce justificative"];
const SPEC={
 Fraude:[["Examiner les écritures manuelles passées autour de la clôture","Tester la séparation des exercices sur les ventes de décembre et janvier"],["Ne pas prévenir les personnes concernées avant les tests","Ne pas se contenter des explications orales de la direction"]],
 Créances:[["Envoyer les demandes de confirmation directement aux clients (circularisation)","Analyser la balance âgée et les créances de plus de 90 jours"],["Ne pas laisser le client envoyer ou recevoir les confirmations","Ne pas accepter une dépréciation sans justification"]],
 Stocks:[["Assister à l'inventaire physique et faire des comptages par sondage","Comparer le coût des stocks à leur prix de vente récent"],["Ne pas se limiter aux listings fournis par le client","Ne pas ignorer les articles sans mouvement depuis longtemps"]],
 Marge:[["Analyser les marges par produit et par mois","Recalculer le coût de revient sur un échantillon"],["Ne pas valider un coût de revient sans recalcul","Ne pas expliquer une variation de marge sans pièce"]],
 Change:[["Recalculer la conversion des dettes et créances en devises au cours de clôture","Vérifier les contrats de couverture éventuels"],["Ne pas utiliser un cours non officiel","Ne pas oublier les écarts de conversion non réalisés"]],
 Continuité:[["Obtenir les prévisions de trésorerie à 12 mois et les contrats de prêt","Vérifier le respect des covenants bancaires"],["Ne pas accepter les prévisions sans les comparer aux réalisations passées","Ne pas conclure avant d'avoir obtenu la lettre d'affirmation de la direction"]],
 Dette:[["Obtenir les confirmations bancaires","Rapprocher le tableau des emprunts de la comptabilité"],["Ne pas se fier au seul tableau d'emprunts du client","Ne pas oublier les engagements hors bilan"]],
 Carbone:[["Rapprocher les quotas d'émission détenus des émissions déclarées","Lister les litiges environnementaux et leurs provisions"],["Ne pas ignorer les litiges en cours, même non provisionnés","Ne pas se limiter à l'information publiée par la société"]]
};
const isChef=m=>m&&TEAM.me&&m.members&&m.members[TEAM.me]==="chef";
const roleOf=m=>m&&TEAM.me&&m.members?m.members[TEAM.me]||null:null;
const curMission=()=>TEAM.missions.find(m=>m.id===TEAM.mid)||null;
const memberIds=m=>Object.entries(m.members||{}).filter(([,r])=>r).map(([id])=>id);
const pendingIds=m=>Object.entries(m.pending||{}).filter(([id,v])=>v&&!(m.members||{})[id]).map(([id])=>id);
const today=()=>new Date().toISOString().slice(0,10);
const dfr=s=>s?new Date(s+"T00:00:00").toLocaleDateString("fr-FR",{day:"numeric",month:"short",year:"numeric"}):"";
async function names(ids){if(!TEAM.user||!ids.length)return{};try{return await TEAM.user.profiles([...new Set(ids)]);}catch(e){return{};}}
const nm=(ps,id)=>(ps[id]&&ps[id].name)||(id===TEAM.me?"Vous":"Membre");
function teamMsg(t,err){const m=document.getElementById("team-msg");if(!m)return;m.className="msg"+(err?" err":"");m.textContent=t;if(!err)setTimeout(()=>{if(m.textContent===t)m.textContent="";},5000);}
function dbErr(e){const c=e&&e.code;teamMsg(c==="quota_exceeded"?"La base de données est pleine : supprimez d'anciennes missions.":c==="invalid_argument"?"Vous n'avez pas le droit de modifier les données partagées : demandez au propriétaire de la page un accès Éditeur.":c==="resource_exhausted"?"Trop d'actions d'un coup : patientez quelques secondes.":"L'enregistrement a échoué : réessayez.",true);if(c==="invalid_argument"){TEAM.canWrite=false;renderTeam();}}

async function setupTeam(){
  const box=document.getElementById("team-root");
  if(!(window.claude&&window.claude.use)){box.innerHTML=`<div class="card"><h3>Disponible dans la version partagée sur claude.ai</h3><p class="small">L'espace Équipe utilise les comptes Claude pour reconnaître chaque membre et une base de données partagée. Ouvrez RiskScope depuis claude.ai.</p></div>`;return;}
  const [db,user]=await Promise.all([window.claude.use("db").catch(()=>null),window.claude.use("user").catch(()=>null)]);
  TEAM.db=db;TEAM.user=user;
  if(!db||!user){box.innerHTML=`<div class="card"><h3>Connexion nécessaire</h3><p class="small">Connectez-vous à votre compte Claude puis rechargez la page. L'espace Équipe n'est pas disponible dans cet affichage.</p></div>`;return;}
  TEAM.me=await user.id();TEAM.canWrite=await user.can("data.write");
  if(!TEAM.me){box.innerHTML=`<div class="card"><h3>Compte non reconnu</h3><p class="small">Votre compte n'est pas identifié sur cette page. Demandez au propriétaire de vous inviter avec le bouton Partager.</p></div>`;return;}
  TEAM.timer=setTimeout(()=>{if(!TEAM.loaded){TEAM.loaded=true;renderTeam("Les missions ne répondent pas encore : vérifiez votre connexion.");}},10000);
  TEAM.unsubM=db.collection("missions").onSnapshot(snap=>{
    TEAM.missions=snap.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
    if(!snap.metadata.fromCache){TEAM.loaded=true;clearTimeout(TEAM.timer);}
    if(TEAM.mid&&!curMission())openMission(null);
    renderTeam();
  },e=>{TEAM.loaded=true;clearTimeout(TEAM.timer);renderTeam("Impossible de lire les missions pour le moment.");});
  renderTeam();
}
function openMission(mid){
  if(TEAM.unsubT){TEAM.unsubT();TEAM.unsubT=null;}
  TEAM.mid=mid;TEAM.tasks=[];
  if(mid){TEAM.unsubT=TEAM.db.collection("tasks").where("mid","==",mid).onSnapshot(s=>{TEAM.tasks=s.docs.map(d=>({id:d.id,...d.data()}));renderTeam();},()=>teamMsg("Impossible de lire les tâches.",true));}
  renderTeam();
}
async function renderTeam(note){
  const box=document.getElementById("team-root");if(!box||!TEAM.db)return;
  const meP=TEAM.user?await TEAM.user.me():{name:"",avatarUrl:""};
  const m=curMission();
  const head=`<div class="card team-head"><img src="${esc(meP.avatarUrl||"")}" alt="" class="avatar"><div><div><b>${esc(meP.name||"Vous")}</b>${m?` · ${ROLES[roleOf(m)]||"non membre"}`:""}</div><div class="small">${TEAM.canWrite===false?"Lecture seule : demandez au propriétaire un accès Éditeur pour créer ou mettre à jour des tâches.":"Connecté avec votre compte Claude."}</div></div><span class="msg" id="team-msg" role="status">${note?esc(note):""}</span></div>`;
  if(!TEAM.loaded){box.innerHTML=head+`<div class="card"><p class="small">Chargement des missions…</p></div>`;return;}
  if(!m){box.innerHTML=head+await missionsList();bindTeam();return;}
  box.innerHTML=head+await missionView(m);bindTeam();
}
async function missionsList(){
  const ms=TEAM.missions;
  const ps=await names(ms.map(m=>Object.keys(m.members||{}).find(id=>m.members[id]==="chef")).filter(Boolean));
  const cards=ms.map(m=>{const r=roleOf(m),pend=(m.pending||{})[TEAM.me]&&!r;const chef=Object.keys(m.members||{}).find(id=>m.members[id]==="chef");
    return `<div class="card"><div class="co-head"><b style="font-size:16px">${esc(m.name)}</b><span class="tag">${esc(m.coName||"")}</span></div>
    <p class="small" style="margin:6px 0">Chef de mission : ${esc(chef?nm(ps,chef):"?")} · ${memberIds(m).length} membre(s)${m.due?` · échéance ${dfr(m.due)}`:""}</p>
    <div class="actions">${r?`<span class="pill good">${ROLES[r]}</span><button class="btn small primary" data-open="${m.id}">Ouvrir</button>`:pend?`<span class="pill warn">Demande envoyée</span>`:`<button class="btn small" data-join="${m.id}" ${TEAM.canWrite===false?"disabled":""}>Demander à rejoindre</button>`}</div></div>`;}).join("");
  return `<div class="section-head"><h3>Missions</h3>${TEAM.canWrite===false?"":`<button class="btn primary" id="m-new">+ Créer une mission</button>`}</div>
   ${ms.length?`<div class="grid3">${cards}</div>`:`<div class="card"><p class="small">Aucune mission pour l'instant. ${TEAM.canWrite===false?"Le chef de mission doit en créer une.":"Créez la première : les tâches sont générées à partir du plan de mission."}</p></div>`}`;
}
async function missionView(m){
  const chef=isChef(m),r=roleOf(m),ids=memberIds(m),pend=pendingIds(m);
  const ps=await names([...ids,...pend,...TEAM.tasks.map(t=>t.assignee).filter(Boolean)]);
  const ts=TEAM.tasks,val=ts.filter(t=>t.status==="validated").length,pctv=ts.length?val/ts.length:0;
  const seg=[["mine","Mes tâches"],["all","Toutes les tâches"],["team","Équipe"+(chef&&pend.length?` (${pend.length})`:"")],["dash","Tableau de bord"]];
  let body="";
  if(!r){body=`<div class="card"><p>Vous n'êtes pas encore membre de cette mission.</p>${(m.pending||{})[TEAM.me]?`<span class="pill warn">Demande envoyée au chef de mission</span>`:`<button class="btn primary" data-join="${m.id}">Demander à rejoindre</button>`}</div>`;}
  else if(TEAM.view==="mine"||TEAM.view==="all"){
    const list=TEAM.view==="mine"?ts.filter(t=>t.assignee===TEAM.me):ts;
    body=`${TEAM.view==="mine"?`<p class="small">${list.length?`${list.length} tâche(s) vous sont attribuées. Ouvrez une fiche pour voir ce qu'il faut faire et ce qu'il ne faut pas faire.`:"Aucune tâche ne vous est attribuée pour l'instant."}</p>`:""}
      ${chef?`<div class="actions"><button class="btn small" id="t-new">+ Ajouter une tâche</button></div>`:""}
      <div class="kanban">${COLS.map(([k,l,sts])=>{const items=list.filter(t=>sts.includes(t.status||"todo")).sort((a,b)=>(a.due||"").localeCompare(b.due||""));
        return `<div class="kcol"><div class="khead">${l} <span class="small">${items.length}</span></div>${items.map(t=>taskCard(t,ps)).join("")||`<p class="small">—</p>`}</div>`;}).join("")}</div>`;
  }else if(TEAM.view==="team"){
    body=`<div class="card"><h3>Membres</h3><div class="mlist">${ids.map(id=>`<div class="mrow"><img class="avatar sm" src="${esc((ps[id]||{}).avatarUrl||"")}" alt=""><span>${esc(nm(ps,id))}${(ps[id]||{}).guest?' <span class="tag">invité</span>':""}</span>${chef&&id!==TEAM.me?`<select data-role="${id}" aria-label="Rôle">${Object.entries(ROLES).map(([k,l])=>`<option value="${k}" ${m.members[id]===k?"selected":""}>${l}</option>`).join("")}</select><button class="btn small danger" data-rm="${id}">Retirer</button>`:`<span class="pill good">${ROLES[m.members[id]]}</span>`}<span class="small">${ts.filter(t=>t.assignee===id).length} tâche(s)</span></div>`).join("")}</div>
      ${chef?`${pend.length?`<h3 style="margin-top:14px">Demandes en attente</h3><div class="mlist">${pend.map(id=>`<div class="mrow"><img class="avatar sm" src="${esc((ps[id]||{}).avatarUrl||"")}" alt=""><span>${esc(nm(ps,id))}</span><select id="pr-${id}" aria-label="Rôle">${Object.entries(ROLES).filter(([k])=>k!=="chef").map(([k,l])=>`<option value="${k}">${l}</option>`).join("")}</select><button class="btn small primary" data-accept="${id}">Accepter</button><button class="btn small" data-refuse="${id}">Refuser</button></div>`).join("")}</div>`:""}
      <h3 style="margin-top:14px">Ajouter un membre</h3><p class="small">Cherchez un collègue par son nom (membres de votre organisation). Sinon, partagez la page avec lui (bouton Partager de claude.ai, accès Éditeur) : il cliquera sur « Demander à rejoindre ».</p>
      <input type="text" id="m-search" placeholder="Nom du membre" aria-label="Chercher un membre" style="width:100%;max-width:360px"><div class="mlist" id="m-hits"></div>`:`<p class="small">Seul le chef de mission peut ajouter des membres et attribuer les tâches.</p>`}</div>`;
  }else{
    const late=ts.filter(t=>t.due&&t.due<today()&&t.status!=="validated");
    body=`<div class="mat-kpis">${[["Tâches",ts.length],["Validées",val],["À revoir",ts.filter(t=>t.status==="done").length],["En retard",late.length]].map(([l,v])=>`<div class="box"><div class="lab">${l}</div><div class="val">${v}</div></div>`).join("")}</div>
     <div class="card" style="margin-top:12px"><h3>Avancement par membre</h3><table><thead><tr><th>Membre</th>${COLS.map(c=>`<th class="n">${c[1]}</th>`).join("")}<th class="n">En retard</th></tr></thead><tbody>${ids.map(id=>`<tr><td>${esc(nm(ps,id))}</td>${COLS.map(c=>`<td class="n">${ts.filter(t=>t.assignee===id&&c[2].includes(t.status||"todo")).length}</td>`).join("")}<td class="n">${late.filter(t=>t.assignee===id).length}</td></tr>`).join("")}</tbody></table>
     ${interp(ts.length?`${Math.round(pctv*100)} % des tâches sont validées.${late.length?` ${late.length} tâche(s) ont dépassé leur échéance : le chef de mission doit relancer les responsables ou réaffecter.`:" Aucune tâche en retard."}${ts.filter(t=>t.status==="done").length?` ${ts.filter(t=>t.status==="done").length} tâche(s) attendent la revue du chef de mission.`:""}`:"Aucune tâche pour l'instant.")}</div>`;
  }
  return `<div class="card"><div class="section-head"><div><button class="btn small" id="m-back">← Missions</button><h3 style="margin-top:8px;font-size:20px">${esc(m.name)}</h3><p class="small" style="margin:4px 0 0">${esc(m.coName||"")}${m.due?` · échéance ${dfr(m.due)}`:""} · ${ids.length} membre(s)</p></div>
    <div style="min-width:220px"><div class="small">${val}/${ts.length} tâches validées</div><div class="bar-track" style="height:12px;margin-top:4px"><div class="bar-fill" style="left:0;width:${pctv*100}%;background:var(--good)"></div></div>${chef?`<div class="actions" style="margin-top:8px"><button class="btn small danger" id="m-del">Supprimer la mission</button></div>`:""}</div></div>
    ${r?`<div class="seg" style="margin-top:12px" role="group" aria-label="Vue">${seg.map(([k,l])=>`<button aria-pressed="${TEAM.view===k}" data-view="${k}">${l}</button>`).join("")}</div>`:""}</div>${body}`;
}
function taskCard(t,ps){const s=ST[t.status||"todo"],late=t.due&&t.due<today()&&t.status!=="validated";
  return `<button class="tcard" data-task="${t.id}"><div class="tt">${esc(t.title)}</div><div class="small">${t.assignee?esc(nm(ps,t.assignee)):"Non attribuée"}${t.due?` · ${dfr(t.due)}`:""}</div><div style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap">${pill(s[1],s[0])}${t.priority?`<span class="tag">${esc(t.priority)}</span>`:""}${late?`<span class="pill crit">En retard</span>`:""}</div></button>`;}
function bindTeam(){
  const q=s=>document.querySelectorAll(s);
  q("[data-open]").forEach(b=>b.onclick=()=>{TEAM.view="mine";openMission(b.dataset.open);});
  q("[data-join]").forEach(b=>b.onclick=async()=>{b.disabled=true;try{await TEAM.db.doc("missions/"+b.dataset.join).update({pending:{[TEAM.me]:Date.now()}});teamMsg("Demande envoyée au chef de mission.");}catch(e){dbErr(e);b.disabled=false;}});
  q("[data-view]").forEach(b=>b.onclick=()=>{TEAM.view=b.dataset.view;renderTeam();});
  q("[data-task]").forEach(b=>b.onclick=()=>openTask(b.dataset.task));
  const back=document.getElementById("m-back");if(back)back.onclick=()=>openMission(null);
  const nw=document.getElementById("m-new");if(nw)nw.onclick=openNewMission;
  const tn=document.getElementById("t-new");if(tn)tn.onclick=()=>openTask(null);
  const del=document.getElementById("m-del");if(del)del.onclick=async()=>{if(del.dataset.c!=="1"){del.dataset.c="1";del.textContent="Confirmer : supprimer mission et tâches";return;}
    const m=curMission();try{for(const t of TEAM.tasks)await TEAM.db.doc("tasks/"+t.id).delete();await TEAM.db.doc("missions/"+m.id).delete();openMission(null);teamMsg("Mission supprimée.");}catch(e){dbErr(e);}};
  const m=curMission();
  q("[data-role]").forEach(s=>s.onchange=async()=>{try{await TEAM.db.doc("missions/"+m.id).update({members:{[s.dataset.role]:s.value}});teamMsg("Rôle mis à jour.");}catch(e){dbErr(e);}});
  q("[data-rm]").forEach(b=>b.onclick=async()=>{if(b.dataset.c!=="1"){b.dataset.c="1";b.textContent="Confirmer";return;}try{await TEAM.db.doc("missions/"+m.id).update({members:{[b.dataset.rm]:null},pending:{[b.dataset.rm]:null}});teamMsg("Membre retiré. Pensez à réattribuer ses tâches.");}catch(e){dbErr(e);}});
  q("[data-accept]").forEach(b=>b.onclick=async()=>{const id=b.dataset.accept,role=document.getElementById("pr-"+id).value;try{await TEAM.db.doc("missions/"+m.id).update({members:{[id]:role},pending:{[id]:null}});teamMsg("Membre ajouté.");}catch(e){dbErr(e);}});
  q("[data-refuse]").forEach(b=>b.onclick=async()=>{try{await TEAM.db.doc("missions/"+m.id).update({pending:{[b.dataset.refuse]:null}});}catch(e){dbErr(e);}});
  const se=document.getElementById("m-search");
  if(se){const hits=document.getElementById("m-hits");
    const show=async v=>{const res=await TEAM.user.search(v);const ids=memberIds(m);
      hits.innerHTML=res.filter(p=>!ids.includes(p.id)).map(p=>`<div class="mrow"><img class="avatar sm" src="${esc(p.avatarUrl)}" alt=""><span>${esc(p.name)}${p.guest?' <span class="tag">invité</span>':""}</span><select id="sr-${p.id}" aria-label="Rôle">${Object.entries(ROLES).filter(([k])=>k!=="chef").map(([k,l])=>`<option value="${k}">${l}</option>`).join("")}</select><button class="btn small primary" data-add="${p.id}">Ajouter</button></div>`).join("")||(v?`<p class="small">Aucun résultat dans votre organisation : utilisez le partage et la demande d'adhésion.</p>`:"");
      hits.querySelectorAll("[data-add]").forEach(b=>b.onclick=async()=>{const id=b.dataset.add;try{await TEAM.db.doc("missions/"+m.id).update({members:{[id]:document.getElementById("sr-"+id).value}});teamMsg("Membre ajouté. Partagez aussi la page avec lui (accès Éditeur) pour qu'il puisse mettre à jour ses tâches.");}catch(e){dbErr(e);}});};
    se.onfocus=()=>show("");se.oninput=()=>show(se.value.trim());}
}
function openNewMission(){
  const d=document.getElementById("mission-dlg");
  if(!libKeys().length){teamMsg("Créez d'abord une analyse dans l'historique de l'accueil.",true);return;}
  document.getElementById("nm-co").innerHTML=libKeys().map(k=>`<option value="${k}">${esc(state.cos[k].name)}</option>`).join("");
  const setName=()=>{document.getElementById("nm-name").value=`Audit ${state.cos[document.getElementById("nm-co").value].name} ${state.cos[document.getElementById("nm-co").value].lastYear||2025}`;};
  setName();document.getElementById("nm-co").onchange=setName;
  document.getElementById("nm-due").value=state.phases[state.phases.length-1].end;
  document.getElementById("nm-err").textContent="";
  d.showModal?d.showModal():d.setAttribute("open","");
}
function genTasks(k,mid,due){
  const co=state.cos[k],cs=ciScore(k),mt=materiality(k),ph=state.phases;
  const base={mid,assignee:TEAM.me,status:"todo",conclusion:"",reviewComment:"",createdAt:Date.now(),updatedAt:Date.now(),updatedBy:TEAM.me};
  const T=[{...base,title:"Prise de connaissance et lettre de mission",priority:"Transversal",risk:"",compte:"Ensemble de l'entité",assertion:"",objective:`Comprendre l'activité, l'environnement et le contrôle interne de ${co.name} ; préparer la lettre de mission.`,procedures:"Lire les rapports annuels et les rapports des commissaires aux comptes ; entretiens avec la direction ; remplir le questionnaire de contrôle interne dans RiskScope.",sample:"",docs:"Statuts, rapports annuels, organigramme, procès-verbaux des conseils, rapports antérieurs",dos:["Relever les changements importants depuis l'exercice précédent",...GEN_DO.slice(0,1)],donts:["Ne pas commencer les tests avant la signature de la lettre de mission",GEN_DONT[1]],due:ph[0].end}];
  risks(k).sort((a,b)=>b.score-a.score).forEach(r=>{const a=auditRisk(r,cs.lvl),sp=SPEC[SHORT[r.risk]]||[[],[]];
    T.push({...base,title:`${r.risk}`,priority:PRIO_L[prio(r.score)],risk:r.risk,compte:r.compte,assertion:r.assertion,objective:`Obtenir l'assurance que le risque « ${r.risk.toLowerCase()} » ne conduit pas à une anomalie significative (seuil de planification : ${mt.neg?"à définir":fmt(mt.sp,mt.sp<10?2:0)+" "+co.cur}). Indicateur : ${r.why}.`,procedures:`${r.proc}. ${a.work}.`,sample:a.sample,docs:"Grand livre, balances, pièces justificatives du poste",dos:[...sp[0],...GEN_DO],donts:[...sp[1],...GEN_DONT],due:r.score>=15?ph[3].end:ph[2].end});});
  T.push({...base,title:"Synthèse, note de synthèse et rapport",priority:"Transversal",risk:"",compte:"Ensemble des états financiers",assertion:"Présentation",objective:"Rassembler les conclusions, évaluer les anomalies relevées et préparer le rapport et la présentation.",procedures:"Compiler les conclusions des fiches ; tableau des anomalies non corrigées ; projet de rapport ; préparation de la présentation.",sample:"",docs:"Fiches de travail validées, lettre d'affirmation",dos:["Comparer le total des anomalies au seuil de signification","Faire relire le projet de rapport par le chef de mission"],donts:["Ne pas émettre d'opinion avant la validation de toutes les fiches","Ne pas modifier une fiche validée sans en informer le chef de mission"],due:due||ph[4].end});
  return T;
}
async function createMission(e){
  e.preventDefault();
  const err=document.getElementById("nm-err"),k=document.getElementById("nm-co").value,name=document.getElementById("nm-name").value.trim(),due=document.getElementById("nm-due").value,gen=document.getElementById("nm-gen").checked;
  if(!name){err.textContent="Donnez un nom à la mission.";return;}
  const btn=document.getElementById("nm-submit");btn.disabled=true;btn.textContent="Création…";
  try{
    const ref=TEAM.db.collection("missions").doc();
    await ref.set({name,coKey:k,coName:state.cos[k].name,cur:state.cos[k].cur,due,createdAt:Date.now(),createdBy:TEAM.me,members:{[TEAM.me]:"chef"},pending:{}});
    if(gen){for(const t of genTasks(k,ref.id,due))await TEAM.db.collection("tasks").add(t);}
    const d=document.getElementById("mission-dlg");d.close?d.close():d.removeAttribute("open");
    TEAM.view="team";openMission(ref.id);teamMsg(gen?"Mission créée avec ses tâches. Ajoutez maintenant les membres.":"Mission créée.");
  }catch(x){err.textContent="La création a échoué : vérifiez que vous avez un accès Éditeur.";dbErr(x);}
  finally{btn.disabled=false;btn.textContent="Créer la mission";}
}
async function openTask(tid){
  const m=curMission(),chef=isChef(m),t=tid?TEAM.tasks.find(x=>x.id===tid):{title:"",objective:"",procedures:"",sample:"",docs:"",dos:[...GEN_DO],donts:[...GEN_DONT],assignee:TEAM.me,due:"",status:"todo",priority:"",compte:"",assertion:""};
  if(!t)return;
  const mine=t.assignee===TEAM.me,ids=memberIds(m),ps=await names([...ids,t.reviewedBy,t.updatedBy].filter(Boolean));
  const canW=TEAM.canWrite!==false,editAll=chef&&canW,editMine=mine&&canW;
  const s=ST[t.status||"todo"];
  const d=document.getElementById("task-dlg"),b=document.getElementById("task-body");
  document.getElementById("task-title").textContent=tid?t.title:"Nouvelle tâche";
  b.innerHTML=`
   ${editAll?`<div class="fields"><label for="tk-title">Titre<input type="text" id="tk-title" value="${esc(t.title)}"></label><label for="tk-as">Responsable<select id="tk-as">${ids.map(id=>`<option value="${id}" ${id===t.assignee?"selected":""}>${esc(nm(ps,id))} (${ROLES[m.members[id]]})</option>`).join("")}</select></label><label for="tk-due">Échéance<input type="date" id="tk-due" value="${t.due||""}"></label></div>`:`<p class="small">Responsable : <b>${esc(t.assignee?nm(ps,t.assignee):"non attribuée")}</b>${t.due?` · échéance ${dfr(t.due)}`:""} · ${pill(s[1],s[0])}${t.priority?` <span class="tag">${esc(t.priority)}</span>`:""}</p>`}
   ${t.compte?`<p class="small">Comptes : ${esc(t.compte)}${t.assertion?` · assertions : ${esc(t.assertion)}`:""}</p>`:""}
   <div><h4>Objectif</h4>${editAll?`<textarea id="tk-obj">${esc(t.objective||"")}</textarea>`:`<p>${esc(t.objective||"")}</p>`}</div>
   <div><h4>Procédures à réaliser</h4>${editAll?`<textarea id="tk-proc">${esc(t.procedures||"")}</textarea>`:`<p>${esc(t.procedures||"")}</p>`}${t.sample?`<p class="small">Échantillon : ${esc(t.sample)}</p>`:""}${t.docs?`<p class="small">Documents à demander : ${esc(t.docs)}</p>`:""}</div>
   <div class="grid2"><div class="dos"><h4>Ce qu'il faut faire</h4>${editAll?`<textarea id="tk-dos">${esc((t.dos||[]).join("\n"))}</textarea><p class="small">Une consigne par ligne.</p>`:`<ul>${(t.dos||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`}</div>
   <div class="donts"><h4>Ce qu'il ne faut pas faire</h4>${editAll?`<textarea id="tk-donts">${esc((t.donts||[]).join("\n"))}</textarea><p class="small">Une consigne par ligne.</p>`:`<ul>${(t.donts||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`}</div></div>
   ${tid?`<div><h4>Travaux et conclusion</h4>${editMine||editAll?`<textarea id="tk-conc" placeholder="Tests réalisés, résultats, anomalies, conclusion">${esc(t.conclusion||"")}</textarea>`:`<p>${esc(t.conclusion||"Pas encore de conclusion.")}</p>`}</div>
   ${t.reviewComment?`<div class="interp"><b>Commentaire du chef de mission :</b> ${esc(t.reviewComment)}</div>`:""}
   ${editAll?`<div><h4>Revue du chef de mission</h4><textarea id="tk-rev" placeholder="Commentaire de revue">${esc(t.reviewComment||"")}</textarea></div>`:""}
   <p class="small">Dernière mise à jour : ${t.updatedAt?new Date(t.updatedAt).toLocaleString("fr-FR"):"—"}${t.updatedBy?` par ${esc(nm(ps,t.updatedBy))}`:""}</p>`:""}
   <span class="msg" id="tk-msg" role="status"></span>`;
  const foot=document.getElementById("task-foot");
  const btns=[];
  if(!tid&&editAll)btns.push(`<button class="btn primary" data-act="create">Créer la tâche</button>`);
  if(tid&&(editMine||editAll)){
    btns.push(`<button class="btn" data-act="save">Enregistrer</button>`);
    if((t.status==="todo"||t.status==="rework")&&(editMine||editAll))btns.push(`<button class="btn" data-act="doing">Commencer</button>`);
    if((t.status==="doing"||t.status==="todo"||t.status==="rework")&&(editMine||editAll))btns.push(`<button class="btn primary" data-act="done">Marquer terminée</button>`);
    if(editAll&&t.status!=="validated")btns.push(`<button class="btn primary" data-act="validated">Valider</button>`);
    if(editAll&&(t.status==="done"||t.status==="validated"))btns.push(`<button class="btn danger" data-act="rework">Renvoyer pour reprise</button>`);
    if(editAll)btns.push(`<button class="btn small danger" data-act="delete">Supprimer</button>`);
  }
  btns.push(`<button class="btn" data-act="close">Fermer</button>`);
  foot.innerHTML=btns.join("");
  const val=id=>{const el=document.getElementById(id);return el?el.value:undefined;};
  const lines=id=>{const v=val(id);return v===undefined?undefined:v.split(/\n/).map(x=>x.trim()).filter(Boolean);};
  const collect=()=>{const o={updatedAt:Date.now(),updatedBy:TEAM.me};
    if(editAll){o.title=val("tk-title").trim()||t.title||"Tâche";o.assignee=val("tk-as");o.due=val("tk-due")||"";o.objective=val("tk-obj");o.procedures=val("tk-proc");o.dos=lines("tk-dos");o.donts=lines("tk-donts");if(val("tk-rev")!==undefined)o.reviewComment=val("tk-rev");}
    if(val("tk-conc")!==undefined)o.conclusion=val("tk-conc");return o;};
  const close=()=>{d.close?d.close():d.removeAttribute("open");};
  foot.querySelectorAll("[data-act]").forEach(bt=>bt.onclick=async()=>{
    const act=bt.dataset.act,msg=document.getElementById("tk-msg");
    if(act==="close")return close();
    bt.disabled=true;
    try{
      if(act==="create"){const o=collect();await TEAM.db.collection("tasks").add({...t,...o,mid:m.id,status:"todo",conclusion:"",reviewComment:"",createdAt:Date.now()});close();teamMsg("Tâche créée.");return;}
      if(act==="delete"){if(bt.dataset.c!=="1"){bt.dataset.c="1";bt.textContent="Confirmer la suppression";bt.disabled=false;return;}await TEAM.db.doc("tasks/"+tid).delete();close();return;}
      const o=collect();if(act!=="save"){o.status=act;if(act==="validated"||act==="rework")o.reviewedBy=TEAM.me;}
      if(act==="done"&&!(o.conclusion||t.conclusion||"").trim()){msg.className="msg err";msg.textContent="Rédigez vos travaux et votre conclusion avant de marquer la tâche terminée.";bt.disabled=false;return;}
      if(act==="rework"&&!(o.reviewComment||"").trim()){msg.className="msg err";msg.textContent="Indiquez dans le commentaire de revue ce qu'il faut reprendre.";bt.disabled=false;return;}
      await TEAM.db.doc("tasks/"+tid).update(o);
      if(act==="save"){msg.className="msg";msg.textContent="Enregistré.";bt.disabled=false;}else close();
    }catch(x){msg.className="msg err";msg.textContent="L'enregistrement a échoué.";dbErr(x);bt.disabled=false;}
  });
  d.showModal?d.showModal():d.setAttribute("open","");
}

document.getElementById("nm-form").onsubmit=createMission;
document.getElementById("nm-cancel").onclick=()=>{const d=document.getElementById("mission-dlg");d.close?d.close():d.removeAttribute("open");};
/* ---------- Prévision de l'année en cours ---------- */
const CUR_YEAR=new Date().getFullYear();
const RD=k=>state.cos[k].data;
function fcActive(k){const c=state.cos[k];return !!c&&state.fcOn!==false&&(+c.lastYear||2025)<CUR_YEAR;}
function isFc(t){return t===4&&keys().length>0&&fcActive(keys()[0]);}
const YL=t=>`${YEARS[t]}${isFc(t)?" (p)":""}`;
function realYears(k){const ly=+state.cos[k].lastYear||2025;return[ly-4,ly-3,ly-2,ly-1,ly];}
function trendG(k){const d=RD(k),b=yr(d,4),p=yr(d,3),pp=yr(d,2);const g=[b.ca/p.ca-1,p.ca/pp.ca-1].filter(isFinite);const v=g.length?g.reduce((a,x)=>a+x,0)/g.length:0.03;return clamp(v,-0.2,0.3);}
function fcParams(k){const c=state.cos[k],b=yr(RD(k),4),f=c.fc||{};
  const g=isFinite(f.g)?f.g:trendG(k);const m=isFinite(f.m)?f.m:(isFinite(b.ebit/b.ca)?b.ebit/b.ca:NaN);
  return{g,m,src:f.src||(isFinite(f.g)?"user":"trend"),why:f.why||"",gap:Math.max(1,CUR_YEAR-(+c.lastYear||2025))};}
function proj(k){
  const c=state.cos[k],b=yr(RD(k),4),{g,m,gap}=fcParams(k),f=Math.pow(1+g,gap),tax=c.hyp.tax||0.25;
  const r=x=>isFinite(b[x])&&b.ca?b[x]/b.ca:NaN;
  const o={};o.ca=b.ca*f;o.cogs=o.ca*r("cogs");o.sga=o.ca*r("sga");o.dep=b.dep*(1+(f-1)*0.5);o.ebit=o.ca*m;o.interest=b.interest;
  const dE=o.ebit-b.ebit;o.net=b.net+dE*(1-tax);o.cfo=b.cfo+(o.net-b.net);
  o.rec=b.rec*f;o.inv=b.inv*f;o.ca_cur=b.ca_cur*f;o.cl=b.cl*f;o.ppe=b.ppe*(1+(f-1)*0.5);
  o.ta=b.ta+((o.ca_cur-b.ca_cur)||0)+((o.ppe-b.ppe)||0);o.ltd=b.ltd;o.equity=b.equity+o.net;o.re=b.re+o.net;
  Object.keys(o).forEach(x=>{if(!isFinite(o[x]))o[x]=null;else o[x]=Math.round(o[x]*100)/100;});
  return o;
}
function D(k){if(DMEMO&&DMEMO[k])return DMEMO[k];const c=state.cos[k];if(!fcActive(k))return c.data;const p=proj(k),o={};FIELDS.forEach(([f])=>{o[f]=[...c.data[f].slice(1),p[f]];});return o;}
function withNoFc(fn){const old=state.fcOn;state.fcOn=false;try{return fn();}finally{state.fcOn=old;}}
function setYears(){const a=keys()[0];const ly=a?(+state.cos[a].lastYear||2025):2025;YEARS=a&&fcActive(a)?[ly-3,ly-2,ly-1,ly,CUR_YEAR]:[ly-4,ly-3,ly-2,ly-1,ly];}

/* ---------- Analyse IA par société ---------- */
const AIST={};const AITRIED=new Set();
function autoAI(){if(!sampler)return;keys().forEach(k=>{const c=state.cos[k];if(c&&(!c.ai||c.ai.year!==CUR_YEAR)&&!AITRIED.has(k))runAI(k);});}
async function runAI(k,force){
  if(!sampler||AIST[k]==="loading")return;const c=state.cos[k];if(!c)return;if(c.ai&&c.ai.year===CUR_YEAR&&!force)return;
  AITRIED.add(k);AIST[k]="loading";renderAIBits();
  const d=RD(k),b=yr(d,4),p=yr(d,3);const fig=o=>({ca:o.ca,ebit:o.ebit,net:o.net,total_actif:o.ta,capitaux_propres:o.equity,dettes_lt:o.ltd,flux_exploitation:o.cfo,stocks:o.inv,creances:o.rec});
  const prompt=`Tu es l'assistant d'un cabinet d'audit (projet Master CCA). Société : « ${c.name} » ; pays : ${c.country||"non précisé"} ; secteur : ${c.sector||"non précisé"} ; devise : ${c.cur} (montants en millions). Dernier exercice publié : ${c.lastYear}. Année en cours (année de la mission d'audit) : ${CUR_YEAR}.
Chiffres ${c.lastYear-1} : ${JSON.stringify(fig(p))}
Chiffres ${c.lastYear} : ${JSON.stringify(fig(b))}
Prépare l'étude prévisionnelle de l'année ${CUR_YEAR} pour cette société :
1. une prévision prudente de croissance du chiffre d'affaires et de marge d'exploitation pour ${CUR_YEAR} ;
2. les hypothèses de sensibilité du stress test (parts entre 0 et 1) ;
3. 3 à 5 scénarios de risques propres à cette société, à son secteur et à son pays pour ${CUR_YEAR} (environnement économique, réglementaire, géopolitique, mais aussi risques opérationnels, de marché, de clients ou de gouvernance), avec des impacts chiffrés plausibles ;
4. 5 points de vigilance concrets pour la mission d'audit ${CUR_YEAR}, chacun lié à un compte ou une assertion ;
5. une courte analyse de l'environnement.
Ne cite que des faits dont tu es raisonnablement sûr ; si tu n'es pas sûr d'un fait récent, reste général et dis-le. Réponds uniquement avec ce JSON :
{"prevision":{"croissance_ca_pct":number,"marge_exploitation_pct":number|null,"justification":string},
"hypotheses":{"rawShare":number,"pass":number,"salesFx":number,"costFx":number,"co2_mt":number,"co2exp":number,"float":number,"sea":number,"justification":string},
"scenarios":[{"nom":string,"description":string,"probabilite":1|2|3|4|5,"impacts":{"oil":number,"fx":number,"demand":number,"log":number,"carbon":number,"rate":number,"cost":number,"oneoff":number}}],
"points_attention":[{"titre":string,"detail":string,"compte":string}],
"environnement":{"eco":string,"reg":string,"geo":string,"audit":string}}
Signification : rawShare = part du coût des ventes liée aux matières premières ou à l'énergie ; pass = part d'une hausse de coûts répercutée sur les prix ; salesFx et costFx = part des ventes et des coûts exposés au dollar (négatif si la devise est le dollar) ; co2_mt = émissions annuelles en millions de tonnes ; co2exp = part soumise à une taxe carbone ; float = part de la dette à taux variable ; sea = part des achats transportés par mer. Impacts des scénarios : oil = variation du prix des matières premières/énergie en % ; fx = variation du dollar en % ; demand = baisse des volumes en % (0 à 40) ; log = surcoût du fret en % ; carbon = taxe carbone en €/t ; rate = hausse des taux en points de base ; cost = hausse des autres coûts d'exploitation en % ; oneoff = charge ou perte exceptionnelle en % du chiffre d'affaires. Mets 0 pour un facteur non concerné.`;
  try{
    const r=await sampler.json(prompt,{modelTier:"default"});
    if(!r||typeof r!=="object")throw{code:"invalid_json"};
    const cl=(v,a,b2)=>{const n=Number(v);return isFinite(n)?Math.max(a,Math.min(b2,n)):undefined;};
    const scen2=(Array.isArray(r.scenarios)?r.scenarios:[]).slice(0,5).map(s=>({nom:String(s.nom||"Scénario").slice(0,80),description:String(s.description||"").slice(0,400),probabilite:cl(s.probabilite,1,5)||3,impacts:{oil:cl(s.impacts?.oil,-40,80)||0,fx:cl(s.impacts?.fx,-20,30)||0,demand:cl(s.impacts?.demand,0,40)||0,log:cl(s.impacts?.log,0,30)||0,carbon:cl(s.impacts?.carbon,0,200)||0,rate:cl(s.impacts?.rate,0,500)||0,cost:cl(s.impacts?.cost,0,30)||0,oneoff:cl(s.impacts?.oneoff,0,20)||0}}));
    const pts=(Array.isArray(r.points_attention)?r.points_attention:[]).slice(0,6).map(x=>({titre:String(x.titre||"").slice(0,120),detail:String(x.detail||"").slice(0,400),compte:String(x.compte||"").slice(0,80)}));
    c.ai={year:CUR_YEAR,at:Date.now(),scenarios:scen2,points:pts,prevision:r.prevision||{},hypJust:(r.hypotheses||{}).justification||""};
    const hy=r.hypotheses||{};
    if(!c.hypUser){const set=(key,v,a,b2)=>{const n=cl(v,a,b2);if(n!==undefined)c.hyp[key]=n;};
      set("rawShare",hy.rawShare,0,1);set("pass",hy.pass,0,1);set("salesFx",hy.salesFx,-1,1);set("costFx",hy.costFx,-1,1);set("co2",hy.co2_mt,0,500);set("co2exp",hy.co2exp,0,1);set("float",hy.float,0,1);set("sea",hy.sea,0,1);}
    if(!c.fcUser){const pv=r.prevision||{};const g=cl(pv.croissance_ca_pct,-50,50),m=cl(pv.marge_exploitation_pct,-50,60);
      c.fc={g:g!==undefined?g/100:undefined,m:m!==undefined?m/100:undefined,src:"ia",why:String(pv.justification||"").slice(0,400)};}
    const env=r.environnement||{};c.env=c.env||defEnv();ENV_F.forEach(([f])=>{if(!c.env[f]&&typeof env[f]==="string")c.env[f]=env[f].trim().slice(0,800);});
    AIST[k]="ok";saveCo(k);refreshAll();
  }catch(e){
    const code=e&&e.code;AIST[k]="error:"+(code==="not_granted"?"L'IA n'est pas autorisée sur ce compte.":code==="rate_limited"?"Limite d'usage atteinte : réessayez plus tard.":e&&e.api?e.message:"L'analyse IA a échoué : réessayez.");
    renderAIBits();
  }
}
function aiBadge(k){const s=AIST[k],c=state.cos[k];
  if(s==="loading")return `<span class="pill warn">Analyse IA en cours…</span>`;
  if(s&&s.startsWith("error:"))return `<span class="pill crit">${esc(s.slice(6))}</span>`;
  if(c.ai)return `<span class="pill good">${c.ai.src==="prep"?"Analyse préparée FIDEX5":"Analyse IA "+c.ai.year} · ${new Date(c.ai.at).toLocaleDateString("fr-FR")}</span>`;
  return sampler?`<span class="pill na">Analyse IA non lancée</span>`:`<span class="pill na">Analyse IA : sur claude.ai ou avec une clé API (onglet Assistant IA)</span>`;}
function vigilPoints(k){const c=state.cos[k];
  if(c.ai&&c.ai.points&&c.ai.points.length)return c.ai.points.map(p=>({t:p.titre,d:p.detail,a:p.compte,src:"ia"}));
  return risks(k).sort((a,b)=>b.score-a.score).slice(0,5).map(r=>({t:r.risk,d:`${r.why}. ${r.proc}.`,a:r.compte,src:"calc"}));}
function renderAIBits(){
  const ks=keys();
  const v=document.getElementById("vigil");
  if(v){v.innerHTML=ks.length?`<div class="section-head"><h3>Points de vigilance pour ${CUR_YEAR}</h3></div>${ks.map(k=>{const pts=vigilPoints(k),c=state.cos[k];
    return `<div style="margin-top:10px"><div class="co-head"><b style="color:${col(k)}">${esc(c.name)}</b><span>${aiBadge(k)} ${sampler?`<button class="btn small" data-ai="${k}">${c.ai?"Actualiser l'analyse IA":"Lancer l'analyse IA"}</button>`:""}</span></div>
    <ol class="vlist">${pts.map(p=>`<li><b>${esc(p.t)}</b>${p.a?` <span class="tag">${esc(p.a)}</span>`:""}<div class="small">${esc(p.d)}</div></li>`).join("")}</ol>
    ${pts[0]&&pts[0].src==="calc"?`<p class="small">Points déduits des scores. ${sampler?"L'analyse IA ajoutera les risques propres à la société.":""}</p>`:(c.ai&&c.ai.src==="prep"?`<p class="small">Préparés par l'équipe FIDEX5 à partir des rapports annuels et de la presse (novembre 2026) : à vérifier.${sampler?" L'IA peut actualiser cette analyse.":""}</p>`:`<p class="small">Proposés par l'IA à partir des chiffres et de ses connaissances : à vérifier.</p>`)}</div>`;}).join("")}`:"";}
  const s=document.getElementById("ai-scen");
  if(s){s.innerHTML=ks.length?`<h3>Risques spécifiques aux sociétés</h3><p class="small">Scénarios ${CUR_YEAR} propres à chaque société (analyse préparée par l'équipe ou proposée par l'IA) : cliquez pour les appliquer au stress test. Les impacts sont des ordres de grandeur à discuter.</p>${ks.map(k=>{const c=state.cos[k],sc=(c.ai&&c.ai.scenarios)||[];
    return `<div style="margin-top:10px"><div class="co-head"><b style="color:${col(k)}">${esc(c.name)}</b><span>${aiBadge(k)} ${sampler?`<button class="btn small" data-ai="${k}">${c.ai?"Actualiser":"Lancer l'analyse IA"}</button>`:""}</span></div>
    ${sc.length?`<div class="scen-list">${sc.map((x,i)=>`<button class="scen" data-scen="${k}|${i}"><b>${esc(x.nom)}</b><span class="small">${esc(x.description)}</span><span class="small">Probabilité ${x.probabilite}/5 · ${Object.entries(x.impacts).filter(([,v])=>v).map(([f,v])=>`${NAMES[f]} ${sign(f,v)}${(SLIDERS.find(s2=>s2[0]===f)||[])[5]||""}`).join(", ")||"impact limité"}</span></button>`).join("")}</div>`:`<p class="small">${AIST[k]==="loading"?"Génération des scénarios…":"Pas encore de scénarios spécifiques."}</p>`}</div>`;}).join("")}`:"";
    s.querySelectorAll("[data-scen]").forEach(b=>b.onclick=()=>{const [k,i]=b.dataset.scen.split("|");const x=state.cos[k].ai.scenarios[+i];scen={...ZERO,...x.impacts};scenName=`${x.nom} (${state.cos[k].name})`;renderSliders();updateStress();document.getElementById("stress-cards").scrollIntoView({behavior:"smooth"});});}
  const mv=document.getElementById("mission-vigil");
  if(mv&&ks.length){const k=keys().includes(ui.missionCo)?ui.missionCo:ks[0];const pts=vigilPoints(k);
    mv.innerHTML=`<div class="section-head"><h3>Points d'attention pour la mission ${CUR_YEAR} : ${esc(state.cos[k].name)}</h3>${aiBadge(k)}</div><ol class="vlist">${pts.map(p=>`<li><b>${esc(p.t)}</b>${p.a?` <span class="tag">${esc(p.a)}</span>`:""}<div class="small">${esc(p.d)}</div></li>`).join("")}</ol>
    ${fcActive(k)?`<p class="small">Seuil, risques et notation de cet onglet sont calculés sur la prévision ${CUR_YEAR} (voir l'onglet Données).</p>`:""}`;}
  document.querySelectorAll("[data-ai]").forEach(b=>b.onclick=()=>runAI(b.dataset.ai,true));
  const fcb=document.getElementById("fc-toggle");if(fcb)fcb.checked=state.fcOn!==false;
}
function renderFcCard(){
  const box=document.getElementById("fc-card");if(!box||!keys().length)return;
  const k=keys().includes(ui.dataCo)?ui.dataCo:keys()[0],c=state.cos[k];
  if((+c.lastYear||2025)>=CUR_YEAR){box.innerHTML=`<h3>Prévision</h3><p class="small">Le dernier exercice saisi est ${c.lastYear} : aucune prévision n'est nécessaire.</p>`;return;}
  const p=fcParams(k),pr=proj(k);
  box.innerHTML=`<div class="section-head"><h3>Prévision ${CUR_YEAR} de ${esc(c.name)}</h3><label class="small" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="fc-toggle2" ${state.fcOn!==false?"checked":""}> Inclure la prévision dans les analyses</label></div>
   <p class="small">Méthode : ${p.src==="ia"?"proposée par l'IA":p.src==="prep"?"préparée par l'équipe FIDEX5 (démonstration)":p.src==="user"?"saisie par l'équipe":"tendance des derniers exercices"}${p.gap>1?` · projection sur ${p.gap} ans`:""}. Les postes du bilan suivent l'activité, les capitaux propres intègrent le résultat prévu (sans dividende).</p>
   ${p.why?interp(esc(p.why)):""}
   <div class="fields" style="margin-top:10px"><label for="fc-g">Croissance annuelle du CA (%)<input type="text" id="fc-g" inputmode="decimal" value="${fmt(p.g*100,1)}"></label><label for="fc-m">Marge d'exploitation ${CUR_YEAR} (%)<input type="text" id="fc-m" inputmode="decimal" value="${fmt(p.m*100,1)}"></label></div>
   <div class="actions" style="margin-top:8px"><button class="btn small" id="fc-reset">Revenir à la tendance</button><span class="small">CA prévu : <b>${fmt(pr.ca)}</b> ${esc(c.cur)} · EBIT : <b>${fmt(pr.ebit)}</b> · résultat net : <b>${fmt(pr.net)}</b></span></div>`;
  const upd=()=>{const g=parseNum(document.getElementById("fc-g").value),m=parseNum(document.getElementById("fc-m").value);c.fc={...(c.fc||{}),g:isFinite(g)?g/100:undefined,m:isFinite(m)?m/100:undefined,src:"user",why:""};c.fcUser=true;saveCo(k);refreshAll();};
  document.getElementById("fc-g").onchange=upd;document.getElementById("fc-m").onchange=upd;
  document.getElementById("fc-reset").onclick=()=>{c.fc=null;c.fcUser=false;saveCo(k);refreshAll();};
  document.getElementById("fc-toggle2").onchange=e=>{state.fcOn=e.target.checked;save();refreshAll();};
}

/* ===================================================================
   Travaux d'audit : test des écritures (ISA 240), revue analytique (ISA 520),
   échantillonnage (unités monétaires), continuité d'exploitation (ISA 570),
   CrashTest Monte-Carlo
   =================================================================== */
const JE={};
let DMEMO=null;
const RNG=seed=>{let a=seed>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};};
const gauss=r=>{let u=0,v=0;while(!u)u=r();while(!v)v=r();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);};
const fmtD=d=>d?d.toLocaleDateString("fr-FR"):"n.d.";
const isMaroc=k=>/maroc|morocco/i.test(state.cos[k].country||"")||state.cos[k].cur==="MDH";
function wkCo(id){if(!keys().includes(ui[id]))ui[id]=keys()[0];return ui[id];}
function coSeg(id,cb){const k=wkCo(id);return keys().length>1?`<div class="seg" data-seg="${id}" role="group" aria-label="Société">${keys().map(x=>`<button aria-pressed="${x===k}" data-k="${x}">${esc(state.cos[x].name)}</button>`).join("")}</div>`:"";}
function bindSeg(box,id,cb){box.querySelectorAll(`[data-seg="${id}"] button`).forEach(b=>b.onclick=()=>{ui[id]=b.dataset.k;cb();});}

/* ---------- 1. Écritures : import ---------- */
const jeNorm=s=>String(s==null?"":s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]/g,"");
function jeDate(v){
  if(v instanceof Date)return isNaN(v)?null:new Date(v.getFullYear(),v.getMonth(),v.getDate());
  if(typeof v==="number"&&v>20000&&v<80000){const d=new Date(Math.round((v-25569)*864e5));return new Date(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate());}
  const s=String(v==null?"":v).trim();let m;
  if((m=/^(\d{4})(\d{2})(\d{2})$/.exec(s)))return new Date(+m[1],m[2]-1,+m[3]);
  if((m=/^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(s)))return new Date(+m[1],m[2]-1,+m[3]);
  if((m=/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})/.exec(s))){let y=+m[3];if(y<100)y+=2000;return new Date(y,m[2]-1,+m[1]);}
  return null;}
const JE_COLS=[
 ["date",/^(ecrituredate|datecomptable|dateecriture|date|dateoperation|datepiece|datemouvement)$/,s=>/date/.test(s)&&!/valid|saisie|creation|echeance|lettr/.test(s)],
 ["acc",/^(comptenum|compte|numcompte|numerodecompte|account|comptegeneral|nocompte)$/,s=>/compte|account/.test(s)&&!/lib|aux|intitule|nom/.test(s)],
 ["accLib",/^(comptelib|intitulecompte|libellecompte|nomcompte)$/,s=>/(compte|account)/.test(s)&&/lib|intitule|nom/.test(s)&&!/aux/.test(s)],
 ["lib",/^(ecriturelib|libelle|label|description|designation|libelleecriture)$/,s=>/lib|label|descr|designation/.test(s)&&!/compte|journal/.test(s)],
 ["debit",/^(debit|montantdebit|debitmontant|debits)$/,s=>/debit/.test(s)],
 ["credit",/^(credit|montantcredit|credits)$/,s=>/credit/.test(s)],
 ["amt",/^(montant|amount|mnt|valeur)$/,s=>/montant|amount/.test(s)&&!/devise/.test(s)],
 ["user",/^(utilisateur|user|saisipar|auteur|createdby|operateur)$/,s=>/util|user|saisi|auteur|operat/.test(s)],
 ["piece",/^(ecriturenum|piece|pieceref|numpiece|numero|ref|reference)$/,s=>/piece|ecriturenum/.test(s)],
 ["jr",/^(journalcode|journal|codejournal|jnl)$/,s=>/journal/.test(s)&&!/lib/.test(s)]];
function jeMap(header){const h=header.map(jeNorm),map={},used=new Set();
  for(const pass of [1,2])for(const [f,ex,fz] of JE_COLS){if(map[f]!=null)continue;const i=h.findIndex((s,j)=>!used.has(j)&&s&&(pass===1?ex.test(s):fz(s)));if(i>=0){map[f]=i;used.add(i);}}
  return map;}
function jeFromRows(rows){
  let hi=-1,map=null;
  for(let i=0;i<Math.min(rows.length,15);i++){const m=jeMap(rows[i]||[]);const ok=m.acc!=null&&(m.debit!=null||m.credit!=null||m.amt!=null);if(ok){hi=i;map=m;break;}}
  if(hi<0)throw new Error("Colonnes non reconnues : il faut au moins une colonne « compte » et des colonnes « débit »/« crédit » ou « montant ».");
  const num=v=>typeof v==="number"?v:parseNum(v);const out=[];
  for(const r of rows.slice(hi+1)){if(!r||!r.length)continue;const acc=String(r[map.acc]==null?"":r[map.acc]).trim();if(!acc)continue;
    const de=map.debit!=null?num(r[map.debit]):NaN,cr=map.credit!=null?num(r[map.credit]):NaN,am=map.amt!=null?num(r[map.amt]):NaN;
    let amt=isFinite(de)&&de!==0?Math.abs(de):isFinite(cr)&&cr!==0?Math.abs(cr):isFinite(am)?Math.abs(am):NaN;
    if(!isFinite(amt)||amt===0)continue;
    out.push({d:map.date!=null?jeDate(r[map.date]):null,acc,accLib:map.accLib!=null?String(r[map.accLib]||""):"",lib:map.lib!=null?String(r[map.lib]||"").trim():"",amt,
      side:isFinite(de)&&de!==0?"D":isFinite(cr)&&cr!==0?"C":"",user:map.user!=null?String(r[map.user]||"").trim():"",piece:map.piece!=null?String(r[map.piece]||""):"",jr:map.jr!=null?String(r[map.jr]||""):""});}
  if(!out.length)throw new Error("Aucune écriture lisible dans le fichier.");
  return{rows:out,cols:Object.keys(map)};}
function jeSplitText(t){const lines=t.replace(/^﻿/,"").split(/\r?\n/).filter(l=>l.trim());const first=lines[0]||"";
  const dl=["\t","|",";",","].map(d=>[d,first.split(d).length]).sort((a,b)=>b[1]-a[1])[0][0];
  return lines.map(l=>l.split(dl).map(c=>c.replace(/^"|"$/g,"").trim()));}
async function jeImport(k,file){
  let rows;
  if(/\.(xlsx|xls|xlsm)$/i.test(file.name)){if(!window.XLSX)throw new Error("La lecture des fichiers Excel n'est pas disponible ici : exportez le grand livre en CSV.");
    const wb=XLSX.read(await file.arrayBuffer(),{type:"array",cellDates:true});rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,raw:true,defval:""});}
  else rows=jeSplitText(await file.text());
  const r=jeFromRows(rows);JE[k]={name:file.name,unit:1,rows:r.rows,cols:r.cols,demo:false};}

/* ---------- 1. Écritures : grand livre fictif de démonstration ---------- */
function jeDemo(k){
  const c=state.cos[k],b=yr(RD(k),4),y=+c.lastYear||2025,r=RNG(20251231+k.length*97);
  const ca=(isFinite(b.ca)&&b.ca>0?b.ca:500)*1e6;
  const A=isMaroc(k)?[["7111","Ventes de marchandises",.2],["3421","Clients",.2],["6111","Achats de marchandises",.14],["4411","Fournisseurs",.14],["6171","Rémunérations du personnel",.08],["5141","Banques",.12],["6136","Honoraires",.04],["6193","Dotations d'exploitation aux amortissements",.03],["3111","Marchandises",.05]]
                   :[["701","Ventes de produits finis",.2],["411","Clients",.2],["601","Achats de matières premières",.14],["401","Fournisseurs",.14],["641","Rémunérations du personnel",.08],["512","Banques",.12],["622","Honoraires",.04],["681","Dotations aux amortissements",.03],["31","Matières premières",.05]];
  const LIB={0:"Facture client",1:"Facture client",2:"Facture fournisseur",3:"Facture fournisseur",4:"Paie du mois",5:"Règlement",6:"Honoraires",7:"Dotation mensuelle",8:"Entrée en stock"};
  const users=["compta1","compta1","compta2","compta2","compta3","tresorerie"];
  const pick=()=>{let x=r(),s=0;for(let i=0;i<A.length;i++){s+=A[i][2];if(x<=s)return i;}return 0;};
  const bday=()=>{for(;;){const d=new Date(y,0,1+Math.floor(r()*365));const w=d.getDay();if(w!==0&&w!==6)return d;}};
  const avg=ca/2500,mu=Math.log(avg)-0.85,rows=[];let pc=1;
  const add=(i,d,amt,lib,user,acc,accLib)=>rows.push({d,acc:acc||A[i][0],accLib:accLib||A[i][1],lib,amt:Math.round(amt*100)/100,side:"",user,piece:"P"+String(pc++).padStart(5,"0"),jr:"OD"});
  for(let n=0;n<1600;n++){const i=pick();add(i,bday(),Math.exp(mu+1.3*gauss(r)),LIB[i]+" n° "+Math.floor(1000+r()*9000),users[Math.floor(r()*users.length)]);}
  const mt=materiality(k),sp=mt.neg?ca*0.002:mt.sp*1e6;
  for(let n=0;n<10;n++){const d=new Date(y,0,1+Math.floor(r()*52)*7+5+(n%2));add(pick(),d,Math.exp(mu+1.2*gauss(r)),"Écriture manuelle","compta2");}
  [50000,100000,250000,500000,1000000,120000,300000,75000,2000000,40000,150000,600000].forEach(v=>add(pick(),bday(),v,"Facture","compta1"));
  for(let n=0;n<6;n++)add(0,new Date(y,11,29+(n%3)),sp*(1.1+r()),"Régularisation chiffre d'affaires fin d'exercice","compta3");
  add(1,new Date(y+1,0,3),sp*1.3,"Annulation facture décembre","compta3");
  ["admin","admin","dg","admin"].forEach((u,j)=>add(j%2?2:5,bday(),Math.exp(mu+1.5+gauss(r)),j===3?"Divers":"Correction","admin"===u?"admin":u));
  add(0,bday(),avg*3,"Ajustement",users[0],isMaroc(k)?"6588":"658",isMaroc(k)?"Autres charges non courantes":"Charges diverses de gestion");
  add(0,bday(),avg*2,"",users[1],isMaroc(k)?"3497":"471",isMaroc(k)?"Comptes transitoires ou d'attente":"Compte d'attente");
  for(let n=0;n<5;n++){const s=rows[Math.floor(r()*1500)];rows.push({...s,piece:"P"+String(pc++).padStart(5,"0")});}
  rows.sort((a,b)=>a.d-b.d);
  JE[k]={name:`Grand livre fictif ${y}`,unit:1,rows,cols:["date","acc","accLib","lib","amt","user","piece","jr"],demo:true};}

/* ---------- 1. Écritures : tests ---------- */
const JE_T=[["we","Week-end"],["round","Montant rond"],["close","Proche de la clôture"],["big","Supérieur au seuil de planification"],["rare","Compte rarement utilisé"],["user","Utilisateur inhabituel"],["lib","Libellé vide ou sensible"],["dup","Doublon possible"]];
const JE_TL={we:"Écritures passées un samedi ou un dimanche",round:"Montants ronds (multiples de 1 000, au moins 10 000)",close:"Écritures 5 jours avant ou après la clôture, au-dessus du seuil d'insignifiance",big:"Montants supérieurs au seuil de planification",rare:"Comptes mouvementés 3 fois ou moins",user:"Utilisateurs rares (moins de 1 % des écritures)",lib:"Libellés vides ou sensibles (régularisation, correction, divers, annulation…)",dup:"Doublons possibles (même date, compte et montant)"};
function jeTests(k){
  const J=JE[k];if(!J)return null;const rows=J.rows,u=J.unit||1,mt=materiality(k);
  const sp=mt.neg?Infinity:mt.sp*1e6/u,si=mt.neg?Infinity:mt.si*1e6/u;
  const hasD=rows.some(r=>r.d),hasU=rows.some(r=>r.user);
  const yc={};rows.forEach(r=>{if(r.d)yc[r.d.getFullYear()]=(yc[r.d.getFullYear()]||0)+1;});
  const fy=+Object.keys(yc).sort((a,b)=>yc[b]-yc[a])[0]||(+state.cos[k].lastYear||2025),close=new Date(fy,11,31);
  const ac={},uc={},dc={};const key=r=>`${r.d?r.d.getTime():""}|${r.acc}|${r.amt}`;
  rows.forEach(r=>{ac[r.acc]=(ac[r.acc]||0)+1;if(r.user)uc[r.user]=(uc[r.user]||0)+1;dc[key(r)]=(dc[key(r)]||0)+1;});
  const uMin=Math.max(2,rows.length*0.01);
  const F={we:r=>hasD&&r.d&&(r.d.getDay()===0||r.d.getDay()===6),round:r=>{const v=r.amt*u;return v>=10000&&Math.abs(v%1000)<1e-6;},close:r=>hasD&&r.d&&Math.abs((r.d-close)/864e5)<=5&&r.amt>=si,
    big:r=>r.amt>=sp,rare:r=>ac[r.acc]<=3,user:r=>hasU&&r.user&&uc[r.user]<uMin,lib:r=>!r.lib||/r[ée]gul|correct|divers|annul|ajust|extourne|provisoire|attente/i.test(r.lib),dup:r=>dc[key(r)]>1};
  const cnt={};JE_T.forEach(([id])=>cnt[id]=0);
  const fl=rows.map(r=>{const f=JE_T.map(([id])=>id).filter(id=>F[id](r));f.forEach(id=>cnt[id]++);return{r,f,s:f.length+(f.includes("big")?1:0)+(f.includes("close")?1:0)};});
  const flagged=fl.filter(x=>x.f.length).sort((a,b)=>b.s-a.s||b.r.amt-a.r.amt);
  const c9=Array(9).fill(0);let n=0;rows.forEach(r=>{let a=r.amt*u;if(a<10)return;while(a>=10)a/=10;c9[Math.floor(a)-1]++;n++;});
  const obs=c9.map(c=>n?c/n:0),mad=obs.reduce((s,o,i)=>s+Math.abs(o-BEN[i]),0)/9;
  return{n:rows.length,cnt,flagged,prio:flagged.filter(x=>x.f.length>=2).length,hasD,hasU,fy,sp,si,ben:{obs,mad,n},na:{we:!hasD,close:!hasD,user:!hasU}};}
function benMiniSvg(obs,c){const W=300,H=130,x0=22,bw=(W-x0-6)/9,ym=.4,sy=v=>H-18-Math.min(v,ym)/ym*(H-30);
  let s=`<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:460px" role="img" aria-label="Benford des écritures">`;
  [0,.1,.2,.3,.4].forEach(g=>{s+=`<line x1="${x0}" x2="${W-4}" y1="${sy(g)}" y2="${sy(g)}" stroke="var(--line)"/><text x="${x0-4}" y="${sy(g)+3}" font-size="9" text-anchor="end">${g*100}</text>`;});
  obs.forEach((o,i)=>{s+=`<rect x="${x0+i*bw+3}" y="${sy(o)}" width="${bw-6}" height="${sy(0)-sy(o)}" fill="${c}" fill-opacity=".75" rx="2"/><text x="${x0+i*bw+bw/2}" y="${H-5}" font-size="10" text-anchor="middle">${i+1}</text>`;});
  s+=`<polyline points="${BEN.map((e,i)=>`${x0+i*bw+bw/2},${sy(e)}`).join(" ")}" fill="none" stroke="var(--ink)" stroke-width="1.5"/></svg>`;return s;}
function renderJE(){
  const box=document.getElementById("je-card");if(!box||!keys().length)return;
  const k=wkCo("jeCo"),J=JE[k],T=jeTests(k),cu=state.cos[k].cur;
  let h=`<div class="section-head"><h3>Test des écritures comptables (ISA 240)</h3>${coSeg("jeCo")}</div>
  <p class="small">Importez le grand livre ou le fichier des écritures comptables (FEC, Excel ou CSV avec au moins : date, compte, libellé, débit, crédit ; idéalement l'utilisateur). Huit tests repèrent les écritures à examiner, et la loi de Benford s'applique aux montants réels. Les écritures restent dans ce navigateur et ne sont pas enregistrées.</p>
  <div class="actions" style="margin-top:8px"><label class="btn primary" style="cursor:pointer">Importer le grand livre<input type="file" id="je-file" accept=".xlsx,.xls,.csv,.txt" hidden></label>
  <button class="btn" id="je-demo">Générer un grand livre fictif (démonstration)</button>
  ${J?`<label class="small" style="display:inline-flex;gap:6px;align-items:center">Montants du fichier en<select id="je-unit"><option value="1">unités</option><option value="1000">milliers</option><option value="1000000">millions</option></select></label><button class="btn small" id="je-clear">Retirer</button>`:""}
  <span class="msg" id="je-msg" role="status"></span></div>`;
  if(J&&T){
    const pr=T.flagged.length/T.n;
    h+=`${J.demo?`<p class="msg err" style="margin-top:8px">Grand livre fictif généré pour la démonstration (anomalies volontairement insérées) : ne jamais l'utiliser comme élément probant.</p>`:`<p class="small" style="margin-top:8px">Fichier : <b>${esc(J.name)}</b></p>`}
    <div class="mat-kpis"><div class="box"><div class="lab">Écritures analysées</div><div class="val">${fmt(T.n)}</div></div>
      <div class="box"><div class="lab">Écritures signalées</div><div class="val">${fmt(T.flagged.length)}</div><div class="small">${pct(pr,1)}</div></div>
      <div class="box"><div class="lab">À examiner en priorité</div><div class="val">${fmt(T.prio)}</div><div class="small">au moins 2 tests différents</div></div>
      <div class="box"><div class="lab">Benford (écart moyen)</div><div class="val">${fmt(T.ben.mad,3)}</div>${pill(benZone(T.ben.mad),benZone(T.ben.mad)==="good"?"Conforme":benZone(T.ben.mad)==="warn"?"À surveiller":"Non conforme")}</div></div>
    <div class="grid2" style="margin-top:12px"><div><table><thead><tr><th>Test</th><th class="n">Écritures</th><th class="n">%</th></tr></thead><tbody>
      ${JE_T.map(([id])=>`<tr><td>${JE_TL[id]}</td><td class="n">${T.na[id]?"n.d.":fmt(T.cnt[id])}</td><td class="n">${T.na[id]?"":pct(T.cnt[id]/T.n,1)}</td></tr>`).join("")}</tbody></table>
      ${T.na.user||T.na.we?`<p class="small">n.d. : colonne absente du fichier (${[T.na.we?"date":"",T.na.user?"utilisateur":""].filter(Boolean).join(", ")}).</p>`:""}</div>
      <div><p class="small"><b>Premier chiffre des montants</b> (${fmt(T.ben.n)} montants ≥ 10). Barres : observé ; trait : loi de Benford.</p>${benMiniSvg(T.ben.obs,col(k))}</div></div>
    <h3 style="margin-top:14px">Écritures à examiner en priorité</h3>
    <div class="scroll"><table><thead><tr><th class="n">Score</th><th>Date</th><th>Compte</th><th>Libellé</th><th class="n">Montant</th><th>Utilisateur</th><th>Tests déclenchés</th></tr></thead><tbody>
    ${T.flagged.slice(0,25).map(x=>`<tr><td class="n"><b>${x.s}</b></td><td>${fmtD(x.r.d)}</td><td>${esc(x.r.acc)}${x.r.accLib?`<div class="small">${esc(x.r.accLib)}</div>`:""}</td><td>${esc(x.r.lib||"(vide)")}</td><td class="n">${fmt(x.r.amt,0)}</td><td>${esc(x.r.user||"")}</td><td>${x.f.map(id=>`<span class="pill ${id==="big"||id==="close"?"crit":"warn"}" style="margin:1px">${JE_T.find(t=>t[0]===id)[1]}</span>`).join(" ")}</td></tr>`).join("")}</tbody></table></div>
    ${interp(jeInterp(k,T))}
    <div class="exp"><button class="btn small" data-csv="je">Écritures signalées en CSV</button></div>`;
  }
  box.innerHTML=h;
  bindSeg(box,"jeCo",renderJE);
  const msg=(t,e)=>{const m=document.getElementById("je-msg");m.className="msg"+(e?" err":"");m.textContent=t;};
  document.getElementById("je-file").onchange=async e=>{const f=e.target.files[0];if(!f)return;msg("Lecture du fichier…");try{await jeImport(k,f);renderJE();renderSample();}catch(er){msg(er.message||"Fichier illisible.",true);}};
  document.getElementById("je-demo").onclick=()=>{jeDemo(k);renderJE();renderSample();};
  const us=document.getElementById("je-unit");if(us){us.value=String(J.unit||1);us.onchange=()=>{J.unit=+us.value;renderJE();renderSample();};}
  const cl=document.getElementById("je-clear");if(cl)cl.onclick=()=>{delete JE[k];renderJE();renderSample();};
}
function jeInterp(k,T){const top=JE_T.filter(([id])=>!T.na[id]).sort((a,b)=>T.cnt[b[0]]-T.cnt[a[0]]).slice(0,2).map(([id])=>JE_TL[id].toLowerCase());
  return `${fmt(T.prio)} écriture(s) cumulent au moins deux tests différents sur ${fmt(T.n)}. Les tests les plus fréquents portent sur : ${top.join(" ; ")}. ${T.cnt.close?`Les ${fmt(T.cnt.close)} écritures proches de la clôture sont prioritaires (risque de séparation des exercices et de gestion du résultat). `:""}${benZone(T.ben.mad)!=="good"?"La distribution des montants s'écarte de la loi de Benford : rechercher les comptes ou utilisateurs qui expliquent l'écart. ":"Les montants suivent la loi de Benford. "}Pour chaque écriture retenue : obtenir la pièce justificative, l'autorisation et l'explication de la direction (ISA 240.32).`;}

/* ---------- 2. Revue analytique (ISA 520) ---------- */
function raRows(k){const d=RD(k),mt=materiality(k),sp=mt.neg?NaN:mt.sp;const P=FIELDS.map(([f,l])=>{const n1=d[f][3],n=d[f][4];const a=+n1,b=+n;const ok=n1!=null&&n!=null&&n1!==""&&n!==""&&isFinite(a)&&isFinite(b);
  const dv=ok?b-a:NaN,dp=ok&&a!==0?dv/Math.abs(a):NaN;const sig=ok&&(isFinite(sp)?Math.abs(dv)>=sp&&(!isFinite(dp)||Math.abs(dp)>=0.1):Math.abs(dp)>=0.2);return{f,l,a,b,dv,dp,sig};});
  return{P,sp};}
function renderRA520(){
  const box=document.getElementById("ra520-card");if(!box||!keys().length)return;const k=ui.missionCo,co=state.cos[k],m=co.mission;m.raExp=m.raExp||{};
  const {P,sp}=raRows(k),RY=realYears(k),sig=P.filter(x=>x.sig),done=sig.filter(x=>(m.raExp[x.f]||"").trim()).length,PJ=fcActive(k)?proj(k):null;
  box.innerHTML=`<div class="section-head"><h3>Revue analytique (ISA 520) : ${esc(co.name)}</h3><span class="small">${done}/${sig.length} variation(s) significative(s) expliquée(s)</span></div>
  <p class="small">Variations entre ${RY[3]} et ${RY[4]}. Une variation est significative si elle dépasse le seuil de planification (${isFinite(sp)?fmt(sp,2)+" "+esc(co.cur):"non calculable"}) et 10 %. Notez l'explication obtenue de la direction, puis corroborez-la par des pièces.${PJ?` La colonne ${CUR_YEAR} (p) sert d'attente pour la revue analytique de fin de mission.`:""}</p>
  <div class="scroll"><table><thead><tr><th>Poste (${esc(co.cur)})</th><th class="n">${RY[3]}</th><th class="n">${RY[4]}</th><th class="n">Variation</th><th class="n">%</th>${PJ?`<th class="n">${CUR_YEAR} (p)</th>`:""}<th>Explication obtenue</th></tr></thead><tbody>
  ${P.map(x=>`<tr${x.sig?' class="row-open"':""}><td>${x.sig?"● ":""}${x.l}</td><td class="n">${fmt(x.a,1)}</td><td class="n">${fmt(x.b,1)}</td><td class="n">${fmt(x.dv,1)}</td><td class="n">${pct(x.dp,0)}</td>${PJ?`<td class="fc">${fmt(PJ[x.f],1)}</td>`:""}<td>${x.sig?`<input type="text" data-raexp="${x.f}" value="${esc(m.raExp[x.f]||"")}" placeholder="À expliquer" style="width:100%;min-width:200px">`:`<span class="small">Non significative</span>`}</td></tr>`).join("")}</tbody></table></div>
  <div class="actions" style="margin-top:8px">${sampler?`<button class="btn small" id="ra-ai">Proposer des explications à vérifier (IA)</button>`:""}<span class="msg" id="ra-msg" role="status"></span><button class="btn small" data-csv="ra520">Données CSV</button></div>
  ${interp(sig.length?`${sig.length} variation(s) significative(s) : ${sig.slice(0,4).map(x=>`${x.l.toLowerCase()} (${pct(x.dp,0)})`).join(", ")}${sig.length>4?", etc":""}. ${done<sig.length?`${sig.length-done} reste(nt) à expliquer : une variation inexpliquée ou incohérente avec la connaissance de l'entité impose des tests de détail supplémentaires (ISA 520.7).`:"Toutes ont une explication : vérifiez qu'elle est corroborée par des éléments probants."}`:"Aucune variation significative entre les deux derniers exercices : les procédures analytiques confortent la stabilité des comptes.")}`;
  box.querySelectorAll("[data-raexp]").forEach(i=>i.onchange=()=>{m.raExp[i.dataset.raexp]=i.value;saveCo(k);renderRA520();});
  const b=document.getElementById("ra-ai");if(b)b.onclick=async()=>{const msg=document.getElementById("ra-msg");if(!sig.length){msg.textContent="Aucune variation à expliquer.";return;}
    b.disabled=true;msg.className="msg";msg.textContent="L'IA prépare des pistes d'explication…";
    try{const r=await sampler.json(`Tu aides des auditeurs (Master CCA). Société « ${co.name} » (${co.country||""}, secteur ${co.sector||"non précisé"}), montants en ${co.cur}. Pour chaque variation significative entre ${RY[3]} et ${RY[4]}, propose en une phrase (25 mots maximum) l'explication économique la plus plausible à faire confirmer par la direction, en t'appuyant sur les autres postes et sur tes connaissances de la société et du secteur. Ne présente pas d'hypothèse comme un fait.
Variations : ${JSON.stringify(sig.map(x=>({poste:x.f,libelle:x.l,avant:x.a,apres:x.b,variation_pct:Math.round(x.dp*100)})))}
Autres données : ${JSON.stringify(Object.fromEntries(P.map(x=>[x.f,[x.a,x.b]])))}
Réponds uniquement avec un objet JSON : {"explications": {"<poste>": "<phrase>"}}`,{modelTier:"default"});
      const e=(r&&r.explications)||{};let n=0;sig.forEach(x=>{if(!(m.raExp[x.f]||"").trim()&&e[x.f]){m.raExp[x.f]="[IA, à confirmer] "+String(e[x.f]).slice(0,300);n++;}});saveCo(k);renderRA520();
      const m2=document.getElementById("ra-msg");if(m2)m2.textContent=`${n} piste(s) ajoutée(s) : à confirmer auprès de la direction.`;}
    catch(er){msg.className="msg err";msg.textContent=er&&er.api?er.message:"L'IA n'a pas pu répondre : réessayez.";b.disabled=false;}};
}

/* ---------- 3. Échantillonnage par unités monétaires ---------- */
const CONF={90:[2.31,1.5],95:[3.0,1.6],99:[4.61,1.9]};
const SAMP_POP=[["rec","Créances clients"],["inv","Stocks"],["ca","Chiffre d'affaires"],["cogs","Coût des ventes"],["sga","Frais commerciaux et généraux"],["ppe","Immobilisations corporelles"]];
function sampCalc(k){
  const co=state.cos[k],m=co.mission,mt=materiality(k);m.samp=m.samp||{};const s=m.samp;
  if(!s.pop)s.pop=JE[k]?"je":"rec";if(s.pop==="je"&&!JE[k])s.pop="rec";if(!s.conf)s.conf=95;if(s.prefix==null)s.prefix=isMaroc(k)?"342":"411";if(!s.seed)s.seed=12345;
  const tm=isFinite(s.tm)&&s.tm>0?s.tm:(mt.neg?NaN:mt.sp),ee=isFinite(s.ee)&&s.ee>=0?s.ee:0;
  let bv,items=null;
  if(s.pop==="je"){const J=JE[k],u=J.unit||1;items=J.rows.filter(r=>String(r.acc).startsWith(String(s.prefix).trim()));bv=items.reduce((a,r)=>a+r.amt,0)*u/1e6;}
  else{const v=yr(D(k),4)[s.pop];bv=isFinite(v)?Math.abs(v):NaN;}
  const [rf,ef]=CONF[s.conf];const den=tm-ee*ef;
  let n=isFinite(bv)&&isFinite(tm)&&den>0?Math.ceil(bv*rf/den):NaN;if(items&&isFinite(n))n=Math.min(n,items.length);
  const J_=isFinite(n)&&n>0?bv/n:NaN;let sel=null;
  if(items&&isFinite(J_)&&items.length){const u=JE[k].unit||1,r=RNG(s.seed),start=r()*J_;let cum=0,nx=start,i=0;sel=[];
    for(const it of items){const a=it.amt*u/1e6;const lo=cum;cum+=a;while(nx<cum&&i<n){if(!sel.length||sel[sel.length-1].it!==it)sel.push({it,pt:nx,big:a>=J_});nx+=J_;i++;}}}
  return{s,tm,ee,bv,n,J:J_,rf,ef,den,items,sel};}
function renderSample(){
  const box=document.getElementById("sample-card");if(!box||!keys().length)return;const k=ui.missionCo,co=state.cos[k],S=sampCalc(k),s=S.s,cu=esc(co.cur);
  box.innerHTML=`<div class="section-head"><h3>Échantillonnage par unités monétaires : ${esc(co.name)}</h3><span class="formula">n = valeur × facteur de confiance ÷ (erreur tolérable − erreur attendue × facteur d'expansion)</span></div>
  <p class="small">Chaque unité monétaire a la même chance d'être tirée : les montants élevés sont sélectionnés en priorité. Montants en millions (${cu}).</p>
  <div class="fields" style="margin-top:8px">
    <label>Population<select id="sp-pop">${JE[k]?`<option value="je">Écritures du grand livre importé</option>`:""}${SAMP_POP.map(([f,l])=>`<option value="${f}">${l} (${YL(4)})</option>`).join("")}</select></label>
    ${s.pop==="je"?`<label>Comptes commençant par<input type="text" id="sp-pre" value="${esc(s.prefix)}"></label>`:""}
    <label>Niveau de confiance<select id="sp-conf"><option value="90">90 %</option><option value="95">95 %</option><option value="99">99 %</option></select></label>
    <label>Erreur tolérable (M)<input type="text" id="sp-tm" inputmode="decimal" value="${fmt(S.tm,2)}"></label>
    <label>Erreur attendue (M)<input type="text" id="sp-ee" inputmode="decimal" value="${fmt(S.ee,2)}"></label>
  </div>
  <div class="mat-kpis"><div class="box"><div class="lab">Valeur de la population</div><div class="val">${fmt(S.bv,1)}</div><div class="small">${S.items?fmt(S.items.length)+" écritures":"M "+cu}</div></div>
    <div class="box"><div class="lab">Taille de l'échantillon</div><div class="val">${isFinite(S.n)?fmt(S.n):"n.d."}</div><div class="small">confiance ${s.conf} % (facteur ${fmt(S.rf,2)})</div></div>
    <div class="box"><div class="lab">Intervalle de sélection</div><div class="val">${fmt(S.J,2)}</div><div class="small">M ${cu}</div></div>
    ${S.sel?`<div class="box"><div class="lab">Éléments ≥ intervalle</div><div class="val">${fmt(S.sel.filter(x=>x.big).length)}</div><div class="small">tirés d'office</div></div>`:""}</div>
  ${S.den<=0?`<p class="msg err">L'erreur attendue est trop élevée par rapport à l'erreur tolérable : l'échantillonnage n'est pas adapté, il faut un contrôle exhaustif.</p>`:""}
  ${S.sel?`<div class="actions" style="margin-top:10px"><button class="btn small" id="sp-new">Nouveau tirage</button><button class="btn small" data-csv="sample">Échantillon en CSV</button></div>
    <div class="scroll" style="margin-top:8px;max-height:320px;overflow:auto"><table><thead><tr><th class="n">N°</th><th>Date</th><th>Compte</th><th>Libellé</th><th class="n">Montant</th><th class="n">Point tiré (M)</th></tr></thead><tbody>
    ${S.sel.map((x,i)=>`<tr><td class="n">${i+1}</td><td>${fmtD(x.it.d)}</td><td>${esc(x.it.acc)}</td><td>${esc(x.it.lib||"")}</td><td class="n">${fmt(x.it.amt,0)}${x.big?' <span class="pill crit">≥ intervalle</span>':""}</td><td class="n">${fmt(x.pt,3)}</td></tr>`).join("")}</tbody></table></div>`
  :`<p class="small" style="margin-top:8px">${s.pop==="je"?"Aucune écriture ne correspond à ce préfixe de compte.":"Pour tirer les éléments à contrôler, importez le grand livre dans Fraud Radar (ou générez le grand livre fictif), puis choisissez « Écritures du grand livre ». Sinon, appliquez l'intervalle à la balance détaillée fournie par le client."}</p>`}
  ${interp(isFinite(S.n)?`Pour couvrir ${fmt(S.bv,1)} M ${cu} avec une erreur tolérable de ${fmt(S.tm,2)} M, il faut contrôler ${fmt(S.n)} élément(s), soit un tirage tous les ${fmt(S.J,2)} M. Si les erreurs trouvées, extrapolées, dépassent l'erreur tolérable, le poste ne peut pas être accepté sans travaux supplémentaires.`:"Paramètres incomplets : renseignez l'erreur tolérable (par défaut le seuil de planification).")}`;
  const sv=()=>{saveCo(k);renderSample();};
  const pop=document.getElementById("sp-pop");pop.value=s.pop;pop.onchange=()=>{s.pop=pop.value;sv();};
  const cf=document.getElementById("sp-conf");cf.value=String(s.conf);cf.onchange=()=>{s.conf=+cf.value;sv();};
  document.getElementById("sp-tm").onchange=e=>{const v=parseNum(e.target.value);s.tm=isFinite(v)&&v>0?v:null;sv();};
  document.getElementById("sp-ee").onchange=e=>{const v=parseNum(e.target.value);s.ee=isFinite(v)&&v>=0?v:0;sv();};
  const pre=document.getElementById("sp-pre");if(pre)pre.onchange=()=>{s.prefix=pre.value.trim();sv();};
  const nw=document.getElementById("sp-new");if(nw)nw.onclick=()=>{s.seed=Math.floor(Math.random()*1e9)+1;sv();};
}

/* ---------- 5. CrashTest Monte-Carlo ---------- */
const MC={};
const MC_DIST=[["oil","Pétrole / matière première","normale, moyenne 0 %, écart-type 25 %"],["fx","Dollar","normale, 0 %, écart-type 8 %"],["demand","Demande","normale, baisse moyenne 2 %, écart-type 6 %"],["log","Fret maritime","normale, +3 %, écart-type 8 % (pas de baisse)"],["carbon","Taxe carbone","normale, 10 €/t, écart-type 25 (pas de baisse)"],["rate","Taux d'intérêt","normale, +25 pb, écart-type 75 pb"],["cost","Autres coûts","normale, +3 %, écart-type 4 %"],["oneoff","Charge exceptionnelle","10 % de chances, 1 à 5 % du CA"]];
function mcDraw(r,k,useAI){const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
  const s={oil:cl(25*gauss(r),-40,80),fx:cl(8*gauss(r),-20,30),demand:cl(2+6*gauss(r),-15,40),log:cl(3+8*gauss(r),0,30),carbon:cl(10+25*gauss(r),0,200),rate:cl(25+75*gauss(r),-100,400),cost:cl(3+4*gauss(r),-5,30),oneoff:r()<0.1?1+4*r():0};
  const sc=useAI&&state.cos[k].ai&&state.cos[k].ai.scenarios||[];const hit=[];
  sc.forEach((x,i)=>{const p=clamp((+x.probabilite||2)/10,0.05,0.5);if(r()<p){hit.push(i);Object.entries(x.impacts||{}).forEach(([f,v])=>{if(f in s&&isFinite(+v))s[f]+=+v;});}});
  return{s,hit};}
function mcRun(k,force){
  const N=state.mcN||1000,useAI=state.mcAI!==false,seed=state.mcSeed||2026;const b=yr(D(k),4);
  const sig=JSON.stringify([N,useAI,seed,b,state.cos[k].hyp,(state.cos[k].ai&&state.cos[k].ai.scenarios)||[],state.fcOn]);
  if(!force&&MC[k]&&MC[k].sig===sig)return MC[k];
  const r=RNG(seed+k.length*131);const Z=[],E=[],NT=[],CV=[],hits={};
  DMEMO={};DMEMO[k]=D(k);
  try{for(let i=0;i<N;i++){const {s,hit}=mcDraw(r,k,useAI);hit.forEach(h=>hits[h]=(hits[h]||0)+1);const st=withScen(s,()=>stress(k));Z.push(st.zs);E.push(st.ebit);NT.push(st.net);CV.push(st.cov);}}
  finally{DMEMO=null;}
  const q=(a,p)=>{const v=a.filter(isFinite).sort((x,y)=>x-y);return v.length?v[Math.min(v.length-1,Math.floor(p*v.length))]:NaN;};
  const fr=(a,f)=>a.filter(f).length/N;
  MC[k]={sig,N,Z,pDist:fr(Z,z=>z<1.23),pGrey:fr(Z,z=>z>=1.23&&z<2.9),pLoss:fr(NT,v=>v<0),pCov:fr(CV,v=>v<1.5),z5:q(Z,.05),z50:q(Z,.5),z95:q(Z,.95),e5:q(E,.05),e50:q(E,.5),hits,zb:altman(b)};
  return MC[k];}
function mcHist(M,c){const zs=M.Z.filter(isFinite).sort((a,b)=>a-b),W=300,H=130,lo=Math.floor(Math.min(0,zs[Math.floor(zs.length*.01)]||0,isFinite(M.zb)?M.zb:0)),hi=Math.ceil(Math.max(3.5,zs[Math.floor(zs.length*.99)]||0)),nb=24,bw=(hi-lo)/nb,cnt=Array(nb).fill(0);M.Z.forEach(z=>{if(!isFinite(z))return;const i=Math.max(0,Math.min(nb-1,Math.floor((z-lo)/bw)));cnt[i]++;});
  const mx=Math.max(1,...cnt),x0=8,pw=(W-16)/nb,sx=z=>x0+(z-lo)/(hi-lo)*(W-16),sy=v=>H-22-v/mx*(H-34);
  let s=`<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:460px;display:block;margin:0 auto" role="img" aria-label="Distribution du Z' simulé">`;
  cnt.forEach((v,i)=>{const z=lo+(i+.5)*bw,cz=z<1.23?"var(--crit, #b42318)":z<2.9?"var(--warn, #b7791f)":"var(--good, #1f7a4d)";s+=`<rect x="${x0+i*pw+1}" y="${sy(v)}" width="${pw-2}" height="${sy(0)-sy(v)}" fill="${cz}" fill-opacity=".7" rx="1.5"/>`;});
  [1.23,2.9].forEach(t=>{s+=`<line x1="${sx(t)}" x2="${sx(t)}" y1="8" y2="${H-22}" stroke="var(--ink)" stroke-dasharray="3 3"/><text x="${sx(t)+3}" y="16" font-size="9">${String(t).replace(".",",")}</text>`;});
  [...Array(hi-lo+1).keys()].map(i=>lo+i).filter((t,i,a)=>a.length<=9||t%2===0).forEach(t=>{s+=`<text x="${sx(t)}" y="${H-8}" font-size="9" text-anchor="middle">${t}</text>`;});
  if(isFinite(M.zb))s+=`<circle cx="${sx(Math.max(lo,Math.min(hi,M.zb)))}" cy="${H-22}" r="4" fill="${c}"/>`;
  return s+"</svg>";}
function renderMC(){
  const box=document.getElementById("mc-card");if(!box||!keys().length)return;
  const N=state.mcN||1000,useAI=state.mcAI!==false;
  const R=keys().map(k=>[k,mcRun(k)]);
  box.innerHTML=`<div class="section-head"><h3>CrashTest Monte-Carlo : ${fmt(N)} années ${YL(4)} simulées</h3>
    <div class="actions"><label class="small" style="display:inline-flex;gap:6px;align-items:center">Simulations<select id="mc-n"><option>500</option><option>1000</option><option>5000</option></select></label>
    <label class="small" style="display:inline-flex;gap:6px;align-items:center"><input type="checkbox" id="mc-ai" ${useAI?"checked":""}> Inclure les risques spécifiques de l'IA</label>
    <button class="btn small" id="mc-run">Relancer (nouveau tirage)</button><button class="btn small" data-csv="mc">Données CSV</button></div></div>
  <p class="small">Au lieu d'une seule crise, RiskScope tire au hasard tous les facteurs à la fois (pétrole, dollar, demande, fret, carbone, taux, coûts, charge exceptionnelle${useAI?", plus les risques spécifiques proposés par l'IA selon leur probabilité":""}) et recalcule les comptes ${YL(4)} à chaque tirage. Le curseur de crise actif n'est pas utilisé ici.</p>
  <div class="grid3" style="margin-top:10px">${R.map(([k,M])=>{const z=M.pDist>=.5?"crit":M.pDist>=.2||M.pGrey>=.5?"warn":"good";return `<div class="card co" style="--co:${col(k)}"><div class="co-head"><span class="co-name">${esc(state.cos[k].name)}</span>${pill(z,M.pDist<.2&&M.pGrey>=.5?`Zone grise : ${pct(M.pGrey,0)}`:`Détresse : ${pct(M.pDist,0)}`)}</div>
    ${mcHist(M,col(k))}
    <div class="row"><span>Probabilité de zone de détresse (Z' &lt; 1,23)</span><span class="num"><b>${pct(M.pDist,0)}</b></span></div>
    <div class="row"><span>Probabilité de zone grise</span><span class="num">${pct(M.pGrey,0)}</span></div>
    <div class="row"><span>Probabilité de perte nette</span><span class="num">${pct(M.pLoss,0)}</span></div>
    <div class="row"><span>Couverture des intérêts &lt; 1,5</span><span class="num">${pct(M.pCov,0)}</span></div>
    <div class="row"><span>Z' : pessimiste / médian / optimiste</span><span class="num">${fmt(M.z5,2)} / ${fmt(M.z50,2)} / ${fmt(M.z95,2)}</span></div>
    <div class="row"><span>Résultat d'exploitation dans 5 % des cas les pires</span><span class="num">${fmt(M.e5)}</span></div></div>`;}).join("")}</div>
  <details style="margin-top:8px"><summary class="small">Hypothèses de la simulation</summary><table style="margin-top:6px"><tbody>${MC_DIST.map(([,l,d])=>`<tr><td>${l}</td><td class="small">${d}</td></tr>`).join("")}${useAI?`<tr><td>Risques spécifiques (IA)</td><td class="small">chaque scénario survient avec une probabilité de 10 % à 50 % selon sa note de 1 à 5, et ajoute ses impacts</td></tr>`:""}</tbody></table><p class="small">Ordres de grandeur pédagogiques : ajustez les hypothèses de sensibilité de chaque société dans Données.</p></details>
  ${interp(R.map(([k,M])=>`${esc(state.cos[k].name)} passe en zone de détresse dans ${pct(M.pDist,0)} des ${YL(4)} simulées${M.pLoss>0.5?` et termine en perte dans ${pct(M.pLoss,0)} des cas`:""}`).join(" ; ")+". Une probabilité de détresse supérieure à 20 % est un indicateur de doute sur la continuité d'exploitation à documenter (voir Mission).")}`;
  const n=document.getElementById("mc-n");n.value=String(N);n.onchange=()=>{state.mcN=+n.value;save();renderMC();renderGC();};
  document.getElementById("mc-ai").onchange=e=>{state.mcAI=e.target.checked;save();renderMC();renderGC();};
  document.getElementById("mc-run").onclick=()=>{state.mcSeed=Math.floor(Math.random()*1e9)+1;save();renderMC();renderGC();};
}

/* ---------- 4. Continuité d'exploitation (ISA 570) ---------- */
const GC_MAN=["Perte d'un client, d'un fournisseur ou d'un marché majeur","Emprunts arrivant à échéance sans perspective de renouvellement, ou covenants non respectés","Litiges, amendes ou sanctions pouvant entraîner des montants importants","Départ de dirigeants clés sans remplacement","Dépendance à un soutien financier de l'actionnaire ou du groupe","Retards de paiement des dettes fiscales, sociales ou fournisseurs"];
function gcAuto(k){const d=RD(k),b=yr(d,4),p=yr(d,3),f=yr(D(k),4),st=withScen(ZERO,()=>stress(k)),M=mcRun(k);
  const z=altman(f),cov=f.interest>0?f.ebit/f.interest:Infinity,liq=f.cl?f.ca_cur/f.cl:NaN,gear=f.equity>0?f.ltd/f.equity:Infinity;
  return[
   ["Pertes nettes sur les deux derniers exercices publiés",b.net<0&&p.net<0,`${fmt(p.net)} puis ${fmt(b.net)}`],
   ["Capitaux propres négatifs ou en baisse de plus de 25 % sur un an",b.equity<=0||(p.equity>0&&b.equity/p.equity-1<-0.25),`${fmt(p.equity)} → ${fmt(b.equity)}`],
   ["Flux de trésorerie d'exploitation négatif",b.cfo<0,fmt(b.cfo)],
   [`Altman Z' en zone de détresse (${YL(4)})`,z<1.23,fmt(z,2)],
   ["Couverture des intérêts inférieure à 1,5",cov<1.5,isFinite(cov)?fmt(cov,1)+"×":"pas d'intérêts"],
   ["Liquidité générale inférieure à 1",liq<1,fmt(liq,2)],
   ["Endettement long terme supérieur aux capitaux propres",gear>1,isFinite(gear)?fmt(gear,2):"capitaux propres ≤ 0"],
   [`Probabilité de détresse Monte-Carlo supérieure à 20 %`,M.pDist>0.2,pct(M.pDist,0)]].map(([l,v,x])=>({l,v:!!v,x}));}
function gcEval(k){const m=state.cos[k].mission;m.gc=m.gc||[];const A=gcAuto(k),na=A.filter(x=>x.v).length,nm=GC_MAN.filter((_,i)=>m.gc[i]).length,tot=na+nm;
  const sev=A[0].v&&A[3].v;const lvl=tot>=5||(sev&&tot>=4)?3:tot>=2?2:1;return{A,na,nm,tot,lvl};}
const GC_C=["","Pas d'indice de doute significatif","Événements susceptibles de créer un doute : procédures complémentaires","Incertitude significative probable sur la continuité"];
function renderGC(){
  const box=document.getElementById("gc-card");if(!box||!keys().length)return;const k=ui.missionCo,co=state.cos[k],m=co.mission,G=gcEval(k);
  box.innerHTML=`<div class="section-head"><h3>Continuité d'exploitation (ISA 570) : ${esc(co.name)}</h3>${pill(["","good","warn","crit"][G.lvl],GC_C[G.lvl])}</div>
  <div class="grid2" style="margin-top:8px"><div><p class="small"><b>Indicateurs financiers</b> (calculés automatiquement)</p>
    ${G.A.map(x=>`<div class="row"><span>${x.v?"⚠️":"✓"} ${x.l}</span><span class="num">${x.x}</span></div>`).join("")}</div>
    <div><p class="small"><b>Indicateurs à vérifier</b> (entretiens, procès-verbaux, contrats)</p>
    ${GC_MAN.map((l,i)=>`<label class="row" style="cursor:pointer"><span><input type="checkbox" data-gc="${i}" ${m.gc[i]?"checked":""}> ${l}</span></label>`).join("")}</div></div>
  ${interp(`${G.tot} indicateur(s) sur ${G.A.length+GC_MAN.length} (${G.na} financier(s), ${G.nm} déclaré(s)). ${G.lvl===1?"Rien ne remet en cause l'hypothèse de continuité : documenter cette appréciation et rester attentif aux événements postérieurs.":G.lvl===2?"Procédures complémentaires (ISA 570.16) : obtenir les prévisions de trésorerie sur 12 mois, analyser les plans de la direction, confirmer les financements disponibles et revoir les événements postérieurs à la clôture.":"Si les mesures de la direction ne lèvent pas le doute : vérifier l'information en annexe et ajouter dans le rapport un paragraphe « Incertitude significative liée à la continuité d'exploitation » (ISA 570.22), voire une opinion modifiée si l'information est insuffisante."}`)}
  <div class="exp"><button class="btn small" data-csv="gc">Données CSV</button></div>`;
  box.querySelectorAll("[data-gc]").forEach(c=>c.onchange=()=>{m.gc[+c.dataset.gc]=c.checked;saveCo(k);renderGC();});
}

/* ---------- Exports CSV ---------- */
CSV.je=()=>{const k=wkCo("jeCo"),T=jeTests(k);if(!T)return[["Aucun grand livre importé"]];return[["Score","Date","Compte","Intitulé du compte","Libellé","Montant","Utilisateur","Pièce","Tests"],...T.flagged.map(x=>[x.s,fmtD(x.r.d),x.r.acc,x.r.accLib,x.r.lib,x.r.amt,x.r.user,x.r.piece,x.f.map(id=>JE_T.find(t=>t[0]===id)[1]).join(" ; ")])];};
CSV.sample=()=>{const k=ui.missionCo,S=sampCalc(k);return[["Population",S.s.pop==="je"?"Grand livre, comptes "+S.s.prefix:S.s.pop],["Valeur (M)",S.bv],["Confiance (%)",S.s.conf],["Erreur tolérable (M)",S.tm],["Erreur attendue (M)",S.ee],["Taille",S.n],["Intervalle (M)",S.J],[],["N°","Date","Compte","Libellé","Montant","Point tiré (M)"],...(S.sel||[]).map((x,i)=>[i+1,fmtD(x.it.d),x.it.acc,x.it.lib,x.it.amt,x.pt])];};
CSV.ra520=()=>{const k=ui.missionCo,{P}=raRows(k),RY=realYears(k),m=state.cos[k].mission;return[["Poste",RY[3],RY[4],"Variation","Variation %","Significative","Explication"],...P.map(x=>[x.l,x.a,x.b,x.dv,x.dp,x.sig?"oui":"non",(m.raExp||{})[x.f]||""])];};
CSV.gc=()=>{const k=ui.missionCo,G=gcEval(k),m=state.cos[k].mission;return[["Indicateur","Présent","Valeur"],...G.A.map(x=>[x.l,x.v?"oui":"non",x.x]),...GC_MAN.map((l,i)=>[l,m.gc[i]?"oui":"non",""]),[],["Conclusion",GC_C[G.lvl]]];};
CSV.mc=()=>[["Société","Simulations","P(détresse)","P(zone grise)","P(perte nette)","P(couverture<1,5)","Z' P5","Z' médian","Z' P95","EBIT P5"],...keys().map(k=>{const M=mcRun(k);return[state.cos[k].name,M.N,M.pDist,M.pGrey,M.pLoss,M.pCov,M.z5,M.z50,M.z95,M.e5];})];

/* ---------- Bibliothèque d'analyses (historique) ---------- */
const libKeys=()=>Object.keys(state.cos).sort((a,b)=>(state.cos[b].updatedAt||0)-(state.cos[a].updatedAt||0));
const ZERO={oil:0,fx:0,demand:0,log:0,carbon:0,rate:0,cost:0,oneoff:0};
EXAMPLE.braskem={name:"Braskem",country:"Brésil",cur:"MR$",data:{
  ca:[105625,96519,70569,77411,70717],cogs:[73568,85161,67548,71414,69161],sga:[4875,5246,4771,5093,5142],dep:[4178,4733,5206,4950,4673],
  ebit:[26043,4272,-2792,-1079,-1807],interest:[4903,5066,5589,6853,6802],net:[13962,-821,-4890,-12052,-10961],cfo:[14786,8952,-2272,2435,-4200],
  rec:[7154,3232,2910,3562,3455],inv:[16335,14030,12532,13688,10421],ca_cur:[39293,34457,37441,37037,30448],ppe:[37225,37763,38405,40417,37579],
  ta:[92564,88049,91741,101575,81879],cl:[25194,24186,24494,28272,40218],ltd:[45917,44836,50718,65231,45356],equity:[6204,6108,3279,-4278,-16502],re:[3484,1826,-2738,-14034,-23902]},
  hyp:{rawShare:.75,pass:.50,salesFx:.60,costFx:.80,co2:10,co2exp:.05,eur:6.3,debt:66128,float:.30,sea:.40,tax:.34}};
EXAMPLE.braskem.sector="Pétrochimie (PE, PP, PVC)";
EXAMPLE.braskem.env={eco:"Surcapacités chinoises et américaines en PE, PP et PVC : spreads au plus bas, usines sous-utilisées. EBITDA récurrent 2025 en baisse de 45 %, flux d'exploitation négatif.",reg:"Affaire de Maceió (Alagoas) : affaissement de sols lié à l'extraction de sel, coûts supérieurs à 7 Md R$, enquête de la CVM. Procédure de restructuration extrajudiciaire au Brésil (août 2026) et Chapter 15 aux États-Unis.",geo:"Naphta et éthane achetés en dollars, dette à 92 % en devises. Filiale mexicaine Braskem Idesa en Chapter 11 (août 2026). Contrôle partagé depuis juin 2026 entre IG4 Capital et Petrobras.",audit:"Continuité d'exploitation : incertitude significative signalée par l'auditeur (KPMG) sur les comptes 2025"};
EXAMPLE.braskem.src=["États financiers consolidés 2025 (comparatif 2024) publiés par Braskem ; formulaires 20-F 2022 et 2023 (SEC) pour 2021 à 2023.","Frais commerciaux et généraux = ventes et distribution + administration + R&D. Dettes long terme = emprunts et débentures non courants + emprunts non courants de Braskem Idesa. Réserves = réserves de profits (2021-2022), puis pertes accumulées. Résultat net total, y compris minoritaires. Montants en millions de reais (MR$)."];

/* ---------- Analyses préparées par l'équipe (démonstration, novembre 2026) ---------- */
const S_=(nom,description,probabilite,impacts)=>({nom,description,probabilite,impacts:{...ZERO,...impacts}});
const P_=(titre,detail,compte)=>({titre,detail,compte});
const PREP={
 snep:{fc:{g:.04,m:-.06,why:"Hypothèse de l'équipe : volumes soutenus par les droits antidumping et la montée en cadence des nouvelles unités, mais prix du PVC encore bas ; marge toujours négative."},
  hypJust:"Éthylène importé (environ 55 % du coût des ventes), achats en dollars, dette bancaire surtout à taux variable.",
  scenarios:[S_("Révision des droits antidumping","Baisse ou suppression des droits sur le PVC importé : retour des importations à bas prix.",2,{demand:12}),
   S_("Rupture d'approvisionnement en éthylène","Éthylène importé par voie maritime : retard ou surcoût logistique, arrêts de production.",3,{log:20,cost:6,demand:5}),
   S_("Hausse du prix de l'éthylène","Matière première alignée sur le pétrole et le marché mondial, faible capacité de répercussion.",3,{oil:30}),
   S_("Durcissement des conditions bancaires","Pertes répétées : crédits de trésorerie plus chers ou réduits.",3,{rate:150}),
   S_("Démarrage difficile des nouvelles unités PVC","Rendements inférieurs au plan : surcoûts et risque de dépréciation.",3,{cost:5,oneoff:2})],
  points:[P_("Continuité d'exploitation","Trois exercices de pertes (−56,8 ; −74,6 ; −192,5 MDH) et flux d'exploitation négatif en 2025 : obtenir les prévisions de trésorerie sur 12 mois et les lignes bancaires confirmées.","Ensemble des états"),
   P_("Dépréciation des nouvelles unités","572,5 MDH d'immobilisations nettes : test de valeur des unités mises en service, comparaison du plan d'affaires avec les réalisations 2025-2026.","Immobilisations"),
   P_("Valeur des stocks","Prix du PVC bas : vérifier que la valeur nette de réalisation des 202 MDH de stocks reste supérieure au coût.","Stocks"),
   P_("Recouvrement des créances","Créances de 317,7 MDH, soit environ 155 jours de chiffre d'affaires : circularisation, balance âgée, dépréciations.","Créances clients"),
   P_("Liquidité à court terme","Passif circulant (965 MDH) supérieur à l'actif circulant (625 MDH) : échéancier des dettes, respect des covenants.","Dettes")],
  raExp:{ca:"[Préparé, à confirmer] Hausse des volumes après la protection antidumping et la montée en cadence des nouvelles capacités ; analyse prix/volume à obtenir.",
   cogs:"[Préparé, à confirmer] Coûts en hausse plus vite que les ventes (+21 % contre +18 %) : sous-absorption des nouvelles unités et prix de l'éthylène.",
   dep:"[Préparé, à confirmer] Année pleine d'amortissement des unités mises en service.",
   ebit:"[Préparé, à confirmer] Effet ciseau prix/coûts et amortissements ; vérifier les dotations et reprises de provisions.",
   net:"[Préparé, à confirmer] Résultat d'exploitation dégradé et frais financiers en hausse.",
   cfo:"[Préparé, à confirmer] Perte d'exploitation non compensée par le besoin en fonds de roulement.",
   cl:"[Préparé, à confirmer] Financement par crédits de trésorerie et dettes fournisseurs : vérifier l'échéancier.",
   interest:"[Préparé, à confirmer] Hausse de l'endettement à court terme et des taux.",
   ltd:"[Préparé, à confirmer] Remboursement d'échéances d'emprunts.",
   re:"[Préparé, à confirmer] Report à nouveau de la perte 2024.",
   equity:"[Préparé, à confirmer] Effet de la perte de l'exercice."},
  gc:[false,false,false,false,false,false]},
 arkema:{fc:{g:.01,m:.05,why:"Hypothèse de l'équipe : demande atone en Europe et aux États-Unis, effet du plan d'économies et fin des charges exceptionnelles de 2025."},
  hypJust:"Un tiers des ventes en Amérique du Nord ; matières premières pétrochimiques ; 1,9 Mt de CO₂ dont la moitié sous quotas européens.",
  scenarios:[S_("Durcissement du dossier PFAS","Contentieux et dépollution autour de Pierre-Bénite (assignation de janvier 2026) : provisions supplémentaires.",3,{oneoff:2,cost:2}),
   S_("Dollar faible prolongé","Les ventes en dollars valent moins en euros.",3,{fx:-10}),
   S_("Énergie chère en Europe","Hausse du gaz et de l'électricité pour les sites européens.",3,{cost:6,oil:15}),
   S_("Prix du carbone en hausse","Renchérissement des quotas européens.",3,{carbon:40}),
   S_("Ralentissement automobile et construction","Baisse des volumes dans les adhésifs et les matériaux de performance.",3,{demand:6})],
  points:[P_("Provisions environnementales et litiges PFAS","Site de Pierre-Bénite (Seveso seuil haut) : exhaustivité et évaluation des provisions, information en annexe.","Provisions"),
   P_("Dépréciation des écarts d'acquisition","Acquisitions récentes dans les adhésifs et les matériaux (dont Ashland Performance Adhesives et PI Advanced Materials) : tests de valeur dans un contexte de demande faible.","Goodwill"),
   P_("Chute du résultat net","Résultat net de 63 M€ en 2025 contre 354 M€ : identifier les éléments non récurrents (dépréciations, restructurations).","Résultat"),
   P_("Change et couvertures","Un tiers des ventes en Amérique du Nord : comptabilité de couverture et effets de conversion.","Instruments financiers"),
   P_("Quotas de CO₂","Comptabilisation des quotas et des droits à restituer.","Provisions")],
  raExp:{ebit:"[Préparé, à confirmer] Baisse liée à la faiblesse de la demande, à l'effet change et à des charges non récurrentes.",
   net:"[Préparé, à confirmer] Recul du résultat d'exploitation et hausse des frais financiers.",
   interest:"[Préparé, à confirmer] Hausse du coût de la dette et du niveau d'endettement.",
   ppe:"[Préparé, à confirmer] Effet change et dépréciations, investissements ralentis.",
   inv:"[Préparé, à confirmer] Réduction des stocks (pilotage du besoin en fonds de roulement) et effet change.",
   cfo:"[Préparé, à confirmer] Baisse des résultats en partie compensée par le besoin en fonds de roulement.",
   equity:"[Préparé, à confirmer] Distribution de dividendes, écarts de conversion et faible résultat."},
  gc:[false,false,true,false,false,false]},
 dow:{fc:{g:-.02,m:.01,why:"Hypothèse de l'équipe : surcapacités persistantes, effet partiel des économies de coûts et des fermetures en Europe."},
  hypJust:"Éthane américain avantageux ; 60 % des ventes hors États-Unis et Canada ; dette surtout à taux fixe.",
  scenarios:[S_("Surcapacités asiatiques prolongées","Nouvelles capacités en Chine : prix du polyéthylène sous pression.",4,{demand:8}),
   S_("Tensions commerciales et droits de douane","Mesures de rétorsion sur les exportations américaines.",3,{demand:5,fx:5}),
   S_("Charges de restructuration supplémentaires","Nouvelles fermetures d'actifs en Europe.",3,{oneoff:2}),
   S_("Hausse du prix de l'éthane et du gaz","Réduction de l'avantage de coût américain.",2,{oil:25}),
   S_("Hausse des taux","Refinancement plus coûteux.",2,{rate:100})],
  points:[P_("Restructuration et dépréciations","Programme de 1,1 à 1,5 Md$ et fermeture de trois actifs européens : provisions, dépréciations et information.","Provisions / immobilisations"),
   P_("Perte de l'exercice 2025","Résultat net de −2 623 M$ : analyser les éléments non récurrents et la recouvrabilité des impôts différés.","Résultat"),
   P_("Coentreprises au Moyen-Orient","Sadara et EQUATE (mise en équivalence) : tests de valeur et quote-part de résultat.","Participations"),
   P_("Engagements de retraite","Hypothèses actuarielles sensibles aux taux.","Provisions"),
   P_("Liquidité et dividende","Dividende réduit de 50 % ; flux d'exploitation de 1 032 M$ : suivi de la trésorerie et des covenants.","Trésorerie")],
  raExp:{ca:"[Préparé, à confirmer] Prix de vente en baisse dans un marché en surcapacité.",
   ebit:"[Préparé, à confirmer] Effondrement des marges et charges de restructuration.",
   net:"[Préparé, à confirmer] Perte d'exploitation, charges de restructuration et effets fiscaux.",
   cfo:"[Préparé, à confirmer] Baisse des marges.",
   ltd:"[Préparé, à confirmer] Nouvelles émissions obligataires pour préserver la liquidité.",
   cl:"[Préparé, à confirmer] Baisse des dettes fournisseurs avec le recul de l'activité.",
   re:"[Préparé, à confirmer] Perte de l'exercice et dividendes versés."},
  gc:[false,false,false,false,false,false]},
 braskem:{fc:{g:-.05,m:-.03,why:"Hypothèse de l'équipe : spreads toujours bas, usines sous-utilisées, perturbations liées à la restructuration de la dette."},
  hypJust:"Naphta et éthane achetés en dollars (environ 75 % du coût des ventes) ; prix de vente indexés sur le dollar ; 10 Mt de CO₂ environ (ordre de grandeur).",
  scenarios:[S_("Échec de la restructuration extrajudiciaire","Rejet du plan par les créanciers, bascule en recuperação judicial : coûts juridiques, perte de clients et de fournisseurs.",3,{oneoff:5,rate:300,demand:5}),
   S_("Spreads durablement bas","Surcapacités chinoises en PE, PP et PVC.",4,{demand:10}),
   S_("Dépréciation du réal","Hausse du dollar : coûts et dette en devises renchéris.",3,{fx:15}),
   S_("Nouvelles provisions à Maceió","Indemnisations et travaux supplémentaires en Alagoas.",3,{oneoff:3}),
   S_("Hausse du naphta","Matière première alignée sur le pétrole.",3,{oil:25})],
  points:[P_("Continuité d'exploitation","Incertitude significative signalée par l'auditeur : capitaux propres de −16,5 Md R$, passif courant supérieur à l'actif courant de 9,8 Md R$. Analyser le plan de restructuration et son information en annexe.","Ensemble des états"),
   P_("Classement et restructuration des dettes","Défaut de Braskem Idesa et clauses de défaut croisé : reclassement en dettes courantes ; restructuration extrajudiciaire d'environ 10,9 Md US$.","Dettes financières"),
   P_("Impôts différés actifs","Dépréciation de 11,1 Md R$ en 2025 : vérifier que le solde restant est recouvrable.","Impôts différés"),
   P_("Dépréciation des actifs industriels","37,6 Md R$ d'immobilisations et filiale mexicaine en Chapter 11 : tests de valeur.","Immobilisations"),
   P_("Provisions Maceió","Coûts déjà supérieurs à 7 Md R$ et enquête de la CVM : exhaustivité des provisions et des passifs éventuels.","Provisions"),
   P_("Événements postérieurs et notations","Défaut noté par S&P (juin 2026) et Fitch (août 2026), changement de contrôle (IG4, Petrobras) : information sur les événements postérieurs.","Annexe")],
  raExp:{ca:"[Préparé, à confirmer] Prix de vente plus bas dans un marché en surcapacité.",
   inv:"[Préparé, à confirmer] Réduction des stocks pour préserver la trésorerie et baisse des prix.",
   cfo:"[Préparé, à confirmer] Pertes d'exploitation et frais financiers payés.",
   ca_cur:"[Préparé, à confirmer] Consommation de trésorerie et baisse des stocks.",
   ppe:"[Préparé, à confirmer] Dépréciations et effet change sur les actifs à l'étranger.",
   ta:"[Préparé, à confirmer] Dépréciation de 11,1 Md R$ des impôts différés actifs, baisse de la trésorerie et des stocks.",
   cl:"[Préparé, à confirmer] Reclassement en courant des dettes de Braskem Idesa (défaut croisé).",
   ltd:"[Préparé, à confirmer] Reclassement en courant des dettes de Braskem Idesa.",
   equity:"[Préparé, à confirmer] Perte de 11 Md R$ portant les capitaux propres à −16,5 Md R$.",
   re:"[Préparé, à confirmer] Perte de l'exercice imputée sur les pertes accumulées.",
   net:"[Préparé, à confirmer] Dépréciation des impôts différés et frais financiers."},
  gc:[false,true,true,false,true,false]}
};
const PREP_AT=Date.parse("2026-11-15T12:00:00Z");
function applyPrep(k){const c=state.cos[k];if(!c||!c.exampleOf)return;const p=PREP[c.exampleOf];if(!p)return;
  if(!c.ai)c.ai={year:CUR_YEAR,at:PREP_AT,src:"prep",scenarios:clone(p.scenarios),points:clone(p.points),prevision:{justification:p.fc.why},hypJust:p.hypJust};
  if(!c.fcUser&&(!c.fc||c.fc.src!=="ia"))c.fc={g:p.fc.g,m:p.fc.m,src:"prep",why:p.fc.why};
  c.mission=c.mission||defMission();c.mission.raExp=c.mission.raExp||{};
  Object.entries(p.raExp).forEach(([f,t])=>{if(!(c.mission.raExp[f]||"").trim())c.mission.raExp[f]=t;});
  if(!c.mission.gc||!c.mission.gc.length)c.mission.gc=p.gc.slice();
  const ex=EXAMPLE[c.exampleOf];if(ex&&ex.env){c.env=c.env||defEnv();Object.entries(ex.env).forEach(([f,t])=>{if(!c.env[f])c.env[f]=t;});}
  if(ex&&!c.src&&ex.src)c.src=ex.src;}
const DEMO=["snep","arkema","dow","braskem"];
function ensureDemo(){const ids=[];DEMO.forEach(x=>{const ex=EXAMPLE[x];let k=libKeys().find(q=>state.cos[q].exampleOf===x)||libKeys().find(q=>(state.cos[q].name||"").trim().toLowerCase()===ex.name.toLowerCase());
    if(!k){const c=clone(ex);k=addCo({...c,exampleOf:x,lastYear:2025,sector:c.sector||"Chimie"},false);}else if(!state.cos[k].exampleOf){state.cos[k].exampleOf=x;}
    applyPrep(k);ids.push(k);});return ids;}
function autoDemo(n=0){if(window.claude&&window.claude.use&&STOREX.mode!=="db"&&n<10){setTimeout(()=>autoDemo(n+1),800);return;}
  const ids=ensureDemo();if(!keys().length)openAnalyses(ids);else refreshAll();}
function coList(){const L=libKeys(),d=DEMO.map(x=>L.find(k=>state.cos[k].exampleOf===x)).filter(Boolean);return[...d,...L.filter(k=>!d.includes(k)).sort((a,b)=>(state.cos[a].name||"").localeCompare(state.cos[b].name||""))];}
function switchCo(dir){const L=coList();if(!L.length)return;const ks=keys();let i=ks.length===1?L.indexOf(ks[0]):-1;i=(i+dir+L.length)%L.length;if(ks.length!==1&&dir<0)i=L.length-1;openAnalyses([L[i]]);}
document.addEventListener("keydown",e=>{if(e.altKey||e.ctrlKey||e.metaKey)return;const t=e.target;if(t&&(/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||t.isContentEditable))return;const dk=document.getElementById("deck");if(dk&&dk.classList.contains("on"))return;if(document.querySelector("dialog[open]"))return;
  if(e.key==="ArrowRight"){switchCo(1);e.preventDefault();}else if(e.key==="ArrowLeft"){switchCo(-1);e.preventDefault();}});

const defEnv=()=>({eco:"",reg:"",geo:"",audit:""});
const STOREX={mode:"local",db:null,canWrite:null,me:null,unsub:null,loaded:false,localOnly:[],pend:{}};
function nextColor(){const used=libKeys().map(k=>state.cos[k].color);return PALETTE.find(c=>!used.includes(c))||PALETTE[libKeys().length%PALETTE.length];}

function openAnalyses(ids){state.order=ids.filter(k=>state.cos[k]);ui.planCo="all";ui.dataCo=state.order[0];ui.missionCo=state.order[0];save();refreshAll();}
function closeAnalyses(){state.order=[];save();refreshAll();}
function touch(k){const co=state.cos[k];if(co){co.updatedAt=Date.now();}}
function saveCo(k){touch(k);save();if(STOREX.mode==="db"&&STOREX.canWrite!==false&&state.cos[k]){clearTimeout(STOREX.pend[k]);STOREX.pend[k]=setTimeout(()=>writeCo(k),500);}}
async function writeCo(k){const co=state.cos[k];if(!co||!STOREX.db)return;try{await STOREX.db.doc("analyses/"+k).set({...JSON.parse(JSON.stringify(co)),updatedBy:STOREX.me||""});}catch(e){histMsg(e&&e.code==="quota_exceeded"?"L'historique partagé est plein : supprimez d'anciennes analyses.":e&&e.code==="invalid_argument"?"Vous n'avez pas le droit d'écrire dans l'historique partagé (accès Éditeur nécessaire).":"La sauvegarde partagée a échoué.",true);}}
async function deleteCo(k){delete state.cos[k];state.order=state.order.filter(x=>x!==k);save();if(STOREX.mode==="db"&&STOREX.db){try{await STOREX.db.doc("analyses/"+k).delete();}catch(e){histMsg("La suppression dans l'historique partagé a échoué.",true);}}refreshAll();}
function addCo(co,open){const k=co.id||("co"+Date.now().toString(36)+Math.random().toString(36).slice(2,5));delete co.id;
  state.cos[k]={color:nextColor(),createdAt:Date.now(),updatedAt:Date.now(),mission:defMission(),env:defEnv(),...co};
  if(STOREX.mode==="db")state.cos[k].createdBy=STOREX.me||"";
  saveCo(k);if(STOREX.mode==="db")writeCo(k);if(open)openAnalyses([k]);else refreshAll();return k;}
function loadExample(which){
  const ks=which==="all"?["snep","arkema","dow","braskem"]:[which];const ids=[];
  ks.forEach(x=>{const ex=clone(EXAMPLE[x]);const existing=libKeys().find(k=>state.cos[k].exampleOf===x);if(existing){ids.push(existing);return;}
    ids.push(addCo({...ex,exampleOf:x,lastYear:2025,sector:ex.sector||"Chimie"},false));});
  ids.forEach(applyPrep);openAnalyses(ids);histMsg(ks.length>1?"Exemples chargés et ouverts en comparaison.":"Exemple chargé et ouvert.");
}
function histMsg(t,err){const m=document.getElementById("hist-msg");if(!m)return;m.className="msg"+(err?" err":"");m.textContent=t;if(!err)setTimeout(()=>{if(m.textContent===t)m.textContent="";},5000);}

/* ---------- Rendu de l'historique ---------- */
let histSel=new Set(),histQ="";
function renderHistory(){
  const all=libKeys();histSel=new Set([...histSel].filter(k=>state.cos[k]));
  const rows=all.filter(k=>{const c=state.cos[k];return !histQ||(c.name+" "+(c.country||"")+" "+(c.sector||"")).toLowerCase().includes(histQ);});
  document.getElementById("hist-mode").innerHTML=STOREX.mode==="db"?`<span class="pill good">Historique partagé avec l'équipe</span>${STOREX.canWrite===false?' <span class="small">lecture seule</span>':""}`:`<span class="pill warn">Historique enregistré dans ce navigateur</span>`;
  const up=document.getElementById("hist-upload");up.hidden=!(STOREX.mode==="db"&&STOREX.localOnly.length&&STOREX.canWrite!==false);
  if(!up.hidden)up.textContent=`Envoyer mes ${STOREX.localOnly.length} analyse(s) locale(s) dans l'historique partagé`;
  const t=document.getElementById("hist-table");
  if(!all.length){t.innerHTML=`<tbody><tr><td class="small" style="padding:18px 8px">Aucune analyse pour l'instant. Cliquez sur « + Nouvelle analyse » ou chargez un exemple.</td></tr></tbody>`;}
  else t.innerHTML=`<thead><tr><th style="width:28px"><span class="sr">Sélection</span></th><th>Société</th><th>Pays</th><th class="n">Exercice</th><th>Note</th><th class="n">M-score</th><th class="n">Z'</th><th>Verdict</th><th>Mise à jour</th><th></th></tr></thead><tbody>${rows.map(k=>{const c=state.cos[k];
    let r,be,st;try{withNoFc(()=>withScen(ZERO,()=>{r=rating(k,false);be=beneish(D(k),4);st=stress(k);}));}catch(e){}
    const open=state.order.includes(k);
    return `<tr class="${open?"row-open":""}"><td><input type="checkbox" data-sel="${k}" ${histSel.has(k)?"checked":""} aria-label="Sélectionner ${esc(c.name)}"></td>
    <td><b style="color:${c.color}">${esc(c.name)}</b>${c.exampleOf?' <span class="tag">exemple</span>':""}${c.mode==="quick"?' <span class="tag">rapide</span>':""}${c.aiFilled?' <span class="tag">lu par l\'IA</span>':""}<div class="small">${esc(c.sector||"")}</div></td><td>${esc(c.country||"")}</td><td class="n">${esc(c.lastYear||"")}</td>
    <td>${r?`<b class="rating ${r.zone}" style="font-size:18px">${r.grade}</b>`:"–"}</td><td class="n">${be?fmt(be.M,2):"–"}</td><td class="n">${st?fmt(st.zb,2):"–"}</td><td>${st?pill(st.verdict,VERD[st.verdict]):""}</td>
    <td class="small">${c.updatedAt?new Date(c.updatedAt).toLocaleDateString("fr-FR"):""}</td>
    <td style="white-space:nowrap"><button class="btn small primary" data-openk="${k}">${open?"Ouverte":"Ouvrir"}</button> <button class="btn small" data-pdfk="${k}">PDF</button> <button class="btn small danger" data-delk="${k}" ${STOREX.mode==="db"&&STOREX.canWrite===false?"disabled":""}>Supprimer</button></td></tr>`;}).join("")}</tbody>`;
  const cmp=document.getElementById("hist-compare");cmp.disabled=histSel.size<2||histSel.size>4;cmp.textContent=`Comparer la sélection (${histSel.size})`;
  t.querySelectorAll("[data-sel]").forEach(c=>c.onchange=()=>{c.checked?histSel.add(c.dataset.sel):histSel.delete(c.dataset.sel);renderHistory();});
  t.querySelectorAll("[data-openk]").forEach(b=>b.onclick=()=>{openAnalyses([b.dataset.openk]);document.getElementById("open-section").scrollIntoView({behavior:"smooth"});});
  t.querySelectorAll("[data-pdfk]").forEach(b=>b.onclick=()=>downloadPdf([b.dataset.pdfk]));
  t.querySelectorAll("[data-delk]").forEach(b=>b.onclick=()=>{if(b.dataset.c!=="1"){b.dataset.c="1";b.textContent="Confirmer";setTimeout(()=>{if(b.isConnected){b.dataset.c="";b.textContent="Supprimer";}},4000);return;}deleteCo(b.dataset.delk);});
}
function renderOpenSection(){
  const ks=keys(),sec=document.getElementById("open-section");sec.hidden=!ks.length;
  const bar=document.getElementById("ctxbar");
  const L=coList().slice(0,8),one=ks.length===1?ks[0]:null;
  const sw=L.length?`<span class="small"><b>Société :</b></span><div class="seg coswitch" role="group" aria-label="Changer de société">${L.map(k=>`<button data-sw="${k}" aria-pressed="${k===one}" style="--co:${col(k)}">${esc(state.cos[k].name)}</button>`).join("")}${L.length>1?`<button data-sw="__all" aria-pressed="${ks.length>1}">Comparer ${L.length>4?"les 4 premières":"toutes"}</button>`:""}</div>`:"";
  const bindSw=()=>bar.querySelectorAll("[data-sw]").forEach(b=>b.onclick=()=>{const v=b.dataset.sw;openAnalyses(v==="__all"?L.slice(0,4):[v]);});
  if(!ks.length){bar.innerHTML=sw+` <span class="small">Aucune analyse ouverte.</span> <a href="#accueil" class="small">Choisir dans l'historique</a>`;bindSw();return;}
  bar.innerHTML=sw+` ${ks.length>1?`<span class="small">Comparaison :</span> ${ks.map(k=>`<span class="chip" style="--co:${col(k)}">${esc(state.cos[k].name)}</span>`).join(" ")}`:""} <span class="small">${isFc(4)?`exercices ${YEARS[0]}–${YEARS[3]} + prévision ${CUR_YEAR}`:`exercice ${YL(4)}`}</span> <label class="small" style="display:inline-flex;gap:4px;align-items:center"><input type="checkbox" id="fc-toggle" ${state.fcOn!==false?"checked":""}> Prévision ${CUR_YEAR}</label> <button class="btn small" id="ctx-close">Fermer</button>`;
  document.getElementById("fc-toggle").onchange=e=>{state.fcOn=e.target.checked;save();refreshAll();};
  document.getElementById("ctx-close").onclick=closeAnalyses;bindSw();
  const yrs=new Set(ks.map(k=>state.cos[k].lastYear||2025));
  document.getElementById("open-title").textContent=ks.length>1?`Comparaison : ${ks.map(k=>state.cos[k].name).join(", ")}`:`Analyse : ${state.cos[ks[0]].name}`;
  const part=ks.filter(k=>FIELDS.some(([f])=>[3,4].some(t=>state.cos[k].data[f][t]==null)));
  document.getElementById("open-warn").textContent=(part.length?`Analyse partielle (${part.map(k=>state.cos[k].name).join(", ")}) : certains postes manquent, les scores concernés sont marqués « non calculé ». Complétez-les dans l'onglet Données. `:"")+(yrs.size>1?`Attention : les sociétés comparées n'ont pas le même dernier exercice (${[...yrs].join(", ")}). Les graphiques utilisent les années de ${state.cos[ks[0]].name}.`:"");
}

/* ---------- Import Excel / CSV et modèle ---------- */
const norm=s=>String(s==null?"":s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\s+/g," ").trim();
async function downloadTemplate(){
  const m=document.getElementById("hist-msg");
  if(!window.XLSX){histMsg("Le module Excel ne s'est pas chargé : rechargez la page.",true);return;}
  const ly=2025;
  const aoa=[["RiskScope FIDEX5 - modèle d'import des états financiers"],[],["Nom de la société",""],["Pays",""],["Devise (MDH, M€ ou M$)","MDH"],["Secteur",""],["Dernier exercice",ly],[],["Poste (en millions)",ly-4,ly-3,ly-2,ly-1,ly],...FIELDS.map(f=>[f[1],"","","","",""]),[],["Aide : montants en millions de la devise, du plus ancien exercice (colonne B) au plus récent (colonne F). Charges en positif ; résultats négatifs avec un signe moins."]];
  const ws=XLSX.utils.aoa_to_sheet(aoa);ws["!cols"]=[{wch:42},{wch:13},{wch:13},{wch:13},{wch:13},{wch:13}];
  const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,"Etats financiers");
  const buf=XLSX.write(wb,{bookType:"xlsx",type:"array"});
  saveFile("RiskScope-modele-import.xlsx",new Blob([buf],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),m);
}
function parseRows(rows){
  const meta={};let hdr=-1;
  rows.forEach((r,i)=>{const a=norm(r[0]);if(!a)return;
    if(a.startsWith("nom de la societe")||a==="societe"||a==="nom")meta.name=String(r[1]||"").trim();
    else if(a.startsWith("pays"))meta.country=String(r[1]||"").trim();
    else if(a.startsWith("devise")){const v=norm(r[1]);meta.cur=/€|eur/.test(v)?"M€":/\$|usd|dollar/.test(v)?"M$":v?"MDH":undefined;}
    else if(a.startsWith("secteur"))meta.sector=String(r[1]||"").trim();
    else if(a.startsWith("dernier exercice")){const y=parseInt(r[1],10);if(y>1990&&y<2100)meta.lastYear=y;}
    else if(a.startsWith("poste")&&hdr<0){hdr=i;const y=parseInt(r[5],10);if(!meta.lastYear&&y>1990&&y<2100)meta.lastYear=y;}});
  const data={};let filled=0;
  const body=hdr>=0?rows.slice(hdr+1):rows;
  const labels=FIELDS.map(f=>norm(f[1]));
  let seq=0;
  body.forEach(r=>{if(!r||!r.length)return;const a=norm(r[0]);let idx=labels.indexOf(a);
    if(idx<0&&a&&isFinite(parseNum(r[0])))return;
    if(idx<0){idx=labels.findIndex(l=>a&&(l.startsWith(a)||a.startsWith(l.slice(0,12))));}
    if(idx<0&&hdr>=0&&seq<FIELDS.length&&a)idx=seq;
    if(idx<0||data[FIELDS[idx][0]])return;seq=idx+1;
    const vals=r.slice(1,6).map(v=>typeof v==="number"?v:parseNum(v));
    if(vals.some(v=>isFinite(v))){data[FIELDS[idx][0]]=vals;filled+=vals.filter(v=>isFinite(v)).length;}});
  return{meta,data,filled};
}
async function importFile(file){
  const msg=document.getElementById("nf-file-msg");msg.className="msg";msg.textContent="Lecture du fichier…";
  try{
    let rows;
    if(window.XLSX){const buf=await file.arrayBuffer();const wb=XLSX.read(buf,{type:"array"});const ws=wb.Sheets[wb.SheetNames[0]];rows=XLSX.utils.sheet_to_json(ws,{header:1,raw:true,defval:""});}
    else{const txt=await file.text();rows=txt.split(/\r?\n/).map(l=>l.split(/;|\t|,(?=\S)/));}
    const {meta,data,filled}=parseRows(rows);
    if(meta.name)document.getElementById("nf-name").value=meta.name;
    if(meta.country)document.getElementById("nf-country").value=meta.country;
    if(meta.cur)document.getElementById("nf-cur").value=meta.cur;
    if(meta.sector)document.getElementById("nf-sector").value=meta.sector;
    if(meta.lastYear){document.getElementById("nf-year").value=meta.lastYear;nfTable(true);}
    Object.entries(data).forEach(([k,vals])=>vals.forEach((v,t)=>{const el=document.getElementById(`nf-${k}-${t}`);if(el&&isFinite(v))el.value=v;}));
    msg.className="msg"+(filled?"":" err");
    msg.textContent=filled?`${filled} montants importés sur ${FIELDS.length*5}. Vérifiez le tableau avant de lancer l'analyse.`:"Aucun montant reconnu : utilisez le modèle Excel de RiskScope.";
  }catch(e){msg.className="msg err";msg.textContent="Fichier illisible : utilisez le modèle Excel (.xlsx) ou un fichier CSV.";}
}

/* ---------- Sauvegarde partagée ---------- */
async function setupStore(){
  if(!(window.claude&&window.claude.use))return;
  const [db,user]=await Promise.all([window.claude.use("db").catch(()=>null),window.claude.use("user").catch(()=>null)]);
  if(!db||!user)return;
  const me=await user.id();if(!me)return;
  STOREX.db=db;STOREX.me=me;STOREX.canWrite=await user.can("data.write");
  const localBefore=libKeys().map(k=>({k,co:clone(state.cos[k])}));
  STOREX.unsub=db.collection("analyses").onSnapshot(snap=>{
    const remote={};snap.docs.forEach(d=>{const v=d.data();if(v&&v.data&&v.hyp)remote[d.id]=v;});
    if(!STOREX.loaded&&!snap.metadata.fromCache){STOREX.loaded=true;STOREX.localOnly=localBefore.filter(x=>!remote[x.k]&&!Object.values(remote).some(r=>r.exampleOf&&r.exampleOf===x.co.exampleOf));}
    if(STOREX.mode!=="db"){STOREX.mode="db";STOREX.localBackup=clone(state.cos);}
    Object.keys(STOREX.pend).forEach(k=>{if(state.cos[k]&&remote[k])remote[k]=state.cos[k];});
    state.cos=remote;state.order=state.order.filter(k=>remote[k]);
    save();refreshAll();
  },()=>{histMsg("L'historique partagé est indisponible : les analyses restent dans ce navigateur.",true);});
}
async function uploadLocal(){
  const items=STOREX.localOnly;if(!items.length)return;
  for(const {k,co} of items){state.cos[k]=co;try{await STOREX.db.doc("analyses/"+k).set({...co,updatedBy:STOREX.me});}catch(e){histMsg("L'envoi a échoué.",true);return;}}
  STOREX.localOnly=[];histMsg("Analyses locales envoyées dans l'historique partagé.");refreshAll();
}

/* ---------- Environnement par société ---------- */
const ENV_F=[["eco","Économique"],["reg","Réglementaire"],["geo","Géopolitique"],["audit","Risque d'audit prioritaire"]];
function renderEnv(){
  const ks=keys(),box=document.getElementById("env-root");if(!box)return;
  if(!ks.length){box.innerHTML="";return;}
  box.innerHTML=`<div class="card scroll"><table><thead><tr><th></th>${ks.map(k=>`<th style="color:${col(k)}">${esc(state.cos[k].name)}${state.cos[k].country?` (${esc(state.cos[k].country)})`:""}</th>`).join("")}</tr></thead><tbody>${ENV_F.map(([f,l])=>`<tr><th>${l}</th>${ks.map(k=>{const v=(state.cos[k].env||{})[f];return `<td>${v?esc(v):'<span class="small">À compléter</span>'}</td>`;}).join("")}</tr>`).join("")}</tbody></table></div>
  ${ks.map(k=>{const e=state.cos[k].env||defEnv();return `<div class="card co" style="--co:${col(k)}"><div class="co-head"><span class="co-name">${esc(state.cos[k].name)}</span><span class="co-meta">${esc(state.cos[k].sector||"")}</span></div>
    <div class="env-grid">${ENV_F.map(([f,l])=>`<label for="env-${k}-${f}">${l}<textarea id="env-${k}-${f}" data-envk="${k}" data-envf="${f}" placeholder="${f==="audit"?"Ex. : continuité d'exploitation":"Faits, chiffres et sources"}">${esc(e[f]||"")}</textarea></label>`).join("")}</div>
    <div class="actions" style="margin-top:8px"><button class="btn small" data-envai="${k}">Rédiger un brouillon avec l'IA</button><span class="msg" id="env-msg-${k}" role="status"></span></div></div>`;}).join("")}`;
  box.querySelectorAll("[data-envk]").forEach(t=>t.onchange=()=>{const co=state.cos[t.dataset.envk];co.env=co.env||defEnv();co.env[t.dataset.envf]=t.value.trim();saveCo(t.dataset.envk);renderEnvTableOnly();});
  box.querySelectorAll("[data-envai]").forEach(b=>{b.hidden=!sampler;b.onclick=()=>envDraft(b.dataset.envai,b);});
}
function renderEnvTableOnly(){const y=window.scrollY;renderEnv();window.scrollTo(0,y);}
async function envDraft(k,b){
  const co=state.cos[k],m=document.getElementById("env-msg-"+k);if(!sampler)return;
  b.disabled=true;m.className="msg";m.textContent="Rédaction en cours…";
  const b4=yr(co.data,4);
  try{
    const r=await sampler.json(`Tu aides une équipe d'auditeurs (Master CCA). Rédige en français, pour la société « ${co.name} » (pays : ${co.country||"non précisé"}, secteur : ${co.sector||"non précisé"}, exercice ${co.lastYear||YEARS[4]}, chiffre d'affaires ${b4.ca} ${co.cur}, résultat net ${b4.net} ${co.cur}), une analyse courte de son environnement : économique, réglementaire, géopolitique, et le risque d'audit prioritaire qui en découle. 2 à 3 phrases par rubrique, factuelles ; si tu n'es pas sûr d'un fait récent, dis-le. Réponds uniquement avec un objet JSON : {"eco": string, "reg": string, "geo": string, "audit": string}.`,{modelTier:"default"});
    co.env=co.env||defEnv();ENV_F.forEach(([f])=>{if(r&&typeof r[f]==="string"&&!co.env[f])co.env[f]=r[f].trim();});
    saveCo(k);renderEnv();const m2=document.getElementById("env-msg-"+k);if(m2){m2.className="msg";m2.textContent="Brouillon ajouté dans les cases vides : vérifiez chaque fait avant de l'utiliser.";}
  }catch(e){m.className="msg err";m.textContent=e&&e.code==="not_granted"?"L'assistant n'est pas autorisé.":"La rédaction a échoué : réessayez.";b.disabled=false;}
}

/* ---------- États vides ---------- */
const NEED_OPEN=["radar","crashtest","ratios","mission","environnement","assistant","donnees"];
function applyEmpty(){
  const none=!keys().length;
  NEED_OPEN.forEach(id=>{const v=document.getElementById("view-"+id);if(!v)return;
    let e=v.querySelector(".empty-state");
    if(!e){e=document.createElement("div");e.className="card empty-state";e.innerHTML=`<h3>Aucune analyse ouverte</h3><p class="small">Ouvrez une analyse depuis l'historique de l'accueil, ou créez-en une nouvelle. Pour comparer plusieurs sociétés, cochez-les dans l'historique puis cliquez sur « Comparer la sélection ».</p><div class="actions"><a class="btn primary" href="#accueil">Aller à l'historique</a></div>`;v.insertBefore(e,v.children[1]||null);}
    e.hidden=!none;
    [...v.children].forEach((c,i)=>{if(i===0||c===e||c.classList.contains("guide")||c.classList.contains("keep"))return;c.classList.toggle("is-hidden",none);});
  });
}

function alertBar(t){const b=document.getElementById("ctxbar");const s=document.createElement("span");s.className="msg err";s.textContent=t;b.append(s);setTimeout(()=>s.remove(),5000);}
function refreshAll(){ensureState();setYears();renderHistory();renderOpenSection();renderPdfSelect();renderOverview();renderMatrix();renderPlan();renderRadar();renderStress();renderRatios();renderMission();renderEnv();renderData();renderFcCard();renderAIBits();renderJE();renderMC();applyEmpty();setTimeout(autoAI,0);}
document.getElementById("hist-template").onclick=()=>downloadTemplate();
document.getElementById("hist-load").onclick=()=>loadExample(document.getElementById("hist-example").value);
document.getElementById("hist-compare").onclick=()=>{openAnalyses([...histSel]);document.getElementById("open-section").scrollIntoView({behavior:"smooth"});};
document.getElementById("hist-search").oninput=e=>{histQ=e.target.value.trim().toLowerCase();renderHistory();};
document.getElementById("hist-export").onclick=()=>saveFile("FIDEX5-historique.csv",new Blob([toCsv(CSV.history())],{type:"text/csv"}),document.getElementById("hist-msg"));
document.getElementById("hist-upload").onclick=uploadLocal;
function route(){
  const tabs=["accueil","radar","crashtest","ratios","mission","environnement","equipe","assistant","donnees"];
  const h=location.hash.slice(1);const t=tabs.includes(h)?h:"accueil";
  tabs.forEach(x=>document.getElementById("view-"+x).classList.toggle("active",x===t));
  document.querySelectorAll("nav.tabs a").forEach(a=>{if(a.dataset.tab===t)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});
}
window.addEventListener("hashchange",route);
injectGuides();renderSliders();setupDataTools();refreshAll();route();setupAssistant();setupStore();setupTeam();setTimeout(autoDemo,window.claude&&window.claude.use?1800:50);
