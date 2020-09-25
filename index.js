const convert = (num) => {
  const nMap = {
    0: 'f',
    1: 'c',
    2: 'e',
    3: 2,
    4: 0,
    5: 1,
    6: 7
  }
  
  const arr = [];
  
  const dps = (n) => {
    const a = Math.floor(n / 7);
    const b = n % 7;
    arr.unshift(nMap[b])
    if(a === 0){
      return arr
    } else {
      dps(a)
    } 
  }
  
  dps(Math.abs(num))
  
  return num < 0 ? (-arr.join('')).toString() : arr.join('').toString();
}

console.log(convert(2017));