'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let g_terminals: vscode.Terminal[] = [];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "scheme-vscode" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.startREPL', () => {
    const newTerminal = vscode.window.createTerminal(`Chez #${g_terminals.length + 1}`, "chez");
    g_terminals.push(newTerminal);
    newTerminal.show();
  });

  vscode.window.onDidCloseTerminal(terminal => {
    console.log(`${terminal.name} closed`);
    const idx = g_terminals.findIndex(t => terminal === t);
    if (idx !== -1) {
      g_terminals.splice(idx, 1);
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log("Number of terminals active", g_terminals.length);
  g_terminals.forEach(t => t.dispose());
  g_terminals = [];
}
