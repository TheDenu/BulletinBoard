import { Link } from "react-router-dom";

export function Logo(){
    return (
        <Link className="d-flex align-items-center" to="/authorization"><img src="/vite.svg" alt="logo" /></Link>
    )
}
