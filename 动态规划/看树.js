function lookTree(tree) {
  const canlook = []
  let level = 1
  let preSum = 0
  while (preSum < tree.length) {
    const size = 2 * level - 1
    for (let j = preSum + size - 1; j >= 0; j--) {
      if (tree[j]) {
        level += 1
        canlook.push(tree[j])
        break
      }
    }
    preSum = preSum + size
  }
  return canlook
}

console.log(lookTree([1, 2, 3, null, 5, null, 4]))