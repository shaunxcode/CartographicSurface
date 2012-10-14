// Generated by CoffeeScript 1.3.3
(function() {
  var $, CartographicSurface, bling;

  $ = require("component-jquery");

  bling = require("component-bling");

  CartographicSurface = (function() {

    function CartographicSurface(options) {
      this.surface = options.surface;
      this.selector = options.selector;
      this.scale = options.scale;
      this.nodes = {};
    }

    CartographicSurface.prototype.render = function() {
      var self,
        _this = this;
      self = this;
      this.$win = $(window);
      this.$el = bling(".CartographicSurface .nodes, .ViewPort", function() {
        var _this = this;
        self.nodesEl = this.nodes;
        self.viewPortEl = this.ViewPort;
        return this.ViewPort.draggable({
          containment: "parent",
          stop: function(event, data) {
            return $(window).scrollLeft(data.position.left * self.scaleUp).scrollTop(data.position.top * self.scaleUp);
          }
        });
      });
      $(window).on("scroll.CartographicSurface resize.CartographicSurface", function() {
        return _this.drawViewPort();
      });
      this.surfaceEl = $(this.surface);
      this.drawViewPort();
      this.drawNodes();
      this.$el.css({
        width: this.surfaceEl.width() * this.scale,
        height: this.surfaceEl.height() * this.scale
      });
      this.$el.click(function(e) {
        return _this.$win.scrollLeft((e.clientX - (_this.$el.offset().left - _this.$win.scrollLeft())) * _this.scaleUp).scrollTop((e.clientY - (_this.$el.offset().top - _this.$win.scrollTop())) * _this.scaleUp);
      });
      return this;
    };

    CartographicSurface.prototype.drawViewPort = function() {
      this.viewPortEl.css({
        width: this.$win.width() * this.scale,
        height: this.$win.height() * this.scale,
        left: this.$win.scrollLeft() * this.scale,
        top: this.$win.scrollTop() * this.scale
      });
      this.scaleUp = this.surfaceEl.width() / this.$el.width();
      return this;
    };

    CartographicSurface.prototype.drawNodes = function() {
      var self,
        _this = this;
      self = this;
      $("" + this.surface + " " + this.selector).each(function(i, el) {
        var positionNode, _$el;
        _$el = $(el);
        if (!(_this.nodes[i] != null)) {
          _this.nodes[i] = (bling(".node")).appendTo(_this.nodesEl);
          _$el.on("remove.CartographicSurface", function() {
            self.nodes[i].remove();
            return delete self.nodes[i];
          });
          _$el.on("resize.CartographicSurface", function() {
            return positionNode();
          });
          _$el.on("drag.CartographicSurface", function() {
            return positionNode();
          });
          _$el.on({
            append: function() {
              return positionNode();
            }
          });
        }
        positionNode = function() {
          var pos;
          pos = _$el.offset();
          return self.nodes[i].css({
            left: pos.left * self.scale,
            top: pos.top * self.scale,
            width: _$el.width() * self.scale,
            height: _$el.height() * self.scale
          });
        };
        return positionNode();
      });
      return this;
    };

    return CartographicSurface;

  })();

  module.exports = CartographicSurface;

}).call(this);
