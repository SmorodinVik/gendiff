## Generator of differences
![Linter](https://github.com/SmorodinaVik/frontend-project-lvl2/workflows/Linter/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/a41b4dc424e4849c7642/maintainability)](https://codeclimate.com/github/SmorodinaVik/gendiff/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a41b4dc424e4849c7642/test_coverage)](https://codeclimate.com/github/SmorodinaVik/gendiff/test_coverage)

*Utility for finding differences in configuration files*

The utility compares two configuration files and displays the result in the console. Supported file formats: json, yaml. Supports output in several formats: stylish (tree), plain and json.

### Install
```
make install
make link
```

### The help information
Outputs usage information. The default help option is `-h, --help`.
```
gendiff -h
```
#### Will print out:
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
 ```
 ### Usage
 Available output formats: `stylish (default), plain, json`.
 
### How it works:
##### plain output -> stylish output -> json output

[![asciicast](https://asciinema.org/a/N29Rl4PGLe1EeGu4235KBkqOM.svg)](https://asciinema.org/a/N29Rl4PGLe1EeGu4235KBkqOM)
