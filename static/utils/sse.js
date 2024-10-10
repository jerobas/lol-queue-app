const sse = () => {
    const eventSource = new EventSource("events");
    eventSource.onerror = () => {
        console.error("Error with SSE connection");
        eventSource.close();
    };

    return eventSource;
}

export default sse;