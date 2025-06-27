function initializeSelect2() {
    if (window.$ && $.fn && $.fn.select2) {
        $('#author-select').select2({
            placeholder: "Chọn tác giả",
            width: '100%'
        });

        $('#genre-select').select2({
            placeholder: "Chọn thể loại (có thể chọn nhiều)",
            width: '100%',
            closeOnSelect: false
        });
    } else {
        console.warn('Select2 không được load đúng. Kiểm tra lại thứ tự script.');
    }
}

function attachFormHandlers() {
    $('.btn-cancel').off('click').on('click', function () {
        const form = $(this).closest('form');
        if (!form.length) return;

        const formId = form.attr('id');
        const mapping = {
            'author-form': '/authors/partial',
            'book-form': '/books/partial',
            'genre-form': '/genres/partial',
            'bookInstance-form': '/bookInstances/partial',
        };

        const targetUrl = mapping[formId];
        if (targetUrl) {
            $('#content').load(targetUrl);
        } else {
            console.warn('Không tìm thấy form tương ứng!');
        }
    });

    $('.back-btn').off('click').on('click', function () {
        $('#content').load('/books/partial');
    });

    $('#author-form .btn-new').off('click').on('click', function () {
        const form = $('#author-form');
        const formData = Object.fromEntries(new FormData(form[0]));
        const authorId = formData.id;
        delete formData.id;

        $.ajax({
            url: authorId ? `/authors/form/edit/${authorId}` : '/authors/form/add',
            type: authorId ? 'PUT' : 'POST',
            data: $.param(formData),
            success: () => $('#content').load('/authors/partial'),
            error: (err) => alert('Lỗi: ' + (err.responseJSON?.message || err.statusText)),
        });
    });

    $('#genre-form .btn-new').off('click').on('click', function () {
        const form = $('#genre-form');
        const genreId = form.find('input[name="id"]').val();
        const method = genreId ? 'PUT' : 'POST';
        const url = genreId ? `/genres/form/edit/${genreId}` : '/genres/form/add';
        const formObject = {};
        form.serializeArray().forEach(({ name, value }) => {
            if (name !== 'id') {
                formObject[name] = value;
            }
        });

        $.ajax({
            url: url,
            type: method,
            data: formObject,
            success: () => $('#content').load('/genres/partial'),
            error: (err) => alert('Lỗi: ' + (err.responseJSON?.message || err.statusText)),
        });
    });

    $('#bookInstance-form .btn-new').off('click').on('click', function () {
        const form = $('#bookInstance-form');
        const instanceId = form.find('input[name="id"]').val();
        const method = instanceId ? 'PUT' : 'POST';
        const url = instanceId ? `/bookInstances/form/edit/${instanceId}` : '/bookInstances/form/add';

        const formObject = {};
        form.serializeArray().forEach(({ name, value }) => {
            if (name !== 'id') {
                formObject[name] = value;
            }
        });

        $.ajax({
            url: url,
            type: method,
            data: formObject,
            success: () => $('#content').load('/bookInstances/partial'),
            error: (err) => alert('Lỗi: ' + (err.responseJSON?.message || err.statusText)),
        });
    });

    $('#book-form .btn-new').off('click').on('click', function () {
        const genreIds = $('#genre-select').val() || [];
        const bookId = $('#book-id').val();

        const formData = {
            title: $('input[name="title"]').val(),
            summary: $('textarea[name="summary"]').val(),
            isbn: $('input[name="isbn"]').val(),
            url: $('input[name="url"]').val(),
            authorId: $('select[name="authorId"]').val(),
            genreIds: genreIds.map(id => Number(id)),
        };

        const method = bookId ? 'PUT' : 'POST';
        const url = bookId ? `/books/form/edit/${bookId}` : '/books/form/add';

        $.ajax({
            url: url,
            type: method,
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: () => {
                $('#content').load('/books/partial', () => initializeSelect2());
            },
            error: (err) =>
                alert('Lỗi: ' + (err.responseJSON?.message || err.statusText || 'Có lỗi xảy ra')),
        });
    });
}

$(document).on('ready ajaxComplete', function () {
    initializeSelect2();
    attachFormHandlers();
});
