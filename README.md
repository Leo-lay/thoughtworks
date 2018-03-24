# Thoughtworks

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.3.

## First

Run `npm install` for install angular package

## Development server

Run `npm start`  to start project Will open browser to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

##  help

You decided to give up on earth after the latest financial collapse left 99.99% of the earth's population with 0.01% of the wealth. Luckily, with the scant sum of money that is left in your account, you are able to afford to rent a spaceship, leave earth, and fly all over the galaxy to sell common metals and dirt (which apparently is worth a lot).
 
Buying and selling over the galaxy requires you to convert numbers and units, and you decided to write a program to help you.
 
The numbers used for intergalactic transactions follows similar convention to the roman numerals and you have painstakingly collected the appropriate translation between them.
 
Roman numerals are based on seven symbols:

|   Symbol    | Value |
| :---------- | :--- |
| I |  1 |
| V       |  5 |
| X |  10 |
| L       |  50 |
| C |  100 |
| D       |  500 |
| M |  1000 |

Numbers are formed by combining symbols together and adding the values. For example, MMVI is 1000 + 1000 + 5 + 1 = 2006. Generally, symbols are placed in order of value, starting with the largest values. When smaller values precede larger values, the smaller values are subtracted from the larger values, and the result is added to the total. For example MCMXLIV = 1000 + (1000 − 100) + (50 − 10) + (5 − 1) = 1944.

* The symbols "I", "X", "C", and "M" can be repeated three times in succession, but no more. (They may appear four times if the third and fourth are separated by a smaller value, such as XXXIX.) "D", "L", and "V" can never be repeated.
* "I" can be subtracted from "V" and "X" only. "X" can be subtracted from "L" and "C" only. "C" can be subtracted from "D" and "M" only. "V", "L", and "D" can never be subtracted.
* Only one small-value symbol may be subtracted from any large-value symbol.. 
* A number written in [16]Arabic numerals can be broken into digits. For example, 1903 is composed of 1, 9, 0, and 3. To write the Roman numeral, each of the non-zero digits should be treated separately. Inthe above example, 1,000 = M, 900 = CM, and 3 = III. Therefore, 1903 = MCMIII. 



上面需求大概翻译过来就是
* 符号I，X，C 和 M 最多可以重复3次。（也可能出现4次的情况如果第三次和第四次之间有一个更小的值，例如 XXXIX.这是允许的）D，L和V永远不能重复出现。
* I只能够被V和X减，X只能够被L和C减，C只能够倍D和M减。V，L和D不能被减。
* 一个小的字符仅可能被一个大的字符减。
* 在[16]阿拉伯数字中能够被拆分成数字，例如：1903年由1、9、0和3组成。要写出罗马数字，每一个非零的数字都应该单独处理。在上面的例子中，1000 = M, 900 = CM, 3 = III。因此,1903 = MCMIII。

## 下面是输入&输出
### Test input:
* glob is I
* prok is V
* pish is X
* tegj is L
* glob glob Silver is 34 Credits
* glob prok Gold is 57800 Credits
* pish pish Iron is 3910 Credits
* how much is pish tegj glob glob ?
* how many Credits is glob prok Silver ?
* how many Credits is glob prok Gold ?
* how many Credits is glob prok Iron ?
* how much wood could a woodchuck chuck if a woodchuck could chuck wood ?

### Test Output:
* pish tegj glob glob is 42
* glob prok Silver is 68 Credits
* glob prok Gold is 57800 Credits
* glob prok Iron is 782 Credits
* I have no idea what you are talking about
