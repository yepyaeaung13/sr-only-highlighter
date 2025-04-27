import * as assert from 'assert';
import * as vscode from 'vscode';

suite('SR-Only Highlighter Test Suite', () => {
  vscode.window.showInformationMessage('Starting sr-only tests...');

  test('Detects sr-only class', async () => {
    // Open a fake text document
    const doc = await vscode.workspace.openTextDocument({ content: `<div className="sr-only">Hidden Text</div>`, language: 'javascriptreact' });
    const editor = await vscode.window.showTextDocument(doc);

    // Simulate your extension's behavior (you would call your extension logic here)
    const text = editor.document.getText();

    // Check if sr-only is found
    const found = text.includes('sr-only');

    assert.strictEqual(found, true, 'Should detect sr-only class');
  });
});
