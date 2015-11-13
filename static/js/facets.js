var transEndStr = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd';
var URL;

if(window.location.hostname == "localhost")
	URL = 'http://localhost:8000/api';
else
	URL = 'https://morning-thicket-7130.herokuapp.com/api';


var instaGrid = [
	[
		[0.15,0.09],
		[0.5, -0.08],
		[0.69, 0.10],
		[-0.02, 0.22],
		[0.46, 0.25],
		[0.25, 0.47],
		[-0.02, 0.55],
		[0.52, 0.56],
		[0.80, 0.52],
		[0.17, 0.89]
	],
	[
		[0.74,0.02],
		[0.18,0.58],
		[0.58,0.76],
		[0.04,-0.05],
		[0.42,0.33],
		[0.69,0.36],
		[0.68,0.67],
		[-0.01,0.37],
		[0.46,-0.05],
		[0.63,0.72]
	],
	[
		[0.17,0.03],
		[0.16,0.36],
		[-0.05,0.49],
		[0.15,0.64],
		[-0.05,0.19],
		[0.79,0.55],
		[0.56,0.71],
		[0.38,0.34],
		[0.36,0.56],
		[0.59,0.4],
		[-0.02,0.68],
		[0.74,0.41],
		[0.75,0.18],
		[0.28,0.79],
		[0.57,0.08]
	]
];


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
		"<img class='pic' src='<%= o.get('photo') %>'>"+
		"<h3><a href='<%= o.get('url') %>'>"+
		"<%= o.user() %>"+
		//"<%= o.get_caption() %>"+
		"</a></h3>"
	),

	intitialze: function (){
		_.bindAll(this,'get_caption','user');
	},

	user: function (){
		return '@' + this.get('user');
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
		_.bindAll(this,'enlarge','close','save');

		this.items = new Grams(opts)
		this.items.fetch();

		this.grid = opts.grid;
		this.limit = this.grid.length;

		this.$viewport = $('#enlarge');

		this.$viewport.find('.close').on('click', this.close);
		$(document).on('keyup', this.close);

		this.$viewport.on(transEndStr, _.bind(function (){
			if(!this.$viewport.hasClass('open'))
				this.$viewport.css('z-index',-1);
		},this));

		this.listenTo(this.items,'sync',this.render);
		this.$el.on('click','img.pic',this.enlarge);
	},

	close: function (evt){
		if((evt.type == 'keyup' && evt.keyCode == 27) || evt.type == 'click')
			this.$viewport.removeClass('open');
	},

	enlarge: function (evt){
		this.$viewport.addClass('open').css({
			zIndex:100,
			'background-image':'url('+$(evt.target).prop('src')+')'
		});
	},

	save: function (){
		var t = '[';
		this.$el.find('div.photo').each(function (){
			t += '['+(parseInt($(this).prop('style')['left'],10)/100)+','+(parseInt($(this).prop('style')['top'],10)/100)+'],\n'
		});
		t+=']';
		console.log(t)
	},

	render: function (){
		this.$el.empty();

		if($('#viewport'))
			$('body').append(this.$viewport);

		_(this.items.models).each(_.bind(function (item, idx){
			var ele = new InstagramView({model:item});

			var $ele = ele.render().$el;

			/*
			$ele.css({
				'left': _.random(-5,80)+'%',
				'top': _.random(-5,80)+'%'
			});
			*/

			$ele.css({
				left: 100*this.grid[idx][0]+'%',
				top: 100*this.grid[idx][1]+'%'
			});

			$ele.css('width',300 * (_.random(40,85)/100)+'px');

			this.$el.append($ele);
		},this));

		//this.save();

		var lock = $("<img class='lock' src='/img/eye.svg' data-face='"+this.face+"'>");
		this.$el.append(lock);

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

		var lock = $("<img class='lock' src='/img/eye.svg' data-face='"+this.face+"'>");
		this.$el.append(lock);

		return this;
	}
});


