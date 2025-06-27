function attachListHandlers(entity) {
    const itemSelector = `.${entity}-item`;
    const detailBtn = `${itemSelector} .btn-detail`;
    const editBtn = `${itemSelector} .btn-edit`;
    const deleteBtn = `${itemSelector} .btn-delete`;

    $(detailBtn + ',' + itemSelector).off('click').on('click', function (e) {
        e.stopPropagation();
        const id = $(this).data('id');
        $('#content').load(`/${entity}s/partial/${id}`, function (response, status, xhr) {
            if (status === 'error') {
                alert('Lỗi khi tải nội dung: ' + xhr.status + ' ' + xhr.statusText);
            }
        });
    });

    $(editBtn).off('click').on('click', function (e) {
        e.stopPropagation();
        const id = $(this).data('id');
        $.ajax({
            url: `/${entity}s/form/${id}/edit`,
            method: 'GET',
            success: function (html) {
                $('#content').html(html);
            },
            error: function (xhr) {
                alert(
                    xhr.responseJSON?.message ||
                    (xhr.status === 401
                        ? 'Bạn cần đăng nhập để truy cập nội dung này!'
                        : xhr.status === 403
                        ? 'Bạn không có quyền truy cập vào chức năng này!'
                        : 'Lỗi tải nội dung: ' + xhr.status + ' ' + xhr.statusText)
                );
            }
        });
    });

    $(deleteBtn).off('click').on('click', function (e) {
        e.stopPropagation();
        const id = $(this).data('id');
        if (confirm('Bạn có chắc chắn muốn xóa?')) {
            $.ajax({
                url: `/${entity}s/delete/${id}`,
                method: 'DELETE',
                success: function () {
                    $('#content').load(`/${entity}s/partial`);
                },
                error: function (err) {
                    alert('Lỗi khi xóa: ' + (err.responseJSON?.message || err.statusText));
                }
            });
        }
    });
}
function attachBackHandlers() {
    const mapping = {
        'book-detail': '/books/partial',
        'author-detail': '/authors/partial',
        'genre-detail': '/genres/partial',
        'bookInstance-detail': '/bookInstances/partial'
    };

    $('.back-btn').off('click').on('click', function () {
        const detailClass = $(this).siblings('[class$="-detail"]').attr('class')?.trim();
        $('#content').load(mapping[detailClass] || '/');
    });
}
    

function rebindAllHandlers() {
    attachListHandlers('book');
    attachListHandlers('author');
    attachListHandlers('genre');
    attachListHandlers('bookInstance');
    attachBackHandlers()
}

$(document).on('ready ajaxComplete', function () {
    rebindAllHandlers();
});
