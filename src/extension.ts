import * as vscode from 'vscode';
import { Adjective } from './Adjectives';
import { Noun } from './Nouns';

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

export function deactivate() {}
