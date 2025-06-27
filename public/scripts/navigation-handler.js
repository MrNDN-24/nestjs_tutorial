$(document).ready(function () {
    const token = localStorage.getItem('token');
    if (token) {
        $.ajaxSetup({
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    $('.nav-link').on('click', function () {
        const url = $(this).data('url');
        if (!url) {
            alert('Tính năng đang được phát triển!');
            return;
        }

        $('#content').load(url, function (response, status, xhr) {
            if (status === 'error') {
                if (xhr.status === 401) {
                    alert('Bạn cần đăng nhập để truy cập nội dung này!');
                    $('#content').load('/auth/loginView-form');
                } else if (xhr.status === 403) {
                    alert('Bạn không có quyền truy cập vào chức năng này!');
                } else {
                    alert('Lỗi tải nội dung: ' + xhr.status + ' ' + xhr.statusText);
                }
            }
        });
    });

    $('#logout-btn').on('click', function () {
        localStorage.removeItem('token');
        $.ajaxSetup({ headers: {} });
        alert('Bạn đã đăng xuất!');
        $('#content').html('<p>Đăng xuất thành công.</p>');
    });
});
