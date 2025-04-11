import { CustomNav } from "../CustomNav/CustomNav";

export function Header() {
    return (
        <header className="bg-body-tertiary">
            <div className="container d-flex justify-content-between w-100 p-3">
                <CustomNav />
            </div>
        </header>
    )
}
