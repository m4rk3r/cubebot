var URL = 'http://localhost:8000/api';


var BaseCollection = Backbone.Collection.extend({
	initialize: function (opts){
		this.params = opts || {};
	},
	url: function (){
		var params = [];

		if(typeof this.params.offset !== "undefined")
			params.push('offset='+this.params.offset);

		if(typeof this.params.limit !== "undefined")
			params.push('limit='+this.params.limit);

		return URL + this.fragment+(params.length?'?'+params.join('&'):'');
	},
	parse: function (data){
		return data.results;
	}
});

/*
	Instagram face
*/
var Gram = Backbone.Model.extend({
	truncate:20,
	template: _.template(
		"<a href='<%= o.get('url') %>'><img src='<%= o.get('photo') %>'></a>"+
		"<h3><a href='<%= o.get('url') %>'>"+
		"<%= o.get_caption() %>"+
		"</a></h3>"
	),

	intitialze: function (){
		_.bindAll(this,'get_caption');
	},

	get_caption: function (){
		var c = this.get('caption');

		if(typeof c !== "undefined" && c.length > this.truncate)
			c = c.slice(0,this.truncate) + '...';

		return c;
	}
});

var Grams = BaseCollection.extend({
	model: Gram,
	fragment:'/instagram/'
});

var InstagramView = Backbone.View.extend({
	tagName:'div',
	className:'photo',
	initialize: function (){

	},
	render: function (){
		this.$el.html(this.model.template({o: this.model}));

		return this;
	}
});

var Instagram = Backbone.View.extend({
	tagName:'li',
	className:'instagram',
	initialize: function (opts){
		this.items = new Grams(opts)
		this.items.fetch();

		this.listenTo(this.items,'sync',this.render);
	},

	render: function (){
		this.$el.empty();

		_(this.items.models).each(_.bind(function (item, idx){
			var ele = new InstagramView({model:item});

			var $ele = ele.render().$el;

			$ele.css({
				'left': _.random(100)+'%',
				'top': _.random(100)+'%'
			})

			this.$el.append($ele);
		},this));

		return this;
	}
});

/*
	Youtube face
*/
var Tube = Backbone.Model.extend({
	truncate:20,
	template: _.template(
	"<iframe id=\"ytplayer\" type=\"text/html\" width=\"640\" height=\"390\""+
		"src=\"http://www.youtube.com/embed/<%= o.get('yt_id') %>\""+
	  	"frameborder=\"0\"/>"+
	  	"<h3><%= o.get('title') %></h3>"+
	  	"<p><%= o.get('description') %></p>"
	)
});

var Tubes = BaseCollection.extend({
	model: Tube,
	fragment:'/youtube/'
});

var TubeView = Backbone.View.extend({
	tagName:'div',
	className:'video',
	render: function (){
		this.$el.html(this.model.template({o: this.model}));

		return this;
	}
});

var Youtube = Backbone.View.extend({
	tagName:'li',
	className:'youtube',
	initialize: function (opts){
		this.items = new Tubes(opts);
		this.items.fetch();

		this.listenTo(this.items,'sync',this.render);
	},

	render: function (){
		this.$el.empty();

		_(this.items.models).each(_.bind(function (item, idx){
			var ele = new TubeView({model:item});

			var $ele = ele.render().$el;

			this.$el.append($ele);
		},this));

		return this;
	}
});


/*
	Solution face
*/
var Mix = Backbone.Model.extend({
	truncate:20,
	template: _.template(
		"<img src='<%= o.first_media() %>'>"+
	  	"<h3><%= o.get('title') %></h3>"+
	  	"<p><%= o.get('description') %></p>"
	),
	initialize: function (){
		_.bindAll(this,'first_media');
	},
	first_media: function(){
		return this.get('media')[0].photo;
	}
});

var Mixes = BaseCollection.extend({
	model: Mix,
	fragment:'/solutions/'
});

var MixView = Backbone.View.extend({
	tagName:'div',
	className:'solution-item',
	render: function (){
		this.$el.html(this.model.template({o: this.model}));

		return this;
	}
});

var Solution = Backbone.View.extend({
	tagName:'li',
	className:'solution',
	initialize: function (opts){
		this.items = new Mixes();
		this.items.fetch();

		this.listenTo(this.items,'sync',this.render);
	},

	render: function (){
		this.$el.empty();

		_(this.items.models).each(_.bind(function (item, idx){
			var ele = new MixView({model:item});

			var $ele = ele.render().$el;

			this.$el.append($ele);
		},this));

		return this;
	}
});


var Links = Backbone.View.extend({});
var Photos = Backbone.View.extend({});



var Cube = Backbone.View.extend({
	tagName:'ul',
	id:'cube',
	faces: [
		new Instagram(),
		new Youtube({limit:1}),
		new Solution({limit:1}),
		new Instagram({offset:10}),
		new Youtube({limit:1,offset:1}),
		new Solution({limit:1})
	],
	faceMap: ['front','right','back','left','top','bottom'],
	initialize: function (){

	},
	render: function (){
		var self = this;
		_(this.faces).each(_.bind(function (obj, idx){
			var ele = obj.render().$el;
			ele.addClass(this.faceMap[idx]);
			this.$el.append(ele);
		},this));

		return this;
	}
});