import {test} from 'node:test';
import assert from 'node:assert/strict';
import {toSpanish,grade,chooseNumber} from './dist/numbers.js';
test('spells boundary values, irregular hundreds and accent-sensitive forms',()=>{
 const examples={0:'cero',16:'dieciséis',21:'veintiuno',22:'veintidós',23:'veintitrés',26:'veintiséis',29:'veintinueve',30:'treinta',31:'treinta y uno',99:'noventa y nueve',100:'cien',101:'ciento uno',105:'ciento cinco',135:'ciento treinta y cinco',200:'doscientos',500:'quinientos',600:'seiscientos',700:'setecientos',900:'novecientos',999:'novecientos noventa y nueve',1000:'mil',1001:'mil uno',1022:'mil veintidós',1100:'mil cien',1500:'mil quinientos',2000:'dos mil',2026:'dos mil veintiséis',2100:'dos mil cien',2999:'dos mil novecientos noventa y nueve',3000:'tres mil'};
 for(const [n,s] of Object.entries(examples))assert.equal(toSpanish(+n),s);
});
test('all 3,001 generated answers are nonempty, unique and grade correctly',()=>{
 const seen=new Set();for(let n=0;n<=3000;n++){const text=toSpanish(n);assert.ok(text);assert.ok(!seen.has(text));seen.add(text);assert.equal(grade(n,text).status,'correct');assert.ok(!/undefined|  /.test(text));}
 for(const n of [-1,3001,1.5,NaN])assert.throws(()=>toSpanish(n),RangeError);
});
test('grading accepts case and whitespace but distinguishes accents and wrong number forms',()=>{
 assert.equal(grade(135,'  CIENTO   treinta Y cinco ').status,'correct');
 assert.equal(grade(22,'veintido\u0301s').status,'correct');
 assert.equal(grade(22,'veintidos').status,'accent');
 assert.equal(grade(105,'ciento y cinco').status,'incorrect');
 assert.equal(grade(100,'ciento').status,'incorrect');
 assert.equal(grade(1000,'un mil').status,'incorrect');
 assert.equal(grade(21,'veintiún').status,'incorrect');
 assert.equal(grade(105,'105').status,'incorrect');
 assert.equal(grade(105,' ').status,'empty');
});
test('random choice includes endpoints, respects ranges and avoids immediate repeats',()=>{
 assert.equal(chooseNumber(0,3000,undefined,()=>0),0);assert.equal(chooseNumber(0,3000,undefined,()=>.999999),3000);
 for(let prev=0;prev<=3000;prev++)for(const sample of [0,.5,.999999]){const n=chooseNumber(0,3000,prev,()=>sample);assert.notEqual(n,prev);assert.ok(n>=0&&n<=3000);}
 assert.equal(chooseNumber(5,5,5),5);assert.throws(()=>chooseNumber(100,99),RangeError);
});
