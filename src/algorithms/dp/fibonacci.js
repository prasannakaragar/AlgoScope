/**
 * Generates step-by-step animation frames for the Fibonacci DP algorithm (tabulation).
 * @param {number} n
 * @returns {Array} steps
 */
export function generateFibonacciSteps(n) {
  const steps = []
  if (n < 0) return steps

  const table = new Array(n + 1).fill(null)

  steps.push({
    table: [...table],
    current: -1,
    deps: [],
    description: `Initializing dp table with ${n + 1} cells. dp[i] will store the i-th Fibonacci number.`,
    codeLine: 2,
    phase: 'init',
  })

  table[0] = 0
  steps.push({
    table: [...table],
    current: 0,
    deps: [],
    description: 'Base case: dp[0] = 0 (the 0th Fibonacci number is 0)',
    codeLine: 4,
    phase: 'base',
  })

  if (n >= 1) {
    table[1] = 1
    steps.push({
      table: [...table],
      current: 1,
      deps: [],
      description: 'Base case: dp[1] = 1 (the 1st Fibonacci number is 1)',
      codeLine: 5,
      phase: 'base',
    })
  }

  for (let i = 2; i <= n; i++) {
    steps.push({
      table: [...table],
      current: i,
      deps: [i - 1, i - 2],
      description: `Computing dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${table[i - 1]} + ${table[i - 2]}`,
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
    description: `✅ Done! Fibonacci(${n}) = ${table[n]}`,
    codeLine: 11,
    phase: 'done',
  })

  return steps
}
