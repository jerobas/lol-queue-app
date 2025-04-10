import Download from "../components/download";
import useSession from "./useSession";
import useUpdater from "./useUpdater";

const HooksWrapper = ({ children }: { children: React.ReactNode }) => {
    const [checkingUpdate, processMessage] = useUpdater();
    useSession();

    return checkingUpdate ? (
        <Download message={processMessage} />
    ) : children;
}

export default HooksWrapper;