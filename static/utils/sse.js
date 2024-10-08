const sse = () => {
    const eventSource = new EventSource("http://localhost:3000/events");
    eventSource.onerror = () => {
        console.error("Error with SSE connection");
        eventSource.close();
    };

    return eventSource;
}

export default sse;