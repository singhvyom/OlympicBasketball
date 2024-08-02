export default function NavBar() {
    return <nav className="navbar">
        <a href="/" className = "site-title">
        OLYMPIC BASKETBALL DB
        </a>
        <ul>
            <li >
                <a href="/boxscores">BoxScores</a>
            </li>
            <li>
                <a href="/statleaders">Stats</a>
            </li>
            <li>
                <a href="/query">Query</a>
            </li>
        </ul>
    </nav>
}