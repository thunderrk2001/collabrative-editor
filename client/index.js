var quill = new Quill('#editor', {
    modules: {
        toolbar: '#toolbar-container'
    },
    placeholder: 'Write Something',
    theme: 'snow'

});

window.onload = () => {
    const socket = io();
    quill.on('text-change', function (delta, oldDelta, source) {
        if (source=='user') {
            socket.emit('write', delta);
        }
    });
    const uuid = window.location.pathname.replace("/", "");

    socket.emit("join", uuid);

    socket.once('onload', (data) => {
        quill.setContents(data);

    })
    socket.on('receive', (data) => {
        quill.updateContents(data);
    })

}