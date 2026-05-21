/**
 * Generates steps for Longest Common Subsequence (LCS) DP.
 * @param {string} s1
 * @param {string} s2
 */
export function generateLCSSteps(s1, s2) {
  const steps = []
  const m = s1.length
  const n = s2.length
  if (m === 0 || n === 0) return steps

  // table[i][j] = LCS length of s1[0..i-1] and s2[0..j-1]
  const table = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))

  const rowLabels = ['', ...s1.split('')]
  const colLabels = ['', ...s2.split('')]

  steps.push({
    table: table.map((r) => [...r]),
    current: null,
    deps: [],
    description: `LCS of "${s1}" and "${s2}". dp[i][j] = LCS length of s1[0..i-1] and s2[0..j-1].`,
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
    description:
      'Base: first row and column are 0 (LCS with empty string is 0)',
    codeLine: 4,
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
        deps: match
          ? [[i - 1, j - 1]]
          : [
              [i - 1, j],
              [i, j - 1],
            ],
        description: match
          ? `s1[${i - 1}]='${s1[i - 1]}' == s2[${j - 1}]='${s2[j - 1]}' → MATCH! dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${table[i - 1][j - 1] + 1}`
          : `s1[${i - 1}]='${s1[i - 1]}' ≠ s2[${j - 1}]='${s2[j - 1]}' → dp[${i}][${j}] = max(dp[${i - 1}][${j}]=${table[i - 1][j]}, dp[${i}][${j - 1}]=${table[i][j - 1]})`,
        codeLine: match ? 8 : 10,
        phase: 'compute',
        rowLabels,
        colLabels,
        s1,
        s2,
      })

      table[i][j] = match
        ? table[i - 1][j - 1] + 1
        : Math.max(table[i - 1][j], table[i][j - 1])

      steps.push({
        table: table.map((r) => [...r]),
        current: [i, j],
        deps: [],
        description: `dp[${i}][${j}] = ${table[i][j]} ✓`,
        codeLine: match ? 8 : 10,
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
    description: `✅ LCS length = ${table[m][n]} (backtrack to find the actual subsequence)`,
    codeLine: 13,
    phase: 'done',
    rowLabels,
    colLabels,
    s1,
    s2,
  })

  return steps
}
