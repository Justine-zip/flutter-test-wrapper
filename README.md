# Flutter Test Wrapper

A VS Code extension that makes Flutter testing faster by automatically generating **Unit Tests, Widget Tests, and Integration Tests** with the correct file structure and imports.

## Features

### Unit Test

Quickly generate a Dart unit test for the file you're working on.

### Widget Test

Generate a Flutter widget test with the required `flutter_test` imports and basic widget assertions.

### Integration Test

Generate an integration test using Flutter's `integration_test` package.

---

## Automatic Test Structure

The extension provides multiple folder location options for generated tests.

When you run:

```text
Flutter: Create Test
```

you can choose where the generated test should be created:

```text
Mirror Lib Folder
Unit Test Folder
Widget Test Folder
Integration Test Folder
```

### Mirror Lib Folder

Mirrors the source file's folder structure from `lib/` inside `test/`.

For example:

```text
lib/

└── feature/

    └── home/

        └── home.dart
```

The extension creates:

```text
test/

└── feature/

    └── home/

        └── home_test.dart
```

### Unit Test Folder

Places the generated unit test directly inside `test/unit/`.

For example:

```text
lib/feature/home/home.dart
```

generates:

```text
test/unit/home_test.dart
```

### Widget Test Folder

Places the generated widget test directly inside `test/widget/`.

For example:

```text
lib/feature/home/home.dart
```

generates:

```text
test/widget/home_test.dart
```

### Integration Test Folder

Places the generated integration test directly inside `test/integration/`.

For example:

```text
lib/feature/home/home.dart
```

generates:

```text
test/integration/home_test.dart
```

### Folder Structure Overview

```text
my_app/

├── lib/
│   ├── feature/
│   │   └── home/
│   │       └── home.dart
│   └── services/
│       └── user_service.dart
│
├── test/
│   ├── feature/
│   │   └── home/
│   │       └── home_test.dart
│   │
│   ├── unit/
│   │   └── user_service_test.dart
│   │
│   └── widget/
│       └── home_test.dart
│
├── test/
│   └── integration/
│       └── home_test.dart
│
└── pubspec.yaml
```

The `Mirror Lib Folder` option preserves the source folder structure.

The `Unit Test Folder`, `Widget Test Folder`, and `Integration Test Folder` options place the generated test directly into their respective test folders without recreating the `lib/` directory structure.

You don't need to manually create the test folders or filename. The extension creates the required directories automatically.

---

## Automatic Imports

The extension reads your project's `pubspec.yaml` to detect the Flutter package name.

For example:

```yaml
name: my_app
```

If your current file is:

```text
lib/feature/home/home.dart
```

the generated test automatically imports:

```dart
import 'package:my_app/feature/home/home.dart';
```

The test type also adds the required testing package automatically.

### Unit Test

```dart
import 'package:flutter_test/flutter_test.dart';

import 'package:my_app/feature/home/home.dart';
```

### Widget Test

```dart
import 'package:flutter/material.dart';

import 'package:flutter_test/flutter_test.dart';

import 'package:my_app/feature/home/home.dart';
```

### Integration Test

```dart
import 'package:flutter_test/flutter_test.dart';

import 'package:integration_test/integration_test.dart';

import 'package:my_app/feature/home/home.dart';
```

---

## How to Use

1. Open a Dart file inside your `lib/` folder.

2. Open the VS Code Command Palette:

```text
Ctrl + Shift + P
```

3. Select:

```text
Flutter: Create Test
```

4. Choose a test type:

```text
Unit Test

Widget Test

Integration Test
```

5. Choose a test folder location:

```text
Mirror Lib Folder

Unit Test Folder

Widget Test Folder

Integration Test Folder
```

6. Enter the test/widget name.

7. The extension creates the test in the selected directory.

---

## Unit Test Example

Source:

```text
lib/services/user_service.dart
```

If **Mirror Lib Folder** is selected:

