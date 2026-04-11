'use client'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const GA_ID = 'G-H0MFTF8LDE'

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_ID) return
    const query = searchParams?.toString()
    const url = query ? `${pathname}?${query}` : pathname || '/'
    ;(window as any).gtag?.('config', GA_ID, { page_path: url })
  }, [pathname, searchParams])

  return null
}
