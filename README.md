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

The extension automatically mirrors your `lib/` folder structure inside `test/`.

For example, if you're working on:

```text
lib/
└── feature/
    └── home/
        └── home.dart
```

Run:

```text
Flutter: Create Test
```

The extension creates:

```text
test/
└── feature/
    └── home/
        └── home_test.dart
```

You don't need to manually create the test folders or filename.

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

The generated test automatically imports:

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

5. Enter the test/widget name.

6. The extension creates the test in the matching `test/` directory.

---

## Unit Test Example

Source:

```text
lib/services/user_service.dart
```

Generated:

```text
test/services/user_service_test.dart
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

Generated:

```text
test/feature/home/home_page_test.dart
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
        const HomePage(),
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

Example generated test:

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/feature/home/home_page.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets(
    'HomePage integration test',
    (WidgetTester tester) async {
      await tester.pumpWidget(
        const HomePage(),
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

After generating tests:

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
│   └── services/
│       └── user_service_test.dart
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

This positioning makes the extension clear: **it is a Flutter test generator/wrapper**, with **Unit / Widget / Integration** as the three test-generation modes—not a general Flutter widget-wrapping extension.
```
