import React, { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useStepPlayback } from '../visualizer/useStepPlayback'
import CodePanel from '../visualizer/CodePanel'
import { DPArray1D, DPGrid2D } from './DPTableViz'
import DPControls from './DPControls'
import DPExplanation from './DPExplanation'
import StatusDisplay from '../StatusDisplay'
import {
  dpCodeSources,
  dpAlgorithmGroups,
} from '../../algorithms/dp/dpCodeSources'
import { generateFibonacciSteps } from '../../algorithms/dp/fibonacci'
import { generateClimbingStairsSteps } from '../../algorithms/dp/climbingStairs'
import { generateHouseRobberSteps } from '../../algorithms/dp/houseRobber'
import { generateKnapsackSteps } from '../../algorithms/dp/knapsack'
import { generateSubsetSumSteps } from '../../algorithms/dp/subsetSum'
import { generateLCSSteps } from '../../algorithms/dp/lcs'
import { generateEditDistanceSteps } from '../../algorithms/dp/editDistance'
import { generateLISSteps } from '../../algorithms/dp/lis'
import { generateUniquePathsSteps } from '../../algorithms/dp/uniquePaths'
import { generateMinPathSumSteps } from '../../algorithms/dp/minPathSum'

// Find dimension for a given algorithm id
function getAlgoDim(id) {
  for (const g of dpAlgorithmGroups) {
    for (const a of g.algorithms) {
      if (a.id === id) return a.dim
    }
  }
  return '1D'
}

function getAlgoLabel(id) {
  for (const g of dpAlgorithmGroups) {
    for (const a of g.algorithms) {
      if (a.id === id) return a.label
    }
  }
  return id
}

const inputClass =
  'w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition focus:border-cyan-500 focus:outline-none font-mono'
const labelClass =
  'text-xs text-slate-400 mb-1 block font-medium uppercase tracking-wider'

