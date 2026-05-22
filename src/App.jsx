import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import AppLayout from './components/AppLayout'

// ✅ Named exports — need .then() to extract the named export as default
const Home = lazy(() =>
  import('./components/Home').then((m) => ({ default: m.Home }))
)
const VisualizerPage = lazy(() =>
  import('./components/searchAlgo/VisualizerPage').then((m) => ({
    default: m.VisualizerPage,
  }))
)
const MathTheory = lazy(() =>
  import('./components/MathTheory/MathSoloVisualizer').then((m) => ({
    default: m.MathSoloVisualizer,
  }))
)
const DSLayout = lazy(() =>
  import('./components/dataStructures/DSLayout').then((m) => ({
    default: m.DSLayout,
  }))
)

// ✅ Default exports — import directly
const SortingVisualizerPage = lazy(
  () => import('./components/sortingAlgo/VisualizerPage')
)
const ShortestPathPage = lazy(() =>
  import('./components/shortestPathAlgo/ShortestPathPage').then((m) => ({
    default: m.ShortestPathPage,
  }))
)
const ArrayVisualizerPage = lazy(
  () => import('./components/arraySearch/VisualizerPage')
)
const KadaneVisualizerPage = lazy(
  () => import('./components/kadaneAlgo/VisualizerPage')
)
const MooreVotingVisualizerPage = lazy(
  () => import('./components/mooreVotingAlgo/VisualizerPage')
)
const DPVisualizerPage = lazy(
  () => import('./components/dpVisualizer/DPVisualizerPage')
)

const BacktrackingVisualizerPage = lazy(
  () => import('./components/backtrackingAlgo/VisualizerPage')
)

const PracticePage = lazy(() => import('./components/PracticePage'))
const AboutAlgoScope = lazy(() => import('./components/about/About'))
const NotFound = lazy(() => import('./components/PageNotFound'))

// ✅ Fallback loader
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-black text-white">
    Loading...
  </div>
)

// ✅ Router defined OUTSIDE the component — created only once
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout showBackground={false}>
          <Home />
        </AppLayout>
      </Suspense>
    ),
  },
  {
    path: '/search',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout>
          <VisualizerPage />
        </AppLayout>
      </Suspense>
    ),
  },
  {
    path: '/math-theory',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout>
          <MathTheory />
        </AppLayout>
      </Suspense>
    ),
  },
  {
    path: '/spath',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout>
          <ShortestPathPage />
        </AppLayout>
      </Suspense>
    ),
  },
  {
    path: '/practice',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout>
          <SignedIn>
            <PracticePage />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </AppLayout>
      </Suspense>
    ),
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout>
          <AboutAlgoScope />
        </AppLayout>
      </Suspense>
    ),
  },
  {
    path: '/sort',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout>
          <SortingVisualizerPage />
        </AppLayout>
      </Suspense>
    ),
  },
  {
    path: '/ldssearch',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout>
          <ArrayVisualizerPage />
        </AppLayout>
      </Suspense>
    ),
  },
  {
    path: '/adt',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout>
          <DSLayout />
        </AppLayout>
      </Suspense>
    ),
  },
  {
    path: '/kadane',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout>
          <KadaneVisualizerPage />
        </AppLayout>
      </Suspense>
    ),
  },
  {
    path: '/moore-voting',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout>
          <MooreVotingVisualizerPage />
        </AppLayout>
      </Suspense>
    ),
  },
  {
    path: '/dp',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout>
          <DPVisualizerPage />
        </AppLayout>
      </Suspense>
    ),
  },
  {
    path: '/backtracking',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout>
          <BacktrackingVisualizerPage />
        </AppLayout>
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout>
          <NotFound />
        </AppLayout>
      </Suspense>
    ),
  },
])

// ✅ Clean App component
function App() {
  return <RouterProvider router={router} />
}

export default App
