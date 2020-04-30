import React, { Component } from "react";
import ace from "ace-build/ace";
import chromeTheme from "ace-build/theme-chrome";
import monokaiTheme from "ace-build/theme-monokai";
import jsMode from "ace-build/mode-javascript";
import scroll from "ace-build/custom-scrollbar";
import emmetExt from "ace-build/ext-emmet";
import emmet from "ace-build/emmet";
import RestApiService from "../../services/rest-api-service";

export default class JsEditor extends Component {

    restApiService = new RestApiService();

    componentDidMount(){
        const node = this._jsEditor;
        ace.require("ace/ext/emmet");
        const editor = ace.edit(node, {wrap: true, showPrintMargin: false, fontSize: "13px", fadeFoldWidgets: true, useWorker: false, enableEmmet: true});
        editor.setAutoScrollEditorIntoView(true);
        editor.setTheme("ace/theme/chrome");
        editor.session.setMode("ace/mode/javascript");
        editor.container.style.lineHeight = '19px';
        editor.renderer.updateFontSize();
        editor.session.on("change", this.onEditorContentChange);
    }

    onEditorContentChange = () => {
        const { bundleId } = this.props;
        const content = ace.edit("js-editor-jsc-70").getValue();
        this.restApiService.updateEditorContent(bundleId, content, "JS");
    };

    render() {
        const { content, visible, className } = this.props;
        const contentToBeDisplayed = content ? content : "Put your JavaScript code here...";
        return (
            <div ref={(node) => { this._jsEditor = node; }} className={`editor-jsc-70 ace_editor ace-chrome ${className ? className : ''}`} style={{visibility: visible ? 'visible' : 'hidden'}} id="js-editor-jsc-70">
                {contentToBeDisplayed}
            </div>
        );
    }
}
