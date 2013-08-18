$(function() {
	$(document).on("click", "a:not([data-bypass])", function(evt) {
        var href = {
            prop: $(this).prop("href"),
            attr: $(this).attr("href")
        };
        var root = location.protocol + "//" + location.host + "/";

        if (href.prop && href.prop.slice(0, root.length) === root) {
            evt.preventDefault();
            Backbone.history.navigate(href.attr, true);
        }
    });

    var count = 60;

    var Entry = Backbone.Model.extend({
        defaults: function() {
            return {
                url: "",
                title: "",
                date: ''
            };
        }
    });
    var Entries = Backbone.Collection.extend({
        model: Entry,
        url: './api/search',
        initialize: function() {

        },
        searchByCategory: function(category, offset, limit) {
            this.fetch({
                data: {
                    category: category,
                    offset: offset,
                    limit: limit,
                    dataType: 'json'
                }
            });
        },
        getLatest: function(offset, limit) {
            this.fetch({
                data: {
                    offset: offset,
                    limit: limit,
                    dataType: 'json'
                }
            });
        },
        parse: function(resp) {
            return resp;
        }
    });

    var EntryView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-6 col-sm-6 col-lg-4',
        id: 'entry',
        model: Entry,
        events: {
            'click #img': 'onClick'
        },
        onClick: function(e) {
            console.log(e.target.tagName + 'がクリックされた');
        },
        template: _.template($('#entry-template').html()),
        render: function() {
            var data = this.model.toJSON();
            data.date = new Date(data.date).toLocaleDateString();
            var template = this.template(data);
            this.$el.html(template);
            return this;
        }
    });

    var EntriesView = Backbone.View.extend({
        tagName: 'div',
        model: Entry,
        collection: null,
        initialize: function() {
            this.listenTo(entries, 'add', this.addOne);
            this.listenTo(entries, 'reset', this.rerender);
            this.listenTo(entries, 'all', this.render);
            this.collection.fetch({
                data: {
                    limit: count,
                    dataType: 'json'
                }
            });
        },
        addOne: function(entry) {
            var view = new EntryView({
                model: entry
            });
            $("#dataArea").append(view.render().el);
        },
        rerender: function() {
            $("#dataArea").empty();
            this.collection.each(this.addOne, this);
        },
        render: function() {}
    });

    var MenuView = Backbone.View.extend({
        el: $('#menu'),
        events: {
            "click #all": "getAll",
            "click #web": "getWeb",
            "click #maker": "getMaker",
            "click #media": "getMedia",
            "click #other": "getOther"
        },
        initialize: function() {},
        getAll: function(e) {
            entries.reset();
            entries.getLatest(0, count);
        },
        getWeb: function(e) {
            entries.reset();
            entries.searchByCategory('WEB', 0, count);
        },
        getMaker: function(e) {
            entries.reset();
            entries.searchByCategory('MAKER', 0, count);
        },
        getMedia: function(e) {
            entries.reset();
            entries.searchByCategory('MEDIA', 0, count);
        },
        getOther: function(e) {
            entries.reset();
            entries.searchByCategory('OTHER', 0, count);
        }
    });

    var entries = new Entries();
    var entriesView = new EntriesView({
        collection: entries
    });
    var menuView = new MenuView();
 });