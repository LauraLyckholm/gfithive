// Function to format the time
export const formatTimeMixins = (time) => {
    const formattedTime = new Date(time).toLocaleString();
    return formattedTime.slice(0, 10);
};