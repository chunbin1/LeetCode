// https://leetcode-cn.com/problems/merge-k-sorted-lists/
// 思路：
// 1. 使用n空间记录每一个值{1:[p1,p2,p3]}对应的指针
// 2. 把所有值进行排序，然后使用链表连起来
// O(n)空间复杂度和O(2n)时间复杂度

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 var mergeKLists = function(lists) {
  const valueMap = {}

  function visitNode(tP,valueMap){
    if(valueMap[tP.value]){
      valueMap[tP.value].push(tP)
    }else{
      valueMap[tP.value] =  [tP]
    }
  }
  // 遍历二维数组
  for(let i = 0;i<lists.length;i++){
    let p = lists
    do {
      visitNode(p,valueMap)
      if(p.next){
        p = p.next
      }
    } while (p.next);
  }
  
  // 排序
  const sortMapKey = Object.keys(valueMap).sort((a,b)=>(a-b))

  let head,p;
  sortMapKey.forEach((val,idx) => {
    valueMap[val].forEach((node) => {
      if(head){
        p.next =  node
        p = p.next
      }
      else{
        head = p = node
      }
    })
  })

  return head
};
