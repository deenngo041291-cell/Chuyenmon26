/* Hiệu ứng dùng chung: bay vút + chuyển cảnh + hạ cánh. Dùng cho index và 3 trang con. */
(function(){
var T={
'nghi-quyet':{url:'nghi-quyet.html',img:'anh-nghi-quyet.jpg',face:'be-co-vu.png',tab:'boat',fx:'wave',
 cap:'Giương buồm ra khơi… ⛵',hi:'Tới nơi rồi! Ra khơi ôn Nghị quyết nào ⛵',hov:'Ra khơi cùng mình nhé! ⛵'},
'chuyen-mon':{url:'chuyen-mon.html',img:'anh-chuyen-mon.jpg',face:'be-tu-hao.png',tab:'laptop',fx:'grid',
 cap:'Mở bản vẽ, vào việc thôi… 💻',hi:'Vào phòng thiết kế rồi, bắt tay vào việc thôi 📐',hov:'Cầm bản vẽ vào phòng thiết kế nào! 📐'},
'tai-lieu':{url:'tai-lieu-on-tap.html',img:'anh-tai-lieu.jpg',face:'be-thac-mac.png',tab:'lantern',fx:'petal',
 cap:'Bước vào thư viện… 🌻',hi:'Thư viện đây rồi, soi đèn hoa hướng dương ôn thôi 🌻',hov:'Cầm đèn hoa hướng dương vào thư viện! 🌻'}};
var p=location.pathname,KEY=p.indexOf('nghi-quyet')>-1?'nghi-quyet':p.indexOf('chuyen-mon')>-1?'chuyen-mon':p.indexOf('tai-lieu')>-1?'tai-lieu':'';
function night(){var h=new Date().getHours();return h>=22||h<5}
function hello(){var h=new Date().getHours();
 if(night())return 'Khuya rồi, ôn nốt chút rồi đi ngủ nhé 🌙 Chọn phần muốn ôn nào!';
 var g=h<11?'Chào buổi sáng ☀️':h<14?'Chào buổi trưa 🌤️':h<18?'Chào buổi chiều 🌇':'Chào buổi tối 🌙';
 return g+'! Mình là Sứ giả Mặt Trời. Hôm nay bạn muốn ôn phần nào?'}

var css='#sqs{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;visibility:hidden;opacity:0;pointer-events:none;background:radial-gradient(circle at 50% 40%,#4a3416,#0d0805);transition:opacity .6s ease;will-change:opacity}'
+'#sqs.on{visibility:visible;pointer-events:auto}#sqs.open{opacity:1}'
+'#sqs .pic{height:86vh;max-width:92vw;object-fit:contain;border-radius:20px;box-shadow:0 16px 40px rgba(0,0,0,.55);transform:scale(1.2);opacity:0;transition:transform 2s cubic-bezier(.2,.7,.2,1),opacity .7s .2s;will-change:transform,opacity}'
+'#sqs.open .pic{transform:none;opacity:1}'
+'#sqs .cap{position:absolute;left:0;right:0;bottom:5vh;text-align:center;font:800 clamp(1.3rem,4vw,2.2rem) system-ui,sans-serif;color:#fff;text-shadow:0 3px 14px #000;opacity:0;transform:translateY(14px);transition:opacity .6s .7s,transform .6s .7s}'
+'#sqs.open .cap{opacity:1;transform:none}#sqs .fx{position:absolute;inset:0;pointer-events:none;overflow:hidden}'
+'#sqf{position:fixed;z-index:2147483001;width:90px;left:0;top:0;display:none;pointer-events:none;will-change:transform;background:#fff;border-radius:28px;padding:6px;border:4px solid #ffd60a;box-shadow:0 10px 24px rgba(0,0,0,.4)}'
+'#sqf.go{display:block;animation:sqfly 1s cubic-bezier(.5,0,.8,.4) forwards}'
+'@keyframes sqfly{0%{transform:translate(var(--sx),var(--sy)) scale(1) rotate(0)}25%{transform:translate(var(--sx),calc(var(--sy) - 40px)) scale(1.2) rotate(-12deg)}100%{transform:translate(110vw,-30vh) scale(.3) rotate(40deg)}}'
+'.sq-go>*:not(#sqs):not(#sqf){visibility:hidden}'
+'.sq-ring{position:absolute;left:50%;top:70%;width:40vmin;height:40vmin;margin:-20vmin 0 0 -20vmin;border:3px solid rgba(180,235,255,.7);border-radius:50%;opacity:0;animation:sqring 2.4s ease-out var(--d) infinite}'
+'@keyframes sqring{0%{transform:scale(.1);opacity:.8}100%{transform:scale(2.4);opacity:0}}'
+'.sq-ln{position:absolute;left:0;right:0;top:var(--y);height:2px;background:rgba(160,210,255,.65);transform-origin:left;opacity:0;animation:sqln 1.6s ease-out var(--d) infinite}'
+'@keyframes sqln{0%{transform:scaleX(0);opacity:.9}100%{transform:scaleX(1);opacity:0}}'
+'.sq-sq{position:absolute;left:var(--x);top:var(--y);width:28px;height:28px;border:2px solid rgba(160,210,255,.8);opacity:0;animation:sqsq 2.6s ease-in-out var(--d) infinite}'
+'@keyframes sqsq{0%{transform:translateY(20px) rotate(0);opacity:0}30%{opacity:.9}100%{transform:translateY(-60px) rotate(90deg);opacity:0}}'
+'.sq-pt{position:absolute;top:-6vh;left:var(--x);width:14px;height:22px;background:#ffc300;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;animation:sqpt var(--s) linear var(--d) infinite}'
+'@keyframes sqpt{from{transform:translate(0,0) rotate(0)}to{transform:translate(60px,112vh) rotate(540deg)}}'
+'#sqL{transition:opacity .7s ease}#sqL.out{opacity:0}#sqL img{transition:transform .7s ease}#sqL.out img{transform:scale(.9)}'
+'.sq-boy{position:fixed;left:12px;bottom:14px;z-index:2147483002;display:flex;align-items:flex-end;gap:8px;max-width:min(92vw,420px);animation:sqland .9s cubic-bezier(.2,1.2,.4,1) both;transition:opacity .5s}'
+'.sq-boy.bye{opacity:0}.sq-boy img{width:76px;flex:none;background:#fff;border-radius:22px;padding:5px;border:3px solid #ffd60a;box-shadow:0 8px 20px rgba(0,0,0,.35)}'
+'.sq-boy div{background:#fff8dc;color:#4a2c0a;border:3px solid #ffd60a;border-radius:16px;padding:9px 13px;font:700 14px/1.35 system-ui,sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.25)}'
+'@keyframes sqland{from{transform:translate(70vw,-80vh) scale(.3) rotate(30deg);opacity:0}to{transform:none;opacity:1}}'
+'.sqhome{margin:0 0 10px}.sqhome a{display:inline-flex;align-items:center;gap:6px;font:700 14px system-ui,sans-serif;text-decoration:none;color:var(--ink,#4a2c0a);background:var(--card,#fff);border:2px solid var(--line,#f1d49a);border-radius:999px;padding:6px 14px;box-shadow:0 2px 0 var(--line,#f1d49a)}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

var sc,fl,busy=0;
function mk(){if(sc)return;sc=document.createElement('div');sc.id='sqs';sc.innerHTML='<img class="pic" alt=""><div class="fx"></div><div class="cap"></div>';
 fl=document.createElement('img');fl.id='sqf';fl.alt='';document.body.appendChild(sc);document.body.appendChild(fl)}
function fx(c,type){var h='',i,r=Math.random;
 if(type==='wave')for(i=0;i<4;i++)h+='<i class="sq-ring" style="--d:'+i*.6+'s"></i>';
 else if(type==='grid'){for(i=0;i<6;i++)h+='<i class="sq-ln" style="--y:'+(12+i*14)+'%;--d:'+i*.25+'s"></i>';
  for(i=0;i<8;i++)h+='<i class="sq-sq" style="--x:'+r()*92+'%;--y:'+(20+r()*60)+'%;--d:'+r()*2+'s"></i>'}
 else for(i=0;i<14;i++)h+='<i class="sq-pt" style="--x:'+r()*96+'%;--d:'+(-r()*3)+'s;--s:'+(2.4+r()*1.8)+'s"></i>';
 c.innerHTML=h}
function go(k,src,hide){var t=T[k];if(!t||busy)return;busy=1;mk();
 var r=src.getBoundingClientRect();
 fl.src=t.face;fl.style.setProperty('--sx',(r.left+r.width/2-45)+'px');fl.style.setProperty('--sy',(r.top+r.height/2-45)+'px');
 if(hide)src.style.visibility='hidden';
 sc.querySelector('.pic').src=t.img;sc.querySelector('.cap').textContent=t.cap;fx(sc.querySelector('.fx'),t.fx);
 fl.classList.add('go');
 try{sessionStorage.setItem('sq_from',JSON.stringify({k:k,t:Date.now()}))}catch(e){}
 var l=document.createElement('link');l.rel='prefetch';l.href=t.url;document.head.appendChild(l);
 setTimeout(function(){sc.classList.add('on');requestAnimationFrame(function(){requestAnimationFrame(function(){sc.classList.add('open')})})},400);
 setTimeout(function(){document.body.classList.add('sq-go')},1100);
 setTimeout(function(){location.href=t.url},2700)}

/* hạ cánh ở trang con */
function landing(){var L=document.getElementById('sqL');if(!L||!KEY)return;
 try{sessionStorage.removeItem('sq_from')}catch(e){}
 setTimeout(function(){L.classList.add('out');setTimeout(function(){L.remove()},800)},450);
 setTimeout(function(){var t=T[KEY],b=document.createElement('div');b.className='sq-boy';
  b.innerHTML='<img src="'+t.face+'" alt=""><div></div>';b.lastChild.textContent=night()?'Khuya rồi, ôn nốt chút rồi đi ngủ nhé 🌙':t.hi;
  document.body.appendChild(b);var c=function(){b.classList.add('bye');setTimeout(function(){b.remove()},500)};b.onclick=c;setTimeout(c,4200)},650)}

if(KEY){
 landing();
 document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('.swb');if(!a)return;
  e.preventDefault();e.stopImmediatePropagation();
  for(var k in T)if(T[k].tab===a.dataset.s&&k!==KEY)go(k,a,0)},true);
 if(!document.querySelector('.homeb')){var m=document.querySelector('main')||document.body,d=document.createElement('div');
  d.className='sqhome';d.innerHTML='<a href="./index.html">← 🏠 Trang chủ</a>';m.insertBefore(d,m.firstChild)}
}
addEventListener('pageshow',function(e){if(e.persisted&&sc&&sc.classList.contains('on'))location.reload()});
window.SQ={T:T,go:go,hello:hello};
})();
