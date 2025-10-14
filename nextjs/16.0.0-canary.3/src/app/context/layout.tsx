'use client'

import { ReactNode } from 'react'
import { Header } from '../Header'
import ContextComponent from './ContextComponent'
import { withContext } from './context'

const Layout = ({ children }: { children: ReactNode }) => (
	<WithContext>
		{children}

		<ContextComponent />
	</WithContext>
)

const WithContext = withContext(({ children }: { children: ReactNode }) => (
	<div className="container">{children}</div>
))

export default Layout
