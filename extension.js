const vscode = require('vscode');
const path = require('path');

const createTestCommand = vscode.commands.registerCommand(
    'flutter-test-wrapper.wrapTest',
    async () => {

        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage(
                'Open a Dart file from the lib folder first.'
            );
            return;
        }

        const sourceUri = editor.document.uri;

        const workspaceFolder =
            vscode.workspace.getWorkspaceFolder(sourceUri);

        if (!workspaceFolder) {
            vscode.window.showErrorMessage(
                'The current file is not inside a workspace.'
            );
            return;
        }

        const workspaceRoot = workspaceFolder.uri.fsPath;

        const relativePath = vscode.workspace.asRelativePath(
            sourceUri,
            false
        );

        const normalizedPath = relativePath.replace(/\\/g, '/');

        if (!normalizedPath.startsWith('lib/')) {
            vscode.window.showErrorMessage(
                'The current Dart file must be inside the lib folder.'
            );
            return;
        }

        const libRelativePath = normalizedPath.replace(
            /^lib\//,
            ''
        );
        
        const sourceImportPath = libRelativePath.replace(
            /\.dart$/,
            ''
        );
            
        const dartFilename = libRelativePath.split('/').pop();
        
        const testRelativePath =
            `${sourceImportPath}_test.dart`;

        const testPath = vscode.Uri.file(
            path.join(
                workspaceRoot,
                'test',
                `${dartFilename.replace(`\.dart`, '')}_test.dart`
            )
        );

        const testTypes = [
            {
                label: '$(beaker) Unit Test',
                description: 'Create a Dart unit test',
                value: 'unit'
            },
            {
                label: '$(symbol-class) Widget Test',
                description: 'Create a Flutter widget test',
                value: 'widget'
            },
            {
                label: '$(rocket) Integration Test',
                description: 'Create a Flutter integration test',
                value: 'integration'
            }
        ];

        const selected = await vscode.window.showQuickPick(
            testTypes,
            {
                title: 'Flutter: Create Test',
                placeHolder: 'Select test type'
            }
        );

        if (!selected) {
            return;
        }

         const testLoc = [
            {
                label: 'Mirror Lib Folder',
                description: 'Create a mirror of lib folder',
                value: 'lib'
            },
            {
                label: 'Unit Test Folder',
                description: 'Create a Dart unit test folder',
                value: 'unit'
            },
            {
                label: 'Widget Test Folder',
                description: 'Create a Flutter widget test folder',
                value: 'widget'
            },
            {
                label: 'Integration Test Folder',
                description: 'Create a Flutter integration test folder',
                value: 'integration'
            }
        ];

        const selectedTestLoc = await vscode.window.showQuickPick(
            testLoc,
            {
                title: 'Flutter: Create Test Folder',
                placeHolder: 'Select test folder location'
            }
        );

        if (!selectedTestLoc) {
            return;
        }

        const packageName = await getFlutterPackageName(
            workspaceRoot
        );

        if (!packageName) {
            vscode.window.showErrorMessage(
                'Could not find package name in pubspec.yaml.'
            );
            return;
        }

        const fileName = path.basename(
            sourceUri.fsPath,
            '.dart'
        );

        const defaultName = fileName
            .split('_')
            .map(word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
            )
            .join('');

        const name = await vscode.window.showInputBox({
            title: 'Test Name',
            prompt: 'Enter the test/widget name',
            value: defaultName,
            placeHolder: 'MyWidget'
        });

        if (!name) {
            return;
        }

        const sourceImport =
            `package:${packageName}/${sourceImportPath}.dart`;

        let testCode = '';

        // ============================================================
        // UNIT TEST
        // ============================================================

        if (selected.value === 'unit') {

            testCode = `import 'package:flutter_test/flutter_test.dart';
import '${sourceImport}';

void main() {
  test('${name} test', () {
    // Arrange

    // Act

    // Assert

    expect(true, isTrue);
  });
}
`;
        }

        // ============================================================
        // WIDGET TEST
        // ============================================================

        if (selected.value === 'widget') {

            testCode = `
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import '${sourceImport}';

void main() {
  testWidgets(
    '${name} test',
    (WidgetTester tester) async {
      await tester.pumpWidget(
        const MaterialApp(home: ${name}()),
      );

      expect(
        find.byType(${name}),
        findsOneWidget,
      );
    },
  );
}
`;
        }

        // ============================================================
        // INTEGRATION TEST
        // ============================================================

        if (selected.value === 'integration') {

            testCode = `import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import '${sourceImport}';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets(
    '${name} integration test',
    (WidgetTester tester) async {

      await tester.pumpWidget(
        ${name}(),
      );

      // Perform actions

      // Verify results
      expect(
        find.byType(${name}),
        findsOneWidget,
      );
    },
  );
}
`;
        }

        // ============================================================
        // DETERMINE TEST PATH
        // ============================================================

        let testBaseDirectory;

        switch (selectedTestLoc.value) {

            case 'lib':
                testBaseDirectory = path.join(
                    workspaceRoot,
                    'test',
                    libRelativePath.replace(dartFilename, '')
                );
                break;

            case 'unit':
                testBaseDirectory = path.join(
                    workspaceRoot,
                    'test',
                    'unit',
                );
                break;

            case 'widget':
                testBaseDirectory = path.join(
                    workspaceRoot,
                    'test',
                    'widget',
                );
                break;

            case 'integration':
                testBaseDirectory = path.join(
                    workspaceRoot,
                    'test',
                    'integration',
                );
                break;
        }

        await vscode.workspace.fs.createDirectory(
            vscode.Uri.file(testBaseDirectory)
        );

        try {

            await vscode.workspace.fs.stat(testPath);

            const overwrite =
                await vscode.window.showWarningMessage(
                    `Test already exists:\n${testRelativePath}`,
                    'Overwrite',
                    'Cancel'
                );

            if (overwrite !== 'Overwrite') {
                return;
            }

        } catch {
            // File doesn't exist
        }

        let vsTestPath = vscode.Uri.file(
            path.join(
                testBaseDirectory,
                `${dartFilename.replace(`\.dart`, '')}_test.dart`
            ),);

        await vscode.workspace.fs.writeFile(
            vsTestPath,
            Buffer.from(testCode, 'utf8')
        );

        const document =
            await vscode.workspace.openTextDocument(
                vsTestPath
            );

        await vscode.window.showTextDocument(
            document
        );

        vscode.window.showInformationMessage(
            `Test Created ✓`
        );
    }
);

async function getFlutterPackageName(workspaceRoot) {

    const pubspecPath = vscode.Uri.file(
        path.join(
            workspaceRoot,
            'pubspec.yaml'
        )
    );

    try {

        const data =
            await vscode.workspace.fs.readFile(
                pubspecPath
            );

        const content =
            Buffer.from(data).toString('utf8');

        const match =
            content.match(/^name:\s*([^\s#]+)/m);

        if (!match) {
            return null;
        }

        return match[1];

    } catch {

        return null;
    }
}


module.exports = {
    createTestCommand
};
