/* ALEX GUARD AI — إصلاح تقطّع الفيديو أثناء التحليل
   يُحمَّل بعد السكربت الرئيسي مباشرة: <script src="lag-fix.js"></script> */
(()=>{try{
/* 1) إزالة blur فوق الفيديو (يُعاد حسابه مع كل إطار فيديو) ونقل الملاحظة إلى شريط تحت الفيديو */
const st=document.createElement('style');
st.textContent='.analysis-notice{position:static!important;max-width:none!important;margin:0!important;border:0!important;border-top:1px solid var(--line)!important;border-radius:0!important;background:var(--navy)!important;color:var(--tx)!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;padding:9px 12px!important;font-size:12.5px;line-height:1.7;text-align:start!important}.stage{contain:layout paint}.stage video{transform:translateZ(0);backface-visibility:hidden}';
document.head.appendChild(st);
$('win').appendChild($('analysisNotice'));
V.disablePictureInPicture=true;V.disableRemotePlayback=true;

/* 2) إعادة الرسم فقط عند تغيّر شيء فعلاً (بدل مسح وإعادة رسم القناة كل 200ms) وعبر requestAnimationFrame */
const origDraw=draw;let raf=0,lastSig='';
draw=function(){
  if(raf)return;
  raf=requestAnimationFrame(()=>{raf=0;
    const t=V.currentTime,sig=[C.clientWidth,C.clientHeight,V.videoWidth,V.videoHeight,
      current.map(p=>p.id+':'+p.box.map(Math.round).join(',')).join('|'),
      trayGroups.map(g=>g.id+':'+g.eggCount+':'+g.box.map(Math.round).join(',')).join('|'),
      t>=3&&t<=7?1:0].join('#');
    if(sig===lastSig)return;lastSig=sig;origDraw(true);
  });
};

/* 3) تغيّر الحجم: تجاهل تغيّر الارتفاع فقط (شريط عنوان الهاتف) وتأجيل الحساب للإطار التالي */
{const f0=fitVideoFrame;let w0=innerWidth,tk=0;removeEventListener('resize',f0);
 addEventListener('resize',()=>{if(innerWidth===w0||tk)return;tk=requestAnimationFrame(()=>{tk=0;w0=innerWidth;f0()})})}

/* 4) التقاط اللقطة على canvas برمجي (CPU) لتفادي توقّف GPU عند قراءة الصورة */
const cc=document.createElement('canvas'),cx=cc.getContext('2d',{willReadFrequently:true});
analyzeFrame=async function(){
 if(!apiKey||busy||V.paused||V.ended||V.readyState<2||!V.videoWidth)return;
 busy=true;lastScan=performance.now();
 try{
   const capturedTime=V.currentTime,w=Math.min(128,V.videoWidth),h=Math.max(1,Math.round(w*V.videoHeight/V.videoWidth));
   cc.width=w;cc.height=h;cx.drawImage(V,0,0,w,h);
   const blob=await new Promise(r=>cc.toBlob(r,'image/jpeg',.20));
   if(!blob)throw Error('تعذّر تجهيز صورة الفحص');
   const url='https://detect.roboflow.com/'+MODEL+'?api_key='+encodeURIComponent(apiKey)+'&confidence='+Math.max(55,S.confidence)+'&overlap=25';
   const form=new FormData();form.append('file',blob,'frame.jpg');
   const res=await fetch(url,{method:'POST',body:form});
   if(!res.ok){let m='HTTP '+res.status;try{const q=await res.json();m=q.message||q.error||m}catch(e){}throw Error(m)}
   const out=await res.json(),raw=Array.isArray(out.predictions)?out.predictions:[];
   const p=raw.filter(q=>Number(q.confidence)>=.55&&q.width>0&&q.height>0&&(q.width*q.height)/(w*h)<.22&&q.width/w<.75&&q.height/h<.75);
   /* تحديث الواجهة بعد انتهاء مهمة الشبكة، في إطار رسم منفصل */
   requestAnimationFrame(()=>{
     updateTracks(p,capturedTime,V.videoWidth/w,V.videoHeight/h);
     notice(p.length?'رصد النموذج '+p.length+' احتمال شق بعد استبعاد المربعات الكبيرة المشبوهة.':'ماكو شق مؤكد بهاللقطة؛ هذا مو دليل أن كل البيض سليم.');
     status('آخر فحص '+fmt(capturedTime)+' · '+p.length+' رصد مقبول','st-run');
   });
 }catch(e){status('فشل فحص Roboflow','st-err');notice('تعذّر الفحص: '+(e.message||'تحقق من المفتاح والإنترنت')+' — الفيديو يستمر بالتشغيل.')}
 finally{busy=false}
};
}catch(e){console.warn('lag-fix.js لم يُطبَّق:',e)}})();
