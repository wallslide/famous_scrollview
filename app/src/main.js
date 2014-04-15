/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var SequentialLayout = require('famous/views/SequentialLayout');
    var Scrollview = require('famous/views/Scrollview');

    // create the main context
    var mainContext = Engine.createContext();

    var sequentialLayout = new SequentialLayout({
        direction: 1
    });

    var surfaces = [];

    // your app here
    var headerSurface = new Surface({
        size: [768, 200],
        content: 'Hi',
        properties: {
            lineHeight: '200px',
            textAlign: 'center',
            backgroundColor: '#dedede',
            color: 'black'
        }
    });

    var scrollSurfaces = [];
    var infoSurface = new Scrollview();

    for( var i = 0; i < 5; i++ ){
        var temp = new Surface({
            size: [undefined, 100],
            content: 'Scroller' + i,
            properties: {
                textAlign: 'center',
                backgroundColor: 'red',
                color: 'white'
            }
        });
        temp.pipe(infoSurface);
        scrollSurfaces.push(temp);
    }

    infoSurface.sequenceFrom(scrollSurfaces);

//    var infoSurface = new Surface({
//        size: [768, 1080],
//        content: 'Hello',
//        properties: {
//            lineHeight: '200px',
//            textAlign: 'center',
//            backgroundColor: '#dedede',
//            color: 'black'
//        }
//    });

    surfaces.push(headerSurface);
    surfaces.push(infoSurface);
    sequentialLayout.sequenceFrom(surfaces);

    var sequentialLayoutModifier = new Modifier({
        origin: [.5,.5]
    });

    mainContext.add(sequentialLayoutModifier).add(sequentialLayout);

});