/*
	Solution face
*/
var Mix = Backbone.Model.extend({
	truncate:20,
	template: _.template($('#solution-stack-template').html()),
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
	solutionMenu: _.template($('#solution-menu-template').html()),
	initialize: function (opts){
		_.bindAll(this, 'select');

		this.items = new Mixes();

		this.$menu = $("<ul id='solution-menu'></ul>");

		this.$el.on('click','#solution-menu li.solution-option',this.select);
		this.$el.on(transEndStr, 'div.solution-item', function (){
			if($(this).hasClass('selected'))
				$(this).css('z-index',99);
			else
				$(this).css('z-index',-1);
		});


		this.items.fetch();
		this.listenTo(this.items,'sync',this.render);
	},

	select: function (evt){
		var idx = $(evt.target).index();

		this.$menu.find('.solution-option')
				  .removeClass('selected')
				  .eq(idx)
				  .addClass('selected');

		this.$el.find('div.selected').removeClass('selected');
		this.$el.find('.solution-item').eq(idx).addClass('selected');

	},

	render: function (){
		this.$el.empty();
		if(this.items.models.length < 1 )return this;

		this.$el.append(this.$menu);
		this.$menu.html(
			this.solutionMenu({items: this.items.models})
		);

		_(this.items.models).each(_.bind(function (item, idx){
			var ele = new MixView({model:item});

			var $ele = ele.render().$el;

			this.$el.append($ele);
		},this));

		var lock = $("<img class='lock' src='/img/eye.svg' data-face='"+this.face+"'>");
		this.$el.append(lock);

		/* select first solution */
		this.$menu.find('li.solution-option').first().addClass('selected');
		this.$el.find('.solution-item')
				.first()
				.addClass('selected')
				.css('z-index',1);

		return this;
	}
});


var Links = Backbone.View.extend({
	className:'links',
	template:_.template(
		"<input type='text'>"+
		"<ul id='link-list'>"+
		"<li><a href='https://www.instagram.com/cubebot/' target='_blank'>Instagram</a></li>"+
		"<li><a href='http://cubebot.com/ws.asp' target='_blank'>Wholesale</a></li>"+
		"<li><a href='https://twitter.com/cubebotthatsme' target='_blank'>Twitter</a></li>"+
		"<li><a href='#' target='_blank'>Collection</a></li>"+
		"</ul>"
	),
	render: function (){
		this.$el.html(
			this.template()
		);

		var lock = $("<img class='lock' src='/img/eye.svg' data-face='"+this.face+"'>");
		this.$el.append(lock);

		return this;
	}
});


var StaticResource = BaseCollection.extend({
	fragment:'/flex-content/'
});

var Static = Backbone.View.extend({
	tagName:'div',
	className:'static',
	initialize: function (){
		this.item = new StaticResource();
		this.item.fetch();

		this.listenTo(this.item,'sync',this.render);
	},
	render: function (){
		if(this.item.models.length){
			this.$el.html(this.item.models[0].get('html'))
		}

		var lock = $("<img class='lock' src='/img/eye.svg' data-face='"+this.face+"'>");
		this.$el.append(lock);

		return this;
	}
})
var Photos = Backbone.View.extend({});

var Cube;
$(function (){
	Cube = Backbone.View.extend({
		tagName:'ul',
		id:'cube',
		faces: [
			new Static(),
			//new Instagram({grid:instaGrid[_.random(instaGrid.length-1)]}),
			new Solution({limit:1}),
			new Youtube({limit:1}),
			new Instagram({grid:instaGrid[_.random(instaGrid.length-1)]}),
			new Youtube({limit:1,offset:1}),
			new Instagram({grid:instaGrid[_.random(instaGrid.length-1)]})
		],
		faceMap: ['front','right','back','left','top','bottom'],
		initialize: function (){
		},
		render: function (){
			var self = this;
			_(this.faces).each(_.bind(function (obj, idx){
				obj.face = this.faceMap[idx];
				var ele = obj.render().$el;
				ele.addClass(this.faceMap[idx]+' face');
				this.$el.append(ele);
			},this));

			return this;
		}
	});
});