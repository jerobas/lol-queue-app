import ContextWrapper from "./context"
import HooksWrapper from "./hooks"

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    return <ContextWrapper>
        <HooksWrapper>
            {children}
        </HooksWrapper>
    </ContextWrapper>
}

export default AppWrapper;