import React from 'react'
import Header from './Header'

// Ce composant représente le squelette de notre application
const Layout = ({ isHome = false, children }) => {
    return (
        <div className="App">
            <Header isHome={isHome} />

            {children}
        </div>
    )
}

export default Layout