/**
 * @param {number} n
 * @return {number}
 */
 var getMaximumGenerated = function(n) {
    const ret = [0,1]
    if(n===0){
      return ret[0]
    }
    if(n===1){
      return ret[1]
    }
    let max = 1
    for(let i = 2;i<=n;i++ ){
      let isEven = false
      if(i%2===0){
        isEven = true
      }
      const r = isEven?ret[i/2] : ret[(i - 1)/2] + ret[(i-1)/2+1]
      max = Math.max(r,max)
      ret.push(r)
    }
    console.log(ret);
    return max
};