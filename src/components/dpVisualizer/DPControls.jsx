import React from 'react'
import { motion } from 'framer-motion'
import SpeedSlider from '../SpeedSlider'
import {
  dpAlgorithmGroups,
  dpComplexity,
} from '../../algorithms/dp/dpCodeSources'

const groupColors = {
  cyan: {
    active:
      'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.3)]',
    label: 'text-cyan-400',
  },
  blue: {
    active:
      'bg-blue-500/30 border-blue-400 text-blue-200 shadow-[0_0_10px_rgba(59,130,246,0.3)]',
    label: 'text-blue-400',
  },
  purple: {
    active:
      'bg-purple-500/30 border-purple-400 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.3)]',
    label: 'text-purple-400',
  },
  pink: {
    active:
      'bg-pink-500/30 border-pink-400 text-pink-200 shadow-[0_0_10px_rgba(236,72,153,0.3)]',
    label: 'text-pink-400',
  },
  orange: {
    active:
      'bg-orange-500/30 border-orange-400 text-orange-200 shadow-[0_0_10px_rgba(249,115,22,0.3)]',
    label: 'text-orange-400',
  },
  emerald: {
    active:
      'bg-emerald-500/30 border-emerald-400 text-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.3)]',
    label: 'text-emerald-400',
  },
}

const DPControls = ({
  selectedAlgo,
  onSelectAlgo,
  speed,
  onSpeedChange,
  onRun,
  onReset,
  onStepForward,
  onStepBackward,
  isPlaying,
  onPlayPause,
  hasSteps,
  language,
  onLanguageChange,
  approach,
  onApproachChange,
}) => {
  const complexity = dpComplexity[selectedAlgo]
  const showApproachTabs =
    selectedAlgo === 'fibonacci' || selectedAlgo === 'climbingStairs'

  return (
    <motion.div
      className="w-full p-4 flex flex-col gap-5 bg-slate-900/80 shadow-xl rounded-xl border border-white/5 backdrop-blur-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400/80 text-center mb-1">
          Dynamic Programming
        </p>
        <h2 className="text-2xl font-bold text-center text-white tracking-tight">
          Controls
        </h2>
      </div>

      {/* Algorithm Groups */}
      <div className="flex flex-col gap-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
        {dpAlgorithmGroups.map((group) => {
          const colors = groupColors[group.color] || groupColors.cyan
          return (
            <div key={group.label}>
              <p
                className={`text-xs font-bold uppercase tracking-[0.15em] mb-2 ${colors.label}`}
              >
                {group.label}
              </p>
              <div className="flex flex-col gap-1.5">
                {group.algorithms.map((algo) => (
                  <button
                    key={algo.id}
                    onClick={() => onSelectAlgo(algo.id)}
                    className={`w-full rounded-xl border px-3 py-2 text-sm font-medium text-left transition-all duration-200 ${
                      selectedAlgo === algo.id
                        ? colors.active
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {algo.label}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Run / Reset */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onRun}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95"
        >
          ▶ Run
        </button>
        <button
          onClick={onReset}
          className="w-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white font-semibold py-3 rounded-xl transition-all duration-200"
        >
          ↻ Reset
        </button>
      </div>

      {/* Playback Controls */}
      {hasSteps && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onStepBackward}
            className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-all text-lg"
            title="Step Back"
          >
            ⏮
          </button>
          <button
            onClick={onPlayPause}
            className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 flex items-center justify-center transition-all text-xl"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            onClick={onStepForward}
            className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-all text-lg"
            title="Step Forward"
          >
            ⏭
          </button>
        </div>
      )}

      {/* Speed */}
      <SpeedSlider value={speed} onChange={(e, v) => onSpeedChange(v)} />

      {/* Approach Tabs */}
      {showApproachTabs && (
        <div className="border-t border-white/5 pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-2">
            Approach
          </p>
          <div className="flex gap-1">
            {['recursion', 'memoization', 'tabulation'].map((a) => (
              <button
                key={a}
                onClick={() => onApproachChange(a)}
                className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 capitalize ${
                  approach === a
                    ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-200'
                    : 'bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Language Select */}
      <div className="border-t border-white/5 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-2">
          Code Language
        </p>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition focus:border-cyan-500 focus:outline-none"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      {/* Complexity */}
      {complexity && (
        <div className="border-t border-white/5 pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-3">
            Complexity
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/50">
              <p className="text-xs text-slate-500">Time</p>
              <p className="text-sm font-mono text-emerald-400 font-bold">
                {complexity.time}
              </p>
            </div>
            <div className="bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/50">
              <p className="text-xs text-slate-500">Space</p>
              <p className="text-sm font-mono text-amber-400 font-bold">
                {complexity.space}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">
            Pattern:{' '}
            <span className="text-purple-400">{complexity.pattern}</span>
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default DPControls
