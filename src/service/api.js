export const fetchTicketsData = async () => {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    return response.json();
}; 