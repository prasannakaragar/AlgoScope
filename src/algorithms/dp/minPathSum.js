/**
 * Generates steps for Minimum Path Sum Grid DP.
 * Find path from top-left to bottom-right with minimum sum (move right or down only).
 * @param {number[][]} grid
 */
export function generateMinPathSumSteps(grid) {
  const steps = []
  const m = grid.length
  if (m === 0) return steps
  const n = grid[0].length

  const table = Array.from({ length: m }, () => new Array(n).fill(0))
  const rowLabels = Array.from({ length: m }, (_, i) => `R${i}`)
  const colLabels = Array.from({ length: n }, (_, j) => `C${j}`)

  // Init base
  table[0][0] = grid[0][0]
  for (let j = 1; j < n; j++) table[0][j] = table[0][j - 1] + grid[0][j]
  for (let i = 1; i < m; i++) table[i][0] = table[i - 1][0] + grid[i][0]

  steps.push({
    table: table.map((r) => [...r]),
    current: null,
    deps: [],
    description: `Grid ${m}×${n}. dp[i][j] = min cost to reach (i,j) from (0,0).`,
    codeLine: 2,
    phase: 'init',
    grid: grid.map((r) => [...r]),
    rowLabels,
    colLabels,
  })

  steps.push({
    table: table.map((r) => [...r]),
    current: null,
    deps: [],
    description: 'Base: first row (can only come from left) and first column (can only come from top).',
    codeLine: 5,
    phase: 'base',
    grid: grid.map((r) => [...r]),
    rowLabels,
    colLabels,
  })

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      steps.push({
        table: table.map((r) => [...r]),
        current: [i, j],
        deps: [[i - 1, j], [i, j - 1]],
        description: `dp[${i}][${j}] = grid[${i}][${j}](=${grid[i][j]}) + min(dp[${i-1}][${j}]=${table[i-1][j]}, dp[${i}][${j-1}]=${table[i][j-1]}) = ${grid[i][j] + Math.min(table[i-1][j], table[i][j-1])}`,
        codeLine: 10,
        phase: 'compute',
        grid: grid.map((r) => [...r]),
        rowLabels,
        colLabels,
      })

      table[i][j] = grid[i][j] + Math.min(table[i - 1][j], table[i][j - 1])

      steps.push({
        table: table.map((r) => [...r]),
        current: [i, j],
        deps: [],
        description: `dp[${i}][${j}] = ${table[i][j]} ✓`,
        codeLine: 10,
        phase: 'set',
        grid: grid.map((r) => [...r]),
        rowLabels,
        colLabels,
      })
    }
  }

  steps.push({
    table: table.map((r) => [...r]),
    current: [m - 1, n - 1],
    deps: [],
    description: `✅ Minimum path sum = ${table[m - 1][n - 1]}`,
    codeLine: 13,
    phase: 'done',
    grid: grid.map((r) => [...r]),
    rowLabels,
    colLabels,
  })

  return steps
}
