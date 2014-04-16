/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var Transform     = require('famous/core/Transform');
    var Scrollview = require('famous/views/Scrollview');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');

    // create the main context
    var mainContext = Engine.createContext();

    var surfaces = [];

    // your app here
    var headerSurface = new Surface({
        size: [undefined, 200],
        content: 'banner',
        properties: {
            lineHeight: '200px',
            textAlign: 'center',
            backgroundColor: '#dedede',
            color: 'black'
        }
    });

    var infoSurface = new Scrollview({
        clipSize: 400
    });

    var scrollSurfaces = [];
    for (var i = 0; i < 15; i++){
        var temp = new Surface({
            size: [undefined, 200],
            content: '<div class="card">Text' + i + '</div>',
            properties: {
                textAlign: 'center',
                lineHeight: '200px',
                backgroundColor: '#bfbfbf',
                color: 'black'
            }
        });
        temp.pipe(infoSurface);
        scrollSurfaces.push(temp);
    }

    var scrollContainer = new ContainerSurface({
        properties: {
            overflow: 'hidden'
        }
    });

    scrollContainer.pipe(infoSurface);

    infoSurface.sequenceFrom(scrollSurfaces);

    scrollContainer.add(infoSurface);

    var infoSurfaceModifier = new Modifier({
        transform: Transform.translate(0, 200)
    });

    mainContext.add(headerSurface);
    mainContext.add(infoSurfaceModifier).add(scrollContainer);

});
