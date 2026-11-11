const small = ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'];
const tens = ['', '', '', 'treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
const hundreds = ['', 'ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];
export function toSpanish(n) {
  if (!Number.isInteger(n) || n < 0 || n > 3000) throw new RangeError('Choose an integer from 0 to 3000.');
  if (n < 30) return small[n];
  if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? ' y '+small[n%10] : '');
  if (n === 100) return 'cien';
  if (n < 1000) return hundreds[Math.floor(n/100)] + (n%100 ? ' '+toSpanish(n%100) : '');
  const thousands = Math.floor(n/1000);
  return (thousands === 1 ? 'mil' : small[thousands]+' mil') + (n%1000 ? ' '+toSpanish(n%1000) : '');
}
export function normalize(s) { return s.normalize('NFC').trim().toLocaleLowerCase('es').replace(/\s+/g,' '); }
export function grade(n, input) {
  const expected = toSpanish(n), actual = normalize(input);
  if (!actual) return {status:'empty',expected};
  if (actual === expected) return {status:'correct',expected};
  const plain = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  return {status:plain(actual)===plain(expected)?'accent':'incorrect',expected};
}
export function chooseNumber(min, max, previous, random=Math.random) {
  if (!Number.isInteger(min)||!Number.isInteger(max)||min<0||max>3000||min>max) throw new RangeError('Invalid range');
  const size=max-min+1;
  if(size===1) return min;
  if(previous>=min && previous<=max) { const pick=min+Math.floor(random()*(size-1)); return pick>=previous?pick+1:pick; }
  return min+Math.floor(random()*size);
}
