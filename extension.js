const hx = require("hbuilderx");
var Color = require('color');

/**
 * @description 颜色转换
 * @description {String} action - hex|hsl|rgb
 */
function colorConversion(action) {
    let activeEditor = hx.window.getActiveTextEditor();
    activeEditor.then(function(editor) {
        let selection = editor.selection;
        let word = editor.document.getText(selection);
        
        let LastColorValue;
        try{
            let v = Color(word);
            switch (action){
                case "HSL":
                    LastColorValue = v.hsl().string();
                    break;
                case "HEX":
                    LastColorValue = v.hex();
                    break;
                case "RGB":
                    LastColorValue = v.rgb().string();
                    break;
                case "RGBA":
                    LastColorValue = v.rgb().alpha(0.3).string();
                    break;
                default:
                    break;
            };
        } catch(e) {
            hx.window.showErrorMessage("颜色转换失败，请检查选择的文本是否有效", ["我知道了"]);
        };
        
        if (LastColorValue != undefined) {
            editor.edit(editBuilder => {
                editBuilder.replace(selection, LastColorValue);
            });
            if (action == "RGBA") {
                hx.window.setStatusBarMessage("颜色转换：请自行修改alpha通道的值。", 5000, "info");
            };
        };
    });
};

//该方法将在插件激活的时候调用
function activate(context) {
    let RGB = hx.commands.registerCommand('colorConversion.ToRgb', (param) => {
        colorConversion('RGB');
    });
    context.subscriptions.push(RGB);
    
    let RGBA = hx.commands.registerCommand('colorConversion.ToRgba', (param) => {
        colorConversion('RGBA');
    });
    context.subscriptions.push(RGBA);

    let HEX = hx.commands.registerCommand('colorConversion.ToHex', (param) => {
        colorConversion('HEX');
    });
    context.subscriptions.push(HEX);

    let HSL = hx.commands.registerCommand('colorConversion.ToHsl', (param) => {
        colorConversion('HSL');
    });
    context.subscriptions.push(HSL);
};

//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

};

module.exports = {
    activate,
    deactivate
}
