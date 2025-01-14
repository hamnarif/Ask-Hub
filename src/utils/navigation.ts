export const handleNavigation = (
    path: string,
    event?: React.MouseEvent,
    callback?: () => void
) => {
    if (event?.ctrlKey || event?.metaKey) {
        // Open in new tab
        window.open(path, '_blank');
    } else {
        // Regular navigation
        if (callback) {
            callback();
        } else {
            window.location.href = path;
        }
    }
}; 