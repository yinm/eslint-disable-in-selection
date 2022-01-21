import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "eslint-disable-in-selection.wrapComments",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const selection = editor.selection;
      const startLine = selection.start.line;
      const endLine = selection.end.line;

      editor.edit((editorBuilder) => {
        const eol = "\n";

        editorBuilder.insert(
          new vscode.Position(startLine, 0),
          "/* eslint-disable */" + eol
        );
        editorBuilder.insert(
          new vscode.Position(endLine + 1, 0),
          "/* eslint-enable */" + eol
        );
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
