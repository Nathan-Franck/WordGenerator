// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Adjective } from './Adjectives';
import { Noun } from './Nouns';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const registerStringReplaceCommand = (command: string, replaceCallback: () => string) => {
		context.subscriptions.push(
			vscode.commands.registerCommand(command, () => {
				const textEditor = vscode.window.activeTextEditor;
				if (textEditor == null) { return; }
				textEditor.edit((builder) => {
					for (const selection of textEditor.selections) {
						builder.replace(selection, replaceCallback());
					}
				});
			})
		);
	};

	registerStringReplaceCommand("extension.adjective", Adjective.Random);
	registerStringReplaceCommand("extension.noun", Noun.Random);
}

// this method is called when your extension is deactivated
export function deactivate() {}
