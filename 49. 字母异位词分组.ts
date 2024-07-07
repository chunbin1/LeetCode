// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

// 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

// 思路：排序，对比
function groupAnagrams(strs: string[]): string[][] {
  const keyMap = new Map<string,string[]>();
  strs.forEach((str) => {
    const key = str.split('').sort((a, b) => (a >= b ? 1 : -1)).join();
    const arr = keyMap.get(key)
    if(arr){
      arr.push(str)
    }else{
      keyMap.set(key,[str])
    }
  });
  return Array.from(keyMap.values())
}
