/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
 var solution = function(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function(n) {
      let p1 =1,p2 = n
      while(p1<p2){
        const mid = Math.floor((p1 + p2) /2)
        if(isBadVersion(mid)){
          p2 = mid
        }else{
          p1 = mid + 1
        }
      }
      return p1
  };
};
