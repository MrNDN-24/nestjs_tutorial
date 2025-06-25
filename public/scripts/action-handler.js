function attachListHandlers(entity) {
    const itemSelector = `.${entity}-item`;
    const detailBtn = `${itemSelector} .btn-detail`;
    
    $(detailBtn + ',' + itemSelector).off('click').on('click', function (e) {
        e.stopPropagation();
        const id = $(this).data('id');
        $('#content').load(`/${entity}s/partial/${id}`, function (response, status, xhr) {
            if (status === 'error') {
                alert('Lỗi khi tải nội dung: ' + xhr.status + ' ' + xhr.statusText);
            }
        });
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