
export const submitOnEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>, callback: () => void) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        callback();
    }   
}