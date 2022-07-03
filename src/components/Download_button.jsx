
const Download_button = ({ children, file, file_name = 'new_file.js', content_type = 'text/plain' }) => {
    return (
        <button
            onClick={() => download(file, file_name, content_type)}>
            {children}
        </button>
    )

    function download(content, file_name, content_type) {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(content)], { type: content_type });
        a.href = URL.createObjectURL(file);
        a.download = file_name;
        a.click();
    }
}

export default Download_button