import { useNavigate } from "react-router-dom";
import { Page } from "../../interfaces";
import { Suspense } from "react";

const PageButton = ({ route, name }: { route: Page, name: string }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(name === 'home' ? '/' : `/${name}`);
    };

    return (
        <li>
            <button
                id="page-button"
                className="w-5 h-5 rounded focus:outline-none"
                onClick={handleClick}
            //style={{ WebkitAppRegion: "no-drag" }}
            >
                <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
                    {route["icon"]}
                </Suspense>
            </button>
        </li>
    );
};

export default PageButton;