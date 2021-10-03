## Generator of differences
![Linter](https://github.com/SmorodinaVik/frontend-project-lvl2/workflows/Linter/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/e94ec0ba1162932aa2b2/maintainability)](https://codeclimate.com/github/SmorodinaVik/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e94ec0ba1162932aa2b2/test_coverage)](https://codeclimate.com/github/SmorodinaVik/frontend-project-lvl2/test_coverage)

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
 
## How it works:
[![asciicast](https://asciinema.org/a/N29Rl4PGLe1EeGu4235KBkqOM.svg)](https://asciinema.org/a/N29Rl4PGLe1EeGu4235KBkqOM)
### First step:
[![asciicast](https://asciinema.org/a/1nsajLN5yWfj6M5FoWgWmgncc.svg)](https://asciinema.org/a/1nsajLN5yWfj6M5FoWgWmgncc)
### Second step:
[![asciicast](https://asciinema.org/a/F9j3jfPRGSg3IflN791LvQoS9.svg)](https://asciinema.org/a/F9j3jfPRGSg3IflN791LvQoS9)
### Third step:
[![asciicast](https://asciinema.org/a/2swxsiw0XgbAWJreSuY9JCvgE.svg)](https://asciinema.org/a/2swxsiw0XgbAWJreSuY9JCvgE)
### Preview:
[![asciicast](https://asciinema.org/a/9UYNvS1clauPcYydGFGEgBeLw.svg)](https://asciinema.org/a/9UYNvS1clauPcYydGFGEgBeLw)
