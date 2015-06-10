/**
 * @module: nd-zeroclipboard
 * @author: lzhengms <lzhengms@gmail.com> - 2015-05-27 16:34:14
 */

'use strict';

var ZeroClipBoard = require('./vendor/ZeroClipboard');
var widget = require('nd-widget');
var Alert = require('nd-alert');

var ClipBoard = module.exports = widget.extend({
  attrs: {
    trigger: null,
    swf: null,
    getCopyText:function(target){
      return '';
    }
  },
  setup: function () {
    ClipBoard.superclass.setup.call(this);

    ZeroClipBoard.config({swfPath: this.get('swf')});
    var that=this,
      client = new ZeroClipBoard(this.get('trigger'));

    client.on('ready', function (event) {

      client.on('copy', function (event) {
        event.clipboardData.clearData();
        event.clipboardData.setData('text/plain', that.get('getCopyText').call(that,event.target));
      });

      client.on('aftercopy', function (event) {
        Alert.show('复制成功');
      });

    });

    client.on('error', function (event) {
      ZeroClipBoard.destroy();
    });

  }

});



