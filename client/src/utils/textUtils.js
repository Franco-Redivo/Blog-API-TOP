const extractTextFromHTML = (html) => {

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.replace(/\s+/g, ' ').trim();
};

export const getResponsiveTextExcerpt = (html) => {
    const cleanText = extractTextFromHTML(html);
    
    const baseLength = 150;
    
    if (cleanText.length <= baseLength) {
        return cleanText;
    }
    return cleanText.slice(0, baseLength).trim() + '...';
};

export const getLargeScreenExcerpt = (html) => {
    const cleanText = extractTextFromHTML(html);
    const largeLength = 250; // More text for large screens
    
    if (cleanText.length <= largeLength) {
        return cleanText;
    }
    return cleanText.slice(0, largeLength).trim() + '...';
};