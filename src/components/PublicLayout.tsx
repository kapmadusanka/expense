import { Link } from "react-router-dom"

const PublicLayout = () => {

    const content = (
        <section className="public">
            <header>
                <h1>Welcome to Repair Store!</h1>
            </header>
            <main>
            <h1 className="text-3xl font-bold underline text-red-600">
                    Simple React Typescript Tailwind Sample
           </h1>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default PublicLayout