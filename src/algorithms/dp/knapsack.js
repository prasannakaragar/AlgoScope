/**
 * Generates steps for 0/1 Knapsack DP.
 * @param {number[]} weights
 * @param {number[]} values
 * @param {number} capacity
 */
export function generateKnapsackSteps(weights, values, capacity) {
  const steps = []
  const n = weights.length
  if (n === 0 || capacity <= 0) return steps

  // Build 2D table: (n+1) rows x (capacity+1) cols
  const table = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0))

  // Row labels = items (0 = no item, 1..n = item index)
  steps.push({
    table: table.map((r) => [...r]),
    current: null,
    deps: [],
    description: `Init ${n + 1}×${capacity + 1} table. Rows = items (0..${n}), Cols = capacity (0..${capacity}).`,
    codeLine: 3,
    phase: 'init',
    rowLabels: ['∅', ...weights.map((w, i) => `Item${i + 1}(w=${w},v=${values[i]})`).slice(0, n)],
    colLabels: Array.from({ length: capacity + 1 }, (_, i) => i),
    weights,
    values,
    capacity,
  })

  for (let i = 1; i <= n; i++) {
    const w = weights[i - 1]
    const v = values[i - 1]

    for (let j = 0; j <= capacity; j++) {
      steps.push({
        table: table.map((r) => [...r]),
        current: [i, j],
        deps: [[i - 1, j]].concat(j >= w ? [[i - 1, j - w]] : []),
        description: `Item ${i} (weight=${w}, value=${v}), capacity=${j}: ${
          j < w
            ? `weight ${w} > capacity ${j}, skip → dp[${i}][${j}] = dp[${i - 1}][${j}] = ${table[i - 1][j]}`
            : `can include → max(dp[${i-1}][${j}]=${table[i-1][j]}, dp[${i-1}][${j-w}]+${v}=${table[i-1][j-w]+v})`
        }`,
        codeLine: j < w ? 8 : 10,
        phase: 'compute',
        rowLabels: ['∅', ...weights.map((w2, idx) => `Item${idx + 1}`)],
        colLabels: Array.from({ length: capacity + 1 }, (_, k) => k),
        weights,
        values,
        capacity,
      })

      table[i][j] =
        j < w ? table[i - 1][j] : Math.max(table[i - 1][j], table[i - 1][j - w] + v)

      steps.push({
        table: table.map((r) => [...r]),
        current: [i, j],
        deps: [],
        description: `dp[${i}][${j}] = ${table[i][j]} ✓`,
        codeLine: 10,
        phase: 'set',
        rowLabels: ['∅', ...weights.map((w2, idx) => `Item${idx + 1}`)],
        colLabels: Array.from({ length: capacity + 1 }, (_, k) => k),
        weights,
        values,
        capacity,
      })
    }
  }

  steps.push({
    table: table.map((r) => [...r]),
    current: [n, capacity],
    deps: [],
    description: `✅ Max value = dp[${n}][${capacity}] = ${table[n][capacity]}`,
    codeLine: 13,
    phase: 'done',
    rowLabels: ['∅', ...weights.map((w2, idx) => `Item${idx + 1}`)],
    colLabels: Array.from({ length: capacity + 1 }, (_, k) => k),
    weights,
    values,
    capacity,
  })

  return steps
}
