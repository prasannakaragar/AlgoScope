/**
 * Generates steps for Climbing Stairs DP (tabulation).
 * You can climb 1 or 2 steps at a time.
 * @param {number} n - number of stairs
 */
export function generateClimbingStairsSteps(n) {
  const steps = []
  if (n <= 0) return steps

  const table = new Array(n + 1).fill(null)

  steps.push({
    table: [...table],
    current: -1,
    deps: [],
    description: `Init dp[0..${n}]. dp[i] = number of distinct ways to climb i stairs.`,
    codeLine: 2,
    phase: 'init',
  })

  table[0] = 1
  steps.push({
    table: [...table],
    current: 0,
    deps: [],
    description: 'Base case: dp[0] = 1 (one way to stand at ground — do nothing)',
    codeLine: 4,
    phase: 'base',
  })

  if (n >= 1) {
    table[1] = 1
    steps.push({
      table: [...table],
      current: 1,
      deps: [],
      description: 'Base case: dp[1] = 1 (one way to climb 1 stair)',
      codeLine: 5,
      phase: 'base',
    })
  }

  for (let i = 2; i <= n; i++) {
    steps.push({
      table: [...table],
      current: i,
      deps: [i - 1, i - 2],
      description: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${table[i - 1]} + ${table[i - 2]} (come from stair ${i - 1} or stair ${i - 2})`,
      codeLine: 8,
      phase: 'compute',
    })

    table[i] = table[i - 1] + table[i - 2]

    steps.push({
      table: [...table],
      current: i,
      deps: [i - 1, i - 2],
      description: `dp[${i}] = ${table[i]} ✓`,
      codeLine: 8,
      phase: 'set',
    })
  }

  steps.push({
    table: [...table],
    current: n,
    deps: [],
    description: `✅ Done! There are ${table[n]} distinct ways to climb ${n} stairs.`,
    codeLine: 11,
    phase: 'done',
  })

  return steps
}
