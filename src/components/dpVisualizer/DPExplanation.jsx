import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const stateDefinitions = {
  fibonacci: {
    state: 'dp[i]',
    meaning: 'The i-th Fibonacci number',
    formula: 'dp[i] = dp[i-1] + dp[i-2]',
    base: 'dp[0] = 0, dp[1] = 1',
  },
  climbingStairs: {
    state: 'dp[i]',
    meaning: 'Number of distinct ways to climb i stairs',
    formula: 'dp[i] = dp[i-1] + dp[i-2]',
    base: 'dp[0] = 1, dp[1] = 1',
  },
  houseRobber: {
    state: 'dp[i]',
    meaning: 'Maximum money robbing houses 0..i',
    formula: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
    base: 'dp[0] = nums[0], dp[1] = max(nums[0], nums[1])',
  },
  knapsack: {
    state: 'dp[i][j]',
    meaning: 'Max value using first i items with capacity j',
    formula: 'dp[i][j] = max(dp[i-1][j], dp[i-1][j-w] + v)',
    base: 'dp[0][j] = 0, dp[i][0] = 0',
  },
  subsetSum: {
    state: 'dp[i][j]',
    meaning: 'Can we form sum j using first i numbers?',
    formula: 'dp[i][j] = dp[i-1][j] OR dp[i-1][j-num]',
    base: 'dp[i][0] = true',
  },
  lcs: {
    state: 'dp[i][j]',
    meaning: 'LCS length of s1[0..i-1] and s2[0..j-1]',
    formula: 'if match: dp[i-1][j-1]+1, else: max(dp[i-1][j], dp[i][j-1])',
    base: 'dp[0][j] = 0, dp[i][0] = 0',
  },
  editDistance: {
    state: 'dp[i][j]',
    meaning: 'Min edits to convert s1[0..i-1] to s2[0..j-1]',
    formula: 'if match: dp[i-1][j-1], else: 1 + min(replace, delete, insert)',
    base: 'dp[i][0] = i, dp[0][j] = j',
  },
  lis: {
    state: 'dp[i]',
    meaning: 'Length of LIS ending at index i',
    formula: 'dp[i] = max(dp[j]+1) for all j<i where nums[j]<nums[i]',
    base: 'dp[i] = 1 for all i',
  },
  uniquePaths: {
    state: 'dp[i][j]',
    meaning: 'Number of unique paths to reach cell (i,j)',
    formula: 'dp[i][j] = dp[i-1][j] + dp[i][j-1]',
    base: 'dp[0][j] = 1, dp[i][0] = 1',
  },
  minPathSum: {
    state: 'dp[i][j]',
    meaning: 'Min cost to reach cell (i,j) from (0,0)',
    formula: 'dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])',
    base: 'dp[0][0] = grid[0][0], accumulate first row/col',
  },
}

const DPExplanation = ({ step, selectedAlgo }) => {
  const info = stateDefinitions[selectedAlgo]
  if (!info) return null

  return (
    <motion.div
      className="rounded-xl border border-slate-700/80 bg-slate-950/70 p-5 backdrop-blur-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Step explanation */}
      <AnimatePresence mode="wait">
        {step && (
          <motion.div
            key={step.description}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="mb-5 p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-2">
              Step Explanation
            </p>
            <p className="text-sm text-slate-200 leading-relaxed font-mono">
              {step.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* State + Formula Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* State */}
        <div className="bg-slate-900/60 rounded-lg px-4 py-3 border border-slate-700/50">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-2">
            State
          </p>
          <p className="text-lg font-mono font-bold text-white mb-1">
            {info.state}
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            {info.meaning}
          </p>
        </div>

        {/* Transition */}
        <div className="bg-slate-900/60 rounded-lg px-4 py-3 border border-slate-700/50">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400 mb-2">
            Transition
          </p>
          <p className="text-sm font-mono text-emerald-200 leading-relaxed break-all">
            {info.formula}
          </p>
        </div>

        {/* Base Case */}
        <div className="bg-slate-900/60 rounded-lg px-4 py-3 border border-slate-700/50">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400 mb-2">
            Base Case
          </p>
          <p className="text-sm font-mono text-amber-200 leading-relaxed break-all">
            {info.base}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default DPExplanation
