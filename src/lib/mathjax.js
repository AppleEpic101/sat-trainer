// forces mathjax to rerender when content changes
export function mathjax(node) {
    const updateMath = () => {
        if (window.MathJax) {
            window.MathJax.typesetPromise([node]);
        }
    };

    updateMath();

    return {
        update: updateMath,
    };
}
