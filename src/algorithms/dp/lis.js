/**
 * Generates steps for Longest Increasing Subsequence (LIS) DP.
 * @param {number[]} nums
 */
export function generateLISSteps(nums) {
  const steps = []
  const n = nums.length
  if (n === 0) return steps

  // dp[i] = length of LIS ending at index i
  const table = new Array(n).fill(1)

  steps.push({
    table: [...table],
    current: -1,
    deps: [],
    description: `Init dp table. dp[i] = length of LIS ending at nums[${0}..i]. All start at 1.`,
    codeLine: 2,
    phase: 'init',
    nums: [...nums],
  })

  let globalMax = 1

  for (let i = 0; i < n; i++) {
    steps.push({
      table: [...table],
      current: i,
      deps: [],
      description: `Checking all j < ${i} where nums[j] < nums[${i}]=${nums[i]}`,
      codeLine: 5,
      phase: 'compute',
      nums: [...nums],
    })

    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        steps.push({
          table: [...table],
          current: i,
          deps: [j],
          description: `nums[${j}]=${nums[j]} < nums[${i}]=${nums[i]} → dp[${i}] = max(dp[${i}]=${table[i]}, dp[${j}]+1=${table[j] + 1})`,
          codeLine: 7,
          phase: 'compare',
          nums: [...nums],
        })

        if (table[j] + 1 > table[i]) {
          table[i] = table[j] + 1
          globalMax = Math.max(globalMax, table[i])

          steps.push({
            table: [...table],
            current: i,
            deps: [j],
            description: `Updated dp[${i}] = ${table[i]} (LIS through ${j} → ${i})`,
            codeLine: 8,
            phase: 'set',
            nums: [...nums],
          })
        }
      }
    }

    steps.push({
      table: [...table],
      current: i,
      deps: [],
      description: `dp[${i}] finalized = ${table[i]} (LIS ending at nums[${i}]=${nums[i]})`,
      codeLine: 10,
      phase: 'finalized',
      nums: [...nums],
    })
  }

  steps.push({
    table: [...table],
    current: -1,
    deps: [],
    description: `✅ LIS length = ${Math.max(...table)}`,
    codeLine: 13,
    phase: 'done',
    nums: [...nums],
  })

  return steps
}
