let resultats = [1,11,2,12]

console.log(resultats.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0))

