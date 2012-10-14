$ = require "jquery"
bling = require "bling"

module.exports = CartographicSurface

class CartographicSurface
    constructor: (options) ->
        @surface = options.surface
        @selector = options.selector
        @scale = options.scale
        @nodes = {}

    render: ->
        self = this
        @$win = $(window)
        
        @$el = bling ".CartographicSurface .nodes, .ViewPort", ->
            self.nodesEl = @nodes
            self.viewPortEl = @ViewPort

            @ViewPort.draggable
                containment: "parent"
                stop: (event, data) =>
                    $(window)
                        .scrollLeft(data.position.left * self.scaleUp)
                        .scrollTop(data.position.top * self.scaleUp)


        $(window).on "scroll.CartographicSurface resize.CartographicSurface", => @drawViewPort()

        @surfaceEl = $(@surface)
        @drawViewPort()
        @drawNodes()
        
        @$el.css
            width: @surfaceEl.width() * @scale
            height: @surfaceEl.height() * @scale


        @$el.click (e) =>
            @$win
                .scrollLeft((e.clientX - (@$el.offset().left - @$win.scrollLeft())) * @scaleUp)
                .scrollTop((e.clientY - (@$el.offset().top - @$win.scrollTop())) * @scaleUp)

        this

    drawViewPort: ->
        @viewPortEl.css
            width: @$win.width() * @scale
            height: @$win.height() * @scale
            left: @$win.scrollLeft() * @scale 
            top: @$win.scrollTop() * @scale
            
        @scaleUp = @surfaceEl.width() / @$el.width()

        this

    drawNodes: ->
        self = this
        $("#{@surface} #{@selector}").each (i, el) =>
            _$el = $(el)
            if not @nodes[i]?
                @nodes[i] = (bling ".node").appendTo @nodesEl

                _$el.on "remove.CartographicSurface", -> 
                    self.nodes[i].remove()
                    delete self.nodes[i]
                _$el.on "resize.CartographicSurface", -> positionNode()
                _$el.on "drag.CartographicSurface", -> positionNode()
                _$el.on append: -> positionNode()

            positionNode = ->
                pos = _$el.offset()
                self.nodes[i].css
                    left: pos.left * self.scale
                    top: pos.top * self.scale
                    width: _$el.width() * self.scale
                    height: _$el.height() * self.scale

            positionNode()

        this

