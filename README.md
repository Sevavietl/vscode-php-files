# PHP Files

Extension that adds naive IDE-like file creation.

## Features

For now you have the following options for creating files from Explorer context menu:

- New PHP Class
- New PHP Interface
- New PHP Trait

## Extension Settings

This extension contributes the following settings:

* `php-files.templates.PHPClass`
* `php-files.templates.PHPInterface`
* `php-files.templates.PHPTrait`

In order to allow multiline templates in JSON each template is an array.

## TODO

- Allow fully qualified names (sets the namespace of file).
- Allow using of commands from the command palette.
- Implement tests.
