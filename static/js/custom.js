$(function () {
    jQuery.fn.extend({
        datepicker: function (settings = {}) {
            settings = $.extend({}, {
                defaultDate: $(this).val(),
                dateFormat: 'Y-m-d',
                disableMobile: true,
            }, settings);
            $(this).flatpickr(settings);
        },
        inlinedatepicker: function (settings = {}) {
            settings = $.extend({}, {
                defaultDate: $(this).val(),
                dateFormat: 'Y-m-d',
                disableMobile: true,
                inline: true,
            }, settings);
            $(this).flatpickr(settings);
        },
        datetimepicker: function (settings = {}) {
            settings = $.extend({}, {
                enableTime: true,
                time_24hr: true,
                disableMobile: true,
                defaultDate: $(this).val(),
                dateFormat: 'Y-m-d H:i',
            }, settings);
            $(this).flatpickr(settings);
        },
        inlinedatetimepicker: function (settings = {}) {
            settings = $.extend({}, {
                time_24hr: true,
                disableMobile: true,
                defaultDate: $(this).val(),
                dateFormat: 'Y-m-d H:i',
                inline: true,
            }, settings);
            $(this).flatpickr(settings);
        },
        daterangepicker: function (settings = {}) {
            var second_input_id = $(this).attr('second-input');
            settings = $.extend({}, {
                disableMobile: true,
                defaultDate: $(this).val(),
                dateFormat: 'Y-m-d',
                plugins: [new rangePlugin({input: second_input_id, defaultDate: $(second_input_id).val()})]
            }, settings);
            $(this).flatpickr(settings);
        },
        datetimerangepicker: function (settings = {}) {
            var second_input_id = $(this).attr('second-input');
            settings = $.extend({}, {
                timePicker: true,
                enableTime: true,
                time_24hr: true,
                disableMobile: true,
                defaultDate: $(this).val(),
                locale: {
                    format: 'M/DD hh:mm A'
                },
                plugins: [new rangePlugin({input: second_input_id, defaultDate: $(second_input_id).val()})]
            }, settings);
            $(this).flatpickr(settings);
        },
    });
    const getCurrentLanguage = window.getCurrentLanguage = function () {
        return document.documentElement.getAttribute('lang');
    }

    $('.datatable').each(function () {
        let $this = $(this);
        var default_sorting = [];
        if ($this.data('default-sort')) {
            default_sorting = [[0, 'desc']]
        }
        let languages = {
            'ar': 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Arabic.json',
            'en': null,
        };
        if ($this.data('api')) {
            let columns = [];
            let url = $this.data('api');
            let filter_html = ''
            let column_index = 0;
            let datatable_settings = {
                order: default_sorting,
                initComplete: function (settings, json) {
                    $this.addClass('datatable-rendered');
                    $this.removeClass('no-footer');
                },
                language: {
                    url: languages[getCurrentLanguage()] || null
                },
                "serverSide": true,
                "ajax": url,
                "columns": columns
            }
            $this.find('th').each(function () {
                if ($(this).data('enabled')===true) {
                    filter_html = filter_html + render_filter_field(this, 'datatable-header-filter col-sm-4 col-lg-2', column_index)
                }
                column_index +=1;
                let data = {};
                if ($(this).data('name').toLowerCase() === "actions") {
                    var row = $(this);
                    data = {
                        "data": null,
                        "searchable": false,
                        "orderable": false,
                        "visible": true,
                        "responsivePriority": 1,
                        "className": "align-middle actions-column text-dark",
                        "render": function (data, type, full) {
                            let actions = row.data('actions');
                            let actions_array = JSON.parse(actions.replaceAll("'","\""))
                            let actionButtons = "";
                            actions_array.forEach(function(item){
                                url = item.url.replace(/\/0000/g, "/" + data.id);
                                url= url.replace(/replace-with-id/g, row.id);
                                url= url.replace(/\/0000/g, "/" + row.id);
                                url= url.replace(/id="dropdown_id_"/g, 'id="dropdown_id_' + row.id + '"');
                                url= url.replace(/aria-labelledby="dropdown_id_"/g, 'aria-labelledby="dropdown_id_' + row.id + '"');
                                actionButtons += `<a href="${url}" class="${item.action_class}"><i class="${item.icon}"></i></a> `;
                            });
                            return actionButtons;
                        },
                    };
                }
                else {
                    data = {'data': $(this).data('name'), "searchable": true, 'name': $(this).data('search')}
                }
                columns.push(data);
            });
            if(filter_html !== '') {
                datatable_settings['dom'] = "<'row col-12'<'col-sm-2 mt-2'lr><'col-sm-10 table-filter-container'>>tip";
                datatable_settings['initComplete'] = function(settings, json){
                        $this.addClass('datatable-rendered');
                        $this.removeClass('no-footer');
                        var api = new $.fn.dataTable.Api( settings );
                        $('.table-filter-container', api.table().container()).append($(`<div id="table-filter" class="row">${filter_html}</div>`).detach().show());
                        $('.datepicker').datepicker();
                        $('.customSearchInput').on( 'keyup', function() {
                            search_table($(this).data('id'), this.value);
                        });
                        $('.customSearchList').on( 'change', function() {
                            search_table($(this).data('id'), this.value);
                        });
                        $('.customSearchDate').on( 'change', function() {
                            search_table($(this).data('id'), this.value);
                        });
                };
            }
            window.datatable = $this.DataTable(datatable_settings);
        }
        else {
            $this.DataTable({
                lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
                order: [[0, 'desc']],
                initComplete: function (settings, json) {
                    $this.addClass('datatable-rendered');
                    $this.removeClass('no-footer');
                    $this.wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
                },
                language: {
                    url: languages[getCurrentLanguage()] || null
                }
            });
        }
    });

    $('select.select2').each(function(e){
        $(this).select2({
            minimumResultsForSearch: 6,
            width: '100%'
        });
    })

    $('.dual-list-box').bootstrapDualListbox({
        nonSelectedListLabel: 'Available',
        selectedListLabel: 'Selected',
        preserveSelectionOnMove: 'moved',
        moveOnSelect: !1,
        selectorMinimalHeight: 300,
        btnClass: 'btn-primary'
    });

    $(".datepicker").each(function () {
        $(this).datepicker()
    });
    $(".inlinedatepicker").each(function () {
        $(this).inlinedatepicker()
    });
    $(".datetimepicker").each(function () {
        $(this).datetimepicker()
    });
    $(".inlinedatetimepicker").each(function () {
        $(this).inlinedatetimepicker()
    });
    $(".daterangepicker").each(function () {
        $(this).daterangepicker()
    });
    $(".datetimerangepicker").each(function () {
        $(this).datetimerangepicker()
    });
    $('.reset-button').click(function () {
        $('#id_parental_password').val('0000');
    });
    $('input#id_parental_password').wrap('<span class="delete-button"></span>').after($('<a class="btn btn-danger">Reset</a>').click(function() {
            $(this).prev('input').val('0000').trigger('change').focus();
        }));
    function render_filter_field(object, htmlclass, index) {
        let name_of_the_field = object.textContent;
        let field_index = index;
        let $this = $(object);

        let is_related = '';
        if (typeof ($this.data('search')) !== 'undefined') {
            is_related = 'data-is-related=true';
        }

        let newhtmlinput = '<div class="' + htmlclass + '"><label class="control-label">' + name_of_the_field + '</label><input id="filter-field-' + field_index + '" ' + is_related + ' placeholder="' + name_of_the_field + '" data-type="text" data-id="' + field_index + '" class="form-control customSearchInput" name="" type="text" value=""></div>';

        if ($this.data('select')) {
            let datalist = $this.data('list').split(',');
            newhtmlinput = '<div class="' + htmlclass + '"><label class="control-label  float-left">' + name_of_the_field + '</label><select id="filter-field-' + field_index + '" ' + is_related + ' data-type="radio" data-id="' + field_index + '" class="form-control customSearchList">';
            if (typeof ($this.data('list-label')) === 'undefined') {
                for (let index = 0; index < datalist.length; index++) {
                    let value = datalist[index];
                    if (value !== "All") {
                        newhtmlinput = newhtmlinput + '<option name="' + name_of_the_field + '" value="' + value + '">' + value + '</option>';
                    }
                    else {
                        newhtmlinput = newhtmlinput + '<option name="' + name_of_the_field + '" value="">' + value + '</option>';
                    }

                }
            } else {
                let labellist = $this.data('list-label').split(',');
                for (let index = 0; index < datalist.length; index++) {
                    let value = datalist[index];
                    if (value !== "All") {
                        newhtmlinput = newhtmlinput + '<option name="' + name_of_the_field + '" value="' + value + '">' + labellist[index] + '</option>';
                    }
                    else {
                        newhtmlinput = newhtmlinput + '<option name="' + name_of_the_field + '" value="">' + value + '</option>';
                    }
                }
            }
            newhtmlinput = newhtmlinput + '</select></div>';

            //Must have input format of Y-m-d ex: 2019-07-18
        } else if ($this.data('date')) {
            //If the datatype is date
            newhtmlinput = '<div class="' + htmlclass + '"><label class="control-label float-left">' + name_of_the_field + '</label><input placeholder="' + name_of_the_field + '" id="filter-field-' + field_index + '" ' + is_related + ' data-type="date" type="text" data-id="' + field_index + '" class="form-control customSearchDate datepicker" readonly></div>';
        }
        return newhtmlinput
    }
    function search_table(columnIndex, searchValue){
        window.datatable.column(columnIndex).search(searchValue).draw();
    }
});
