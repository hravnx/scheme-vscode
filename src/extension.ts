'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let g_terminal: vscode.Terminal = null;


function createTerminal() {
  if (g_terminal === null) {
    g_terminal = vscode.window.createTerminal("Chez REPL", "chez");
  }
  g_terminal.show(true);
}

function sendText() {
  if (g_terminal === null) {
    return;
  }
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const text = editor.document.getText(editor.selection);
    if (text) {
      g_terminal.sendText(text, true);
    }
  }
}

function onCloseTerminal(terminal: vscode.Terminal) {
  if (terminal === g_terminal) {
    console.log("Closing Chez REPL");
    g_terminal = null;
  }
}

const commandMap = {
  startREPL: createTerminal,
  sendToREPL: sendText
};
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  Object.keys(commandMap).forEach(name => {
    context.subscriptions.push(vscode.commands.registerCommand('extension.'+name, commandMap[name]));
  });

  vscode.window.onDidCloseTerminal(onCloseTerminal);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
