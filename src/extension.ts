// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Create a decoration type (gray color)
  const srOnlyDecoration = vscode.window.createTextEditorDecorationType({
    color: "gray",
    fontStyle: "italic",
  });

  // Function to update decorations
  function updateDecorations() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const regEx = /className\s*=\s*["']sr-only["']/g;
    const text = editor.document.getText();
    const decorations: vscode.DecorationOptions[] = [];

    let match;
    while ((match = regEx.exec(text))) {
      const startPos = editor.document.positionAt(match.index);
      const endPos = editor.document.positionAt(match.index + match[0].length);
      const decoration = { range: new vscode.Range(startPos, endPos) };
      decorations.push(decoration);
    }

    editor.setDecorations(srOnlyDecoration, decorations);
  }

  // Call once when activated
  updateDecorations();

  // Update decorations when text changes
  vscode.workspace.onDidChangeTextDocument((event) => {
    updateDecorations();
  });

  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      updateDecorations();
    }
  });

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
//   const disposable = vscode.commands.registerCommand(
//     "sronly-highlighter.helloWorld",
//     () => {
//       // The code you place here will be executed every time your command is executed
//       // Display a message box to the user
//       vscode.window.showInformationMessage(
//         "Hello World from SrOnly Highlighter!"
//       );
//     }
//   );

//   context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
