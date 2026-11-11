import {chooseNumber, grade} from './numbers.js';
const $ = id => document.getElementById(id);
const key = 'tres-mil-misses-v1';
let misses = new Set(), current, checked=false, reviewing=false, attempts=0, correct=0, streak=0;
try { const saved=JSON.parse(localStorage.getItem(key)||'[]'); if(Array.isArray(saved)) misses=new Set(saved.filter(n=>Number.isInteger(n)&&n>=0&&n<=3000)); } catch { $('storage-note').textContent='Saved misses could not be loaded. You can still practice this session.'; }
function persist(){try{localStorage.setItem(key,JSON.stringify([...misses]));}catch{$('storage-note').textContent='Browser storage is unavailable. Misses will only be kept for this session.';}}
function range(){return $('range').value.split(',').map(Number);}
function eligible(){const [min,max]=range();return [...misses].filter(n=>n>=min&&n<=max);}
function update(){ $('attempted').textContent=attempts; $('correct').textContent=correct; $('streak').textContent=streak; $('miss-count').textContent=eligible().length; $('review').disabled=!reviewing&&!eligible().length; $('review').textContent=reviewing?'Back to random':'Review misses'; $('mode-label').textContent=reviewing?'REVIEW MISSES':'RANDOM PRACTICE'; const [min,max]=range(); $('range-label').textContent=min.toLocaleString('en-US')+' — '+max.toLocaleString('en-US'); }
function next(){
  const pool=eligible();
  if(reviewing&&!pool.length) reviewing=false;
  const [min,max]=range();
  if(reviewing){const choices=pool.filter(n=>n!==current);const candidates=choices.length?choices:pool;current=candidates[Math.floor(Math.random()*candidates.length)];}
  else current=chooseNumber(min,max,current);
  checked=false; $('number').textContent=current.toLocaleString('en-US'); $('answer').value='';$('answer').readOnly=false; $('feedback').textContent='';$('feedback').className='feedback'; $('submit').innerHTML='Check answer <span aria-hidden="true">→</span>'; update(); $('answer').focus();
}
$('answer-form').addEventListener('submit',event=>{
  event.preventDefault(); if(checked){next();return;}
  const result=grade(current,$('answer').value); if(result.status==='empty'){ $('feedback').textContent='Write your answer in Spanish first.'; return; }
  checked=true; attempts++; $('answer').readOnly=true;
  if(result.status==='correct'){correct++;streak++;misses.delete(current);$('feedback').className='feedback correct';$('feedback').textContent='¡Correcto! '+result.expected+'.'+(reviewing&&!eligible().length?' All misses in this range are cleared.':'');}
  else {streak=0;misses.add(current);$('feedback').className='feedback '+result.status;$('feedback').textContent=(result.status==='accent'?'The number is right; check the accent: ':'Not quite. The correct spelling is: ')+result.expected+'. Saved for another try.';}
  persist();update(); $('submit').innerHTML='Next number <span aria-hidden="true">→</span>';
});
$('range').addEventListener('change',()=>{reviewing=false;next();});
$('review').addEventListener('click',()=>{reviewing=!reviewing;next();});
$('clear').addEventListener('click',()=>{if(!misses.size)return;if(confirm('Clear all saved missed numbers? Your vocabulary deck is separate.')){misses.clear();persist();if(reviewing){reviewing=false;next();}update();}});
for(const button of document.querySelectorAll('[data-accent]')) button.addEventListener('click',()=>{if(checked)return; const input=$('answer');input.setRangeText(button.dataset.accent,input.selectionStart,input.selectionEnd,'end');input.focus();});
next();
