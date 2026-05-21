/**
 * Generates steps for Edit Distance (Levenshtein) DP.
 * Minimum operations (insert, delete, replace) to convert s1 → s2.
 * @param {string} s1
 * @param {string} s2
 */
export function generateEditDistanceSteps(s1, s2) {
  const steps = []
  const m = s1.length
  const n = s2.length

  const table = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  const rowLabels = ['', ...s1.split('')]
  const colLabels = ['', ...s2.split('')]

  // Base cases
  for (let i = 0; i <= m; i++) table[i][0] = i
  for (let j = 0; j <= n; j++) table[0][j] = j

  steps.push({
    table: table.map((r) => [...r]),
    current: null,
    deps: [],
    description: `Edit Distance from "${s1}" → "${s2}". dp[i][j] = min ops to convert s1[0..i-1] to s2[0..j-1].`,
    codeLine: 2,
    phase: 'init',
    rowLabels,
    colLabels,
    s1,
    s2,
  })

  steps.push({
    table: table.map((r) => [...r]),
    current: null,
    deps: [],
    description: 'Base: dp[i][0] = i (delete i chars), dp[0][j] = j (insert j chars)',
    codeLine: 5,
    phase: 'base',
    rowLabels,
    colLabels,
    s1,
    s2,
  })

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const match = s1[i - 1] === s2[j - 1]

      steps.push({
        table: table.map((r) => [...r]),
        current: [i, j],
        deps: match ? [[i - 1, j - 1]] : [[i - 1, j - 1], [i - 1, j], [i, j - 1]],
        description: match
          ? `s1[${i-1}]='${s1[i-1]}' == s2[${j-1}]='${s2[j-1]}' → no op needed, dp[${i}][${j}] = dp[${i-1}][${j-1}] = ${table[i-1][j-1]}`
          : `s1[${i-1}]='${s1[i-1]}' ≠ s2[${j-1}]='${s2[j-1]}' → min(replace=${table[i-1][j-1]}, delete=${table[i-1][j]}, insert=${table[i][j-1]}) + 1`,
        codeLine: match ? 9 : 11,
        phase: 'compute',
        rowLabels,
        colLabels,
        s1,
        s2,
      })

      table[i][j] = match
        ? table[i - 1][j - 1]
        : 1 + Math.min(table[i - 1][j - 1], table[i - 1][j], table[i][j - 1])

      steps.push({
        table: table.map((r) => [...r]),
        current: [i, j],
        deps: [],
        description: `dp[${i}][${j}] = ${table[i][j]} ✓`,
        codeLine: match ? 9 : 11,
        phase: 'set',
        rowLabels,
        colLabels,
        s1,
        s2,
      })
    }
  }

  steps.push({
    table: table.map((r) => [...r]),
    current: [m, n],
    deps: [],
    description: `✅ Edit Distance = ${table[m][n]} operations to convert "${s1}" → "${s2}"`,
    codeLine: 14,
    phase: 'done',
    rowLabels,
    colLabels,
    s1,
    s2,
  })

  return steps
}
