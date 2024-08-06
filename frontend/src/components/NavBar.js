import {Link, useMatch, useResolvedPath} from 'react-router-dom';


export default function NavBar() {
    
    return <nav className="navbar">
        <Link to="/" className = "site-title">
        OLYMPIC BASKETBALL DB
        </Link>
        <ul>
            <CustomLink to="/scores">Scores</CustomLink>
            <CustomLink to="/statleaders">Stat Leaders</CustomLink>
            <CustomLink to="/query">Query</CustomLink>
        </ul>
    </nav>
}

function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return(
        <li className ={isActive ? "active": ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}