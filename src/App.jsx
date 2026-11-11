import { Suspense } from 'react'
import { PageLoader } from '@/components/common/PageLoader'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import AppRoutes from '@/routes/AppRoutes'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader fullScreen />}>
        <AppRoutes />
      </Suspense>
    </>
  )
}