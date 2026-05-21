/**
 * Generates steps for Subset Sum DP.
 * Can we pick a subset of nums that sums to target?
 * @param {number[]} nums
 * @param {number} target
 */
export function generateSubsetSumSteps(nums, target) {
  const steps = []
  const n = nums.length
  if (target < 0) return steps
  if (target === 0) {
    steps.push({
      table: [[true]],
      current: null,
      deps: [],
      description: 'Target is 0 — the empty subset always sums to 0. ✅',
      codeLine: 5,
      phase: 'done',
      rowLabels: ['∅'],
      colLabels: [0],
      nums,
      target,
    })
    return steps
  }
  if (n === 0) return steps
  const table = Array.from({ length: n + 1 }, () =>
    new Array(target + 1).fill(false)
  )

  // Base: sum=0 is always achievable
  for (let i = 0; i <= n; i++) table[i][0] = true

  steps.push({
    table: table.map((r) => [...r]),
    current: null,
    deps: [],
    description: `Init ${n + 1}×${target + 1} boolean table. dp[i][j] = can we form sum ${target} using first i numbers.`,
    codeLine: 3,
    phase: 'init',
    rowLabels: ['∅', ...nums.map((v) => `+${v}`)],
    colLabels: Array.from({ length: target + 1 }, (_, i) => i),
    nums,
    target,
  })

  steps.push({
    table: table.map((r) => [...r]),
    current: null,
    deps: [],
    description:
      'Base: dp[i][0] = true for all i (empty subset always sums to 0)',
    codeLine: 5,
    phase: 'base',
    rowLabels: ['∅', ...nums.map((v) => `+${v}`)],
    colLabels: Array.from({ length: target + 1 }, (_, i) => i),
    nums,
    target,
  })

  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1]
    for (let j = 1; j <= target; j++) {
      steps.push({
        table: table.map((r) => [...r]),
        current: [i, j],
        deps: [[i - 1, j]].concat(j >= num ? [[i - 1, j - num]] : []),
        description: `num=${num}, sum=${j}: ${
          j < num
            ? `num(${num}) > sum(${j}), exclude → dp[${i}][${j}] = dp[${i - 1}][${j}]`
            : `exclude(dp[${i - 1}][${j}]=${table[i - 1][j]}) OR include(dp[${i - 1}][${j - num}]=${table[i - 1][j - num]})`
        }`,
        codeLine: j < num ? 9 : 10,
        phase: 'compute',
        rowLabels: ['∅', ...nums.map((v) => `+${v}`)],
        colLabels: Array.from({ length: target + 1 }, (_, k) => k),
        nums,
        target,
      })

      table[i][j] =
        j < num ? table[i - 1][j] : table[i - 1][j] || table[i - 1][j - num]

      steps.push({
        table: table.map((r) => [...r]),
        current: [i, j],
        deps: [],
        description: `dp[${i}][${j}] = ${table[i][j]} ✓`,
        codeLine: 10,
        phase: 'set',
        rowLabels: ['∅', ...nums.map((v) => `+${v}`)],
        colLabels: Array.from({ length: target + 1 }, (_, k) => k),
        nums,
        target,
      })
    }
  }

  steps.push({
    table: table.map((r) => [...r]),
    current: [n, target],
    deps: [],
    description: `✅ Subset summing to ${target}: ${table[n][target] ? 'EXISTS ✓' : 'NOT FOUND ✗'}`,
    codeLine: 13,
    phase: 'done',
    rowLabels: ['∅', ...nums.map((v) => `+${v}`)],
    colLabels: Array.from({ length: target + 1 }, (_, k) => k),
    nums,
    target,
  })

  return steps
}
