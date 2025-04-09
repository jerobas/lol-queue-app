import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss"

const Download = ({ message }: { message: string }) => {
    return (
        <div className="flex grow justify-center items-center flex-col gap-2">
            <FontAwesomeIcon
                icon={faArrowDown}
                className="primary-color text-7xl animate-bounce"
            />
            <h1 className="text-xl text-center text-gray-700">
                {message}
            </h1>
        </div>
    );
};

export default Download;