```text
test/services/user_service_test.dart
```

If **Unit Test Folder** is selected:

```text
test/unit/user_service_test.dart
```

Example:

```dart
import 'package:flutter_test/flutter_test.dart';

import 'package:my_app/services/user_service.dart';

void main() {

  test('UserService test', () {

    // Arrange

    // Act

    // Assert

    expect(true, isTrue);

  });

}
```

---

## Widget Test Example

Source:

```text
lib/feature/home/home_page.dart
```

If **Mirror Lib Folder** is selected:

```text
test/feature/home/home_page_test.dart
```

If **Widget Test Folder** is selected:

```text
test/widget/home_page_test.dart
```

Example:

```dart
import 'package:flutter/material.dart';

import 'package:flutter_test/flutter_test.dart';

import 'package:my_app/feature/home/home_page.dart';

void main() {

  testWidgets(

    'HomePage test',

    (WidgetTester tester) async {

      await tester.pumpWidget(

        const MaterialApp(
          home: HomePage(),
        ),

      );

      expect(

        find.byType(HomePage),

        findsOneWidget,

      );

    },

  );

}
```

---

## Integration Test Example

If **Integration Test Folder** is selected:

```text
lib/feature/home/home_page.dart
```

generates:

```text
test/integration/home_page_test.dart
```

Example generated test:

```dart
import 'package:flutter/material.dart';

import 'package:flutter_test/flutter_test.dart';

import 'package:integration_test/integration_test.dart';

import 'package:my_app/feature/home/home_page.dart';

void main() {

  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets(

    'HomePage integration test',

    (WidgetTester tester) async {

      await tester.pumpWidget(

        HomePage(),

      );

      // Perform actions

      // Verify results

      expect(

        find.byType(HomePage),

        findsOneWidget,

      );

    },

  );

}
```

---

## Example Project

Before:

```text
my_app/

├── lib/
│   ├── feature/
│   │   ├── home/
│   │   │   └── home_page.dart
│   │   └── profile/
│   │       └── profile_page.dart
│   └── services/
│       └── user_service.dart
│
├── test/
└── pubspec.yaml
```

After generating tests using the different folder location options:

```text
my_app/

├── lib/
│   ├── feature/
│   │   ├── home/
│   │   │   └── home_page.dart
│   │   └── profile/
│   │       └── profile_page.dart
│   └── services/
│       └── user_service.dart
│
├── test/
│   ├── feature/
│   │   ├── home/
│   │   │   └── home_page_test.dart
│   │   └── profile/
│   │       └── profile_page_test.dart
│   │
│   ├── unit/
│   │   └── user_service_test.dart
│   │
│   └── widget/
│       └── home_page_test.dart
│
├── test/
│   └── integration/
│       └── home_page_test.dart
│
└── pubspec.yaml
```

---

## Requirements

* Visual Studio Code
* Flutter SDK
* Dart SDK
* A Flutter project
* `flutter_test` for Unit and Widget tests
* `integration_test` for Integration tests

---

## Command

The extension currently provides:

```text
Flutter: Create Test
```

From there, choose:

```text
Unit Test
Widget Test
Integration Test
```

Then choose the test folder location:

```text
Mirror Lib Folder
Unit Test Folder
Widget Test Folder
Integration Test Folder
```

---

## Roadmap

* Automatic test name detection
* Generate tests from VS Code
* Right-click → Create Test
* Better test templates
* Custom test templates
* Automatic test generation
* Test file navigation
* Generate tests for classes and methods

---

## Contributing

Suggestions, bug reports, and contributions are welcome.

Please open an issue or pull request in the project's source repository.

---

## License

MIT License

Copyright (c) 2026 Justine Butiong

```

This positioning makes the extension clear: **it is a Flutter test generator/wrapper**, with **Unit / Widget / Integration** as the three test-generation modes, while giving users control over whether the generated test **mirrors the `lib/` structure or goes directly into a dedicated test folder**.
```
