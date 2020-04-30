import React, { Component } from "react";
import ace from "ace-build/ace";
import chromeTheme from "ace-build/theme-chrome";
import monokaiTheme from "ace-build/theme-monokai";
import cssMode from "ace-build/mode-css";
import scroll from "ace-build/custom-scrollbar";
import emmetExt from "ace-build/ext-emmet";
import emmet from "ace-build/emmet";
import RestApiService from "../../services/rest-api-service";

export default class CssEditor extends Component {

    restApiService = new RestApiService();

    componentDidMount(){
        const node = this._cssEditor;
        ace.require("ace/ext/emmet");
        const editor = ace.edit(node, {wrap: true, showPrintMargin: false, fontSize: "13px", fadeFoldWidgets: true, useWorker: false, enableEmmet: true});
        editor.setAutoScrollEditorIntoView(true);
        editor.setTheme("ace/theme/chrome");
        editor.session.setMode("ace/mode/css");
        editor.container.style.lineHeight = '19px';
        editor.renderer.updateFontSize();
        editor.session.on("change", this.onEditorContentChange);
    }

    onEditorContentChange = () => {
        const { bundleId } = this.props;
        const content = ace.edit("css-editor-jsc-70").getValue();
        this.restApiService.updateEditorContent(bundleId, content, "CSS");
    };

    render() {
        const { content, visible, className } = this.props;
        const contentToBeDisplayed = content ? content : "Put your CSS styles here...";
        return (
            <div ref={(node) => { this._cssEditor = node; }} className={`editor-jsc-70 ace_editor ace-chrome ${className ? className : ''}`} style={{visibility: visible ? 'visible' : 'hidden'}} id="css-editor-jsc-70">
                {contentToBeDisplayed}
            </div>
        );
    }
}
