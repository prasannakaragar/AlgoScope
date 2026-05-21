import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Renders a 1D DP array with animated highlights.
 * Props:
 *   table: number[]   - current DP values
 *   current: number   - index being computed (-1 = none)
 *   deps: number[]    - dependency indices highlighted in amber
 *   nums?: number[]   - original input array (shown above dp cells for reference)
 *   phase: string     - 'init'|'base'|'compute'|'set'|'done'
 */
export function DPArray1D({ table, current, deps = [], nums, phase }) {
  if (!table || table.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500 text-sm font-mono">
        Configure inputs and press Run to visualize
      </div>
    )
  }

  const getCellStyle = (i) => {
    if (i === current && phase === 'done') return 'done'
    if (i === current) return 'current'
    if (deps.includes(i)) return 'dep'
    if (table[i] !== null && table[i] !== undefined) return 'filled'
    return 'empty'
  }

  const styleMap = {
    current: 'bg-cyan-500 border-cyan-300 text-black shadow-[0_0_20px_rgba(6,182,212,0.7)] scale-110',
    dep: 'bg-amber-500/40 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.4)]',
    done: 'bg-emerald-500 border-emerald-300 text-black shadow-[0_0_20px_rgba(16,185,129,0.7)] scale-110',
    filled: 'bg-slate-700/80 border-slate-500 text-slate-200',
    empty: 'bg-slate-800/60 border-slate-700 text-slate-600',
  }

  return (
    <div className="w-full overflow-x-auto pb-2">
      {/* Original nums row if provided */}
      {nums && (
        <div className="flex justify-center gap-2 mb-1">
          {nums.map((v, i) => (
            <div
              key={i}
              className="w-14 h-7 flex items-center justify-center text-xs font-mono text-slate-400 border border-slate-700/40 rounded bg-slate-900/30"
            >
              {v}
            </div>
          ))}
        </div>
      )}

      {/* dp[] values */}
      <div className="flex justify-center gap-2 flex-wrap">
        {table.map((val, i) => {
          const style = getCellStyle(i)
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div
                layout
                animate={{ scale: style === 'current' || style === 'done' ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-base font-bold font-mono transition-all duration-300 ${styleMap[style]}`}
              >
                {val !== null && val !== undefined ? (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={String(val)}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {typeof val === 'boolean' ? (val ? 'T' : 'F') : val}
                    </motion.span>
                  </AnimatePresence>
                ) : (
                  <span className="text-slate-600">·</span>
                )}
              </motion.div>
              <span className="text-xs text-slate-500 font-mono">dp[{i}]</span>
            </div>
          )
        })}
      </div>

      {/* Dependency arrows (simplified) */}
      {deps.length > 0 && current >= 0 && (
        <div className="mt-3 flex justify-center">
          <div className="text-xs text-amber-400/70 font-mono bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1">
            ← depends on: {deps.map((d) => `dp[${d}]`).join(', ')}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Renders a 2D DP grid with animated highlights.
 * Props:
 *   table: (number|boolean)[][] - 2D DP table
 *   current: [i,j] | null      - currently computed cell
 *   deps: [i,j][]              - dependency cells
 *   rowLabels: string[]        - optional row labels
 *   colLabels: string[]        - optional column labels
 *   phase: string
 */
export function DPGrid2D({ table, current, deps = [], rowLabels, colLabels, phase }) {
  if (!table || table.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500 text-sm font-mono">
        Configure inputs and press Run to visualize
      </div>
    )
  }

  const isCurrent = (i, j) => current && current[0] === i && current[1] === j
  const isDep = (i, j) => deps.some((d) => d[0] === i && d[1] === j)

  const getCellClass = (i, j, val) => {
    if (isCurrent(i, j) && phase === 'done')
      return 'bg-emerald-500 border-emerald-300 text-black shadow-[0_0_16px_rgba(16,185,129,0.6)] scale-105'
    if (isCurrent(i, j))
      return 'bg-cyan-500 border-cyan-300 text-black shadow-[0_0_16px_rgba(6,182,212,0.6)] scale-105'
    if (isDep(i, j))
      return 'bg-amber-500/40 border-amber-400 text-amber-100 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
    if (val === true) return 'bg-emerald-600/40 border-emerald-500/60 text-emerald-200'
    if (val === false) return 'bg-red-900/30 border-red-700/40 text-red-400'
    if (val !== null && val !== undefined && val !== 0)
      return 'bg-slate-700/70 border-slate-500/70 text-slate-200'
    return 'bg-slate-800/50 border-slate-700/40 text-slate-500'
  }

  const rows = table.length
  const cols = table[0]?.length ?? 0
  const cellSize = Math.max(32, Math.min(48, Math.floor(480 / Math.max(rows, cols, 6))))

  return (
    <div className="w-full overflow-auto">
      <div className="inline-block min-w-full">
        <table className="border-separate border-spacing-1">
          <thead>
            {colLabels && (
              <tr>
                <th className="w-8" />
                {colLabels.map((label, j) => (
                  <th
                    key={j}
                    className="text-center text-xs font-mono text-slate-400 pb-1 px-0.5"
                    style={{ minWidth: cellSize, maxWidth: cellSize + 8 }}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {table.map((row, i) => (
              <tr key={i}>
                {rowLabels && (
                  <td className="text-xs font-mono text-slate-400 pr-1 text-right whitespace-nowrap max-w-[60px] truncate">
                    {rowLabels[i]}
                  </td>
                )}
                {row.map((val, j) => (
                  <td key={j} className="p-0">
                    <motion.div
                      layout
                      animate={{ scale: isCurrent(i, j) ? 1.08 : 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className={`rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all duration-200 ${getCellClass(i, j, val)}`}
                      style={{ width: cellSize, height: cellSize, fontSize: Math.max(10, cellSize * 0.28) }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={String(val)}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.15 }}
                        >
                          {val === true ? '✓' : val === false ? '✗' : val}
                        </motion.span>
                      </AnimatePresence>
                    </motion.div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 flex-wrap">
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="w-3 h-3 rounded bg-cyan-500 inline-block" /> Current
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="w-3 h-3 rounded bg-amber-500/60 inline-block" /> Dependency
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="w-3 h-3 rounded bg-slate-700 inline-block" /> Computed
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Result
        </span>
      </div>
    </div>
  )
}
