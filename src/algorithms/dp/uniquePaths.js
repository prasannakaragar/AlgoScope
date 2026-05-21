/**
 * Generates steps for Unique Paths Grid DP.
 * How many unique paths from top-left to bottom-right moving only right or down?
 * @param {number} m - rows
 * @param {number} n - cols
 */
export function generateUniquePathsSteps(m, n) {
  const steps = []
  if (m <= 0 || n <= 0) return steps

  const table = Array.from({ length: m }, () => new Array(n).fill(0))
  const rowLabels = Array.from({ length: m }, (_, i) => `Row ${i}`)
  const colLabels = Array.from({ length: n }, (_, j) => `Col ${j}`)

  // Base: first row and first col = 1
  for (let i = 0; i < m; i++) table[i][0] = 1
  for (let j = 0; j < n; j++) table[0][j] = 1

  steps.push({
    table: table.map((r) => [...r]),
    current: null,
    deps: [],
    description: `${m}×${n} grid. dp[i][j] = unique paths to reach cell (i,j) moving only right/down.`,
    codeLine: 2,
    phase: 'init',
    rowLabels,
    colLabels,
  })

  steps.push({
    table: table.map((r) => [...r]),
    current: null,
    deps: [],
    description:
      'Base: all cells in first row and first column = 1 (only one way to reach them).',
    codeLine: 5,
    phase: 'base',
    rowLabels,
    colLabels,
  })

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      steps.push({
        table: table.map((r) => [...r]),
        current: [i, j],
        deps: [
          [i - 1, j],
          [i, j - 1],
        ],
        description: `dp[${i}][${j}] = dp[${i - 1}][${j}] + dp[${i}][${j - 1}] = ${table[i - 1][j]} + ${table[i][j - 1]} (from top + from left)`,
        codeLine: 9,
        phase: 'compute',
        rowLabels,
        colLabels,
      })

      table[i][j] = table[i - 1][j] + table[i][j - 1]

      steps.push({
        table: table.map((r) => [...r]),
        current: [i, j],
        deps: [],
        description: `dp[${i}][${j}] = ${table[i][j]} ✓`,
        codeLine: 9,
        phase: 'set',
        rowLabels,
        colLabels,
      })
    }
  }

  steps.push({
    table: table.map((r) => [...r]),
    current: [m - 1, n - 1],
    deps: [],
    description: `✅ Unique paths from (0,0) to (${m - 1},${n - 1}) = ${table[m - 1][n - 1]}`,
    codeLine: 12,
    phase: 'done',
    rowLabels,
    colLabels,
  })

  return steps
}
