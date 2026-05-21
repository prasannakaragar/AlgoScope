/**
 * Generates steps for House Robber DP.
 * Rob non-adjacent houses to maximize total.
 * @param {number[]} nums - house values
 */
export function generateHouseRobberSteps(nums) {
  const steps = []
  const n = nums.length
  if (n === 0) return steps

  const table = new Array(n).fill(null)

  steps.push({
    table: [...table],
    current: -1,
    deps: [],
    description: `Houses: [${nums.join(', ')}]. dp[i] = max money robbing up to house i.`,
    codeLine: 2,
    phase: 'init',
    nums: [...nums],
  })

  table[0] = nums[0]
  steps.push({
    table: [...table],
    current: 0,
    deps: [],
    description: `Base: dp[0] = nums[0] = ${nums[0]} (only one house, rob it)`,
    codeLine: 5,
    phase: 'base',
    nums: [...nums],
  })

  if (n >= 2) {
    table[1] = Math.max(nums[0], nums[1])
    steps.push({
      table: [...table],
      current: 1,
      deps: [0],
      description: `Base: dp[1] = max(nums[0], nums[1]) = max(${nums[0]}, ${nums[1]}) = ${table[1]}`,
      codeLine: 6,
      phase: 'base',
      nums: [...nums],
    })
  }

  for (let i = 2; i < n; i++) {
    steps.push({
      table: [...table],
      current: i,
      deps: [i - 1, i - 2],
      description: `dp[${i}] = max(dp[${i - 1}], dp[${i - 2}] + nums[${i}]) = max(${table[i - 1]}, ${table[i - 2]} + ${nums[i]})`,
      codeLine: 9,
      phase: 'compute',
      nums: [...nums],
    })

    table[i] = Math.max(table[i - 1], table[i - 2] + nums[i])

    steps.push({
      table: [...table],
      current: i,
      deps: [i - 1, i - 2],
      description: `dp[${i}] = ${table[i]} ✓ (skip house ${i} and keep ${table[i - 1]}, or rob it for ${table[i - 2] + nums[i]})`,
      codeLine: 9,
      phase: 'set',
      nums: [...nums],
    })
  }

  steps.push({
    table: [...table],
    current: n - 1,
    deps: [],
    description: `✅ Done! Max money = dp[${n - 1}] = ${table[n - 1]}`,
    codeLine: 12,
    phase: 'done',
    nums: [...nums],
  })

  return steps
}
