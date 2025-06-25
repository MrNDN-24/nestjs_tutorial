$(document).ready(function () {
    $('.nav-link').on('click', function () {
        const url = $(this).data('url');
        if (!url) {
            alert('Tính năng đang được phát triển!');
            return;
        }
        $('#content').load(url);
    });
});