const DPVisualizerPage = () => {
  const [selectedAlgo, setSelectedAlgo] = useState('fibonacci')
  const [language, setLanguage] = useState('javascript')
  const [approach, setApproach] = useState('tabulation')
  const [speed, setSpeed] = useState(1)

  // Inputs
  const [fibN, setFibN] = useState(8)
  const [stairsN, setStairsN] = useState(6)
  const [robberNums, setRobberNums] = useState('2,7,9,3,1')
  const [knapsackWeights, setKnapsackWeights] = useState('2,3,4,5')
  const [knapsackValues, setKnapsackValues] = useState('3,4,5,6')
  const [knapsackCapacity, setKnapsackCapacity] = useState(5)
  const [subsetNums, setSubsetNums] = useState('3,34,4,12,5,2')
  const [subsetTarget, setSubsetTarget] = useState(9)
  const [lcsS1, setLcsS1] = useState('ABCBDAB')
  const [lcsS2, setLcsS2] = useState('BDCAB')
  const [editS1, setEditS1] = useState('kitten')
  const [editS2, setEditS2] = useState('sitting')
  const [lisNums, setLisNums] = useState('10,9,2,5,3,7,101,18')
  const [gridRows, setGridRows] = useState(3)
  const [gridCols, setGridCols] = useState(3)
  const [minPathGrid, setMinPathGrid] = useState('1,3,1;1,5,1;4,2,1')

  const playback = useStepPlayback({ speed })

  const parseNums = (s) =>
    s
      .split(',')
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x))

  const handleRun = useCallback(() => {
    let steps = []
    switch (selectedAlgo) {
      case 'fibonacci':
        steps = generateFibonacciSteps(Math.min(fibN, 30))
        break
      case 'climbingStairs':
        steps = generateClimbingStairsSteps(Math.min(stairsN, 30))
        break
      case 'houseRobber':
        steps = generateHouseRobberSteps(parseNums(robberNums))
        break
      case 'knapsack':
        steps = generateKnapsackSteps(
          parseNums(knapsackWeights),
          parseNums(knapsackValues),
          Math.min(knapsackCapacity, 15)
        )
        break
      case 'subsetSum':
        steps = generateSubsetSumSteps(
          parseNums(subsetNums),
          Math.min(subsetTarget, 50)
        )
        break
      case 'lcs':
        steps = generateLCSSteps(lcsS1.slice(0, 10), lcsS2.slice(0, 10))
        break
      case 'editDistance':
        steps = generateEditDistanceSteps(
          editS1.slice(0, 8),
          editS2.slice(0, 8)
        )
        break
      case 'lis':
        steps = generateLISSteps(parseNums(lisNums).slice(0, 12))
        break
      case 'uniquePaths':
        steps = generateUniquePathsSteps(
          Math.min(gridRows, 8),
          Math.min(gridCols, 8)
        )
        break
      case 'minPathSum': {
        const rows = minPathGrid.split(';').map((r) =>
          r
            .split(',')
            .map((x) => parseInt(x.trim(), 10))
            .filter((x) => !isNaN(x))
        )
        if (rows.length > 0 && rows[0].length > 0)
          steps = generateMinPathSumSteps(rows)
        break
      }
      default:
        break
    }
    playback.loadSteps(steps)
  }, [
    selectedAlgo,
    fibN,
    stairsN,
    robberNums,
    knapsackWeights,
    knapsackValues,
    knapsackCapacity,
    subsetNums,
    subsetTarget,
    lcsS1,
    lcsS2,
    editS1,
    editS2,
    lisNums,
    gridRows,
    gridCols,
    minPathGrid,
    playback,
  ])

  const handleReset = useCallback(() => {
    playback.clear()
  }, [playback])

  const is1D = getAlgoDim(selectedAlgo) === '1D'
  const algoLabel = getAlgoLabel(selectedAlgo)

  const currentSource = useMemo(() => {
    const src = dpCodeSources[selectedAlgo]
    if (!src) return '// Select an algorithm'
    const langSrc = src[language] || src.javascript
    if (!langSrc) return '// No implementation for this language'
    return (
      langSrc[approach] ||
      langSrc.tabulation ||
      Object.values(langSrc)[0] ||
      '// No code'
    )
  }, [selectedAlgo, language, approach])

  const step = playback.currentStep

  // Input panel rendering
  const renderInputs = () => {
    switch (selectedAlgo) {
      case 'fibonacci':
        return (
          <div>
            <label className={labelClass}>n (Fibonacci number)</label>
            <input
              type="number"
              min={0}
              max={30}
              value={fibN}
              onChange={(e) => setFibN(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        )
      case 'climbingStairs':
        return (
          <div>
            <label className={labelClass}>n (number of stairs)</label>
            <input
              type="number"
              min={1}
              max={30}
              value={stairsN}
              onChange={(e) => setStairsN(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        )
      case 'houseRobber':
        return (
          <div>
            <label className={labelClass}>House values (comma-separated)</label>
            <input
              type="text"
              value={robberNums}
              onChange={(e) => setRobberNums(e.target.value)}
              className={inputClass}
              placeholder="2,7,9,3,1"
            />
          </div>
        )
      case 'knapsack':
        return (
          <div className="flex flex-col gap-3">
            <div>
              <label className={labelClass}>Weights</label>
              <input
                type="text"
                value={knapsackWeights}
                onChange={(e) => setKnapsackWeights(e.target.value)}
                className={inputClass}
                placeholder="2,3,4,5"
              />
            </div>
            <div>
              <label className={labelClass}>Values</label>
              <input
                type="text"
                value={knapsackValues}
                onChange={(e) => setKnapsackValues(e.target.value)}
                className={inputClass}
                placeholder="3,4,5,6"
              />
            </div>
            <div>
              <label className={labelClass}>Capacity</label>
              <input
                type="number"
                min={1}
                max={15}
                value={knapsackCapacity}
                onChange={(e) => setKnapsackCapacity(Number(e.target.value))}
                className={inputClass}
              />
            </div>
          </div>
        )
      case 'subsetSum':
        return (
          <div className="flex flex-col gap-3">
            <div>
              <label className={labelClass}>Numbers</label>
              <input
                type="text"
                value={subsetNums}
                onChange={(e) => setSubsetNums(e.target.value)}
                className={inputClass}
                placeholder="3,34,4,12,5,2"
              />
            </div>
            <div>
              <label className={labelClass}>Target Sum</label>
              <input
                type="number"
                min={1}
                max={50}
                value={subsetTarget}
                onChange={(e) => setSubsetTarget(Number(e.target.value))}
                className={inputClass}
              />
            </div>
          </div>
        )
      case 'lcs':
        return (
          <div className="flex flex-col gap-3">
            <div>
              <label className={labelClass}>String 1</label>
              <input
                type="text"
                value={lcsS1}
                onChange={(e) => setLcsS1(e.target.value.toUpperCase())}
                className={inputClass}
                placeholder="ABCBDAB"
                maxLength={10}
              />
            </div>
            <div>
              <label className={labelClass}>String 2</label>
              <input
                type="text"
                value={lcsS2}
                onChange={(e) => setLcsS2(e.target.value.toUpperCase())}
                className={inputClass}
                placeholder="BDCAB"
                maxLength={10}
              />
            </div>
          </div>
        )
      case 'editDistance':
        return (
          <div className="flex flex-col gap-3">
            <div>
              <label className={labelClass}>String 1</label>
              <input
                type="text"
                value={editS1}
                onChange={(e) => setEditS1(e.target.value)}
                className={inputClass}
                placeholder="kitten"
                maxLength={8}
              />
            </div>
            <div>
              <label className={labelClass}>String 2</label>
              <input
                type="text"
                value={editS2}
                onChange={(e) => setEditS2(e.target.value)}
                className={inputClass}
                placeholder="sitting"
                maxLength={8}
              />
            </div>
          </div>
        )
      case 'lis':
        return (
          <div>
            <label className={labelClass}>Array (comma-separated)</label>
            <input
              type="text"
              value={lisNums}
              onChange={(e) => setLisNums(e.target.value)}
              className={inputClass}
              placeholder="10,9,2,5,3,7,101,18"
            />
          </div>
        )
      case 'uniquePaths':
        return (
          <div className="flex gap-3">
            <div className="flex-1">
              <label className={labelClass}>Rows</label>
              <input
                type="number"
                min={2}
                max={8}
                value={gridRows}
                onChange={(e) => setGridRows(Number(e.target.value))}
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <label className={labelClass}>Cols</label>
              <input
                type="number"
                min={2}
                max={8}
                value={gridCols}
                onChange={(e) => setGridCols(Number(e.target.value))}
                className={inputClass}
              />
            </div>
          </div>
        )
      case 'minPathSum':
        return (
          <div>
            <label className={labelClass}>Grid (semicolons for rows)</label>
            <input
              type="text"
              value={minPathGrid}
              onChange={(e) => setMinPathGrid(e.target.value)}
              className={inputClass}
              placeholder="1,3,1;1,5,1;4,2,1"
            />
            <p className="text-xs text-slate-500 mt-1">
              e.g. 1,3,1;1,5,1;4,2,1
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className="lg:w-full w-auto flex flex-col lg:flex-row p-4 sm:p-6 bg-slate-950/50 min-h-screen rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* LEFT SIDEBAR */}
      <div className="w-full lg:w-1/4 xl:w-1/5 flex flex-col gap-4">
        <DPControls
          selectedAlgo={selectedAlgo}
          onSelectAlgo={(id) => {
            setSelectedAlgo(id)
            playback.clear()
          }}
          speed={speed}
          onSpeedChange={setSpeed}
          onRun={handleRun}
          onReset={handleReset}
          onStepForward={playback.stepForward}
          onStepBackward={playback.stepBackward}
          isPlaying={playback.isPlaying}
          onPlayPause={() =>
            playback.isPlaying ? playback.pause() : playback.play()
          }
          hasSteps={playback.hasSteps}
          isComplete={playback.isComplete}
          language={language}
          onLanguageChange={setLanguage}
          approach={approach}
          onApproachChange={setApproach}
        />

        {/* Input Panel */}
        <motion.div
          className="p-4 bg-slate-900/80 rounded-xl border border-white/5 backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-3">
            Input Configuration
          </p>
          {renderInputs()}
        </motion.div>
      </div>

      {/* RIGHT MAIN AREA */}
      <div className="w-full lg:w-3/4 xl:w-4/5 mt-4 lg:mt-0 lg:ml-6 flex flex-col gap-6">
        {/* Visualization Canvas */}
        <motion.div
          className="rounded-xl border border-white/10 bg-slate-900/50 p-6 shadow-lg min-h-[350px] flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400/80 mb-4 text-center">
            {algoLabel} — DP Table Visualization
          </h3>

          {is1D ? (
            <DPArray1D
              table={step?.table}
              current={step?.current ?? -1}
              deps={step?.deps || []}
              nums={step?.nums}
              phase={step?.phase || 'init'}
            />
          ) : (
            <DPGrid2D
              table={step?.table}
              current={step?.current}
              deps={step?.deps || []}
              rowLabels={step?.rowLabels}
              colLabels={step?.colLabels}
              phase={step?.phase || 'init'}
            />
          )}
        </motion.div>

        {/* Status */}
        <StatusDisplay
          message={
            step?.description ||
            'Select an algorithm, configure inputs, and press Run.'
          }
        />

        {/* Explanation */}
        <DPExplanation step={step} selectedAlgo={selectedAlgo} />

        {/* Code Panel */}
        <CodePanel
          title={`${algoLabel} Implementation`}
          code={currentSource}
          language={language}
          activeLine={step?.codeLine}
          onLanguageChange={setLanguage}
        />
      </div>
    </motion.div>
  )
}

export default DPVisualizerPage
